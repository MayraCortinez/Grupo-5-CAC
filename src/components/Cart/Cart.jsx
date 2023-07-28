import React, { useContext } from "react";
import { Container, Stack, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useProtected } from "../../hooks/useProtected";
import Swal from 'sweetalert2'

const Cart = () => {
  const { cart, duplicatePedido, removePedido, getTotalAmount } = useProtected();

  const handleDuplicatePedido = (index) => {
    duplicatePedido(index);
  };

  const handleRemovePedido = (index) => {
    removePedido(index);
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
        const answers = JSON.stringify(result.value)
        Swal.fire({
          title: 'All done!',
          html: `
            Your answers:
            <pre><code>${answers}</code></pre>
          `,
          confirmButtonText: 'Lovely!'
        })
      }
    })
    // Realiza cualquier acción necesaria con el total
    console.log("Total a pagar:", total);
  };

  return (
    <Container>
      <Stack>
        {cart.map((pedido, index) => (
          <React.Fragment key={pedido.id}>
            <Row>
              <Col>{pedido.descripcion}</Col>
              <Col>
                <Link to={`/ProductCard/${pedido.productoId}`}>
                  <Button variant="secondary">Ver detalles del producto</Button>
                </Link>
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
        ))}
      </Stack>
      <Button variant="success" onClick={handleTotalAmount}>
        Total a pagar
      </Button>
    </Container>
  );
};

export default Cart;
