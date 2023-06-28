import React from "react";
import { useParams } from "react-router-dom";
import ProductCard from '../../components/ProductCard/ProductCard'

function ProductDetail() {
  const { id } = useParams();

  return (
    <div>
      <h2>Product Details</h2>
      <p>Product ID: {id}</p>
      <ProductCard />
      {/* Fetch product details from API or use local data */}
    </div>
  );
}

export default ProductDetail;