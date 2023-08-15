import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import '../ProductCard/ModalDetails/ModalDetails.css'
import Swal from 'sweetalert2';
import { useProtected } from "../../hooks/useProtected";
import { useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';

const ModalDetailsCart = ({ show, onHide, id, marca, modelo, descripcion, detalle, talle, precio, img }) => {


  const { user, formatPriceWithCommas } = useAuth();
  let navigate = useNavigate();
  console.log(user);

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
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

ModalDetailsCart.propTypes = {
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

export default ModalDetailsCart;