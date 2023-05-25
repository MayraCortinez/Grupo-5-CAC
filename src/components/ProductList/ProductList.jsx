import React, { useState } from "react";
import ProductCard from "./ProductCard";

const productsData = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
];

function ProductList() {
  const [products] = useState(productsData);

  return (
    <div>
      <h2>Products</h2>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;