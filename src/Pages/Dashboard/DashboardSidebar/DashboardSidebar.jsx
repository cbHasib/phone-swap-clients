import React, { useContext } from "react";
import {
  HiOutlineBadgeCheck,
  HiOutlineHome,
  HiOutlineLogout,
  HiOutlineShieldExclamation,
  HiOutlineUser,
  HiOutlineUserGroup,
  HiOutlineViewGrid,
  HiOutlineViewGridAdd,
} from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Contexts/UserContext";
import useDbUser from "../../../hooks/useDbUser";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

const DashboardSidebar = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const [dbUser, isDbUserLoading] = useDbUser(user?.email);

  if (loading || isDbUserLoading) return <LoadingSpinner />;

  const adminMenu = (
    <>
      <li>
        <NavLink
          to="/dashboard/dashboard"
          className={({ isActive }) =>
            isActive
              ? "relative flex flex-row items-center h-11 focus:outline-none bg-blue-800 dark:bg-gray-600 text-white-800 border-l-4 border-transparent border-blue-400 dark:border-gray-800 pr-6"
              : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
          }
        >
          <span className="inline-flex justify-center items-center ml-4">
            <HiOutlineHome className="w-5 h-5" />
          </span>
          <span className="ml-2 text-sm tracking-wide truncate">Dashboard</span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/admins"
          className={({ isActive }) =>
            isActive
              ? "relative flex flex-row items-center h-11 focus:outline-none bg-blue-800 dark:bg-gray-600 text-white-800 border-l-4 border-transparent border-blue-400 dark:border-gray-800 pr-6"
              : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
          }
        >
          <span className="inline-flex justify-center items-center ml-4">
            <HiOutlineUserGroup className="w-5 h-5" />
          </span>
          <span className="ml-2 text-sm tracking-wide truncate">All Admin</span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/sellers"
          className={({ isActive }) =>
            isActive
              ? "relative flex flex-row items-center h-11 focus:outline-none bg-blue-800 dark:bg-gray-600 text-white-800 border-l-4 border-transparent border-blue-400 dark:border-gray-800 pr-6"
              : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
          }
        >
          <span className="inline-flex justify-center items-center ml-4">
            <HiOutlineUserGroup className="w-5 h-5" />
          </span>
          <span className="ml-2 text-sm tracking-wide truncate">
            All Sellers
          </span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/buyers"
          className={({ isActive }) =>
            isActive
              ? "relative flex flex-row items-center h-11 focus:outline-none bg-blue-800 dark:bg-gray-600 text-white-800 border-l-4 border-transparent border-blue-400 dark:border-gray-800 pr-6"
              : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
          }
        >
          <span className="inline-flex justify-center items-center ml-4">
            <HiOutlineUserGroup className="w-5 h-5" />
          </span>
          <span className="ml-2 text-sm tracking-wide truncate">
            All Buyers
          </span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/products"
          className={({ isActive }) =>
            isActive
              ? "relative flex flex-row items-center h-11 focus:outline-none bg-blue-800 dark:bg-gray-600 text-white-800 border-l-4 border-transparent border-blue-400 dark:border-gray-800 pr-6"
              : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
          }
        >
          <span className="inline-flex justify-center items-center ml-4">
            <HiOutlineViewGrid className="w-5 h-5" />
          </span>
          <span className="ml-2 text-sm tracking-wide truncate">
            Manage Products
          </span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/reported-products"
          className={({ isActive }) =>
            isActive
              ? "relative flex flex-row items-center h-11 focus:outline-none bg-blue-800 dark:bg-gray-600 text-white-800 border-l-4 border-transparent border-blue-400 dark:border-gray-800 pr-6"
              : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
          }
        >
          <span className="inline-flex justify-center items-center ml-4">
            <HiOutlineShieldExclamation className="w-5 h-5" />
          </span>
          <span className="ml-2 text-sm tracking-wide truncate">
            Reported Product
          </span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/verification-request"
          className={({ isActive }) =>
            isActive
              ? "relative flex flex-row items-center h-11 focus:outline-none bg-blue-800 dark:bg-gray-600 text-white-800 border-l-4 border-transparent border-blue-400 dark:border-gray-800 pr-6"
              : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
          }
        >
          <span className="inline-flex justify-center items-center ml-4">
            <HiOutlineBadgeCheck className="w-5 h-5" />
          </span>
          <span className="ml-2 text-sm tracking-wide truncate">
            Verification Request
          </span>
        </NavLink>
      </li>
    </>
  );

  const sellerMenu = (
    <>
      <li>
        <NavLink
          to="/dashboard/my-products"
          className={({ isActive }) =>
            isActive
              ? "relative flex flex-row items-center h-11 focus:outline-none bg-blue-800 dark:bg-gray-600 text-white-800 border-l-4 border-transparent border-blue-400 dark:border-gray-800 pr-6"
              : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
          }
        >
          <span className="inline-flex justify-center items-center ml-4">
            <HiOutlineViewGrid className="w-5 h-5" />
          </span>
          <span className="ml-2 text-sm tracking-wide truncate">
            My Products
          </span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/add-product"
          className={({ isActive }) =>
            isActive
              ? "relative flex flex-row items-center h-11 focus:outline-none bg-blue-800 dark:bg-gray-600 text-white-800 border-l-4 border-transparent border-blue-400 dark:border-gray-800 pr-6"
              : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
          }
        >
          <span className="inline-flex justify-center items-center ml-4">
            <HiOutlineViewGridAdd className="w-5 h-5" />
          </span>
          <span className="ml-2 text-sm tracking-wide truncate">
            Add Product
          </span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/my-buyers"
          className={({ isActive }) =>
            isActive
              ? "relative flex flex-row items-center h-11 focus:outline-none bg-blue-800 dark:bg-gray-600 text-white-800 border-l-4 border-transparent border-blue-400 dark:border-gray-800 pr-6"
              : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
          }
        >
          <span className="inline-flex justify-center items-center ml-4">
            <HiOutlineUserGroup className="w-5 h-5" />
          </span>
          <span className="ml-2 text-sm tracking-wide truncate">My Buyers</span>
        </NavLink>
      </li>
    </>
  );

  const buyerMenu = (
    <>
      <li>
        <NavLink
          to="/dashboard/my-orders"
          className={({ isActive }) =>
            isActive
              ? "relative flex flex-row items-center h-11 focus:outline-none bg-blue-800 dark:bg-gray-600 text-white-800 border-l-4 border-transparent border-blue-400 dark:border-gray-800 pr-6"
              : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
          }
        >
          <span className="inline-flex justify-center items-center ml-4">
            <HiOutlineHome className="w-5 h-5" />
          </span>
          <span className="ml-2 text-sm tracking-wide truncate">My Orders</span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/my-wishlist"
          className={({ isActive }) =>
            isActive
              ? "relative flex flex-row items-center h-11 focus:outline-none bg-blue-800 dark:bg-gray-600 text-white-800 border-l-4 border-transparent border-blue-400 dark:border-gray-800 pr-6"
              : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
          }
        >
          <span className="inline-flex justify-center items-center ml-4">
            <HiOutlineHome className="w-5 h-5" />
          </span>
          <span className="ml-2 text-sm tracking-wide truncate">
            My Wishlist
          </span>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-blue-900 dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar">
      <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          <li className="px-5 hidden md:block">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-300 uppercase">
                Main
              </div>
            </div>
          </li>

          {
            // <AdminRoute> {adminMenu} </AdminRoute>
            // Admin Menu
            dbUser?.role === "admin" && adminMenu
          }
          {
            // Seller Menu
            dbUser?.role === "seller" && sellerMenu
          }
          {
            // Buyer Menu
            dbUser?.role === "buyer" && buyerMenu
          }

          <li className="px-5 hidden md:block">
            <div className="flex flex-row items-center mt-5 h-8">
              <div className="text-sm font-light tracking-wide text-gray-300 uppercase">
                Settings
              </div>
            </div>
          </li>

          <li>
            <Link
              to="/dashboard/profile"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <HiOutlineUser className="w-5 h-5" />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Profile
              </span>
            </Link>
          </li>

          <li>
            <button
              onClick={logout}
              className="relative w-full flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <HiOutlineLogout className="w-5 h-5" />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Logout
              </span>
            </button>
          </li>
        </ul>
        <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">
          Copyright © 2022 PhoneSwap. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default DashboardSidebar;
