import { Button } from "flowbite-react";
import React from "react";
import toast from "react-hot-toast";
import useScrollToTop from "../../../../hooks/useScrollToTop";
import useTitle from "../../../../hooks/useTitle";

const MyBuyers = () => {
  useScrollToTop();
  useTitle("My Buyers");
  const buyers = [
    {
      name: "Hasib",
      _id: "345454dfgfddgf",
      role: "buyer",
      isVerified: true,
      email: "has@hs.d",
      phone: "435345",
      image:
        "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg",
      joinDate: "12 Nov, 2022",
    },

    {
      name: "Shimanto",
      _id: "345454dffffgfddgf",
      role: "buyer",
      isVerified: false,
      email: "hysyts.ss@hd",
      phone: "017555455",
      image:
        "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg",
      joinDate: "12 Nov, 2022",
    },

    {
      name: "Marzia",
      _id: "345454dfgfddgf",
      role: "admin",
      isVerified: false,
      email: "gcfdxf",
      phone: "t768eqw5673",
      image:
        "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg",
      joinDate: "12 Nov, 2022",
    },

    {
      name: "Jami",
      _id: "345454dfgfddgf",
      role: "buyer",
      isVerified: false,
      email: "jamk@ghd",
      phone: "44444673",
      image:
        "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg",
      joinDate: "12 Nov, 2022",
    },

    {
      name: "Tamim",
      _id: "345454dfgfddgf",
      role: "buyer",
      isVerified: true,
      email: "gcfdxf",
      phone: "t768eqw5673",
      image:
        "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg",
      joinDate: "12 Nov, 2022",
    },
  ];

  const handleViewDetails = (id) => {
    toast.success(`View Details ${id}`);
  };

  return (
    <div className="px-5">
      <h4 className="mb-4 text-2xl font-semibold text-gray-600 dark:text-gray-300">
        All Buyers
      </h4>
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap ">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-700 uppercase border-b dark:border-gray-700 bg-gray-300 dark:text-gray-400 dark:bg-black">
                <th className="px-4 py-3">Buyer</th>
                <th className="px-4 py-3">phone</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-900">
              {buyers?.map((buyer) => (
                <tr
                  className="text-gray-700 dark:text-gray-400"
                  key={buyer?._id}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      {/* <!-- Avatar with inset shadow --> */}
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src={buyer?.image}
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p className="font-semibold">{buyer?.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {buyer?.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{buyer?.phone}</td>

                  <td className="px-4 py-3 text-sm">{buyer?.joinDate}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3 text-sm">
                      <Button
                        onClick={() => handleViewDetails(buyer?._id)}
                        size="xs"
                        color="light"
                        title="View Details Info"
                      >
                        View
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-white sm:grid-cols-9 dark:text-gray-400  pb-10 dark:bg-gray-900">
          <span className="flex items-center col-span-3">
            Showing 21-30 of 100
          </span>
          <span className="col-span-2"></span>
          {/* <!-- Pagination --> */}
          <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
            <nav aria-label="Table navigation">
              <ul className="inline-flex items-center">
                <li>
                  <button
                    className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                    aria-label="Previous"
                  >
                    <svg
                      className="w-4 h-4 fill-current"
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                    1
                  </button>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                    2
                  </button>
                </li>
                <li>
                  <button className="px-3 py-1 text-white transition-colors duration-150 bg-blue-700 border border-r-0 border-blue-700 rounded-md focus:outline-none focus:shadow-outline-purple">
                    3
                  </button>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                    4
                  </button>
                </li>
                <li>
                  <span className="px-3 py-1">...</span>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                    8
                  </button>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                    9
                  </button>
                </li>
                <li>
                  <button
                    className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                    aria-label="Next"
                  >
                    <svg
                      className="w-4 h-4 fill-current"
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyBuyers;
