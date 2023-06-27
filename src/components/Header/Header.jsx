import React from 'react';

//  Navbar, Nav y Container de React Bootstrap
import { Navbar, Nav, Container } from 'react-bootstrap';

// Uso tema oscuro (bg="dark") y el texto blanco (style={{ color: 'white' }}) para el header
const Header = () => {
  return (
    <Navbar bg="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/" style={{ color: 'white' }}>
          Venta de Zapatillas
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav className="ml-auto">
            <Nav.Link href="/productos" style={{ color: 'white' }}>
              Productos
            </Nav.Link>
            <Nav.Link href="/carrito" style={{ color: 'white' }}>
              Carrito
            </Nav.Link>
            <Nav.Link href="/contacto" style={{ color: 'white' }}>
              Contacto
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;