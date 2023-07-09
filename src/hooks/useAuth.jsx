import { useContext } from 'react';
import AuthContext from '../context/AuthProvide.jsx';

export const useAuth = () => {
    return useContext(AuthContext);
}