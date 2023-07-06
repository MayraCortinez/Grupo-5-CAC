// ModalEdit.jsx
import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import EditProduct from './EditProduct';

const ModalEdit = ({ producto }) => {
  const [show, setShow] = useState(false);
  const [editedProducto, setEditedProducto] = useState(null);

  useEffect(() => {
    setEditedProducto(producto);
  }, [producto]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Editar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editedProducto && <EditProduct producto={editedProducto} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEdit;
