import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { getDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig/firebase';
import { dbCollections } from '../../firebaseConfig/collections';

const EditProduct = () => {
  const [form, setForm] = useState({
    marca: '',
    modelo: '',
    color: '',
    precio: '',
    talle: '',
    detalle: '',
    descripcion: '',
    img: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const cambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const alertaGuardado = () => {
    // Código para mostrar la alerta de guardado
  };

  const update = async (e) => {
    e.preventDefault();
    const productoRef = doc(db, dbCollections.Productos, id);
    const data = {
      marca: form.marca,
      modelo: form.modelo,
      color: form.color,
      precio: form.precio,
      talle: form.talle,
      detalle: form.detalle,
      descripcion: form.descripcion,
      img: form.img,
    };
    await updateDoc(productoRef, data);
    alertaGuardado();
    navigate('/listProduct');
  };

  useEffect(() => {
    const getProductoById = async () => {
      const productoDoc = doc(db, dbCollections.Productos, id);
      const productoSnapshot = await getDoc(productoDoc);

      if (productoSnapshot.exists()) {
        const productoData = productoSnapshot.data();
        setForm({
          marca: productoData.marca,
          modelo: productoData.modelo,
          color: productoData.color,
          precio: productoData.precio,
          talle: productoData.talle,
          detalle: productoData.detalle,
          descripcion: productoData.descripcion,
          img: productoData.img,
        });
      } else {
        console.log('El producto no existe');
      }
    };

    getProductoById();
  }, [id]);

  return (
    <div>
      <Container>
        <form onSubmit={update} className="mt-5">
          <Form.Group controlId="marca">
            <Form.Label>Marca:</Form.Label>
            <Form.Control
              type="text"
              name="marca"
              placeholder={form.marca}
              value={form.marca}
              onChange={cambio}
            />
          </Form.Group>
          <Form.Group controlId="modelo">
            <Form.Label>Modelo:</Form.Label>
            <Form.Control
              type="text"
              name="modelo"
              placeholder={form.modelo}
              value={form.modelo}
              onChange={cambio}
            />
          </Form.Group>
          <Form.Group controlId="color">
            <Form.Label>Color:</Form.Label>
            <Form.Control
              type="text"
              name="color"
              value={form.color}
              onChange={cambio}
            />
          </Form.Group>
          <Form.Group controlId="precio">
            <Form.Label>Precio:</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              value={form.precio}
              onChange={cambio}
            />
          </Form.Group>
          <Form.Group controlId="talle">
            <Form.Label>Talle:</Form.Label>
            <Form.Control
              type="number"
              name="talle"
              value={form.talle}
              onChange={cambio}
            />
          </Form.Group>
          <Form.Group controlId="detalle">
            <Form.Label>Detalle:</Form.Label>
            <Form.Control
              type="text"
              name="detalle"
              value={form.detalle}
              onChange={cambio}
            />
          </Form.Group>
          <Form.Group controlId="descripcion">
            <Form.Label>Descripción:</Form.Label>
            <Form.Control
              type="text"
              name="descripcion"
              value={form.descripcion}
              onChange={cambio}
            />
          </Form.Group>
          <Form.Group controlId="img">
            <Form.Label>Imagen:</Form.Label>
            <Form.Control
              type="file"
              name="img"
              value={form.img}
              onChange={cambio}
            />
          </Form.Group>
          <button type="submit" className="btn btn-primary mt-3">
            Actualizar
          </button>
        </form>
      </Container>
    </div>
  );
};

export default EditProduct;
