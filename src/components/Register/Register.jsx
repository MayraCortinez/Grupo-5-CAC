import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import firebase from 'firebase/app';
import 'firebase/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log('Registro exitoso');
      // Lógica después de registrar exitosamente al usuario
    } catch (error) {
      console.error('Error al registrar', error);
      // Manejo de errores al registrar al usuario
    }
  };

  return (
    <div className="container">
      <h2>Registro</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Contraseña:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Registrarse</Button>
      </Form>
    </div>
  );
};

export default Register;




