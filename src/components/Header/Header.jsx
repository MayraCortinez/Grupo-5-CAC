import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from "../../assets/3.png";
import { useAuth } from '../../hooks/useAuth';
import Sidebar from '../Sidebar/Sidebar';

const Header = () => {
  const { user, logout, userData } = useAuth();

  const handleLogout = () => {
    logout(); // Cerrar sesión utilizando el contexto de autenticación
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
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" fixed="top">
      <Container fluid className='px-5'>
        <Navbar.Brand href="/">
          <img src={logo} alt="VZU" width="80" />
        </Navbar.Brand>
        <span className='navbar-brand m-5'>
          <h3>
            Bienvenido: {userName}
          </h3>
        </span>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse className='align-items-center justify-content-end' id="navbar">
          <Nav>
            <Nav.Link href="/productList">
              Productos
            </Nav.Link>
            <Nav.Link href="#contacto" onClick={handleButtonClick}>
              Contacto
            </Nav.Link>
          </Nav>
          <span className='navbar-brand m-5'>
            {!user ? (
              <Nav.Link href="/login">
                Iniciar sesión
              </Nav.Link>
            ) : (
              <>
            <Nav.Link href="/user">
              Carrito
            </Nav.Link>
                <button className='btn btn-primary' onClick={handleLogout}>
                  Cerrar sesión
                </button>
                {userData?.admin ? <Sidebar /> : ""}
              </>
            )}
          </span>
          <span className='navbar-brand m-5'></span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

