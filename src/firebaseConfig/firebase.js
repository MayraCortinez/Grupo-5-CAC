import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBgM8ar0yvsbeH-dz026jMMmB_0aL9i05M",
  authDomain: "reactjsgrupo5-43e69.firebaseapp.com",
  projectId: "reactjsgrupo5-43e69",
  storageBucket: "reactjsgrupo5-43e69.appspot.com",
  messagingSenderId: "522676320609",
  appId: "1:522676320609:web:a56e180815cb51b6362d20",
  measurementId: "G-M9MVDDL4BS"
};



// Inicializar la aplicación de Firebase
const app = initializeApp(firebaseConfig);
// Obtener la instancia de Firestore
const db = getFirestore(app);

// Obtener la instancia de Storage
const storage = getStorage(app);
const gsReference = ref(storage, 'images/stars.jpg');

export { app, db, storage, gsReference };

