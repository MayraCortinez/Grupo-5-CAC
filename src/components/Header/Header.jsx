import React from 'react';
import logo from "../../assets/3.png"

//  Navbar, Nav y Container de React Bootstrap
import { Navbar, Nav, Container } from 'react-bootstrap';

// Uso tema oscuro (bg="dark") y el texto blanco (style={{ color: 'white' }}) para el header
const Header = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" fixed="top">
      <Container fluid className='px-5'>
        <Navbar.Brand href="/">
          <img src={ logo } alt="VZU" width="80"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse className='align-items-center justify-content-end' id="navbar">
          <Nav>
            <Nav.Link href="/productList">
              Productos
            </Nav.Link>
            <Nav.Link href="/listProduct">
              Listar Productos
            </Nav.Link>
            <Nav.Link href="/createProduct">
              Crear Producto
            </Nav.Link>
            <Nav.Link href="/carrito">
              Carrito
            </Nav.Link>
            <Nav.Link href="/contacto">
              Contacto
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;