import React, { useEffect, useState } from "react";
import { Container, Stack, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useProtected } from "../../hooks/useProtected";
import Swal from 'sweetalert2';
import ModalDetails from "../ProductCard/ModalDetails/ModalDetails";
import useAuth from "../../hooks/useAuth";

const Cart = () => {
  const { user, cart, duplicatePedido, deletePedido, getTotalAmount, getUserPedidos } = useProtected();
  const { getProductoById } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userPedidos, setUserPedidos] = useState([]); // Inicializar como una matriz vacía

  /*   useEffect(() => {
      const fetchUserPedidos = async () => {
        try {
          const pedidos = await getUserPedidos();
          setUserPedidos(pedidos || []); // Si getUserPedidos devuelve undefined, establece la matriz vacía
        } catch (error) {
          console.error('Error al obtener los pedidos del usuario:', error);
          setUserPedidos([]); // En caso de error, establece la matriz vacía
        }
      };
  
      fetchUserPedidos();
    }, [getUserPedidos]); */

  useEffect(() => {
    getUserPedidos();
  }, [user]);

  const handleVerDetalles = async (productoId) => {
    try {
      const productData = await getProductoById(productoId);
      setSelectedProduct(productData);
      console.log(productData)
    } catch (error) {
      console.error('Error al obtener detalles del producto:', error);
    }
  };

  const handleDuplicatePedido = (index) => {
    duplicatePedido(index);
  };

  const handleRemovePedido = (index) => {
    deletePedido(index);
  };

  const handleTotalAmount = () => {
    const total = getTotalAmount();
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next →',
      showCancelButton: true,
      progressSteps: ['1', '2', '3']
    }).queue([
      {
        title: 'Ingrese su contraseña para confirmar su compra',
        text: total
      },
      'Question 2',
      'Question 3'
    ]).then((result) => {
      if (result.value) {
        const answers = JSON.stringify(result.value);
        Swal.fire({
          title: 'All done!',
          html: `
            Your answers:
            <pre><code>${answers}</code></pre>
          `,
          confirmButtonText: 'Lovely!'
        });
      }
    });
    // Realiza cualquier acción necesaria con el total
    console.log("Total a pagar:", total);
  };

  const [modalShow, setModalShow] = useState(false);

  const handleModalShow = (pedidoId) => {
    // Encuentra el pedido en el carrito con el pedidoId dado
    const pedido = cart.find((pedido) => pedido.id === pedidoId);
    if (pedido) {
      // Si se encuentra el pedido, muestra los detalles del producto
      handleVerDetalles(pedido.productoId);
      setModalShow(true);
    }
  };

  const handleModalClose = () => {
    setModalShow(false);
  };

  return (
    <Container className="m-5 p-5">
      <Stack className="m-5 p-5">
        {cart.length === 0 ? (
          <div>
            <p className="mt-5 pt-5 text-center" style={{ color: "white" }}>
              No hay productos en el carrito.
            </p>
          </div>
        ) : (
          cart.map((pedido, index) => (
            <React.Fragment key={pedido.id}>
              <Row>
              {selectedProduct && (
                    <h6 className="text-white">
                      {selectedProduct.marca} - {selectedProduct.modelo}
                    </h6>
                  )}
                <Col>
                  <Button
                    variant="info"
                    onClick={() => handleModalShow(pedido.id)} // Usa el id del pedido
                  >
                    Ver detalles
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="primary"
                    onClick={() => handleDuplicatePedido(index)}
                  >
                    Agregar
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="danger"
                    onClick={() => handleRemovePedido(index)}
                  >
                    Eliminar
                  </Button>
                </Col>
              </Row>
              <hr />
            </React.Fragment>
          ))
        )}
      </Stack>
      {cart.length > 0 && (
        <Button variant="success" onClick={handleTotalAmount}>
          Total a pagar
        </Button>
      )}
      {modalShow && selectedProduct && (
        <ModalDetails
          show={modalShow}
          onHide={handleModalClose}
          id={selectedProduct.id}
          marca={selectedProduct.marca}
          modelo={selectedProduct.modelo}
          img={selectedProduct.img}
          descripcion={selectedProduct.descripcion}
          detalle={selectedProduct.detalle}
          talle={selectedProduct.talle}
          precio={selectedProduct.precio}
        />
      )}
    </Container>


  );
};

export default Cart;
