import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  HiOutlineCube,
  HiOutlineShieldExclamation,
  HiOutlineShoppingCart,
  HiOutlineUserGroup,
  HiOutlineUsers,
} from "react-icons/hi";
import useScrollToTop from "../../../../hooks/useScrollToTop";
import useTitle from "../../../../hooks/useTitle";
import ErrorMessage from "../../../Shared/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../../../Shared/LoadingSpinner/LoadingSpinner";

const Dashboard = () => {
  const [errorMessages, setErrorMessages] = useState("");

  useScrollToTop();
  useTitle("Admin Dashboard");

  const { data: counts = [], isLoading } = useQuery({
    queryKey: ["counts"],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/dashboard`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();

      if (data.success) {
        setErrorMessages("");
        return data.data;
      } else {
        setErrorMessages(data.error);
        return [];
      }
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (errorMessages) {
    return <ErrorMessage error={errorMessages} />;
  }

  const { productCount, sellerCount, buyerCount, adminCount } = counts; // totalUserCount is not used but available

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-blue-500 dark:bg-gray-900 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
        <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
          <HiOutlineCube className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out w-8 h-8" />
        </div>
        <div className="text-right">
          <p className="text-2xl">{productCount}</p>
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
          <HiOutlineShieldExclamation className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out w-8 h-8" />
        </div>
        <div className="text-right">
          <p className="text-2xl">000</p>
          <p>Reported Product</p>
        </div>
      </div>

      <div className="bg-blue-500 dark:bg-gray-900 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
        <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
          <HiOutlineUsers className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out w-8 h-8" />
        </div>
        <div className="text-right">
          <p className="text-2xl">{adminCount}</p>
          <p>Admin</p>
        </div>
      </div>

      <div className="bg-blue-500 dark:bg-gray-900 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
        <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
          <HiOutlineUserGroup className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out w-8 h-8" />
        </div>
        <div className="text-right">
          <p className="text-2xl">{sellerCount}</p>
          <p>Sellers</p>
        </div>
      </div>

      <div className="bg-blue-500 dark:bg-gray-900 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
        <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
          <HiOutlineUserGroup className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out w-8 h-8" />
        </div>
        <div className="text-right">
          <p className="text-2xl">{buyerCount}</p>
          <p>Buyers</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
