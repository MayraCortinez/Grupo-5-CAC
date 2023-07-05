// import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css"
import AirMax from "./ID1_Air_Max_1.png";  

function ProductCard(  { modelo, talle, color, precio, img } ) {
  return (

    <div className="my-container">
      <Link to={`/cart`}>
      <div className="my-card">
        <div className="my-card-img">
          <img src={ img } alt={img} />
        </div>
        <div className="my-card-content">
         <h2 className="my-card-title">{modelo}</h2>
         <div className="my-card-details">
           <div className="my-size">
             <h3>Size :</h3>
             <span>{talle}</span>
           </div>
           <div className="my-color">
             <h3>Color :</h3>
            <span>{color}</span>
          </div>
          <div className="my-price">
            <h3>${precio}</h3>
          </div>
         </div>
       </div>
      </div>
      </Link>
    </div>
  );
}

export default ProductCard;