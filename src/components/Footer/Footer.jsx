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
    <Container className='bg-dark mt-5' style={{ paddingBottom: '20px' }}>
      <Row className='pt-3 d-flex'>
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
          <div style={ {marginBottom: '30px' }}>
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

          <div>
            <h4>Contacto</h4>
            <p>Dirección: Calle 133 N 832, La Plata</p>
            <p>Teléfono: 123-456-7890</p>
            <p>Email: info@vzu.com.ar</p>
          </div>
        </Col>
        <Col md={4} className='text-light '>
          <h4 className='mb-1'>Ubicación</h4>
          <div style={{ height: '300px', width: '100%', marginTop: '20px' }}>
              <iframe
                title="Mapa"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3270.730127412192!2d-57.98083752343061!3d-34.93830467524688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e87674a2dc3b%3A0x49279b779080987!2sC.%20133%20832%2C%20San%20Carlos%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1688421293293!5m2!1ses!2sar"
                style={{ border: '0', width: '100%', height: '100%' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;