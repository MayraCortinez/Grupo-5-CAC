import React, { useEffect, useState } from "react";
import { Container, Stack, Row, Col, Button, Image } from "react-bootstrap";
import { useProtected } from "../../hooks/useProtected";
import Swal from 'sweetalert2';
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../LoadingSpinner";
import './Cart.css';
import ModalDetailsCart from "./ModalDetailsCart";

const Cart = () => {
  const { cart, deletePedido, getUserPedidos, getPedidoById } = useProtected();
  const { getProductoById, user, formatPriceWithCommas } = useAuth();
  const [userPedidos, setUserPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getUserPedidos();
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, [user]);

  const alertRemove = (id) => {
    Swal.fire({
      title: 'Deseas eliminar el producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
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

  // Obtén los detalles de producto para todos los pedidos
  const fetchProductDetails = async () => {
    const updatedSelectedProducts = {};

    for (const pedido of cart) {
      const pedidoData = await getPedidoById(pedido.id);
      if (pedidoData && pedidoData.productoData) {
        updatedSelectedProducts[pedido.productoId] = pedidoData.productoData;
      }
    }

    setSelectedProducts(updatedSelectedProducts);
  };

  useEffect(() => {
    if (cart.length > 0) {
      fetchProductDetails();
    }
  }, [cart]);

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


  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const pedido of cart) {
      if (selectedProducts[pedido.productoId]) {
        totalPrice += +selectedProducts[pedido.productoId].precio;
      }
    }
    return formatPriceWithCommas(+totalPrice); // Aquí formateamos el total
  };

  useEffect(() => {
    const calculatedTotalPrice = calculateTotalPrice();
    setTotalPrice(calculatedTotalPrice); // Guardamos el total en el estado
  }, [cart, selectedProducts]);

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
    <Container className="m-5 p-5 ">
      <Stack className="m-5 p-5 d-flex align-items-center justify-content-cente">
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
                      <br /> $ {formatPriceWithCommas(selectedProducts[pedido.productoId].precio)}
                    </h6>
                    <Image
                      className="d-block img-thumbnail rounded float-start custom-image-size"
                      src={selectedProducts[pedido.productoId].img}
                      alt={selectedProducts[pedido.productoId].modelo}
                    />
                  </>
                )}
                <Col>
                  <Col className="mb-2">
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
                </Col>
              </Row>
              <hr />
            </React.Fragment>

          ))

        )}

        {cart.length !== 0 && (
          <div>
            <h6 className="text-white border p-2 rounded">
              Total a pagar: $ {totalPrice}
            </h6>

            <hr />

            <Button variant="success">
              Siguiente paso
              <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/circled-right-2.png" alt="circled-right-2" className="m-2" />
            </Button>
          </div>
        )}
      </Stack>

      {modalShow && selectedProducts[selectedPedidoId] && (
        <ModalDetailsCart
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