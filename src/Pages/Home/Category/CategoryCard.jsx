import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = () => {
  const category = {
    _id: 1,
    name: "Category Name",
    slug: "category-name",
    image: "https://s3n.cashify.in/cashify/brand/img/xhdpi/20922c34-8afc.jpg",
  };

  const { _id, name, image } = category;

  return (
    <Link
      to={`/category/${_id}`}
      className="w-36 h-36 p-4 rounded-xl shadow-md dark:bg-gray-900  dark:hover:bg-black hover:bg-blue-700/30 duration-300 flex justify-center items-center text-blue-700 hover:text-gray-50 border border-gray-200 dark:border-gray-700"
    >
      <div className="w-20 h-20">
        <img src={image} alt={name} className="w-full h-full object-contain" />
      </div>
    </Link>
  );
};

export default CategoryCard;
