import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Footer  from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';
import { useState } from 'react';



const ProtectedLayout = () => {

  const { user, userData, fetchUserProfile } = useAuth();
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

  if (!user || !userData || !userProfile) {
    return <p>Cargando...</p>; 
  }


    return (
      <>
        {user ? (
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

export default ProtectedLayout;
