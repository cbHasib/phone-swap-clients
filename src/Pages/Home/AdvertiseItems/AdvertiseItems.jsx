import React from "react";
import ProductCard from "../../Shared/Products/ProductCard/ProductCard";

const AdvertiseItems = () => {
  return (
    <div className="dark:bg-gray-800 border-b border-gray-200 px-5 py-10 lg:py-14">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-700">
          <span className="underline underline-offset-2">Sponsored</span> Ads
        </h2>

        <div className="py-10">
          <ProductCard />
        </div>
      </div>
    </div>
  );
};

export default AdvertiseItems;
