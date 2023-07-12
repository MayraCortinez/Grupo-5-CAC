import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';


const AdminRoute = ({ element: Element, ...rest }) => {
  const { isAdmin } = useContext(AuthContext);

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Route {...rest} element={Element} />;        /* ...rest se utiliza para pasar las props adicionales al componente Route, 
                                                        y Element representa el componente que se va a renderizar dentro de AdminRoute. 
                                                        Las rutas adicionales se definen antes del componente Element para que se procesen correctamente. */

};

export default AdminRoute;
