import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import { collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { db } from '../../firebaseConfig/firebase';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const firebaseConfig = {

    apiKey: "AIzaSyBgM8ar0yvsbeH-dz026jMMmB_0aL9i05M",
    authDomain: "reactjsgrupo5-43e69.firebaseapp.com",
    projectId: "reactjsgrupo5-43e69",
    storageBucket: "reactjsgrupo5-43e69.appspot.com",
    messagingSenderId: "522676320609",
    appId: "1:522676320609:web:a56e180815cb51b6362d20",
    measurementId: "G-M9MVDDL4BS"

};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const CreateProduct = () => {
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [color, setColor] = useState('');
    const [precio, setPrecio] = useState('');
    const [talle, setTalle] = useState('');
    const [detalle, setDetalle] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [img, setImg] = useState(null);
    const [previewImg, setPreviewImg] = useState(null);

    const navigate = useNavigate();

    const productosCollection = collection(db, 'productos');

    const alertCreate = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'El producto ha sido creado con éxito!',
            showConfirmButton: false,
            timer: 1500,
        });
    };

    const newProduct = async (e) => {
        e.preventDefault();

        let urlImDesc = '';
        if (img) {
            const archivo = img;

            const refArchivo = ref(storage, `img/${archivo.name}`);
            await uploadBytes(refArchivo, archivo);
            urlImDesc = await getDownloadURL(refArchivo);
        }

        await addDoc(productosCollection, {
            marca: marca,
            modelo: modelo,
            color: color,
            precio: precio,
            talle: talle,
            detalle: detalle,
            descripcion: descripcion,
            img: urlImDesc,
        });

        alertCreate();
        navigate('/listProduct');
    };

    const fileHandler = (e) => {
        const archivo = e.target.files[0];
        setImg(archivo);
        setPreviewImg(URL.createObjectURL(archivo));
    };

    return (
        <div>
            <form onSubmit={newProduct} className="mt-5">
                <Form.Floating className="mb-3">
                    <Form.Control
                        id="floatingInputCustom"
                        type="text"
                        placeholder="Marca"
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                    />
                    <label htmlFor="floatingInputCustom">Marca</label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Control
                        id="floatingInputCustom"
                        type="text"
                        placeholder="Modelo"
                        value={modelo}
                        onChange={(e) => setModelo(e.target.value)}
                    />
                    <label htmlFor="floatingInputCustom">Modelo</label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Control
                        type="text"
                        id="exampleColorInput"
                        placeholder="Color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                    <label htmlFor="floatingInputCustom">Color</label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Control
                        id="floatingInputCustom"
                        type="number"
                        placeholder="Precio"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    />
                    <label htmlFor="floatingInputCustom">Precio</label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Control
                        id="floatingInputCustom"
                        type="number"
                        placeholder="Talle"
                        value={talle}
                        onChange={(e) => setTalle(e.target.value)}
                    />
                    <label htmlFor="floatingInputCustom">Talle</label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Control
                        id="floatingInputCustom"
                        type="text"
                        placeholder="Detalle"
                        value={detalle}
                        onChange={(e) => setDetalle(e.target.value)}
                    />
                    <label htmlFor="floatingInputCustom">Detalle</label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Control
                        id="floatingInputCustom"
                        type="text"
                        placeholder="Descripción"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                    <label htmlFor="floatingInputCustom">Descripción</label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Control
                        id="floatingInputCustom"
                        type="file"
                        placeholder="Imágen"
                        onChange={fileHandler}
                    />
                    <label htmlFor="floatingInputCustom">Imágen</label>
                </Form.Floating>
                {/* Vista previa de la imagen */}
                {previewImg && (
                    <div className="mb-3 ">
                        <img className="rounded rounded-lg" src={previewImg} alt="Vista previa" style={{ maxWidth: '200px' }} />
                    </div>
                )}
                <button type="submit" className="btn btn-primary mt-3">
                    Agregar
                </button>
            </form>
        </div>
    );
};

export default CreateProduct;
