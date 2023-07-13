import React, { createContext, useState, useEffect } from 'react';
import  useAuth  from '../context/AuthProvider';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { storage } from '../firebaseConfig/firebase'

export const PrivateContext = createContext();

const MySwal = withReactContent(Swal);

export const PrivateProvider = ({ children }) => {
  const { isAdmin } = useAuth();

  const [productos, setProductos] = useState([]);

  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [color, setColor] = useState('');
  const [precio, setPrecio] = useState('');
  const [talle, setTalle] = useState('');
  const [detalle, setDetalle] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [id, setId] = useState('');
  const [img, setImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  //Hago el llamado a la colección productos y lo guardo en una variable
  const productosCollection = collection(db, 'productos');

  //Traigo todos los productos guardados en la variable
  const getProductos = async () => {
    try {
      const data = await getDocs(productosCollection);
      setProductos(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  //Función para eliminar producto
  const deleteProducto = async (id) => {
    try {
      const productoDoc = doc(db, 'productos', id);
      await deleteDoc(productoDoc);
      getProductos();
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  //Alerta confirmación de borrado
    const confirmDelete = (id) => {
    Swal.fire({
      title: `Eliminarás el producto id: ${id}`,
      text: 'No podrás revertir tu decisión!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar producto',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProducto(id);
        Swal.fire('El producto ha sido eliminado con éxito');
      }
    });
  };

  const newProduct = async (e) => {
    e.preventDefault();

    let urlImDesc = '';
    if (img) {
      const archivo = img;

      const refArchivo = ref(storage, `img/${archivo.name}`);
      try {
        await uploadBytes(refArchivo, archivo);
        urlImDesc = await getDownloadURL(refArchivo);
      } catch (error) {
        console.error('Error al subir la imagen:', error);
      }
    }

    try {
      await addDoc(productosCollection, {
        marca: marca,
        modelo: modelo,
        color: color,
        precio: precio,
        talle: talle,
        detalle: detalle,
        descripcion: descripcion,
        id: id,
        img: urlImDesc,
      });

      setMarca('');
      setModelo('');
      setColor('');
      setPrecio('');
      setTalle('');
      setDetalle('');
      setDescripcion('');
      setId('');
      setImg(null);
      setPreviewImg(null);

      MySwal.fire({
        position: 'center',
        icon: 'success',
        title: 'El producto ha sido creado con éxito!',
        showConfirmButton: false,
        timer: 1500,
      });

      // Opción en alert para seguir creando o ir a la página de lista de productos después de agregar el producto
      // navigate('/listProduct');
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };

  //Función para obtener URL de imagen
  const fileHandler = (e) => {
    const archivo = e.target.files[0];
    setImg(archivo);
    setPreviewImg(URL.createObjectURL(archivo));
  };

  //Función para editar producto
  const updateProduct = async (id, producto) => {
    try {
      const productoDoc = doc(db, 'productos', id);
      await updateDoc(productoDoc, producto);
      // Otras operaciones necesarias después de actualizar el producto
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  //Función para obtener producto por Id
  const getProductoById = async (id) => {
    try {
      const productoDoc = doc(db, 'productos', id);
      const productoSnap = await getDoc(productoDoc);
      if (productoSnap.exists()) {
        const productoData = productoSnap.data();
        return productoData;
      } else {
        console.log('El producto no existe');
        return null;
      }
    } catch (error) {
      console.log('Error al obtener el producto:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getDocs(productosCollection);
        setProductos(
          data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProductos();
  }, [productosCollection]);

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <PrivateContext.Provider
      value={{
        productos,
        getProductos,
        deleteProducto,
        confirmDelete,
        marca,
        setMarca,
        modelo,
        setModelo,
        color,
        setColor,
        precio,
        setPrecio,
        talle,
        setTalle,
        detalle,
        setDetalle,
        descripcion,
        setDescripcion,
        id,
        setId,
        img,
        setImg,
        previewImg,
        setPreviewImg,
        newProduct,
        fileHandler,
        updateProduct,
        getProductoById,
      }}
    >
      {children}
    </PrivateContext.Provider>
  );
};
