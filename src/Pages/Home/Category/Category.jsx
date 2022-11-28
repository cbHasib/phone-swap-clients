import { useQuery } from "@tanstack/react-query";
import React from "react";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";
import CategoryCard from "./CategoryCard";

const Category = () => {
  const { data: categoriesData = [], isLoading } = useQuery({
    queryKey: ["categoriesData"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/productCategory`
      );
      const data = await res.json();

      if (data.success) {
        return data.data;
      } else {
        return [];
      }
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-5 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-700 dark:text-white/90 text-center">
          Popular Categories
        </h2>

        <div className="py-10 flex flex-wrap gap-3 justify-center items-center">
          {categoriesData?.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
