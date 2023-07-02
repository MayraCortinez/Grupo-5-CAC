import React from "react";
import "./styles.module.css";
import { useParams } from "react-router-dom";

function Home() {
  const { id } = useParams();

  return (
    <div className="Home">
      {/* Fetch product details from API or use local data */}
    </div>
  );
}

export default Home;
