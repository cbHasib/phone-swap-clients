import { useQuery } from "@tanstack/react-query";
import { Button, Modal, Spinner, TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  HiCurrencyBangladeshi,
  HiIdentification,
  HiLocationMarker,
  HiMail,
  HiPhone,
  HiUser,
  HiViewGrid,
} from "react-icons/hi";
import { AuthContext } from "../../../Contexts/UserContext";
import useDbUser from "../../../hooks/useDbUser";
import PhonesCardVer from "../../Phones/PhonesCardVer/PhonesCardVer";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

const AdvertiseItems = () => {
  const { user, loading } = useContext(AuthContext);
  const [dbUser, isDbUserLoading] = useDbUser(user?.email);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [bookLoading, setBookLoading] = useState(false);
  const [productId, setProductId] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const { register: bookingData, reset, handleSubmit } = useForm();

  const {
    data: promotedProducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["promotedProducts"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/products/promoted`
      );
      const data = await res.json();

      if (data.success) {
        return data.data;
      } else {
        return [];
      }
    },
  });

  const handleBooking = (id) => {
    if (!user || !dbUser) {
      toast.error("Please login to book");
      return;
    }
    setIsModalOpen(true);
    setProductId(id);
  };

  const handleBookSubmit = (data) => {
    const id = data.product_id;
    setBookLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/products/book/${id}`, {
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
          toast.success("Booking Successful");
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

  const handleAddToWishlist = (id) => {
    if (!user || !dbUser) {
      toast.error("Please login to add to wishlist");
      return;
    }
    setProductId(id);
    setWishlistLoading(true);
    setTimeout(() => {
      setWishlistLoading(false);
      toast.success(`Added to Wishlist for product ${id}`);
      refetch();
    }, 2000);
  };
  const handleReport = (id) => {
    if (!user || !dbUser) {
      toast.error("Please login to report");
      return;
    }
    setProductId(id);
    setWishlistLoading(true);
    setTimeout(() => {
      setWishlistLoading(false);
      toast.success(`Added to Wishlist for product ${id}`);
      refetch();
    }, 2000);
  };

  if (isLoading || isDbUserLoading || loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {promotedProducts?.length > 0 && (
        <div className="dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-5 py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-blue-700 dark:text-white/90 text-center">
              Sponsored Ads
            </h2>

            <div className="py-10 flex flex-wrap gap-6 justify-center items-center">
              {promotedProducts?.map((product) => (
                <PhonesCardVer
                  key={product?._id}
                  product={product}
                  isLoading={isLoading}
                  bookLoading={bookLoading}
                  wishlistLoading={wishlistLoading}
                  handleAddToWishlist={handleAddToWishlist}
                  handleBooking={handleBooking}
                  productId={productId}
                  handleReport={handleReport}
                  setModalContent={setModalContent}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {modalContent && (
        <>
          <Modal
            show={isModalOpen}
            size="md"
            popup={true}
            onClose={() => {
              setIsModalOpen(false);
              setModalContent(null);
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
                          value={modalContent?._id}
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
        </>
      )}
    </>
  );
};

export default AdvertiseItems;
