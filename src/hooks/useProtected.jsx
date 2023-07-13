import {useContext} from 'react';
import { ProtectedContext} from '../context/ProtectedProvider';

export const useProtected = () => {
    return useContext(ProtectedContext)
};
