import React, { useEffect, useState } from "react";
import { Container, Stack, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useProtected } from "../../hooks/useProtected";
import Swal from 'sweetalert2';
import ModalDetails from "../ProductCard/ModalDetails/ModalDetails";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../LoadingSpinner";


const Cart = () => {
  const { cart, deletePedido, getUserPedidos, getPedidoById } = useProtected();
  const { getProductoById, user } = useAuth();
  const [userPedidos, setUserPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState({});

  useEffect(() => {
    getUserPedidos();
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, [user]);

  const alertRemove = (id) => {
    Swal.fire({
      title: 'Estas seguro que desea eliminar el producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        handleRemovePedido(id);
        Swal.fire(
          'Producto eliminado!',
          'El producto fue eliminado correctamente.',
          'success'
        )
      } else {
        console.log('Remove cancelado')
      }
    })
  }

  const handleVerDetalles = async (productoId) => {
    try {
      const pedidoData = await getPedidoById(productoId);

      if (pedidoData && pedidoData.productoData) {
        setSelectedProducts((prevSelectedProducts) => ({
          ...prevSelectedProducts,
          [productoId]: pedidoData.productoData,
        }));
      }
    } catch (error) {
      console.error('Error al obtener detalles del producto:', error);
    }
  };

  const handleRemovePedido = async (id) => {
    await deletePedido(id);
    getUserPedidos();
  };

  const [modalShow, setModalShow] = useState(false);
  const [selectedPedidoId, setSelectedPedidoId] = useState(null);

  const handleModalShow = (pedidoId) => {
    setSelectedPedidoId(pedidoId); // Guarda el ID del pedido seleccionado para el modal
    handleVerDetalles(pedidoId);
    setModalShow(true);
  };

  const handleModalClose = () => {
    setModalShow(false);
  };

 

  return (
    <Container className="m-5 p-5">
      <Stack className="m-5 p-5">
        {loading ? (
          <LoadingSpinner style={{ height: "550px" }} className='text-primary d-flex align-items-center justify-content-center' />
        ) : cart.length === 0 ? (
          <div>
            <p className="mt-5 pt-5 text-center" style={{ color: "white" }}>
              No hay productos en el carrito.
            </p>
          </div>
        ) : (
          cart.map((pedido, index) => (
            <React.Fragment key={pedido.id}>
              <Row>
                {selectedProducts[pedido.productoId] && (
                  <>
                    <h6 className="text-white">
                      {selectedProducts[pedido.productoId].marca} - {selectedProducts[pedido.productoId].modelo}
                      <br /> $ {selectedProducts[pedido.productoId].precio}
                    </h6>
                    <img className=" img-fluid w-25 img-thumbnail rounded float-start" src={selectedProducts[pedido.productoId].img} alt={selectedProducts[pedido.productoId].modelo} />
                  </>
                )}
                <Col>
                  <Button
                    variant="info"
                    onClick={() => handleModalShow(pedido.id)}
                  >
                    Ver detalles
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="danger"
                    onClick={() => alertRemove(pedido.id)}
                  >
                    Eliminar
                  </Button>
                  <hr />
                </Col>
              </Row>
              <hr />
            </React.Fragment>
          ))
        )}
      </Stack>

      {modalShow && selectedProducts[selectedPedidoId] && (
        <ModalDetails
          show={modalShow}
          onHide={handleModalClose}
          id={selectedProducts[selectedPedidoId].id}
          marca={selectedProducts[selectedPedidoId].marca}
          modelo={selectedProducts[selectedPedidoId].modelo}
          img={selectedProducts[selectedPedidoId].img}
          descripcion={selectedProducts[selectedPedidoId].descripcion}
          detalle={selectedProducts[selectedPedidoId].detalle}
          talle={selectedProducts[selectedPedidoId].talle}
          precio={selectedProducts[selectedPedidoId].precio}
        />
      )}
    </Container>
  );
};

export default Cart;