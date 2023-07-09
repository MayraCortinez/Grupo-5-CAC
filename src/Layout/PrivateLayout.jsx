import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { usePrivate } from '../hooks/usePrivate';



export const ProtectedLayout = () => {

    const {auth, loading} = usePrivate();  //   Traigo nombre/id del usuario, luego del logueo.
    //console.log(auth)

        if (loading) {
           return <p> Cargando... </p>
        } 

    return (
        <>
        {
            auth.admin ? (  //si el usuario es administrador, entrará a las rutas de configuración
            <div className='bg-indigo-50/50 m-auto'>
                <Header />
                    <div className='md:flex w-full'>
                        <Sidebar />
                        <main className='container w-full'>
                            <Outlet/>   
                        
                        </main>
                   
                    </div>
                    <Footer /> 
            </div>

            )
            : (
                <Navigate to='/'/>  // sino será dirigido al home
            )
        };
       
        </>
    )
}