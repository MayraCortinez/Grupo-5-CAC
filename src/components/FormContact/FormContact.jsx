import React from 'react';
import { Form, Button } from 'react-bootstrap';

const FormContact = () => {
  return (
    <div id='contacto'>
      <h2 style={{ color: "#fff", textAlign: "center", margin: "10px"}}>Contacto</h2>
      <Form action="reactjsgrupo5@gmail.com" method="POST" style={{ width: "45%", margin: "0 auto"}}>
        <Form.Group controlId="name" style={{ margin:"10px 0"}}>
          <Form.Label style={{ color: "#fff", textAlign: "center"}}>Nombre</Form.Label>
          <Form.Control type="text" name="name" required />
        </Form.Group>
        <Form.Group controlId="email" style={{ margin:"10px 0"}}>
          <Form.Label style={{ color: "#fff", textAlign: "center"}}>Email</Form.Label>
          <Form.Control type="email" name="email" required />
        </Form.Group>
        <Form.Group controlId="email" style={{ margin:"10px 0"}}>
          <Form.Label style={{ color: "#fff", textAlign: "center"}}>Mensaje</Form.Label>
          <Form.Control as="textarea" placeholder="Dejanos tu comentario" name="textarea" required />
        </Form.Group>        
        <Button variant="primary" type="submit" style={{ margin:"10px 0"}}>
          Enviar
        </Button>
      </Form>
    </div>  
  );
};

export default FormContact;
