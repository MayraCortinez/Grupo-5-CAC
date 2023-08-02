import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const PrivateLayout = () => {
  const { user, userData, fetchUserProfile } = useAuth();

  useEffect(() => {
    // Cuando el usuario cambia o se autentica, actualizamos su perfil en localStorage
    if (user && user.uid) {
      fetchUserProfile(user.uid).then((userProfile) => {
        // Guardar el perfil del usuario en localStorage
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
      });
    }
  }, [user, fetchUserProfile]);

  // Comprobar si hay un perfil de usuario en localStorage
  const userProfile = JSON.parse(localStorage.getItem('userProfile'));

  // Si el usuario es administrador, muestra el diseño privado
  return (
    <>
      {userProfile?.admin ? (

        <>
          <Header />
          <main className='container mx-auto pb-11 md:flex md:justify-center'>
            <div className="md:w-2/3 lg:w-2/5">
              <Outlet />
            </div>
          </main>
          <Footer />
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default PrivateLayout;
