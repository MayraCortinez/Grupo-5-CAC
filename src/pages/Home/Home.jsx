import React from "react";
import classes from "./home.module.css";
import CarouselHome from "../../components/Carousel/CarouselHome";

function Home() {
  return (
    <div className={classes.Home}>
      <CarouselHome />
    </div>
  );
}

export default Home;
