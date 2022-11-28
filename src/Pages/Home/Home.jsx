import React from "react";
import useScrollToTop from "../../hooks/useScrollToTop";
import useTitle from "../../hooks/useTitle";
import AdvertiseItems from "./AdvertiseItems/AdvertiseItems";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import FAQs from "./FAQs/FAQs";
import Feature from "./Feature/Feature";

const Home = () => {
  useScrollToTop();
  useTitle("Home");
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
