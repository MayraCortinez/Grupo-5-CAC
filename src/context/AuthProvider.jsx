import React, { createContext, useEffect, useState } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

/*     useEffect(() => {

        const authUser = async () => { */

          

/*             try {
                console.log(data.user)
                setAuth(data.user);
                
            } catch (error) {
                console.error(error.response?.data);

            } finally {
                setLoading (false)
            }
        }   
            authUser();
    }, []) */
    

  return (
        <AuthContext.Provider
            value={
                {
                    auth,
                    setAuth,
                    loading                     // Información que queda a disposición de todos los componentes hijos
                }
            }
        >
            {children}

        </AuthContext.Provider>
  )
}


export default AuthContext;