import React from 'react';
import { Stack, Container, Form, Button} from 'react-bootstrap'
import {
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
}from 'firebase/auth';
import {app} from '../../firebaseConfig/firebase';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider;


const Login = () => {

  const [registro, setRegistro] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    const correo = e.target.formBasicEmail.value; //utilizo id de cada campo
    const password = e.target.formBasicPassword.value;

    //console.log(correo, password)

    if(registro){
      //si se está registrando
      const usuario = await createUserWithEmailAndPassword(
        auth, 
        correo, 
        password
      )
    } else {
       // si está iniciando sesión
       signInWithEmailAndPassword(
        auth, 
        correo,
        password
       )
    }
  }

  return (
    <Container>
      <Stack gap={3}>
        <h1>{registro ? 'Registrarse' : 'Iniciar sesión'}</h1>
      <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="dark" type="submit">
            {registro ? "Registrarse" : "Iniciar sesión"}
          </Button>
        </Form>
        <Button 
          variant='primary' 
          type='submit' 
          style={{width : "300px"}}
          onClick={() => signInWithRedirect(auth, googleProvider)} 
        >
          Acceder con Google
        </Button>
        <Button
          style={{width: "300px"}}
          variant='secondary'
          onClick={() => setRegistro(!registro)}
        >
          {
            registro
            ? "¿Ya tienes cuenta? Inicia sesión"
            : "¿No tienes cuenta? Regístrate"
          }

        </Button>
        </Stack>
    </Container>
  )
}

export default Login;