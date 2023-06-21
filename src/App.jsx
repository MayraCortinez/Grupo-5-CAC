import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../src/pages/Home/Home";
import ProductDetails from "../src/pages/ProductsDetails/ProductDetails";
import Cart from "../src/components/Cart/Cart";
import NotFound from "../src/components/NotFound/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/product/:id" element={<ProductDetails/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;