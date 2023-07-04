import React from "react";
import classes from "./home.module.css";
import CarouselHome from "../../components/Carousel/CarouselHome";
import FormContact from "../../components/FormContact/FormContact";
import BannerCTA from "../../components/BannerCTA/BannerCTA";


function Home() {
  return (
    <div className={classes.Home}>
      <CarouselHome />
      <BannerCTA/>
      <FormContact/>
    </div>
  );
}

export default Home;
