// ListProduct.js

import React, { useEffect } from 'react';
import { Table, Button, Container, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { usePrivate } from '../../hooks/usePrivate';
import EditProduct from '../CrudProduct/EditProduct'
import { useState } from 'react';



const ListProduct = () => {
  const { productos, getProductos, confirmDelete } = usePrivate();
  const [selectedProductId, setSelectedProductId] = useState(null); // Estado para el ID del producto seleccionado

  useEffect(() => {
    getProductos();
  }, []);

  const handleOpenEditModal = (productId) => {
    setSelectedProductId(productId); // Actualiza el ID del producto seleccionado
  };

  const handleCloseEditModal = () => {
    setSelectedProductId(null); // Reinicia el ID del producto seleccionado
  };


  return (
    <>
    <Container className='mx-auto mt-5 p-5' >
        <Stack className='p-5 pb-5 mb-3 mt-5'>
          <Table className='p-3 mt-5'>
        <thead>
          <tr>
            <th>Modelo</th>
            <th>Talle</th>
            <th>Color</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos?.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.marca || ''}</td>
              <td>{producto.modelo || ''}</td>
              <td>{producto.talle || ''}</td>
              <td>{producto.precio || ''}</td>
              <td>
              <Link
  to="#"
  className="btn btn"
  onClick={() => handleOpenEditModal(producto.id)}
>
  Editar
</Link>

                <button
                  onClick={() => {
                    confirmDelete(producto.id);
                  }}
                  className="btn btn-dangerous hover"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </Stack>
      </Container>
      <EditProduct
      productId={selectedProductId}
      handleCloseEditModal={handleCloseEditModal}
    />
      </>
  );
};

export default ListProduct;
