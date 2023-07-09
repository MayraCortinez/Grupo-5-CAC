import React, { createContext, useState } from "react";
import {useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";
const PrivateContext = createContext();


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
   

export const PrivateProvider = ({ children }) => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({})
    const [project, setProject] = useState({});
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [alertModal, setAlertModal] = useState({}); 
    



    return (
        <PrivateContext.Provider

            value={{
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

        </PrivateContext.Provider>
    );
    };
export default PrivateContext;