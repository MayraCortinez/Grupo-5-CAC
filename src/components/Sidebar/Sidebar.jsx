import React, { useState } from 'react';
import { Container, Button, Nav } from 'react-bootstrap';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleToggleSidebar = () => {
    setShowSidebar((prevState) => !prevState);
  };

  return (
    <Container className='pl-1' >
    <div className="sidebar">
      <Button onClick={handleToggleSidebar}>
        {showSidebar ? 'Cerrar' : 'Mostrar configuración'}
      </Button>
      {showSidebar && (
        <Container
          style={{
            width: '200px',
            overflowX: 'hidden',
            transition: 'width 0.3s ease-in-out',
          }}
        >
          <Nav.Link href="/admin">Listar Productos</Nav.Link>
          <Nav.Link href="/admin/createProduct">Crear Producto</Nav.Link>
        </Container>
      )}
    </div>
    </Container>
  );
};

export default Sidebar;
