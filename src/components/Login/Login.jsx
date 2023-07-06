import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { app } from '../../firebaseConfig/firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig/firebase';
import { dbCollections } from '../../firebaseConfig/collections';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userExists, setUserExists] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Consulta en la colección "users" para verificar si el usuario existe
    const usersRef = collection(db, dbCollections.users);
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('Usuario no encontrado');
      // Lógica para manejar el caso cuando el usuario no existe
      return;
    }

    const auth = getAuth(app);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Inicio de sesión exitoso');
      // Lógica después de iniciar sesión exitosamente
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      // Manejo de errores de inicio de sesión
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
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
        <Button variant="primary" type="submit">Iniciar sesión</Button>
      </Form>
    </div>
  );
};

export default Login;