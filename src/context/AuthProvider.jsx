// authProvider.js

import React, { createContext, useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { app } from '../firebaseConfig/firebase';
import { addDoc, collection, doc, getDocs, where, query } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null); // Estado para almacenar la información del usuario

  const [productos, setProductos] = useState([]);

  const productosCollection = collection(db, 'productos');

  // Traer todos los productos guardados en la variable
   const getProductos = async ()=> { 
    const data = await getDocs(productosCollection); 
    console.log(data.docs);

    setProductos(
       data.docs.map((doc)=>({...doc.data(), id:doc.id}))
    ); 
   
}

  const navigate = useNavigate();

  // Función para guardar la información del usuario en el estado userData
  const saveUserData = (userData) => {
    setUserData(userData);
  };

   // Función para guardar la información del usuario en localStorage
   const saveUserDataToLocal = (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  // Función para obtener la información del usuario desde localStorage
  const getUserDataFromLocal = () => {
    const userDataFromLocal = JSON.parse(localStorage.getItem('userData'));
    setUserData(userDataFromLocal);
  };

  // Función para eliminar la información del usuario de localStorage
  const removeUserDataFromLocal = () => {
    localStorage.removeItem('userData');
  };

  // Función para iniciar sesión con correo electrónico y contraseña
  const loginWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      throw error;
    }
  };

  // Función para registrar un nuevo usuario y agregarlo a la colección "users"
  const registerWithEmailAndPassword = async (email, password) => {
    try {
      // Registrar al usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Obtener el ID de usuario único (UID) del UserCredential
      const userId = userCredential.user.uid;

      // Datos adicionales del usuario para almacenar en la colección "users"
      const userData = {
        admin: false,
        email: email,
        password: password,
        nombre: email
      };

      // Agregar los datos del usuario a la colección "users" en Firestore
      const userRef = collection(db, 'users');
      await addDoc(userRef, { ...userData, userId });

      // Actualizar el estado del usuario en el contexto AuthProvider
      setUser(userCredential.user);

      // Guardar el perfil del usuario en el estado userData
      setUserData(userData);

      // Guardar el estado en sessionStorage para persistencia (opcional)
      // sessionStorage.setItem('authState', JSON.stringify({ user: userCredential.user, loading: false }));
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      throw error;
    }
  };

  // Función para iniciar sesión con Google
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error('Error en el inicio de sesión con Google:', error);
      throw error;
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      removeUserDataFromLocal();
      setUserData(null); // Eliminar los datos del usuario del estado userData al cerrar sesión
    // Redirigir a la página de inicio después de cerrar sesión utilizando navigate
    navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  };

  const fetchUserProfile = async (userId) => {
    try {
      const userCollectionRef = collection(db, 'users');
      const querySnapshot = await getDocs(query(userCollectionRef, where('userId', '==', userId)));
  
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        return userData;
      } else {
        console.log('El documento del usuario no existe');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      return null;
    }
  };
  // Comprueba si el usuario está autenticado al montar el componente
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        // Si el usuario está autenticado, obtenemos su perfil
        fetchUserProfile(user.uid).then((userProfile) => {
          if (userProfile) {
            setUserData(userProfile);
          } else {
            console.log('El perfil del usuario no existe en Firestore');
          }
        });
      } else {
        // Si el usuario no está autenticado, eliminamos su perfil del estado userData
        setUserData(null);
      }
    });

    // Devuelve una función de limpieza para cancelar la suscripción al desmontar el componente
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        userData,
        loginWithEmailAndPassword,
        registerWithEmailAndPassword,
        loginWithGoogle,
        logout,
        fetchUserProfile,
        productos,
        getProductos,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
