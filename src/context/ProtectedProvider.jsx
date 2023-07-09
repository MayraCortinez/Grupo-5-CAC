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
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({})
    const [project, setProject] = useState({});
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [alertModal, setAlertModal] = useState({}); 
    
    //funciones


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