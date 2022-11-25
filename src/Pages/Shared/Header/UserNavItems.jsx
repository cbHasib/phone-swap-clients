import { Menu, Transition } from "@headlessui/react";
import { Avatar } from "flowbite-react";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../Contexts/UserContext";
import { CiHome, CiLogout, CiMail } from "react-icons/ci";
import { BsPencilSquare, BsPhone } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdOutlineDashboardCustomize } from "react-icons/md";

const UserNavItems = () => {
  const { user, logout } = useContext(AuthContext);

  const menuItems = [
    {
      title: "Home",
      path: "/",
      icon: <CiHome className="w-5 h-5 mr-2" />,
    },
    {
      title: "Blog",
      path: "/blog",
      icon: <BsPencilSquare className="w-5 h-5 mr-2" />,
    },
    {
      title: "Phones",
      path: "/category",
      icon: <BsPhone className="w-5 h-5 mr-2" />,
    },
    {
      title: "About",
      path: "/about",
      icon: <AiOutlineInfoCircle className="w-5 h-5 mr-2" />,
    },
    {
      title: "Contact",
      path: "/contact",
      icon: <CiMail className="w-5 h-5 mr-2" />,
    },
  ];

  const userMenuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <MdOutlineDashboardCustomize className="w-5 h-5 mr-2" />,
    },

    {
      title: "Logout",
      path: "/logout",
      icon: <CiLogout className="w-5 h-5 mr-2" />,
    },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button>
          <Avatar
            alt="User settings"
            img={user?.photoURL}
            referrerPolicy="no-referrer"
            rounded={true}
          />
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
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 dark:divide-gray-800 rounded-md bg-white dark:bg-gray-900 shadow-lg ring-1 ring-blue-700 ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 md:hidden">
            {menuItems.map((item, index) => (
              <Menu.Item key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-700 text-white group flex w-full items-center rounded-md px-2 py-2 text-sm my-1 mr-2 font-medium"
                      : "text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm my-1 hover:bg-blue-700 duration-300 hover:text-white mr-2 dark:text-white font-medium"
                  }
                >
                  {item.icon} {item.title}
                </NavLink>
              </Menu.Item>
            ))}
          </div>

          <div className="px-1 py-1">
            <Menu.Item>
              <NavLink
                to={userMenuItems[0].path}
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-700 text-white group flex w-full items-center rounded-md px-2 py-2 text-sm my-1 font-medium"
                    : "text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm my-1 hover:bg-blue-700 duration-300 hover:text-white font-medium dark:text-white"
                }
              >
                {userMenuItems[0].icon} {userMenuItems[0].title}
              </NavLink>
            </Menu.Item>

            <Menu.Item>
              <NavLink
                onClick={logout}
                className="text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm my-1 hover:bg-blue-700 duration-300 hover:text-white font-medium dark:text-white"
              >
                {userMenuItems[1].icon} {userMenuItems[1].title}
              </NavLink>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserNavItems;
