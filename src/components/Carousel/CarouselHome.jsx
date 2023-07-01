import Carousel from 'react-bootstrap/Carousel';
import img1 from './fondo.png';
import img2 from './fondo2.jpg';
import img3 from './fondo3.jpg';
import classes from "./carousel.module.css";

function CarouselHome() {
  return (
<Carousel indicators={false} controls={false} className={classes.carousel}>
      <Carousel.Item className={classes.carouselItem}>
        <img
          className="d-block w-100"
          src={img1}
          alt="First slide"
        />
        <Carousel.Caption>
          <p>Lleva la moda sostenible a otro nivel con nuestras zapatillas. Únete al movimiento y marca la diferencia.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className={classes.carouselItem}>
        <img
          className="d-block w-100"
          src={img2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <p>La esencia del pasado se une con la frescura del presente. ¿Estás listo para hacer historia con cada paso?</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className={classes.carouselItem}>
        <img
          className="d-block w-100" 
          src={img3}
          alt="Third slide"
        />
        <Carousel.Caption>
          <p>
          La esencia del pasado se une con la frescura del presente. ¿Estás listo para hacer historia con cada paso?
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselHome;
