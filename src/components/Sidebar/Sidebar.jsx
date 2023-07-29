import React from 'react';
import { useState } from "react";
import { Container, Button, Nav } from "react-bootstrap";

const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    const handleHover = (isHovering) => {
        setShowSidebar(isHovering);
    };

    return (
        <div
            className="sidebar"
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
        >
            <Container
                style={{
                    width: showSidebar ? "200px" : "0",
                    overflowX: "hidden",
                    transition: "width 0.3s ease-in-out",
                }}
            >
                <Nav.Link href="/listProduct">
                    Listar Productos
                </Nav.Link>
                <Nav.Link href="/createProduct">
                    Crear Producto
                </Nav.Link>
            </Container>
            <Button
                onMouseEnter={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
            >
                {showSidebar ? "Hide Sidebar" : "Show Sidebar"}
            </Button>
        </div>
    );
};

export default Sidebar;