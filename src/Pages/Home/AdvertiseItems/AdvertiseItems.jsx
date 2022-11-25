import React from "react";
import ProductCard from "../../Shared/Products/ProductCard/ProductCard";

const AdvertiseItems = () => {
  return (
    <div className="dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-5 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-700 dark:text-white/90 text-center">
          Sponsored Ads
        </h2>

        <div className="py-10 flex flex-wrap gap-6 justify-center items-center">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  );
};

export default AdvertiseItems;
