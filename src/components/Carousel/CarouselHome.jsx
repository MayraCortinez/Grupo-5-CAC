import Carousel from 'react-bootstrap/Carousel';
import img1 from './fondo4.png';
import img2 from './fondo2.jpg';
import img3 from './fondo3.jpg';
import "./carousel.module.css";

function CarouselHome() {
  return (
<Carousel indicators={false} controls={false} className="">
      <Carousel.Item className="" style={{ maxHeight: '650px' }} >
        <img
          className="d-block w-100 img-fluid"  
          src={img1}
          alt="First slide"
          style={{ objectPosition: 'center bottom' }}
        />
        <Carousel.Caption>
          <p className='rounded p-2'>
            Lleva la moda sostenible a otro nivel con nuestras zapatillas. Únete al movimiento y marca la diferencia.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="" style={{ maxHeight: '650px' }}>
        <img
          className="d-block w-100 img-fluid"
          src={img2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <p className='rounded p-2'>
            La esencia del pasado se une con la frescura del presente. ¿Estás listo para hacer historia con cada paso?
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="" style={{ maxHeight: '650px' }}>
        <img
          className="d-block w-100 img-fluid" 
          src={img3}
          alt="Third slide"
        />
        <Carousel.Caption>
          <p className='rounded p-2'>
          Más que sólo calzado. Es un estilo de vida que valora el pasado y abraza el futuro.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselHome;
