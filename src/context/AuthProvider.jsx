import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, doc, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';


// Crea el contexto de autenticación
export const AuthContext = createContext();

// Proveedor de autenticación
 const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [hasOrders, setHasOrders] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      checkOrders(currentUser);
      checkAdmin(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Función para iniciar sesión
  const login = (email, password) => {
    const auth = getAuth();
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Si el inicio de sesión es exitoso, actualiza el estado del usuario
        setUser(userCredential.user);
      })
      .catch((error) => {
        console.error(error)
        // Manejar errores de inicio de sesión aquí
      });
  };

  // Función para cerrar sesión
  const logout = async () => {
    const auth = getAuth();
    try {
      await auth
        .signOut();
      // Si el cierre de sesión es exitoso, actualiza el estado del usuario a null
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const checkOrders = (user) => {
    if (user) {
    // Realiza la lógica para verificar si el usuario tiene pedidos en la colección de pedidos de Firebase
    // Utilizamos la función 'getDocs' para obtener todos los documentos de la colección 'orders' y aplicamos una consulta por 'userId'
      const pedidosRef = collection(db, 'pedidos');
      const userPedidosQuery = query(pedidosRef, where('userId', '==', user.id));    /* utilizamos query para crear una consulta y where 
                                                                                      para filtrar los resultados por el campo userId igual a user.uid. */
      getDocs(userPedidosQuery)
      .then((querySnapshot) => {
        setHasOrders(!querySnapshot.empty)
      })
      .catch((error) => {
        console.log('Error al traer los pedidos', error);
      })
    }
  };

  const checkAdmin = (user) => {
    if (user) {
   // Realiza la lógica para verificar si el usuario es administrador en la colección de usuarios de Firebase
      // Utilizamos la función 'doc' para obtener un documento específico de la colección 'users' por 'user.uid'
      const userRef = doc(db, 'users', user.id);
      getDocs(userRef)
        .then((docSnapshot) => {
          if(docSnapshot.exists()){
            const userData = docSnapshot.data()
            setIsAdmin(userData.admin === true);
          } else {
            setIsAdmin(false);
          }
          }
         )
        .catch((error) => {
          console.log('Error en la consulta a collection users:', error);
        });
    }
  };

  return (
    <AuthContext.Provider 
    value={
        { user, 
        login, 
        hasOrders,
        isAdmin,
        logout }
        }>
      {children}
    </AuthContext.Provider>
  );
};



export default AuthProvider;