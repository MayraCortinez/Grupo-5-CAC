import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { getDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig/firebase';
import { dbCollections } from '../../firebaseConfig/collections';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

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
    MySwal.fire({
      title: 'Producto editado con éxito',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    });
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
  

  const getProductoById = async (id) => {
    const productoRef = doc(db, dbCollections.Productos, id);
    console.log(productoRef)
    const productoSnap = await getDoc(productoRef);
    if (productoSnap.exists()) {
      setForm(productoSnap.data());
    } else {
      console.log('No existe el producto');
    }
  };

  useEffect(() => {
    getProductoById(id);
  }, [id]);

  return (
    <div>
      <Container>
        <form onSubmit={update} className="mt-5">
          <Form.Group className="mb-3">
            <Form.Label>Marca</Form.Label>
            <Form.Control
              name="marca"
              type="text"
              placeholder="Marca"
              value={form.marca}
              onChange={cambio}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Modelo</Form.Label>
            <Form.Control
              name="modelo"
              type="text"
              placeholder="Modelo"
              value={form.modelo}
              onChange={cambio}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Color</Form.Label>
            <Form.Control
              name="color"
              type="text"
              placeholder="Color"
              value={form.color}
              onChange={cambio}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              name="precio"
              type="number"
              placeholder="Precio"
              value={form.precio}
              onChange={cambio}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Talle</Form.Label>
            <Form.Control
              name="talle"
              type="number"
              placeholder="Talle"
              value={form.talle}
              onChange={cambio}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Detalle</Form.Label>
            <Form.Control
              name="detalle"
              type="text"
              placeholder="Detalle"
              value={form.detalle}
              onChange={cambio}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              name="descripcion"
              type="text"
              placeholder="Descripción"
              value={form.descripcion}
              onChange={cambio}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              name="img"
              type="file"
              placeholder="Imagen"
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
