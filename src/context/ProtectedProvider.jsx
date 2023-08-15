// 1 - Importamos los módulos y funciones necesarios
import React, { createContext, useState, useContext, useEffect } from 'react';
import useAuth  from '../hooks/useAuth';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, getDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';

// 2 - Creamos el contexto ProtectedContext utilizando la función createContext() de React
export const ProtectedContext = createContext();

// 3 - Definimos el componente ProtectedProvider y recibimos los componentes hijos como prop children
export const ProtectedProvider = ({ children }) => {
  
  
  const { user } = useAuth();  // 4 - Obtenemos el objeto user del contexto useAuth que proporciona la información del usuario autenticado


  
  const [cart, setCart] = useState([]); // 5 - Creamos el estado cart para almacenar los productos agregados al carrito

  
  const pedidosCollection = collection(db, 'pedidos'); // 6 - Creamos una referencia a la colección "pedidos" en la base de datos

  const productosCollection = collection(db, 'productos');


    // Crear un nuevo pedido
    const createPedido = async (productoId) => {
      const pedidoData = {
        //campos relacionados con el pedido
        userId: user.uid,
        productoId: productoId,
        };
      try {
        const docRef = await addDoc(pedidosCollection, pedidoData);
        console.log('Pedido creado con ID:', docRef.id);
      } catch (error) {
        console.error('Error al crear el pedido:', error);
      }
    };

 

const getPedidoById = async (pedidoId) => {
  try {
    const pedidoDocRef = doc(pedidosCollection, pedidoId);
    const pedidoDoc = await getDoc(pedidoDocRef);

    if (pedidoDoc.exists()) {
      const pedidoData = pedidoDoc.data();
      // Obtener más detalles del producto relacionado al pedido usando el ID del producto
      const productoId = pedidoData.productoId;
      if (productoId) {
        const productoDocRef = doc(productosCollection, productoId);
        const productoDoc = await getDoc(productoDocRef);
        if (productoDoc.exists()) {
          const productoData = productoDoc.data();
          return {
            id: pedidoDoc.id,
            pedidoData,
            productoData,
          };
        } else {
          console.error('No se encontró el producto con el ID:', productoId);
          return null;
        }
      } else {
        console.error('El pedido no tiene un ID de producto válido.');
        return null;
      }
    } else {
      console.error('No se encontró el pedido con el ID:', pedidoId);
      return null;
    }
  } catch (error) {
    console.error('Error al obtener el pedido:', error);
    return null;
  }
};




  // Obtener todos los pedidos del usuario actual y cargarlos en el estado de cart
  const getUserPedidos = async () => {
    try {
      const querySnapshot = await getDocs(pedidosCollection);
      const pedidos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCart(pedidos);
      console.log('Pedidos del usuario:', pedidos);
    
    // Ahora, para cada pedido, obtén la información del producto relacionado
    const cartWithProductInfo = await Promise.all(
      pedidos.map(async (pedido) => {
        const productoId = pedido.productoId;
        if (productoId) {
          const productoDocRef = doc(productosCollection, productoId);
          const productoDoc = await getDoc(productoDocRef);
          if (productoDoc.exists()) {
            const productoData = productoDoc.data();
            return {
              ...pedido,
              productoData,
            };
          } else {
            console.error('No se encontró el producto con el ID:', productoId);
            return pedido; // Mantén el pedido sin información de producto
          }
        } else {
          console.error('El pedido no tiene un ID de producto válido.');
          return pedido; // Mantén el pedido sin información de producto
        }
      })
    );

    setCart(cartWithProductInfo); // Actualiza el estado cart con la información de productos
    
    
    
    } catch (error) {
      console.error('Error al obtener los pedidos del usuario:', error);
    }
  };


  // Eliminar un pedido
  const deletePedido = async (id) => {
    try {
      const pedidoDoc = doc(db, 'pedidos', id);
      await deleteDoc(pedidoDoc);
      console.log('Pedido eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar el pedido:', error);
    }
  };


  // Renderizamos el proveedor del contexto ProtectedContext con los valores y funciones necesarios para los componentes hijos
  return (
    <ProtectedContext.Provider
      value={{
        user,
        cart,
        createPedido,
        getUserPedidos,
        deletePedido,
        getPedidoById
      }}
    >
      {children}
    </ProtectedContext.Provider>
  );
};
