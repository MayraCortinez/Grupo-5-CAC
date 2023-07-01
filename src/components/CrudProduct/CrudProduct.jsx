import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig/firebase';


const ProductCrud = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState('');
  const [editProduct, setEditProduct] = useState(null);

  // Obtener lista de productos
  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await collection('products').get();
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(data);
    };

    fetchProducts();
  }, []);

  // Crear producto
  const handleCreate = async () => {
    if (newProduct.trim() === '') return;

    try {
      const docRef = await db.collection('products').add({ name: newProduct });
      setProducts(prevProducts => [...prevProducts, { id: docRef.id, name: newProduct }]);
      setNewProduct('');
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };

  // Actualizar producto
  const handleUpdate = async (id, newName) => {
    try {
      await db.collection('products').doc(id).update({ name: newName });
      setProducts(prevProducts =>
        prevProducts.map(product => (product.id === id ? { ...product, name: newName } : product))
      );
      setEditProduct(null);
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  // Eliminar producto
  const handleDelete = async (id) => {
    try {
      await db.collection('products').doc(id).delete();
      setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {editProduct === product.id ? (
              <input
                type="text"
                value={product.name}
                onChange={(e) => setEditProduct(e.target.value)}
                onBlur={() => handleUpdate(product.id, editProduct)}
              />
            ) : (
              <>
                <span>{product.name}</span>
                <button onClick={() => setEditProduct(product.id)}>Editar</button>
                <button onClick={() => handleDelete(product.id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Nuevo producto"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
        />
        <button onClick={handleCreate}>Crear</button>
      </div>
    </div>
  );
};

export default ProductCrud;