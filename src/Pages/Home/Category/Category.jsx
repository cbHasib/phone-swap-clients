import React from "react";
import CategoryCard from "./CategoryCard";

const Category = () => {
  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-700 dark:text-white/90 text-center">
          Popular Categories
        </h2>

        <div className="py-10 flex flex-wrap gap-6 justify-center items-center">
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </div>
      </div>
    </div>
  );
};

export default Category;
