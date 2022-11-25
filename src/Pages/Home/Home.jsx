import React from "react";
import AdvertiseItems from "./AdvertiseItems/AdvertiseItems";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import FAQs from "./FAQs/FAQs";
import Feature from "./Feature/Feature";

const Home = () => {
  return (
    <>
      <Banner />
      <Feature />
      <AdvertiseItems />
      <Category />
      <FAQs />
    </>
  );
};

export default Home;
