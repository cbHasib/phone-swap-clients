import React from "react";
import {
  CiBadgeDollar,
  CiCircleCheck,
  CiDiscount1,
  CiSearch,
} from "react-icons/ci";

const Feature = () => {
  return (
    <div className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-5 py-10 flex flex-col justify-center items-center gap-8">
        <h2 className="text-2xl font-bold text-white text-center">
          Get the guaranteed best price for your phone or tablet in 4 easy steps
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
          <div className="flex items-center gap-2 justify-center">
            <CiSearch className="text-blue-600 w-20 h-20" />
            <div>
              <h3 className="text-gray-100 font-bold text-base">
                Search for your phone
              </h3>
              <p className="text-[14px] text-gray-300">
                Use our search box to find your selling mobile or tablet
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 justify-center">
            <CiCircleCheck className="text-blue-600 w-20 h-20" />
            <div>
              <h3 className="text-gray-100 font-bold text-base">
                Select the best deal
              </h3>
              <p className="text-[14px] text-gray-300">
                Compare prices so you get the guaranteed best deal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 justify-center">
            <CiDiscount1 className="text-blue-600 w-20 h-20" />
            <div>
              <h3 className="text-gray-100 font-bold text-base">
                Post your device
              </h3>
              <p className="text-[14px] text-gray-300">
                Post your free ads for your mobile or tablet for sale
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 justify-center">
            <CiBadgeDollar className="text-blue-600 w-20 h-20" />
            <div>
              <h3 className="text-gray-100 font-bold text-base">
                Get your cash
              </h3>
              <p className="text-[14px] text-gray-300">
                Meet the person who want to buy and get your cash.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
