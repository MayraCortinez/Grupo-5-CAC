import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from "../../assets/3.png";
import AuthContext from '../../context/AuthProvider';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

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

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" fixed="top">
      <Container fluid className='px-5'>
        <Navbar.Brand href="/">
          <img src={logo} alt="VZU" width="80" />
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
            <Nav.Link href="/cart">
              Carrito
            </Nav.Link>
            <Nav.Link href="#contacto" onClick={handleButtonClick}>
              Contacto
            </Nav.Link>
          </Nav>
          {user && <p>Welcome, {user.email}!</p>}
          <button onClick={handleLogout}>Logout</button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
