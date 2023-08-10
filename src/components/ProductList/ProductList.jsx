import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductCard from "../ProductCard/ProductCard";
import { useAuth } from '../../hooks/useAuth';

function ProductList() {
  const { productos, getProductos } = useAuth();
  const [imageUrls, setImageUrls] = useState([]); // Estado para almacenar las URL de las imágenes

  useEffect(() => {
    getProductos();
  }, []);

  const storage = getStorage();
  
  productos.map(async prod =>{
    const storageRef = ref(storage, `${prod.img}`);
    const urlImg = await getDownloadURL(storageRef);
    console.log(urlImg);
  })

  return (
    <Container fluid className="mt-5 pt-2 pb-2 mb-5">
      <Row className="pt-5">
        {productos?.map((producto) => (
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
      </Row>
    </Container>
  );
}

export default ProductList;
