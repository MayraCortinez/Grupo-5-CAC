import React from "react";
import { Stack, Container, Row, Col, Button } from "react-bootstrap";

import { app } from "../../firebaseConfig/firebase";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
const firestore = getFirestore(app);

const Cart = ({ arrayPedidos, correoUsuario, setArrayPedidos }) => {
  
  async function eliminarPedido(idPedidoAEliminar) {
    // crear nuevo array de pedidos
    const nvoArrayPedidos = arrayPedidos.filter(
      (objetoPedido) => objeto.id !== idPedidoAEliminar
    );
    // actualizar base de datos
    const docuRef = doc(firestore, `users/${correoUsuario}`);
    updateDoc(docuRef, { pedidos: [...nvoArrayPedidos] });
    //actualizar state
    setArrayPedidos(nvoArrayPedidos);
  }
  return (
    <Container>
      <Stack>
        {arrayPedidos.map((objetoPedido) => {
          return (
            <>
              <Row>
                <Col>{objetoPedido.descripcion}</Col>
                <Col>
                  <a href={objetoPedido.url}>
                    <Button variant="secondary">Ver más</Button>
                  </a>
                </Col>
                <Col>
                  <Button
                    variant="danger"
                    onClick={() => eliminarPedido(objetoPedido.id)}
                  >
                    Eliminar 
                  </Button>
                </Col>
              </Row>
              <hr />
            </>
          );
        })}
      </Stack>
    </Container>
  );
};

export default Cart;