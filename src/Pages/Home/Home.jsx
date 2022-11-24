import React from "react";
import LoadingSpinner from "../Shared/Header/LoadingSpinner";
import AdvertiseItems from "./AdvertiseItems/AdvertiseItems";
import Banner from "./Banner/Banner";
import Feature from "./Feature/Feature";

const Home = () => {
  return (
    <>
      <Banner />
      <Feature />
      <AdvertiseItems />
      <LoadingSpinner />
    </>
  );
};

export default Home;
