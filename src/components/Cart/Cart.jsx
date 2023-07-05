import ListGroup from 'react-bootstrap/ListGroup';
import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "@firebase/firestore";
import { db } from '../../firebaseConfig/firebase';
import Swal from 'sweetalert2';

function Cart() {

  //cargo hooks
  const [pedidos, setPedidos] = useState([]);

  //referencia a la base
  const pedidosCollection = collection(db, 'pedidos');

  //obtengo coleccion
  const getPedidos = async () => {
    const data = await getDocs(pedidosCollection);
    setPedidos(
      data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    )
  }

  useEffect(() => {
    getPedidos();
  }, [])

  const alerta = (id) => {
      Swal.fire({
        title: 'Desea eliminar el pedido?',
        text: "Su pedido esta por ser eliminado del carrito",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar!',
	cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          borrarPedido(id);
          Swal.fire(
            'Eliminado!',
            'El pedido fue eliminado.',
            'success'
          )
        }
      })
  }

  //elimina un pedido
  const borrarPedido = async (id) => {
    let pedido = doc(db, "pedidos", id);
    await deleteDoc(pedido);
    getPedidos();
  }

  //Esta funcion puede ir en la parte del modal para enviar el producto completo
  const agregarPedido = async (e) => {
    e.preventDefault();
    /* hay que hacer dinamico el agregado */
    await addDoc(pedidosCollection, { id: 4, nombre: "Chuck Taylor All Star" });
    getPedidos();
  }

  return (
    <div className="my-5 bg-danger">
      <h2>Your Cart</h2>
      <button onClick={(e) => agregarPedido(e)}>agregar producto</button>
      <ListGroup as="ol" numbered>
        {pedidos?.map((pedido) => (
          <ListGroup.Item key={pedido.id} as="li" className='py-2 d-flex' style={{width: "450px"}}>
            <div className='w-100 d-flex justify-content-between'>
            <p>
            {pedido.nombre}
            </p>
            {/* este boton se reemplaza por un icono de basura */}
            <button className='bg-danger' onClick={() => alerta(pedido.id)}>B</button>
            </div>

          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Cart;