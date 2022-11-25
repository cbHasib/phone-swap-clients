import React from "react";
import {
  HiOutlineCube,
  HiOutlineShieldExclamation,
  HiOutlineShoppingCart,
  HiOutlineUserGroup,
} from "react-icons/hi";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-blue-500 dark:bg-gray-900 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
        <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
          <HiOutlineCube className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out w-8 h-8" />
        </div>
        <div className="text-right">
          <p className="text-2xl">000</p>
          <p>Products</p>
        </div>
      </div>

      <div className="bg-blue-500 dark:bg-gray-900 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
        <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
          <HiOutlineShoppingCart className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out w-8 h-8" />
        </div>
        <div className="text-right">
          <p className="text-2xl">000</p>
          <p>Orders</p>
        </div>
      </div>

      <div className="bg-blue-500 dark:bg-gray-900 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
        <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
          <HiOutlineUserGroup className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out w-8 h-8" />
        </div>
        <div className="text-right">
          <p className="text-2xl">000</p>
          <p>Sellers</p>
        </div>
      </div>

      <div className="bg-blue-500 dark:bg-gray-900 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
        <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
          <HiOutlineUserGroup className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out w-8 h-8" />
        </div>
        <div className="text-right">
          <p className="text-2xl">000</p>
          <p>Buyers</p>
        </div>
      </div>

      <div className="bg-blue-500 dark:bg-gray-900 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
        <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
          <HiOutlineShieldExclamation className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out w-8 h-8" />
        </div>
        <div className="text-right">
          <p className="text-2xl">000</p>
          <p>Reported Product</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
