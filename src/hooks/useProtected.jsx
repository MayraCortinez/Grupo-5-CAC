import {useContext} from 'react';
import ProtectedContext from '../context/PrivateProvider';

export const useProtected = () => {
    return useContext(ProtectedContext)
};
