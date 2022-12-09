import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "flowbite-react";
import {
  HiOutlineCreditCard,
  HiOutlineInformationCircle,
} from "react-icons/hi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ bookingProduct }) => {
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const {
    buyer_email,
    buyer_id,
    buyer_name,
    contact_number,
    product_id,
    product_name,
    product_price,
    seller_id,
    _id,
  } = bookingProduct;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${process.env.REACT_APP_API_URL}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [product_price]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    setSubmitLoading(true);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setErrorMessage(error.message);
    } else {
      setErrorMessage("");
      console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: buyer_name,
            email: buyer_email,
            phone: contact_number,
          },
        },
      });

    if (confirmError) {
      setErrorMessage(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      // store payment info in the database
      const payment = {
        price: product_price,
        transactionId: paymentIntent.id,
        email: buyer_email,
        bookingId: _id,
        buyerId: buyer_id,
        sellerId: seller_id,
        productId: product_id,
        productName: product_name,
        paymentMethod: "card",
      };
      fetch(`${process.env.REACT_APP_API_URL}/payments`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setSubmitLoading(false);
            navigate("/dashboard/my-orders");
            toast.success(data.message);
          } else {
            setSubmitLoading(false);
            toast.error(data.error);
          }
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="flex justify-center items-center pt-10">
          <Button
            type="submit"
            disabled={!stripe || submitLoading || !clientSecret}
            size="sm"
          >
            {submitLoading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-200 mr-2"></div>
              </div>
            ) : (
              <HiOutlineCreditCard className="mr-2" />
            )}
            {submitLoading ? "Processing..." : "Pay"}
          </Button>
        </div>
        {errorMessage && (
          <div className="pt-5 flex justify-center items-center text-red-600">
            <HiOutlineInformationCircle className="mr-2" />
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
