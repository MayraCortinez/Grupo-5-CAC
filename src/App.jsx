import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

//Layout
import AuthLayout from "./layout/AuthLayout";
import ProtectedLayout from "./layout/ProtectedLayout";
import PrivateLayout from "./layout/PrivateLayout";

//Context
import  AuthProvider from "./context/AuthProvider";
import { ProtectedProvider } from "./context/ProtectedProvider";
import { PrivateProvider } from "./context/PrivateProvider";

//Páginas y componentes
import Home from "../src/pages/Home/Home";
import ProductDetail from "../src/pages/ProductDetail/ProductDetail";
import Cart from "../src/components/Cart/Cart";
import NotFound from "../src/components/NotFound/NotFound";
import ListProduct from '../src/components/CrudProduct/ListProduct'
import ProductList from "./components/ProductList/ProductList";
import CreateProduct from "./components/CrudProduct/CreateProduct";
import EditProduct from "./components/CrudProduct/EditProduct";
import Login from './components/Login/Login';

function App() {
  return (
    <div className="App bg-dark">
      <BrowserRouter>
        <AuthProvider>
        <ProtectedProvider>
                <Routes>
                  {/* Rutas públicas */}
                  <Route path="/" element={<AuthLayout />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="product/:id" element={<ProductDetail />} />
                    <Route path="productList" element={<ProductList />} />
                  </Route>
                  </Routes>
                  
                  <ProtectedProvider>
                  <Routes>
                  {/* Rutas privadas */}
                  <Route path="/user" element={<ProtectedLayout />} >
                  <Route index element={<Cart />} />
                  </Route>
                  </Routes>
                  </ProtectedProvider>

                  <PrivateProvider>
                  {/* Rutas admin */}
                  <Routes>
                  <Route path="/admin" element={<PrivateLayout />} >
                    <Route index element={<ListProduct />} />
                    <Route path="createProduct" element={<CreateProduct />} />
                    <Route path="editProduct/:id" element={<EditProduct />} />
                  </Route>
                  </Routes>
                  </PrivateProvider>

                  <Routes>
                  {/* Ruta para manejar URLs no encontradas */}
                  <Route path="*" element={<NotFound />} />
                </Routes>

                </ProtectedProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
