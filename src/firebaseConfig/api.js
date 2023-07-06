import {
    collection,
    addDoc,
    updateDoc,
    onSnapshot,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
  } from "firebase/firestore";
  import { db } from "./firebase";
  
  const collectionName = "Productos";
  
 /*  export const saveProducto = (newProduct) =>
    addDoc(collection(db, collectionName), newProducto); */
  
  export const updateProduct = (id, updatedFields) =>
    updateDoc(doc(db, collectionName, id), updatedFields);
  
  export const onGetProducts = (callback) => {
    const unsub = onSnapshot(collection(db, collectionName), callback);
    return unsub;
  };
  
  export const getProducts = () => getDocs(collection(db, collectionName));
  
  export const deleteProducts = (id) => deleteDoc(doc(db, collectionName, id));
  
  export const getProduct = (id) => getDoc(doc(db, collectionName, id));