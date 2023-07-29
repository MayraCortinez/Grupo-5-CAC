import { getAuth, onAuthStateChanged } from 'firebase/auth';

const getAuthenticatedUserId = () => {
  const auth = getAuth();

  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user.uid); // Resolvemos con el ID del usuario autenticado
      } else {
        resolve(null); // Resolvemos con null si no hay usuario autenticado
      }

      // Detenemos el listener para evitar fugas de memoria
      unsubscribe();
    }, reject); // Manejador de errores en caso de que ocurra un error al obtener el estado de autenticación
  });
};

export default getAuthenticatedUserId;
