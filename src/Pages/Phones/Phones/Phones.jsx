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
  HiPhone,
  HiUser,
  HiViewGrid,
} from "react-icons/hi";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../Contexts/UserContext";
import useDbUser from "../../../hooks/useDbUser";
import useScrollToTop from "../../../hooks/useScrollToTop";
import useTitle from "../../../hooks/useTitle";
import ErrorMessage from "../../Shared/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";
import PhonesCardHor from "../PhonesCardHor/PhonesCardHor";

const Phones = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { id = "all" } = useParams();
  const { user, loading } = useContext(AuthContext);
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookLoading, setBookLoading] = useState(false);
  const { register: bookingData, reset, handleSubmit } = useForm();
  const [dbUser, isDbUserLoading] = useDbUser(user?.email);

  useScrollToTop();
  useTitle("Shop Phones");

  const {
    data: phonesData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["phonesData"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/products/category/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();

      if (data.success) {
        setErrorMessage("");
        return data.data;
      } else {
        setErrorMessage(data.error);
        return [];
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [id, refetch, user]);

  if (isLoading || loading || isDbUserLoading) {
    return <LoadingSpinner />;
  }
  if (errorMessage) {
    return <ErrorMessage error={errorMessage} />;
  }

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
          toast.error(data.message);
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
      <div className="flex flex-col gap-4">
        {phonesData?.map((phone) => (
          <PhonesCardHor
            key={phone._id}
            product={phone}
            setIsModalOpen={setIsModalOpen}
            setModalContent={setModalContent}
          />
        ))}
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
        )}
      </>
    </>
  );
};

export default Phones;
