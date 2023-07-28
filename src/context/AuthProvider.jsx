import React, { createContext, useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { app } from '../firebaseConfig/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';


export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [authState, setAuthState] = useState({ user: null, hasOrders: false, isAdmin: false, loading: true });

  useEffect(() => {
    // Leer el estado inicial desde sessionStorage, si está disponible
    const initialState = sessionStorage.getItem('authState')
      ? JSON.parse(sessionStorage.getItem('authState'))
      : { user: null, hasOrders: false, isAdmin: false, loading: true };

    setAuthState(initialState);

    // Escuchar cambios de estado de autenticación en Firebase Authentication
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Si el usuario está autenticado, actualizar el estado con el usuario y otras propiedades
        setAuthState({ user, hasOrders: false, isAdmin: false, loading: false });
        // Guardar el estado en sessionStorage para persistencia
        sessionStorage.setItem('authState', JSON.stringify({ user, hasOrders: false, isAdmin: false, loading: false }));
      } else {
        // Si el usuario no está autenticado, actualizar el estado con usuario nulo
        setAuthState({ user: null, hasOrders: false, isAdmin: false, loading: false });
        // Guardar el estado en sessionStorage para persistencia
        sessionStorage.setItem('authState', JSON.stringify({ user: null, hasOrders: false, isAdmin: false, loading: false }));
      }
    });

    // Limpieza: Detener el listener al desmontar el componente
    return () => unsubscribe();
  }, [auth]);


   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]); 

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
  const auth = getAuth();
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
    setAuthState({ ...authState, user: userCredential.user, loading: false });

    // Guardar el estado en sessionStorage para persistencia
    sessionStorage.setItem('authState', JSON.stringify({ ...authState, user: userCredential.user, loading: false }));
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

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
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
