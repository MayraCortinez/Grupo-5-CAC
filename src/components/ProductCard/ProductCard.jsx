import React, { useState } from "react";
import "./ProductCard.css";
import Swal from "sweetalert2";
import { Container, Row, Col } from "react-bootstrap";
import { BsCart4 } from "react-icons/bs";
import ModalDetails from "../Modal/ModalDetails";

function ProductCard({
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
                <h3>Size :</h3>
                <span>{talle}</span>
              </div>
              <div className="my-color">
                <h3>Color :</h3>
                <span>{color}</span>
              </div>
              <div className="my-price">
                <h3>${precio}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modalShow && (
        <ModalDetails
          show={modalShow}
          onHide={handleModalClose}
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