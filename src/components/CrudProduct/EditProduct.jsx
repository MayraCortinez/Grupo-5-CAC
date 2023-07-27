// EditProduct.js
import React, { useContext, useState, useEffect } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import {usePrivate} from '../../hooks/usePrivate';

const EditProduct = () => {
  const { getProductoById, updateProduct } = usePrivate();
  
  const [form, setForm] = useState({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const productoData = await getProductoById(id);
      setForm(productoData);
    };
    fetchProduct();
  }, [getProductoById, id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct(id, form);
    navigate('/listProduct');
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <div>
      <Button onClick={handleOpenModal}>Editar Producto</Button>

      <Modal show={showModal} onHide={handleCloseModal}>
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
                type="text"
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
              <Form.Label>Descripción</Form.Label>
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

            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary">
                Actualizar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditProduct;
