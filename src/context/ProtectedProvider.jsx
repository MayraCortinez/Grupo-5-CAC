import React, { createContext, useState } from "react";
import {useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";
const ProtectedContext = createContext();


const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
   });
   

export const ProtectedProvider = ({ children }) => {

    const navigate = useNavigate();

    //estados
    const [arrayPedidos, setArrayPedidos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({})


    const [showModal, setShowModal] = useState(false);
    const [alertModal, setAlertModal] = useState({}); 
    
    //funciones

    async function buscarPedidoOrCrearPedido(idPedido) {
        //crear referencia al documento
        const docuRef = doc(firestore, `pedidos/${idPedido}`);
        // buscar documento
        const consulta = await getDoc(docuRef);
        // revisar si existe
        if (consulta.exists()) {
          // si sí existe
          const infoDocu = consulta.data();
          return infoDocu.tareas;
        } else {
          // si no existe
          await setDoc(docuRef, { tareas: [...fakeData] });
          const consulta = await getDoc(docuRef);
          const infoDocu = consulta.data();
          return infoDocu.tareas;
        }
      }
    
      useEffect(() => {
        async function fetchTareas() {
          const tareasFetchadas = await buscarDocumentOrCrearDocumento(
            correoUsuario
          );
          setArrayTareas(tareasFetchadas);
        }
    
        fetchTareas();
      }, []);
    

    return (
        <ProtectedContext.Provider

            value={{       //información que viajará a los otros componentes
                loading,
                alert,
                showAlert,
                getProjects,
                projects,
                getProject,
                project,
                storeProject,
                deleteProject,
                handleShowModal,
                setAlertModal,
                showAlertModal,
                storeTask 
                }}
                >

            {children}

        </ProtectedContext.Provider>
    );
    };
export default ProtectedContext;