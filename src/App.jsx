import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../src/pages/Home/Home";
import ProductDetail from "../src/pages/ProductDetail/ProductDetail";
import Cart from "../src/components/Cart/Cart";
import NotFound from "../src/components/NotFound/NotFound";
import Header from "../src/components/Header/Header";
import Footer from "../src/components/Footer/Footer";

import 'bootstrap/dist/css/bootstrap.min.css'
import ProductList from "./components/ProductList/ProductList";

function App() {
  return (
    <div className="App">
      <Header />
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/product/:id" element={<ProductDetail/>}/>
          <Route path="/productList" element={<ProductList/>} /> 
          <Route path="/cart" element={<Cart/>} />
          <Route element={<NotFound/>} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;