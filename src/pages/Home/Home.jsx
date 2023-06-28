import React from "react";
import { useParams } from "react-router-dom";

import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

function Home() {
  const { id } = useParams();

  return (
    <div>
      <Header/>
      <h2>Product Details</h2>
      <p>Product ID: {id}</p>
      {/* Fetch product details from API or use local data */}
      <Footer/>
    </div>
  );
}

export default Home;
