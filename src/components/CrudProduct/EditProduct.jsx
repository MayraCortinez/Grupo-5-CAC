import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { getDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig/firebase';
import { dbCollections } from '../../firebaseConfig/collections';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { async } from '@firebase/util';
const MySwal = withReactContent(Swal);


const EditProduct = () => {

//1 declarar variables de estado 

  const [form, setForm] = useState({
    marca: '',
    modelo: '',
    color: '',
    precio: '',
    talle: '',
    detalle: '',
    descripcion: '',
    id: '',
    img: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();

  //2 Asignar valores al formulario

  const cambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value});
  };
  

  //3 Alerta de guardado
  const alertaGuardado = ()=>{
    Swal.fire({
    title: 'Producto editado con éxito',
    showClass: {
        popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
    }
    });
   }

   //4 Declarar función de editar

  const update = async (e) => {
    e.preventDefault();
    const producto = doc(db, "productos", id);
    const data = {
      marca: form.marca,
      modelo: form.modelo,
      color: form.color,
      precio: form.precio,
      talle: form.talle,
      detalle: form.detalle,
      descripcion: form.descripcion,
      id: form.id,
      img: form.img,
    };
    await updateDoc(producto, data);
    alertaGuardado();
    navigate('/listProduct');
  };

  //5 asincronismo con la base de datos

    const getProductoById = async (id) => {
      const producto = await getDoc(doc(db, dbCollections.Productos, id));

      if (producto.exists()) {
        setForm({
          marca: producto.data().marca,
          modelo: producto.data().modelo,
          color: producto.data().color,
          precio: producto.data().precio,
          talle: producto.data().talle,
          detalle: producto.data().detalle,
          descripcion: producto.data().descripcion,
          id: producto.data().id,
          img: producto.data().img,
        });
      } else {
        console.log('El producto no existe');
      }
    };

    //6 useEffect
    useEffect(() => {
        getProductoById(id)
    }, [id]);

  return (
    <div>
      <Container>
        <form onSubmit={update} className="mt-5">
                <Form.Floating className="mb-3">
                    <Form.Control
                        name='marca'
                        type="text"
                        placeholder="Marca"
                        value={form.marca}
                        onChange={cambio}
                    />
                    <label htmlFor="floatingInputCustom">Marca</label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Control
                        name='modelo'
                        type="text"
                        placeholder="Modelo"
                        value={form.modelo}
                        onChange={cambio}
                    />
                    <label htmlFor="floatingInputCustom">Modelo</label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Control
                        name='color'
                        type="text"
                        id="exampleColorInput"
                        placeholder="Color"
                        value={form.color}
                        onChange={cambio}
                    />
                    <label htmlFor="floatingInputCustom">Color</label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Control
                        name='precio'
                        type="number"
                        placeholder="Precio"
                        value={form.precio}
                        onChange={cambio}
                    />
                    <label htmlFor="floatingInputCustom">Precio</label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Control
                        name='talle'
                        type="number"
                        placeholder="Talle"
                        value={form.talle}
                        onChange={cambio}
                    />
                    <label htmlFor="floatingInputCustom">Talle</label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Control
                        name='detalle'
                        type="text"
                        placeholder="Detalle"
                        value={form.detalle}
                        onChange={cambio}
                    />
                    <label htmlFor="floatingInputCustom">Detalle</label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Control
                        name='descripcion'
                        type="text"
                        placeholder={form.descripcion}
                        value={form.descripcion}
                        onChange={cambio}
                    />
                    <label htmlFor="floatingInputCustom">Descripción</label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Control
                        name='id'
                        type="number"
                        placeholder="id"
                        value={form.id}
                        onChange={cambio}
                    />
                    <label htmlFor="floatingInputCustom">Id</label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Control
                        name='img'
                        type="file"
                        placeholder="Imágen"
                        value={form.img}
                        onChange={cambio}
                    />
                    <label htmlFor="floatingInputCustom">Imágen</label>
                </Form.Floating>
          <button type="submit" className="btn btn-primary mt-3">
            Actualizar
          </button>
        </form>
      </Container>
    </div>
  );
};

export default EditProduct;
