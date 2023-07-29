import React, { createContext, useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { app } from '../firebaseConfig/firebase';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import getAuthenticatedUserId from '../hooks/getAuthenticatedUserId';



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

    // Guardar el estado en sessionStorage para persistencia
    sessionStorage.setItem('authState', JSON.stringify({ user: userCredential.user, loading: false }));
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
 
// Función para obtener los datos del usuario a partir de su UID
const getUserDataFromFirestore = async (user) => {
  try {
    const userDocRef = doc(db, 'users', user);
    const userDocSnapshot = await getDoc(userDocRef);
    
    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      setUserData(userData);
    } else {
      setUserData(null);
      console.log('El documento del usuario no existe');
    }
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    setUserData(null);
  }
};

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    setUser(user);
    setLoading(false);

    if (user) {
      const userId = user.uid;
      if (userId) {
        await getUserDataFromFirestore(userId); // Llamamos a la función para obtener los datos del usuario
      }
    } else {
      setUser(null);
      setUserData(null);
    }
  });

  return () => unsubscribe();
}, [auth]);
  
  



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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
