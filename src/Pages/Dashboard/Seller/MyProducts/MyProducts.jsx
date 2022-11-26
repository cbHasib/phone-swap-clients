import { Button } from "flowbite-react";
import React from "react";
import toast from "react-hot-toast";
import { HiOutlineTrendingUp, HiTrash } from "react-icons/hi";

const MyProducts = () => {
  const product = {
    product_name: "Product Name",
    price: 100,
    status: "Available", // Available, Sold
    image: "https://picsum.photos/200",
    _id: "dddgg",
    promoted: false,
    post_time: "2021-01-01",
  };

  const handleDeleteProduct = (id) => {
    toast.success(`Deleted ${id}`);
  };

  return (
    <div className="px-5">
      <h4 className="mb-4 text-2xl font-semibold text-gray-600 dark:text-gray-300">
        My Products
      </h4>
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap ">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-700 uppercase border-b dark:border-gray-700 bg-gray-300 dark:text-gray-400 dark:bg-black">
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Added</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-900">
              <tr className="text-gray-700 dark:text-gray-400">
                <td className="px-4 py-3">
                  <div className="flex items-center text-sm">
                    {/* <!-- Avatar with inset shadow --> */}
                    <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                      <img
                        className="object-cover w-full h-full rounded-full"
                        src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                        alt=""
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 rounded-full shadow-inner"
                        aria-hidden="true"
                      ></div>
                    </div>
                    <div>
                      <p className="font-semibold">{product.product_name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">$ {product.price}</td>
                <td className="px-4 py-3 text-xs">
                  <span
                    className={
                      product.status === "Sold"
                        ? "px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full dark:bg-yellow-700 dark:text-yellow-100"
                        : "px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
                    }
                  >
                    {product.status === "Sold" ? "Sold" : "Available"}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">{product.post_time}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-4 text-sm">
                    <button
                      className="flex items-center justify-between py-2 text-sm font-medium leading-5 text-blue-700 rounded-lg dark:text-gray-400 dark:hover:text-white hover:text-blue-900 focus:outline-none focus:shadow-outline-gray"
                      aria-label="Delete"
                      title="Delete This Product"
                      onClick={() => handleDeleteProduct(product?._id)}
                    >
                      <HiTrash className="w-5 h-5" />
                    </button>

                    <Button
                      size="xs"
                      color="light"
                      disabled={product.status === "Sold"}
                      title={
                        product.status === "Sold"
                          ? "Promote This Ads"
                          : "Promoted"
                      }
                    >
                      <HiOutlineTrendingUp className="w-5 h-5 mr-2" />
                      {product.status === "Sold" ? "Sold" : "Advertise"}
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyProducts;
