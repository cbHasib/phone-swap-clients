import { Button } from "flowbite-react";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { HiOutlineTrendingUp, HiTrash } from "react-icons/hi";
import { AuthContext } from "../../../../Contexts/UserContext";
import useDbUser from "../../../../hooks/useDbUser";
import LoadingSpinner from "../../../Shared/LoadingSpinner/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import useScrollToTop from "../../../../hooks/useScrollToTop";
import useTitle from "../../../../hooks/useTitle";

const MyProducts = () => {
  const { user, loading } = useContext(AuthContext);
  const [dbUser, isDbUserLoading] = useDbUser(user?.email);

  useScrollToTop();
  useTitle("My Products");

  const {
    data: myProductsAll = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myProductsAlls", dbUser?._id], // unique key"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/products/seller/${dbUser?._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();

      if (data.success) {
        return data.data.reverse();
      } else {
        return [];
      }
    },
  });

  const handleDeleteProduct = (id) => {
    const userConfirmation = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (userConfirmation) {
      fetch(`${process.env.REACT_APP_API_URL}/products/seller/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            toast.success(data.message);
          } else {
            toast.error(data.error);
          }
          refetch();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  const handlePromoteProduct = (id) => {
    const userConfirmation = window.confirm(
      "Are you sure you want to promote this product?"
    );
    if (userConfirmation) {
      fetch(`${process.env.REACT_APP_API_URL}/products/seller/promote/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            toast.success(data.message);
          } else {
            toast.error(data.error);
          }
          refetch();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  if (loading || isDbUserLoading || isLoading) {
    return <LoadingSpinner />;
  }

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
                <th className="px-4 py-3">Promoted</th>
                <th className="px-4 py-3">Added</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-900">
              {myProductsAll?.map((product) => (
                <tr
                  className="text-gray-700 dark:text-gray-400"
                  key={product?._id}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      {/* <!-- Avatar with inset shadow --> */}
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src={product?.image}
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p className="font-semibold">{product?.product_name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    $ {product?.resale_price}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <span
                      className={
                        product?.status === "Available"
                          ? "px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
                          : "px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full dark:bg-yellow-700 dark:text-yellow-100"
                      }
                    >
                      {product?.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <span
                      className={
                        product?.promoted
                          ? "px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
                          : "px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full dark:bg-yellow-700 dark:text-yellow-100"
                      }
                    >
                      {product?.promoted ? "Promoted" : "Not Promoted"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{product?.post_time}</td>
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
                        onClick={() => handlePromoteProduct(product?._id)}
                        size="xs"
                        color="success"
                        disabled={
                          product?.status === "Sold" || product?.promoted
                        }
                        title={
                          product?.status === "Sold" || product?.promoted
                            ? `Product is ${product?.status}`
                            : "Promote This Ads"
                        }
                      >
                        <HiOutlineTrendingUp className="w-5 h-5 mr-2" />
                        {product.status === "Sold"
                          ? "Sold"
                          : product?.promoted
                          ? "Promoted"
                          : "Promote"}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyProducts;
