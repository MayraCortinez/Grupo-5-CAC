import React from 'react';

//  Container, Row, Col de React Bootstrap
import { Container, Row, Col } from 'react-bootstrap';

// Uso tema oscuro (bg="dark") y el texto blanco text white
const Footer = () => {
  return (
      <Container>
        <Row>
          <Col md={4}>
            <h4>Enlaces</h4>
            <ul className="list-unstyled">
              <li>
                <a href="/">Inicio</a>
              </li>
              <li>
                <a href="/productList">Productos</a>
              </li>
              <li>
                <a href="/contacto">Contacto</a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h4>Redes Sociales</h4>
            <ul className="list-unstyled">
              <li>
                <a href="https://facebook.com">Facebook</a>
              </li>
              <li>
                <a href="https://twitter.com">Twitter</a>
              </li>
              <li>
                <a href="https://instagram.com">Instagram</a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h4>Contacto</h4>
            <p>Dirección: Calle 133 N 832, La Plata</p>
            <p>Teléfono: 123-456-7890</p>
            <p>Email: info@vzu.com.ar</p>
          </Col>
        </Row>
      </Container>
  );
};

export default Footer;