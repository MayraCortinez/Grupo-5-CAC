import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db, gsReference } from "../../firebaseConfig/firebase";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductCard from "../ProductCard/ProductCard";

function ProductList() {
  const [productos, setProductos] = useState([]);

  const getProductos = async () => {
    const querySnapshot = await getDocs(collection(db, "productos"));
    const productosData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProductos(productosData);
  };

  useEffect(() => {
    getProductos();
  }, []);

  const storage = getStorage();

  const fetchImageUrls = async () => {
    const updatedProductos = await Promise.all(
      productos.map(async (producto) => {
        const imageUrl = await getDownloadURL(
          ref(storage, `${gsReference}/${producto.img}`)
        );
        return {
          ...producto,
          img: imageUrl,
        };
      })
    );
    setProductos(updatedProductos);
  };

  useEffect(() => {
    fetchImageUrls();
  }, [productos]);

  return (
    <Container fluid className="mt-3">
      <Row className="pt-5">
        {productos.map((producto) => (
          <Col key={producto.id} className="pt-5 px-3">
            <ProductCard
              modelo={producto.modelo}
              talle={producto.talle}
              color={producto.color}
              precio={producto.precio}
              img={producto.img}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;
