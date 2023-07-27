import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Footer  from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { useProtected } from '../hooks/useProtected';
import Cart from '../components/Cart/Cart';

const ProtectedLayout = () => {
  const { user, loading, hasOrders } = useProtected();

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (user && hasOrders) {
    return (
      <div className="bg-indigo-50/50 m-auto">
        <Header />
        <div className="md:flex w-full">
          <main className="container w-full">
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedLayout;
