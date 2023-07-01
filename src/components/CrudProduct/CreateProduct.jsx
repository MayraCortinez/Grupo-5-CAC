import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig/firebase';
import { async } from '@firebase/util';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const CreateProduct = () => {

    1// Declarar variables de estado / Hooks

    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [color, setColor] = useState("");
    const [precio, setPrecio] = useState();
    const [talle, setTalle] = useState();
    const [detalle, setDetalle] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [img, setImg] = useState("");

    const navigate = useNavigate();

    2// Referenciar a la base de datos

    const productosCollection = collection(db, "productos");

    3// Crear alerta

    const alertCreate = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'El producto ha sido creado con éxito!',
            showConfirmButton: false,
            timer: 1500
        })
    }

    4// Asincronismo para subir el dato a la base

    const newProduct = async (e) => {
        e.preventDefault();

        await addDoc(productosCollection, {
            Marca: marca,
            Modelo: modelo,
            Color: color,
            Precio: precio,
            Talle: talle,
            Detalle: detalle,
            Descripcion: descripcion,
            Img: img
        })
        alertCreate();
        navigate('/ListProduct');
    }

    return (
        <div>
      <form onSubmit={newProduct} className='mt-5 '>
            <Form.Floating className="mb-3">
                <Form.Control
                    id="floatingInputCustom"
                    type="text"
                    placeholder="Marca"
                    value={marca}
                    onChange={(e)=>setMarca(e.target.value)}
                />
                <label htmlFor="floatingInputCustom">Marca</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
                <Form.Control
                    id="floatingInputCustom"
                    type="text"
                    placeholder="Modelo"
                    value={modelo}
                    onChange={(e)=>setModelo(e.target.value)}
                />
                <label htmlFor="floatingInputCustom">Modelo</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
                <Form.Control
                    id="floatingInputCustom"
                    type="text"
                    placeholder="Color"
                    value={color}
                    onChange={(e)=>setColor(e.target.value)}
                />
                <label htmlFor="floatingInputCustom">Color</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
                <Form.Control
                    id="floatingInputCustom"
                    type="text"
                    placeholder="Modelo"
                    value={modelo}
                    onChange={(e)=>setModelo(e.target.value)}
                />
                <label htmlFor="floatingInputCustom">Modelo</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
                <Form.Control
                    id="floatingInputCustom"
                    type="price"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e)=>setPrecio(e.target.value)}
                />
                <label htmlFor="floatingInputCustom">Precio</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
                <Form.Control
                    id="floatingInputCustom"
                    type="number"
                    placeholder="Talle"
                    value={talle}
                    onChange={(e)=>setTalle(e.target.value)}
                />
                <label htmlFor="floatingInputCustom">Talle</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
                <Form.Control
                    id="floatingInputCustom"
                    type="text"
                    placeholder="Detalle"
                    value={detalle}
                    onChange={(e)=>setDetalle(e.target.value)}
                />
                <label htmlFor="floatingInputCustom">Detalle</label>
            </Form.Floating>
            <Form.Floating >
                <Form.Control
                    id="floatingInputCustom"
                    type="text"
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e)=>setDescripcion(e.target.value)}
                />
                <label htmlFor="floatingInputCustom">Descripción</label>
            </Form.Floating>
            <button type="submit" className='btn btn-submit btn-lg mt-3'>Agregar</button>
            </form>
        </div>
    )

}

export default CreateProduct;