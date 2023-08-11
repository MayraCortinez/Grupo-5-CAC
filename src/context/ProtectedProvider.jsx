// 1 - Importamos los módulos y funciones necesarios
import React, { createContext, useState, useContext, useEffect } from 'react';
import useAuth  from '../hooks/useAuth';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';

// 2 - Creamos el contexto ProtectedContext utilizando la función createContext() de React
export const ProtectedContext = createContext();

// 3 - Definimos el componente ProtectedProvider y recibimos los componentes hijos como prop children
export const ProtectedProvider = ({ children }) => {
  
  
  const { user } = useAuth();  // 4 - Obtenemos el objeto user del contexto useAuth que proporciona la información del usuario autenticado
  const { productos, getProductos } = useAuth();

  
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

  // Duplicar un pedido en el carrito
  const duplicatePedido = (index) => {
    const pedido = cart[index];
    setCart([...cart, pedido]);
  };

  // Eliminar un pedido del carrito
  const removePedido = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  // Obtener el total a pagar
  const getTotalAmount = () => {
    let total = 0;
    cart.forEach((pedido) => {
      total += pedido.precio;
    });
    return total;
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

  // Actualizar un pedido
  const updatePedido = async (pedidoId, updatedData) => {
    try {
      const pedidoDoc = doc(db, 'pedidos', pedidoId);
      await updateDoc(pedidoDoc, updatedData);
      console.log('Pedido actualizado con éxito');
    } catch (error) {
      console.error('Error al actualizar el pedido:', error);
    }
  };


  // Renderizamos el proveedor del contexto ProtectedContext con los valores y funciones necesarios para los componentes hijos
  return (
    <ProtectedContext.Provider
      value={{
        user,
        cart,
        duplicatePedido,
        removePedido,
        getTotalAmount,
        createPedido,
        getUserPedidos,
        deletePedido,
        updatePedido,
        productos,
        getProductos
      }}
    >
      {children}
    </ProtectedContext.Provider>
  );
};
