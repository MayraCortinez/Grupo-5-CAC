import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import  useAuth  from '../hooks/useAuth';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

 const AuthLayout = () => {

    const { user } = useAuth();


    // if (loading) {
    //     return <p> Cargando... </p>
    // }

    return (
        <>
        {
            !user ? (
                <>
                <Header />
                    <main className='container mx-auto .pb-11 md:flex md:justify-center'>
                        <div className="md:w-2/3 lg:w-2/5">
                
                            <Outlet/>
                
                        </div>
                    </main>
                <Footer />
                </>
            ) :

            <>
            <Header />
                <main className='container mx-auto .pb-11 md:flex md:justify-center'>
                    <div className="md:w-2/3 lg:w-2/5">
            
                        <Outlet/>
            
                    </div>
                </main>
            <Footer />
            </>
            
        }
       
        </>
    )
}

export default AuthLayout;