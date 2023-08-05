// ListProduct.js
import React, { useContext, useEffect } from 'react';
import { Stack, Table } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import  {usePrivate} from '../../hooks/usePrivate';


const ListProduct = () => {
  const { productos, getProductos, confirmDelete } = usePrivate();

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <div>
  <Container className='mx-auto mt-5 pt-5' >
      <Stack className='pt-5 pb-5 mb-3 mt-5'>
        <Table className='pt-3 mt-5'>
          <thead>
            <tr>
              <th>Modelo</th>
              <th>Talle</th>
              <th>Color</th>
              <th>Precio</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody className="text-light">
            {productos?.map((producto) => (
              <tr key={producto.id}>
                <td key={producto.marca} className="text-dark">
                  {producto.marca || ''}
                </td>
                <td key={producto.modelo} className="text-dark">
                  {producto.modelo || ''}
                </td>
                <td key={producto.talle} className="text-dark">
                  {producto.talle || ''}
                </td>
                <td key={producto.precio} className="text-dark">
                  {producto.precio || ''}
                </td>
                <td>
                  <Link
                    to={`/admin/editProduct/${producto.id}`}
                    className="btn btn"
                  >
                    <img
                      width="28"
                      height="28"
                      src="https://img.icons8.com/dotty/80/create-new.png"
                      alt="create-new"
                    />
                  </Link>
                  <button
                    onClick={() => {
                      confirmDelete(producto.id);
                    }}
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
    </div>
  );
};

export default ListProduct;
