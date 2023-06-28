import { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig/firebase';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ProductList() {

  const [productos, setProductos] = useState([]);

  const productosCollection = collection(db, "productos");

  const getProductos = async () => {
    const data = await getDocs(productosCollection);
    setProductos(
      data.docs.map( doc => ({...doc.data(), id: doc.id}))
    )
  }

  useEffect( () => {
    getProductos();
  }, []);

  return (
    <Container>
      <Row className="py-5">
      {productos?.map((producto ) => (
        <Col key={producto.id} className="py-1" md="6" lg="4" xxl="3">
        <ProductCard 
        modelo={producto.modelo}
        talle={producto.talle}
        color={producto.color}
        precio={producto.precio}
        />
        </Col>
      ))}
      </ Row>
    </ Container>
  );
}

export default ProductList;