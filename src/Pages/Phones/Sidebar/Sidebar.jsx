// import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  //   const { user, logout } = useContext(AuthContext);
  //   const [categories, setCategories] = useState([]);

  //   const location = useLocation();
  //   const navigate = useNavigate();

  //   const handleNavigate = (path) => {
  //     navigate(path, { state: { from: location } });
  //   };

  //   const handleLogout = () => {
  //     logout();
  //   };

  //   useEffect(() => {
  //     fetch(`${process.env.REACT_APP_serverURL}/categories`)
  //       .then((res) => res.json())
  //       .then((data) => setCategories(data.data));
  //   }, []);

  return (
    <div className="w-64 border border-gray-300 rounded-md overflow-hidden bg-white dark:bg-gray-900 dark:border-gray-700">
      <div className="bg-blue-700 w-full">
        <h2 className="text-xl font-semibold text-white px-5 py-2">
          Filter Ads
        </h2>
      </div>
      <div>
        <h2 className="text-md font-bold text-gray-700 dark:text-gray-200 px-5 py-2">
          Categories
        </h2>

        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />

        <div className="px-5 py-2 ml-2">
          <ul>
            <li>
              <NavLink
                to={`/category/phones`}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-700 font-bold before:content-['•'] before:mr-1 before:blue-red-500"
                    : "text-gray-700 dark:text-gray-400 font-normal"
                }
              >
                Phones
              </NavLink>
            </li>

            <li>
              <NavLink
                to={`/category/okay`}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-700 font-bold before:content-['•'] before:mr-1 before:blue-red-500"
                    : "text-gray-700 dark:text-gray-400 font-normal"
                }
              >
                Okay
              </NavLink>
            </li>

            <li>
              <NavLink
                to={`/category/laptop`}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-700 font-bold before:content-['•'] before:mr-1 before:blue-red-500"
                    : "text-gray-700 dark:text-gray-400 font-normal"
                }
              >
                laptop
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
