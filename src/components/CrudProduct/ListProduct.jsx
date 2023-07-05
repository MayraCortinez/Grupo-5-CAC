import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig/firebase';
import { async } from '@firebase/util';

import withReactContent from 'sweetalert2-react-content';
import ModalEdit from './ModalEdit';
const MySwal = withReactContent(Swal);


export const ListProduct = () => {

    //1 configurar hooks para poder manipular la información

    const [productos, setProductos] = useState([]);

    //2 referencia a la base de datos

    const productosCollection = collection(db, "productos");

    //3 asincronismo a los datos

    const getProductos = async () => {
        const data = await getDocs(productosCollection);
        console.log(data.docs);

        setProductos(
            data.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
        );
        
    }

    //4 delete documento

    const deleteProducto = async (id) => {
        const productoDoc = doc(db, "productos", id);
        await deleteDoc(productoDoc);
        getProductos(); //actualiza la lista
    }

    //5 configurar sweet alert

    const confirmDelete = (id) => {
        Swal.fire({
            title: `Eliminarás el producto id: ${id}`,
            text: "No podrás revertir tu decisión!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sí, eliminar producto!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProducto(id);
                Swal.fire(
                    'El producto ha sido eliminado con éxito!',
                )
            }
        })
    }



    //6 declarar useEffect

    useEffect(() => {
        getProductos(); //se declara a la función encargada del asincronismo
    }, []);

    return (
        <div>
            <Container>

                <Table>
                    <thead>
                        <tr>
                            <th>Modelo</th>
                            <th>Talle</th>
                            <th>Color</th>
                            <th>Precio</th>
                            <th>Descripción</th>
                        </tr>
                    </thead>
                    <tbody className='text-light'>
                        {productos?.map((producto) => (
                            <tr key={producto.id}>
                                <td key={producto.marca} className='text-dark'>{producto.marca || ''} </td>
                                <td key={producto.modelo} className='text-dark'>{producto.modelo || ''}</td>
                                <td key={producto.talle} className='text-dark'>{producto.talle || ''}</td>
                                <td key={producto.precio} className='text-dark'>{producto.precio || ''} </td>
                                <td>
                                <Button variant="primary" onClick={() => setShow(true)}>
                                    <ModalEdit />
                                <img width="28" height="28" src="https://img.icons8.com/dotty/80/create-new.png" alt="create-new"/></Button>
                                    <button onClick={() => { confirmDelete(producto.id) }} className='btn btn-dangerous hover'><img width="28" height="28"src="https://img.icons8.com/wired/64/000000/filled-trash.png" alt="filled-trash"/></button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
            </Container>
        </div>
    )
}
