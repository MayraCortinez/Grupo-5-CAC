import React, { createContext, useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { app } from '../firebaseConfig/firebase';
import { addDoc, collection, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';




export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null); // Estado para almacenar la información del usuario



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
    setUser(userCredential.user); // Actualizamos el estado con el usuario autenticado

    // Obtener el perfil del usuario recién registrado y establecerlo en el estado userData
    const userProfile = await fetchUserProfile(userId);
    setUserData(userProfile);

    // Guardar el estado en sessionStorage para persistencia
    localStorage.setItem('authState', JSON.stringify({ user: userCredential.user, loading: false }));
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
        fetchUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;