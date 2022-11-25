import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../Pages/Dashboard/DashboardSidebar/DashboardSidebar";
import Header from "../Pages/Shared/Header/Header";

const DashboardLayout = () => {
  return (
    <>
      <Header />

      <div className="bg-gray-100 dark:bg-gray-800">
        <div>
          <DashboardSidebar />
        </div>
        <div className="h-screen pl-14 pt-4 pb-10 md:pl-64">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
