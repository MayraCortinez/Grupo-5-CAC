import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db, gsReference } from "../../firebaseConfig/firebase";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductCard from "../ProductCard/ProductCard";
import {useProtected} from '../../hooks/useProtected';

function ProductList() {
  const { productos, getProductos } = useProtected();

  useEffect(() => {
    getProductos();
  }, []);

  console.log(productos)

   const storage = getStorage();
  
  productos.map(async prod =>{
    const storageRef = ref(storage, `${prod.img}`);
    const urlImg = await getDownloadURL(storageRef);
    console.log(urlImg);
  }) 
  


  return (
    <Container fluid className="mt-3">
      <Row className="pt-5">
      {productos?.map((producto ) => (
        <Col key={producto.id} className="pt-5 px-3">
        <ProductCard 
          color={producto.color}
          descripcion={producto.descripcion}
          detalle={producto.detalle}
          img={producto.img}
          marca={producto.marca}
          modelo={producto.modelo}
          precio={producto.precio}
          talle={producto.talle}
        />
        </Col>
      ))}
      </ Row>
    </ Container>
  );
}

export default ProductList;
