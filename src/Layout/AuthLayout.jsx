import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import  useAuth  from '../hooks/useAuth';


 const AuthLayout = () => {

    const { auth, loading } = useAuth();

    if (loading) {
        return <p> Cargando... </p>
    }

    return (
        <>
        {
            !auth.id ? (
                <main className='container mx-auto .pb-11 md:flex md:justify-center'>
                    <div className="md:w-2/3 lg:w-2/5">
                
                        <Outlet/>
                
                    </div>
                   
                </main>
            ) :

            <Navigate to={'cart'}/>
            
        }
       
        </>
    )
}

export default AuthLayout;