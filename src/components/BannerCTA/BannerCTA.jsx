import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import fondoBanner from '../../assets/fondoBanner.jpg';
import './BannerCTA.css';

const BannerCTA = () => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div className="hero-section">
      <div
        className={`image-container ${hovered ? 'hovered' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img src={fondoBanner} alt="Fondo Banner" className={hovered ? 'zoomed' : ''} />
        <div className="overlay">
          <Container className="cta-container">
            <div className="cta-content">
              <h2 className="text-white">¡Descubre nuestra increíble colección de productos!</h2>
              <Button variant="primary" href="/productList">
                Compra ya
              </Button>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default BannerCTA;


