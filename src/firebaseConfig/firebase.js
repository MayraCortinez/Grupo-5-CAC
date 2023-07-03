import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics"; 
import { getFirestore } from "firebase/firestore"; //Recurso que permite obtener los datos de la base.

const firebaseConfig = {
  apiKey: "AIzaSyBgM8ar0yvsbeH-dz026jMMmB_0aL9i05M",
  authDomain: "reactjsgrupo5-43e69.firebaseapp.com",
  projectId: "reactjsgrupo5-43e69",
  storageBucket: "reactjsgrupo5-43e69.appspot.com",
  messagingSenderId: "522676320609",
  appId: "1:522676320609:web:a56e180815cb51b6362d20",
  measurementId: "G-M9MVDDL4BS"
};


export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

