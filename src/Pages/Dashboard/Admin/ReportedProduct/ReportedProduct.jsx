import React from "react";
import toast from "react-hot-toast";
import { HiTrash } from "react-icons/hi";

const ReportedProduct = () => {
  const product = {
    product_name: "Product Name",
    price: 100,
    status: "Available", // Available, Sold
    image: "https://picsum.photos/200",
    _id: "dddgg",
    promoted: false,
    post_time: "2021-01-01",
    seller_name: "Seller Name",
    sellerId: "Seller ID",
    reason: "Reason",
    reporter_name: "Reported User",
  };

  const handleDeleteProduct = (id) => {
    toast.success(`Deleted ${id}`);
  };

  return (
    <div className="px-5">
      <h4 className="mb-4 text-2xl font-semibold text-gray-600 dark:text-gray-300">
        Reported Products
      </h4>
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap ">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-700 uppercase border-b dark:border-gray-700 bg-gray-300 dark:text-gray-400 dark:bg-black">
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Seller</th>
                <th className="px-4 py-3">Reason</th>
                <th className="px-4 py-3">Reported by</th>
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
                <td className="px-4 py-3 text-sm">{product.seller_name}</td>
                <td className="px-4 py-3 text-xs">
                  <span
                    className={
                      "px-2 py-1 font-semibold leading-tight text-red-700 bg-red-200 rounded-full dark:bg-red-700 dark:text-red-100"
                    }
                  >
                    {product.reason}
                  </span>
                </td>

                <td className="px-4 py-3 text-sm">{product.reporter_name}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-4 text-sm">
                    <button
                      className="flex items-center justify-between py-2 text-sm font-medium leading-5 text-blue-700 rounded-lg dark:text-gray-400 dark:hover:text-white hover:text-blue-900 focus:outline-none focus:shadow-outline-gray"
                      aria-label="Delete"
                      title="Delete This Product"
                      onClick={() => handleDeleteProduct(product?._id)}
                    >
                      <HiTrash className="w-5 h-5 mr-1" />
                      Delete Product
                    </button>
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

export default ReportedProduct;
