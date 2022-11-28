import { useQuery } from "@tanstack/react-query";
import { Button } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineCreditCard, HiTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Contexts/UserContext";
import useDbUser from "../../../../hooks/useDbUser";
import useScrollToTop from "../../../../hooks/useScrollToTop";
import useTitle from "../../../../hooks/useTitle";
import ErrorMessage from "../../../Shared/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../../../Shared/LoadingSpinner/LoadingSpinner";

const MyWishlist = () => {
  useScrollToTop();
  useTitle("My Wishlist");
  const [errorMessages, setErrorMessages] = useState("");
  const { user, loading } = useContext(AuthContext);
  const [dbUser, isDbUserLoading] = useDbUser(user?.email);

  const navigate = useNavigate();

  const {
    data: myWishlist = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myWishlist"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/wishlist/${dbUser?.email}`,
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
  if (!dbUser)
    return <ErrorMessage error="Please login to view your wishlist" />;
  if (errorMessages) return <ErrorMessage error={errorMessages} />;

  const handleDeleteWishlist = (id) => {
    const userConfirmation = window.confirm("Are you sure you want to delete?");
    if (userConfirmation) {
      fetch(`${process.env.REACT_APP_API_URL}/wishlist/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            toast.success(data.message);
            refetch();
          } else {
            toast.error(data.error);
            setErrorMessages(data.error);
          }
        })
        .catch((err) => {
          toast.error(err.message);
          setErrorMessages(err.message);
        });
    }
  };

  return (
    <div className="px-5">
      <h4 className="mb-4 text-2xl font-semibold text-gray-600 dark:text-gray-300">
        My Wishlist ({myWishlist?.length})
      </h4>
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap ">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-700 uppercase border-b dark:border-gray-700 bg-gray-300 dark:text-gray-400 dark:bg-black">
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Seller Phone</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-900">
              {myWishlist?.map((order) => (
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
                          src={order?.image}
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
                  <td className="px-4 py-3 text-sm">৳ {order?.resale_price}</td>
                  <td className="px-4 py-3 text-sm">{order?.location}</td>

                  <td className="px-4 py-3 text-sm">{order?.contact_number}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-4 text-sm">
                      <button
                        className="flex items-center justify-between py-2 text-sm font-medium leading-5 text-blue-700 rounded-lg dark:text-gray-400 dark:hover:text-white hover:text-blue-900 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Delete"
                        title="Delete This Seller"
                        onClick={() => handleDeleteWishlist(order?._id)}
                      >
                        <HiTrash className="w-5 h-5" />
                      </button>
                      <Button
                        onClick={() => navigate(`/dashboard/pay/${order?._id}`)}
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

export default MyWishlist;
