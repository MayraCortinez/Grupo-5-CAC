import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig/firebase';
import { dbCollections } from '../../firebaseConfig/collections';
import { async } from '@firebase/util';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);


const EditProduct = () => {

        //1 configurar hooks para poder manipular la información

        const [form, setForm] = useState({
            marca: "",
            modelo: "",
            color: "",
            precio: "",
            talle: "",
            detalle: "",
            descripcion: "",
            img: "",
        });

        const navigate = useNavigate();

        const {id} = useParams();

        //2 asignar valores al formulario

        const cambio = (e) => {
            setForm({...form, [e.target.name]: e.target.value})
        }


       //3alerta de guardado

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

    //4 declaramos función update

    const update = async (e)=>{
        e.preventDefault();
        const producto = doc(db, dbCollections.Productos, id);
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
        await updateDoc(producto.data);
        alertaGuardado();
        navigate("/listProduct");
    }

    //5 asincronismo de existencia con la bd

    const getProductoById = async (id) =>{
        const producto = await getDoc(doc(db, dbCollections.Productos, id));
        console.log(producto.data());

        if (producto.exists()){
            setForm({
                marca: producto.data().nombre,
                modelo: producto.data().modelo,
                color: producto.data().color,
                precio: producto.data().precio,
                talle: producto.data().talle,
                detalle: producto.data().detalle,
                descripcion: producto.data().descripcion,
                img: producto.data().img,
            });
        }
        else{
            console.log("no existe");
        }
    };

    //6 useEffect
    
    useEffect(()=>{
        getProductoById(id);
    }, [id])

    //7 estructura para mostrar
    return (
        <div>
        <form onSubmit={update} className="mt-5">
            <Form.Floating className="mb-3">
                <Form.Control
                    name='marca'
                    id="floatingInputCustom"
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
                    id="floatingInputCustom"
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
                    id="floatingInputCustom"
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
                    id="floatingInputCustom"
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
                    id="floatingInputCustom"
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
                    id="floatingInputCustom"
                    type="text"
                    placeholder="Descripción"
                    value={form.descripcion}
                    onChange={cambio}
                />
                <label htmlFor="floatingInputCustom">Descripción</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
                <Form.Control
                    name='img'
                    id="floatingInputCustom"
                    type="file"
                    placeholder="Imágen"
                    value={form.img}
                    onChange={cambio}
                />
                <label htmlFor="floatingInputCustom">Imágen</label>
            </Form.Floating>
            {/* Vista previa de la imagen */}
{/*             {previewImg && (
                <div className="mb-3 ">
                    <img className="rounded rounded-lg" src={previewImg} alt="Vista previa" style={{ maxWidth: '200px' }} />
                </div>
            )} */}
            <button type="submit" className="btn btn-primary mt-3">
                Agregar
            </button>
        </form>
    </div>
    )
}

export default  EditProduct;