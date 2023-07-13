import React, { createContext, useState, useEffect } from 'react';
import { useAuth }  from '../hooks/useAuth';
import { db } from '../firebaseConfig/firebase';

// Crea el contexto de autenticación
export const ProtectedContext = createContext();

export const ProtectedProvider = ({ children }) => {
  const { user } = useAuth(); // Obtén el usuario del AuthProvider

  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(null);
  const [hasOrders, setHasOrders] = useState(false);

  useEffect(() => {
    if (user) {
          //Consultar los pedidos del usuario en la colección "pedidos"
      const ordersRef = db.collection('pedidos');
      const userOrdersQuery = ordersRef.where('userId', '==', user.id);

      userOrdersQuery
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            // El usuario tiene pedidos en la colección "pedidos"
            setHasOrders(true);
          } else {
            // El usuario no tiene pedidos en la colección "pedidos"
            setHasOrders(false);
          }
        })
        .catch((error) => {
          console.error('Error al consultar los pedidos:', error);
        });
    }

    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (user) {
      // Configurar el objeto auth con la información del usuario
      setAuth({
        id: user.id,
        email: user.email,
      });
    } else {
      setAuth(null);
    }
  }, [user]);

  return (
    <ProtectedContext.Provider value={{ auth, loading, hasOrders }}>
      {children}
    </ProtectedContext.Provider>
  );
};
