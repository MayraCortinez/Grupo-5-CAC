import React, { useState, useEffect } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { usePrivate } from '../../hooks/usePrivate';
import { useAuth } from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const EditProduct = ({ productId, handleCloseEditModal }) => {

  const { getProductoById, updateProduct } = usePrivate();
  const { getProductos } = useAuth(); //se utiliza para que luego de editar el producto, se actualice la lista

  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        const productoData = await getProductoById(productId);
        //console.log(productoData);
        setForm(productoData);
      };
      fetchProduct();
    }
  }, [getProductoById, productId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct(productId, form);
    console.log(form);
    await getProductos(); // Llama a getProductos para obtener la lista actualizada
    handleCloseEditModal(); // Cierra el modal después de actualizar
  };



  return (
    <div>

      <Modal show={productId !== null} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                name="marca"
                type="text"
                value={form.marca || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                name="modelo"
                type="text"
                value={form.modelo || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Color</Form.Label>
              <Form.Control
                name="color"
                type="color"
                value={form.color || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                name="precio"
                type="number"
                value={form.precio || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Talle</Form.Label>
              <Form.Control
                name="talle"
                type="number"
                value={form.talle || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Detalle</Form.Label>
              <Form.Control
                name="detalle"
                type="text"
                value={form.detalle || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className='white'>Descripción</Form.Label>
              <Form.Control
                name="descripcion"
                type="text"
                value={form.descripcion || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ID</Form.Label>
              <Form.Control
                name="id"
                type="number"
                value={form.id || ''}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Cancelar
            </Button>
            <Button type="submit" onClick={handleSubmit} variant="primary">
              Actualizar
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditProduct;
