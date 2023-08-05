import React, { useEffect, useState, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const PrivateLayout = () => {
  const { user, userData, fetchUserProfile } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (user && userData && userData.userId) {
      fetchUserProfile(userData.userId)
        .then((userProfile) => {
          setUserProfile(userProfile);
        })
        .catch((error) => {
          console.error('Error al obtener el perfil del usuario:', error);
        });
    }
  }, [user, userData, fetchUserProfile]);

  // Si userData o userProfile son nulos, puedes hacer un render condicional,
  // mostrar un spinner de carga o redirigir a la página de inicio de sesión

  if (!user || !userData || !userProfile) {
    return <p>Cargando...</p>; // Por ejemplo, muestra un mensaje de carga mientras los datos se recuperan
  }

  return (
    <>
      {userProfile.admin ? (
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
