import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../Contexts/UserContext";
import useDbUser from "../../../hooks/useDbUser";
import useTitle from "../../../hooks/useTitle";
import ErrorMessage from "../../Shared/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

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
        <div className="flex justify-center items-center">
          <h2 className="text-2xl dark:text-gray-300 font-semibold">
            Pay for{" "}
            <span className="text-blue-700 dark:text-blue-600">
              {bookingProduct?.product_name}
            </span>
          </h2>
        </div>
      )}
    </>
  );
};

export default PaymentPage;
