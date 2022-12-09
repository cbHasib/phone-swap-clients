import { useQuery } from "@tanstack/react-query";
import { Button, Modal, Spinner, TextInput } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  HiCurrencyBangladeshi,
  HiIdentification,
  HiLocationMarker,
  HiMail,
  HiOutlineBookmark,
  HiPhone,
  HiTrash,
  HiUser,
  HiViewGrid,
} from "react-icons/hi";
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
  const [dbUser, isDbUserLoading] = useDbUser(user.email);

  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookLoading, setBookLoading] = useState(false);
  const [wishlistId, setWishlistId] = useState(null);
  const { register: bookingData, reset, handleSubmit } = useForm();

  const {
    data: myWishlist = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myWishlist"],

    queryFn: async () => {
      if (dbUser) {
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
      } else {
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

  const handleBookSubmit = (data) => {
    data.wishlistId = wishlistId;
    const id = data.product_id;
    setBookLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/products/wishlist-book/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message);
          setBookLoading(false);
          setIsModalOpen(false);
          setModalContent(null);
          reset();
          refetch();
        } else {
          toast.error(data.error);
          setBookLoading(false);
        }
      })
      .catch((err) => {
        toast.error(err.message);
        setBookLoading(false);
      });
  };

  return (
    <>
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
                    <td className="px-4 py-3 text-sm">
                      ৳ {order?.resale_price}
                    </td>
                    <td className="px-4 py-3 text-sm">{order?.location}</td>

                    <td className="px-4 py-3 text-sm">
                      {order?.contact_number}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-4 text-sm">
                        <button
                          className="flex items-center justify-between py-2 text-sm font-medium leading-5 text-blue-700 rounded-lg dark:text-gray-400 dark:hover:text-white hover:text-blue-900 focus:outline-none focus:shadow-outline-gray"
                          aria-label="Delete"
                          title="Delete This Product From Wishlist"
                          onClick={() => handleDeleteWishlist(order?._id)}
                        >
                          <HiTrash className="w-5 h-5" />
                        </button>
                        <Button
                          onClick={() => {
                            setIsModalOpen(true);
                            setModalContent(order);
                            setWishlistId(order?._id);
                          }}
                          size="xs"
                          title="Book Now"
                          disabled={bookLoading}
                        >
                          <div className="flex items-center gap-2 ">
                            {bookLoading ? (
                              <Spinner size="sm" light={true} />
                            ) : (
                              <HiOutlineBookmark className="h-5 w-5" />
                            )}
                            <span>Book Now</span>
                          </div>
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
      <>
        {modalContent && (
          <Modal
            show={isModalOpen}
            size="md"
            popup={true}
            onClose={() => {
              setIsModalOpen(false);
              setModalContent(null);
              setWishlistId(null);
              setBookLoading(false);
            }}
          >
            <Modal.Header />
            <Modal.Body>
              <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center">
                  Booking for {modalContent.product_name}
                </h3>
                <div>
                  <div className="mt-8">
                    <form onSubmit={handleSubmit(handleBookSubmit)}>
                      <div className="mb-2 block">
                        <TextInput
                          id="product_name"
                          type="text"
                          placeholder="Product Name"
                          icon={HiViewGrid}
                          value={modalContent.product_name}
                          {...bookingData("product_name")}
                          readOnly
                          className="cursor-not-allowed opacity-50"
                        />
                      </div>
                      <div className="mb-2 block">
                        <TextInput
                          id="product_price"
                          type="text"
                          placeholder="Product Price"
                          icon={HiCurrencyBangladeshi}
                          value={modalContent.resale_price}
                          {...bookingData("product_price")}
                          readOnly
                          className="cursor-not-allowed opacity-50"
                        />
                      </div>

                      <div className="mb-2 hidden">
                        <TextInput
                          id="buyer_id"
                          type="text"
                          placeholder="Your Id"
                          icon={HiIdentification}
                          value={dbUser?._id}
                          {...bookingData("buyer_id")}
                          readOnly
                          className="cursor-not-allowed opacity-50"
                        />
                      </div>

                      <div className="mb-2 block">
                        <TextInput
                          id="name"
                          type="text"
                          placeholder="Your Name"
                          icon={HiUser}
                          {...bookingData("buyer_name")}
                          value={dbUser?.name}
                          readOnly
                          className="cursor-not-allowed opacity-50"
                        />
                      </div>

                      <div className="mb-2 block">
                        <TextInput
                          id="email"
                          type="email"
                          placeholder="Your Email"
                          icon={HiMail}
                          {...bookingData("buyer_email")}
                          value={dbUser?.email}
                          readOnly
                          className="cursor-not-allowed opacity-50"
                        />
                      </div>

                      <div className="mb-2 block">
                        <TextInput
                          id="phone"
                          type="tel"
                          placeholder="Your Contact Number"
                          required={true}
                          icon={HiPhone}
                          {...bookingData("contact_number", {
                            required: true,
                          })}
                        />
                      </div>
                      <div className="mb-2 block">
                        <TextInput
                          id="meet_location"
                          type="text"
                          placeholder="Meet location"
                          required={true}
                          icon={HiLocationMarker}
                          {...bookingData("meet_location", {
                            required: true,
                          })}
                        />
                      </div>

                      <div className="mb-2 hidden">
                        <TextInput
                          id="seller_id"
                          type="text"
                          placeholder="Seller Id"
                          icon={HiIdentification}
                          value={modalContent?.seller_id}
                          {...bookingData("seller_id")}
                          readOnly
                          className="cursor-not-allowed opacity-50"
                        />
                      </div>

                      <div className="mb-2 hidden">
                        <TextInput
                          id="buyer_id"
                          type="text"
                          placeholder="Your Id"
                          icon={HiIdentification}
                          value={modalContent?.product_id}
                          {...bookingData("product_id")}
                          readOnly
                          className="cursor-not-allowed opacity-50"
                        />
                      </div>

                      <div className="mb-2 hidden">
                        <TextInput
                          id="product_image"
                          type="text"
                          placeholder="Product Image"
                          icon={HiIdentification}
                          value={modalContent?.image}
                          {...bookingData("product_image")}
                          readOnly
                          className="cursor-not-allowed opacity-50"
                        />
                      </div>

                      <div className="mb-2 hidden">
                        <TextInput
                          id="status"
                          type="text"
                          placeholder="Status"
                          icon={HiIdentification}
                          value="Booked"
                          {...bookingData("status")}
                          readOnly
                          className="cursor-not-allowed opacity-50"
                        />
                      </div>

                      <div className="mb-2 hidden">
                        <TextInput
                          id="date"
                          type="text"
                          placeholder="Date"
                          icon={HiIdentification}
                          value={new Date().toISOString()}
                          {...bookingData("date")}
                          readOnly
                          className="cursor-not-allowed opacity-50"
                        />
                      </div>

                      <div className="flex w-full">
                        <Button
                          disabled={bookLoading}
                          type="submit"
                          className="w-full  mt-5"
                        >
                          <div className={`mr-3 ${bookLoading || "hidden"}`}>
                            <Spinner size="sm" light={true} />
                          </div>
                          {bookLoading ? "Loading..." : "Book Now"}
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        )}
      </>
    </>
  );
};

export default MyWishlist;
