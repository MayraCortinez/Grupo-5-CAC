import React, { useEffect } from 'react';
import { Table, Button, Container, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { usePrivate } from '../../hooks/usePrivate';
import { useAuth } from '../../hooks/useAuth';
import EditProduct from '../CrudProduct/EditProduct'
import { useState } from 'react';



const ListProduct = () => {
  const { confirmDelete } = usePrivate();
  const { productos, getProductos } = useAuth();

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

  const handleDeleteProduct = async (productId) => {
    await confirmDelete(productId);
    // getProductos(); // Actualizar la lista de productos después de eliminar
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
                      <img
                        width="28"
                        height="28"
                        src="https://img.icons8.com/dotty/80/create-new.png"
                        alt="create-new"
                      />
                    </Link>
                    <button
                      onClick={() => handleDeleteProduct(producto.id)}
                      className="btn btn-dangerous hover"
                    >
                      <img
                        width="28"
                        height="28"
                        src="https://img.icons8.com/wired/64/000000/filled-trash.png"
                        alt="filled-trash"
                      />
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
