import { Card } from "flowbite-react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Contexts/UserContext";
import useDbUser from "../../../hooks/useDbUser";
import ErrorMessage from "../../Shared/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

const DashboardHome = () => {
  const { user, loading } = useContext(AuthContext);
  const [dbUser, isDbUserLoading] = useDbUser(user?.email);

  if (loading || isDbUserLoading) return <LoadingSpinner />;

  if (!dbUser) return <ErrorMessage error="User not found" />;

  return (
    <div className="max-w-screen">
      <Card>
        <div className="flex flex-col items-center pb-10">
          <h1 className="text-2xl font-bold mb-5 dark:text-white">
            Welcome{" "}
            <span className="text-blue-600 dark:text-blue-500">
              {dbUser?.name}
            </span>
          </h1>
          <img
            className="mb-3 h-36 w-3h-36 rounded-full shadow-lg"
            src={dbUser?.image}
            alt={dbUser?.name}
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {dbUser?.name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {dbUser?.email}
          </span>
          <div className="mt-4 flex space-x-3 lg:mt-6">
            <Link
              to="/dashboard/profile"
              className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              My Profile
            </Link>
            <Link
              to="/dashboard/update-profile"
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              Update Profile
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardHome;
