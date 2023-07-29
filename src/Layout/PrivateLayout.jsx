import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Sidebar from '../components/Sidebar/Sidebar';


const PrivateLayout = () => {
  const { user, isAdmin } = useAuth();



  if (!user ) {
    // Si no hay un usuario autenticado, redirige al inicio de sesión o a la página de inicio
    return <Navigate to="/" />;
  }

  if (!isAdmin) {
    // Si el usuario no es administrador, redirige al inicio o a otra página adecuada para usuarios no administradores
    return <Navigate to="/" />;
  }

  // Si el usuario es administrador, muestra el diseño privado
  return (
    <div>
      <Header />
     <Sidebar />
        <Outlet />
      < Footer />
    </div>
  );
};


export default PrivateLayout;