import { Menu, Transition } from "@headlessui/react";
import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const MenuItem = () => {
  const user = false;

  const menuItems = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Contact",
      path: "/contact",
    },
    {
      title: "Blog",
      path: "/blog",
    },
    {
      title: "Shop",
      path: "/shop",
    },
  ];

  const userMenuItems = {
    user: [
      {
        title: "Dashboard",
        path: "/dashboard",
      },
      {
        title: "Settings",
        path: "/settings",
      },
      {
        title: "Logout",
        path: "/logout",
      },
    ],
    notUser: [
      {
        title: "Login",
        path: "/login",
      },
      {
        title: "Register",
        path: "/register",
      },
    ],
  };

  let menu = user ? userMenuItems.user : userMenuItems.notUser;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-ull justify-center rounded-md px-2 py-2 text-sm font-medium text-black dark:text-white  dark:hover:text-white   duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <HiMenuAlt3 className="w-6 h-6 " />
        </Menu.Button>
      </div>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 dark:divide-gray-800  rounded-md bg-white dark:bg-gray-900 shadow-lg ring-1 ring-blue-700 ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            {menuItems.map((item, index) => (
              <Menu.Item key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-700 text-white group flex w-full items-center rounded-md px-2 py-2 text-sm my-1 font-medium"
                      : "text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm my-1 hover:bg-blue-700 duration-300 hover:text-white font-medium dark:text-white"
                  }
                >
                  {item.title}
                </NavLink>
              </Menu.Item>
            ))}
          </div>

          <div className="px-1 py-1 ">
            {menu.map((item, index) => (
              <Menu.Item key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-700 text-white group flex w-full items-center rounded-md px-2 py-2 text-sm my-1 font-medium"
                      : "text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm my-1 hover:bg-blue-700 duration-300 hover:text-white font-medium dark:text-white"
                  }
                >
                  {item.title}
                </NavLink>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MenuItem;
