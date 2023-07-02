import React from 'react';

//  Container, Row, Col de React Bootstrap
import { Container, Row, Col } from 'react-bootstrap';

//Importa iconos
import { BsInstagram } from "react-icons/bs";
import { AiOutlineFacebook } from "react-icons/ai"; 
import { FiTwitter } from "react-icons/fi";

// Uso tema oscuro (bg="dark") y el texto blanco text white
const Footer = () => {
  return (
    <Container className='bg-dark'>
      <Row className='pt-3'>
        <Col md={4} className='text-white '>
          <h4 className='mb-1'>Enlaces</h4>
          <ul className="list-unstyled">
            <li className='mt-2'>
              <a href="/" className='text-white' style={{ textDecoration: "none" }}>Inicio</a>
            </li>
            <li className='mt-2'>
              <a href="/productList" className='text-white' style={{ textDecoration: "none", }}>Productos</a>
            </li>
            <li className='mt-2'>
              <a href="/contacto" className='text-white' style={{ textDecoration: "none" }}>Contacto</a>
            </li>
          </ul>
        </Col>
        <Col md={4} className='text-light'>
          <div>
            <h4 className=''>Redes Sociales</h4>
            <ul className="list-unstyled d-flex">
              <li>
                <a className='text-light h4' href="https://facebook.com"><AiOutlineFacebook /></a>
              </li>
              <li className='px-2'>
                <a className='text-light h4' href="https://twitter.com"><FiTwitter /></a>
              </li>
              <li>
                <a className='text-light h4' href="https://instagram.com"><BsInstagram /></a>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={4} className='text-light '>
          <div>
            <h4>Contacto</h4>
            <p>Dirección: Calle 133 N 832, La Plata</p>
            <p>Teléfono: 123-456-7890</p>
            <p>Email: info@vzu.com.ar</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;