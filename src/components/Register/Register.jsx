import React, { useState } from 'react';
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
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;

