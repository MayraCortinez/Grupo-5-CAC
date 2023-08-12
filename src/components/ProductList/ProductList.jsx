import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductCard from "../ProductCard/ProductCard";
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../LoadingSpinner'

function ProductList() {
  const { productos, getProductos } = useAuth();
  let [loading, setLoading] = useState(true);


  useEffect(() => {
    getProductos();
    setTimeout(()=> {
      setLoading(false);
    }, 4000);
  }, []);

  const storage = getStorage();

  productos.map(async prod => {
    const storageRef = ref(storage, `${prod.img}`);
    const urlImg = await getDownloadURL(storageRef);
    console.log(urlImg);
  })

  return (
    <Container fluid className="mt-5 pt-2 pb-2 mb-5">
      <Row className="pt-5">
        {loading ?
          (<LoadingSpinner style={{ height: "550px" }} className='text-primary d-flex align-items-center justify-content-center'/>)
          :
          (productos?.map((producto) => (
            <Col key={producto.id} className="pt-5 px-3">
              <ProductCard
                id={producto.id}
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
          )))
        }
      </Row>
    </Container>
  );
}

export default ProductList;
