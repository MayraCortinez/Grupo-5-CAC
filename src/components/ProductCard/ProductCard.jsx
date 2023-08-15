import React, { useState } from "react";
import "./ProductCard.css";
import Swal from "sweetalert2";
import { Container, Row, Col } from "react-bootstrap";
import { BsCart4 } from "react-icons/bs";
import ModalDetails from "./ModalDetails/ModalDetails"
import useAuth from "../../hooks/useAuth";


function ProductCard({
  id,
  color,
  descripcion,
  detalle,
  img,
  marca,
  modelo,
  precio,
  talle
}) {
  const [modalShow, setModalShow] = useState(false);

  const handleModalShow = () => {
    setModalShow(true);
  };

  const handleModalClose = () => {
    setModalShow(false);
  };

  const { formatPriceWithCommas } = useAuth();

  return (
    <>
      <div
        className="my-container"
        onClick={() => handleModalShow()}
      >
        <div className="my-card">
          <div className="my-card-img">
            <img src={img} alt={modelo} />
          </div>
          <div className="my-card-content">
            <h2 className="my-card-title brand">{marca}</h2>
            <h2 className="my-card-title model">{modelo}</h2>
            <div className="my-card-details">
              <div className="my-size">
                <h3>Size:</h3>
                <span>{talle}</span>
              </div>
              <div className="my-color">
                <h3>Color:</h3>
                <span style={{background: color}}></span>
              </div>
              <div className="my-price">
                <h3>$ {formatPriceWithCommas(precio)}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modalShow && (
        <ModalDetails
          show={modalShow}
          onHide={handleModalClose}
          id={id}
          marca={marca}
          modelo={modelo}
          img={img}
          descripcion={descripcion}
          detalle={detalle}
          talle={talle}
          precio={precio}
        />
      )}
    </>
  );
}

export default ProductCard;