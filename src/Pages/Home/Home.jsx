import React from "react";
import LoadingSpinner from "../Shared/Header/LoadingSpinner";
import Banner from "./Banner/Banner";
import Feature from "./Feature/Feature";

const Home = () => {
  return (
    <>
      <Banner />
      <Feature />
      <LoadingSpinner />
    </>
  );
};

export default Home;
