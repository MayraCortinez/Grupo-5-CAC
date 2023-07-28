import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Footer  from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { useProtected } from '../hooks/useProtected';

const ProtectedLayout = () => {
  const { user} = useProtected();

  if (user) {
    return (
      <>
      <Header />
          <main className='container mx-auto .pb-11 md:flex md:justify-center'>
              <div className="md:w-2/3 lg:w-2/5">
      
                  <Outlet/>
      
              </div>
          </main>
      <Footer />
      </>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedLayout;
