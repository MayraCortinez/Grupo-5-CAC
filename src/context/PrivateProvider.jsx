import React, { createContext, useState } from 'react';
import { useAuth } from './AuthProvider';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';

export const PrivateContext = createContext();

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



  //Guardo collección de productos en variable
  const productosCollection = collection(db, 'productos');

  //Función para obtener productos de la base de datos
  const getProductos = async () => {
    const data = await getDocs(productosCollection);
    setProductos(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  //Función para eliminar producto 
  const deleteProducto = async (id) => {
    const productoDoc = doc(db, 'productos', id);
    await deleteDoc(productoDoc);
    getProductos();
  };

  //Alerta confirmación borrado
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

  useEffect(() => {
    getProductos();
  }, []);

  //Función para crear producto
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

      // Restablecer los campos del formulario después de agregar el producto
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

      // Mostrar una alerta de éxito
      const alertCreate = () => {
        MySwal.fire({
          position: 'center',
          icon: 'success',
          title: 'El producto ha sido creado con éxito!',
          showConfirmButton: false,
          timer: 1500,
        });
      };

      // ?????!!! Opción en alert para seguir creando o ir a la página de lista de productos después de agregar el producto
      //navigate('/listProduct');
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };

  //Función para guardar imágen / Vista previa / obtener URL
  const fileHandler = (e) => {
    const archivo = e.target.files[0];
    setImg(archivo);
    setPreviewImg(URL.createObjectURL(archivo));
  };

  return (
    <PrivateContext.Provider
      value={{        //información que quedará disponible para todos los componentes hijos
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
      }}
    >
      {children}
    </PrivateContext.Provider>
  );
};
