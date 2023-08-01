import logo from "../../assets/3.png"
import "./Header.css"
//  Navbar, Nav y Container de React Bootstrap
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';

// Uso tema oscuro (bg="dark") y el texto blanco (style={{ color: 'white' }}) para el header
const Header = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" fixed="top">
      <Container fluid className='px-5'>
        <Row>
          <Navbar.Brand href="/" className="d-flex align-items-center justify-content-center custum-navbar-brand">
            <Col>
              <img src={ logo } alt="VZU" width="80"/>
            </Col>
            <Col>
              <span className="fs-2">Venta de Zapatillas</span>
            </Col>
          </Navbar.Brand>
        </Row>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse className='align-items-center justify-content-end text-end' id="navbar">
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const handleButtonClick = (e) => {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute('href'));
  target.scrollIntoView({
    behavior: 'smooth',
  });
};



export default Header;