// 1 - Importamos los módulos y funciones necesarios
import React, { createContext, useState, useContext } from 'react';
import useAuth  from '../context/AuthProvider';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';

// 2 - Creamos el contexto ProtectedContext utilizando la función createContext() de React
export const ProtectedContext = createContext();

// 3 - Definimos el componente ProtectedProvider y recibimos los componentes hijos como prop children
export const ProtectedProvider = ({ children }) => {
  
  // 4 - Obtenemos el objeto user del contexto useAuth que proporciona la información del usuario autenticado
  const { user } = useAuth();

  // 5 - Creamos el estado cart para almacenar los productos agregados al carrito
  const [cart, setCart] = useState([]);

  // 6 - Creamos una referencia a la colección "pedidos" en la base de datos
  const pedidosCollection = collection(db, 'pedidos');

  // Agregar un producto al carrito
  const addToCart = (producto) => {
    setCart([...cart, producto]);
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

  // Crear un nuevo pedido
  const createPedido = async (productoId) => {
    const pedidoData = {
      userId: user.id,
      productoId: productoId,
      // Otros campos relacionados con el pedido
    };
    try {
      const docRef = await addDoc(pedidosCollection, pedidoData);
      console.log('Pedido creado con ID:', docRef.id);
    } catch (error) {
      console.error('Error al crear el pedido:', error);
    }
  };

  // Obtener todos los pedidos del usuario actual
  const getUserPedidos = async () => {
    try {
      const querySnapshot = await getDocs(pedidosCollection);
      const pedidos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('Pedidos del usuario:', pedidos);
    } catch (error) {
      console.error('Error al obtener los pedidos del usuario:', error);
    }
  };

  // Eliminar un pedido
  const deletePedido = async (pedidoId) => {
    try {
      const pedidoDoc = doc(db, 'pedidos', pedidoId);
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
        cart,
        addToCart,
        duplicatePedido,
        removePedido,
        getTotalAmount,
        createPedido,
        getUserPedidos,
        deletePedido,
        updatePedido,
      }}
    >
      {children}
    </ProtectedContext.Provider>
  );
};
