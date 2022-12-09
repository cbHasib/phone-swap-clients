import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../Contexts/UserContext";
import useDbUser from "../../../hooks/useDbUser";
import useTitle from "../../../hooks/useTitle";
import ErrorMessage from "../../Shared/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
);

const PaymentPage = () => {
  const { id } = useParams();
  const { user, loading } = useContext(AuthContext);
  const [dbUser, isDbUserLoading] = useDbUser(user?.email);
  const [bookingProduct, setBookingProduct] = useState(null);
  const [errorMessages, setErrorMessages] = useState("");
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  useEffect(() => {
    if (!dbUser) return;
    setIsPaymentLoading(true);
    fetch(
      `${process.env.REACT_APP_API_URL}/products/booked/${dbUser?.email}/${id}`,

      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBookingProduct(data.data);
          setIsPaymentLoading(false);
          setErrorMessages("");
        } else {
          setIsPaymentLoading(false);
          setErrorMessages(data.error);
        }
      })
      .catch((err) => {
        setIsPaymentLoading(false);
        setErrorMessages(err.message);
      });
  }, [dbUser, id]);

  useTitle(`Pay for ${bookingProduct?.product_name}`);
  if (loading || isDbUserLoading || isPaymentLoading) return <LoadingSpinner />;
  if (errorMessages) return <ErrorMessage error={errorMessages} />;

  return (
    <>
      {bookingProduct && (
        <div className="flex flex-col justify-center items-center">
          <div>
            <h2 className="text-2xl dark:text-gray-300 font-semibold">
              Pay for{" "}
              <span className="text-blue-700 dark:text-blue-600">
                {bookingProduct?.product_name}
              </span>
            </h2>
          </div>

          <div className="w-1/3 mt-10 rounded-lg bg-white shadow-lg drop-shadow-md dark:bg-gray-900 px-10 py-5">
            <div className="w-full py-5">
              <Elements stripe={stripePromise}>
                <CheckoutForm bookingProduct={bookingProduct} />
              </Elements>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentPage;
