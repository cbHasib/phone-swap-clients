import { Menu, Transition } from "@headlessui/react";
import { Avatar } from "flowbite-react";
import React, { useContext } from "react";
import { HiUserCircle } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../Contexts/UserContext";

const UserNavItems = () => {
  const { user } = useContext(AuthContext);

  const menuItems = [
    {
      title: "Home",
      path: "/",
      icon: <HiUserCircle className="w-5 h-5 mr-2" />,
    },
    {
      title: "About",
      path: "/about",
      icon: <HiUserCircle className="w-5 h-5 mr-2" />,
    },
    {
      title: "Contact",
      path: "/contact",
      icon: <HiUserCircle className="w-5 h-5 mr-2" />,
    },
    {
      title: "Blog",
      path: "/blog",
      icon: <HiUserCircle className="w-5 h-5 mr-2" />,
    },
    {
      title: "Shop",
      path: "/shop",
      icon: <HiUserCircle className="w-5 h-5 mr-2" />,
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
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-900 shadow-lg ring-1 ring-blue-700 ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            {menuItems.map((item, index) => (
              <Menu.Item key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-700 text-white group flex w-full items-center rounded-md px-2 py-2 text-sm my-1 mr-2"
                      : "text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm my-1 hover:bg-blue-700 duration-300 hover:text-white mr-2 dark:text-white"
                  }
                >
                  {item.icon} {item.title}
                </NavLink>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserNavItems;
