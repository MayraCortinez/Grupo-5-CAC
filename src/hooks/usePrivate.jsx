import {useContext} from 'react';
import { PrivateContext} from '../context/PrivateProvider';

export const usePrivate = () => {
    return useContext(PrivateContext)
};

export default usePrivate