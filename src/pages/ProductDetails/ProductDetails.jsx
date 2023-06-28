import React from "react";
import { useParams } from "react-router-dom";

function ProductsDetails() {
  const { id } = useParams();

  return (
    <div>
      <h2>Product Details</h2>
      <p>Product ID: {id}</p>
      {/* Fetch product details from API or use local data */}
    </div>
  );
}

export default ProductsDetails;