import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import './ModalDetails.css'
import Swal from 'sweetalert2';
import { useProtected } from "../../../hooks/useProtected";
import { useNavigate } from "react-router-dom";
import useAuth from '../../../hooks/useAuth';

const ModalDetails = ({ show, onHide, id, marca, modelo, descripcion, detalle, talle, precio, img }) => {

  const { createPedido } = useProtected();
  const { user, formatPriceWithCommas } = useAuth();
  let navigate = useNavigate();
  console.log(user);

  const handleCreatePedido = () => {
    if (user) {
      const productoId = id
      const userId = user.uid
      // Crear el pedido en la base de datos con la información del usuario y el producto
      createPedido(productoId, userId);
      Swal.fire({
        title: "Producto agregado con éxito",
        icon: "success",
        confirmButtonText: "Ver carrito",
        showCancelButton: true,
        cancelButtonText: "Seguir comprando",
      }).then( (result) => {
        if (result.isConfirmed) {
          navigate('/user');
        } else if (result.isDenied) {
          onHide(false);
        }
      });
    } else {
      Swal.fire({
        title: "Usuario no autenticado",
        text: "Debes iniciar sesión, para agregar productos al carrito.",
        icon: "error",
        //Arregla el acento May jeje Soy Raul
        confirmButtonText: "Iniciar sesión",
        showDenyButton: true,
        denyButtonText: "Cancelar"
      }).then( (result) => {
        if(result.isConfirmed){
          navigate('/login');
        } else if(result.isDenied){
          onHide(false);
        }
      });
    }
  };

  return (
    <Modal size="lg" show={show} onHide={onHide} centered className="customize-modal-details">
      <Modal.Header closeButton closeVariant="white"></Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col md={6} className="d-flex align-items-center justify-content-start flex-column gap-5">
              <h2 className="fs-1">{marca}</h2>
              <div className="product-image-container">
                <img src={img} alt={modelo} className="product-image w-100" />
              </div>
            </Col>
            <Col md={6} className="d-flex align-items-center justify-content-start flex-column gap-3">
              <h2 className="fs-1">{modelo}</h2>
              <Container>
                <h6>Descripción:</h6>
                <h5>{descripcion}</h5>
              </Container>
              <Container>
                <h6>Detalle:</h6>
                <h5>{detalle}</h5>
              </Container>
              <Row className="w-100">
                <Col className="d-flex align-items-center gap-2 col">
                  <h6>Talle:</h6>
                  <h5>{talle}</h5>
                </Col>
                <Col>
                  <h3>$ {formatPriceWithCommas(precio)}</h3>
                </Col>
              </Row>
              <Container className="d-flex justify-content-center">
                <Button className="w-75" variant="dark" onClick={handleCreatePedido}>
                  Agregar al Carrito
                </Button>
              </Container>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

ModalDetails.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  marca: PropTypes.string.isRequired,
  modelo: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  detalle: PropTypes.string.isRequired,
  talle: PropTypes.string.isRequired,
  precio: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
};

export default ModalDetails;