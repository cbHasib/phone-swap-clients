import { useQuery } from "@tanstack/react-query";
import { Button } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { HiOutlineCreditCard } from "react-icons/hi";
import { AuthContext } from "../../../../Contexts/UserContext";
import useDbUser from "../../../../hooks/useDbUser";
import useScrollToTop from "../../../../hooks/useScrollToTop";
import useTitle from "../../../../hooks/useTitle";
import ErrorMessage from "../../../Shared/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../../../Shared/LoadingSpinner/LoadingSpinner";

const MyOrders = () => {
  useScrollToTop();
  useTitle("My Orders");
  const [errorMessages, setErrorMessages] = useState("");
  const { user, loading } = useContext(AuthContext);
  const [dbUser, isDbUserLoading] = useDbUser(user?.email);

  const {
    data: myOrders = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/products/booked/${dbUser?.email}`,
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
        setErrorMessages("");
        return data.data;
      } else {
        setErrorMessages(data.error);
        return [];
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [dbUser, refetch]);

  if (loading || isDbUserLoading || isLoading) return <LoadingSpinner />;
  if (errorMessages) return <ErrorMessage error={errorMessages} />;

  return (
    <div className="px-5">
      <h4 className="mb-4 text-2xl font-semibold text-gray-600 dark:text-gray-300">
        My Orders ({myOrders?.length})
      </h4>
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap ">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-700 uppercase border-b dark:border-gray-700 bg-gray-300 dark:text-gray-400 dark:bg-black">
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Booked</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-900">
              {myOrders?.map((order) => (
                <tr
                  className="text-gray-700 dark:text-gray-400"
                  key={order?._id}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      {/* <!-- Avatar with inset shadow --> */}
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src={order?.product_image}
                          alt={order?.product_name}
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p className="font-semibold">{order?.product_name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    ৳ {order?.product_price}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <span
                      className={
                        order?.status === "Booked"
                          ? "px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full dark:bg-yellow-700 dark:text-yellow-100"
                          : "px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
                      }
                    >
                      {order?.status === "Booked" ? "Booked" : "Paid"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {new Date(order?.date).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-4 text-sm">
                      <Button
                        size="xs"
                        color={
                          order?.status === "Booked" ? "warning" : "success"
                        }
                        disabled={order?.status === "Paid"}
                        title={order?.status === "Booked" ? "Pay Now" : "Paid"}
                      >
                        <HiOutlineCreditCard className="w-5 h-5 mr-2" />
                        {order?.status === "Paid" ? "Paid" : "Pay Now"}
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

export default MyOrders;
