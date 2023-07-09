import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

import AuthLayout from "./Layout/AuthLayout";
import PrivateLayout from "./Layout/PrivateLayout";
import ProtectedLayout from "./Layout/ProtectedLayout";
import Home from "../src/pages/Home/Home";
import ProductDetail from "../src/pages/ProductDetail/ProductDetail";
import Cart from "../src/components/Cart/Cart";
import NotFound from "../src/components/NotFound/NotFound";
import { ListProduct } from '../src/components/CrudProduct/ListProduct'
import ProductList from "./components/ProductList/ProductList";
import CreateProduct from "./components/CrudProduct/CreateProduct";
import EditProduct from "./components/CrudProduct/EditProduct";
import Login from './components/Login/Login';

import app from './firebaseConfig/firebase';
import { getAuth, onAuthStateChanged} from 'firebase/auth';


const auth = getAuth(app);


function App() {

  const [usuarioGlobal, setUsuarioGlobal] = useState(null)

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioGlobal){    //código en caso de que haya sesión iniciada
      setUsuarioGlobal(usuarioFirebase)
    }else{                 //código en caso que no haya iniciado sesión
      setUsuarioGlobal(null)
    }
  })


  return (
    <div className="App bg-dark">
        <Routes>
          {/*Rutas públicas*/}
          <Route path="/" element={<AuthLayout/>} >
            <Route index element={Home} 
            />
            <Route path="login" element={<Login/>} 
            />
            <Route path="product/:id" element={<ProductDetail/>}
            />
            <Route path="productList" element={<ProductList/>} 
            /> 
            <Route path="*" element={<NotFound/>} 
            /> 
          </Route>
          {/*Rutas privadas*/}
          <Route path='/user' element={<ProtectedLayout />} >
            <Route index element={<Cart/>} />  
          </Route>
          {/*Rutas admin*/}
          <Route path="/admin" element={<PrivateLayout />} >
          <Route index element={<ListProduct/>} /> 
          <Route path="createProduct" element={<CreateProduct/>} /> 
          <Route path="editProduct/:id" element={<EditProduct/>} /> 
          </Route>
        </Routes>
    </div>
  );
}

export default App;