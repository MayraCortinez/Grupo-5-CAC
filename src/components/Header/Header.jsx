import React from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import logo from "../../assets/3.png";
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { user, logout, userData } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    target.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const userName = userData?.nombre || user?.email || '';

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container fluid className='px-5'>
      <Navbar.Brand href="/" className="d-flex align-items-center justify-content-center custum-navbar-brand">
          <img src={logo} alt="VZU" width="80" />
          <span className="fs-2 px-2">Venta de Zapatillas</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse className='align-items-center justify-content-end text-end' id="navbar">
          <Nav>
            <Nav.Link href="/productList">Productos</Nav.Link>
            <Nav.Link href="#contacto" onClick={handleButtonClick}>Contacto</Nav.Link>
            {!user ? (
              <Nav.Link href="/login">Iniciar sesión</Nav.Link>
            ) : (
              <>
                <Nav.Link href="/user">Carrito</Nav.Link>
                {userData?.admin ? (
                  <NavDropdown title="Configuración" className='d-flex-column justify-content-flex-end' menuVariant="dark">
                    <NavDropdown.Item className='text-end'  href="/admin">Listar productos</NavDropdown.Item>
                    <NavDropdown.Item className='text-end' href="/admin/createProduct">Crear producto</NavDropdown.Item>
                  </NavDropdown>
                ) : null}
                <Nav.Item >
                <Button variant="outline-danger" className='ml-auto' onClick={handleLogout}>
                  Cerrar sesión
                </Button>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

