import { Badge, Button, Spinner } from "flowbite-react";
import React, { useState } from "react";
import { HiOutlineBookmark, HiOutlineHeart } from "react-icons/hi";
import { TbCurrencyTaka } from "react-icons/tb";
import {
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineUser,
} from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { FcApproval } from "react-icons/fc";
import { CiWarning } from "react-icons/ci";
import toast from "react-hot-toast";

const PhonesCardVer = ({
  product: productInfo,
  handleBooking,
  bookLoading,
  productId,
  handleReport,
  setModalContent,
}) => {
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const handleAddToWishlist = (id) => {
    setWishlistLoading(true);

    fetch(`${process.env.REACT_APP_API_URL}/wishlist/add/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setWishlistLoading(false);
          toast.success(data.message);
        } else {
          setWishlistLoading(false);
          toast.error(data.error);
        }
      })
      .catch((err) => {
        setWishlistLoading(false);
        toast.error(err.message);
      });
  };

  return (
    <div className="max-w-[330px] w-full bg-white rounded-md shadow dark:bg-gray-900 drop-shadow-md dark:text-gray-100 p-3 flex flex-col justify-between text-center hover:-translate-y-1 duration-300 relative">
      <div className="absolute top-3 right-3 shadow-lg">
        <Button
          onClick={() => handleReport(productInfo?._id)}
          size="xs"
          color="warning"
          className="font-normal"
        >
          <CiWarning className="mr-1 stroke-1" />
          Report
        </Button>
      </div>
      <div>
        <figure>
          <img
            src={productInfo?.image}
            alt={productInfo?.product_name}
            className="object-cover object-center w-full rounded-lg h-48 dark:bg-gray-500"
          />
        </figure>

        <div className="pt-2">
          <div>
            <div className="flex flex-col items-center">
              <h2 className="text-lg font-semibold text-ellipsis">
                {productInfo?.product_name}
              </h2>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Condition:
                </p>
                <Badge
                  color={
                    productInfo?.condition === "Excellent"
                      ? "success"
                      : productInfo?.condition === "Good"
                      ? "info"
                      : "warning"
                  }
                >
                  {productInfo?.condition}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center text-center py-2 gap-1">
            <div className="flex justify-evenly items-center">
              <div className="flex items-center text-blue-700 text-md">
                <span className="text-gray-800 dark:text-gray-300">
                  Resale:
                </span>
                <TbCurrencyTaka className="w-5 h-5" />
                {productInfo?.resale_price}
              </div>

              <div className="flex items-center text-blue-700 text-md">
                <span className="text-gray-800 dark:text-gray-300">
                  Original:
                </span>
                <TbCurrencyTaka className="w-5 h-5" />
                {productInfo?.original_price}
              </div>
            </div>

            <div className="flex flex-wrap justify-evenly items-center text-gray-500 text-sm dark:text-gray-400">
              <div className="flex items-center gap-1 justify-center w-fit">
                <GoLocation className="text-blue-700 stroke-1" />
                <span>{productInfo?.location}</span>
              </div>
              <div className="flex items-center justify-center gap-1 w-fit">
                <AiOutlineClockCircle className="text-blue-700 stroke-1" />
                <span>{productInfo?.post_time}</span>
              </div>
            </div>

            <div className="flex justify-evenly items-center gap-1 dark:text-gray-300">
              <div className="flex items-center justify-center gap-1 w-fit">
                <AiOutlineUser className="text-blue-700" />
                <span>{productInfo?.seller_name}</span>
                {productInfo?.seller_isVerified && (
                  <span title="Verified Seller">
                    <FcApproval />
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 justify-center w-fit">
                <AiOutlineCalendar className="text-blue-700" />
                <span>
                  {productInfo?.years_used}{" "}
                  {productInfo?.years_used > 1 ? "years used" : "year used"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-xs">
          {productInfo?.description.length > 100
            ? productInfo?.description.slice(0, 100) + "..."
            : productInfo?.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 px-3 py-2">
        <Button
          onClick={() => {
            handleBooking(productInfo?._id);
            setModalContent(productInfo);
          }}
          type="button"
          size="sm"
          title="View Details"
          className="flex-1"
          disabled={bookLoading && productId === productInfo?._id}
        >
          <div className="flex items-center gap-2 ">
            {bookLoading && productId === productInfo?._id ? (
              <Spinner size="sm" light={true} />
            ) : (
              <HiOutlineBookmark className="h-5 w-5" />
            )}
            <span>Book Now</span>
          </div>
        </Button>

        <Button
          color="success"
          size="sm"
          title="Add to Wishlist"
          className="w-fit"
          onClick={() => {
            handleAddToWishlist(productInfo?._id);
          }}
          disabled={wishlistLoading && productId === productInfo?._id}
        >
          {wishlistLoading && productId === productInfo?._id ? (
            <Spinner size="sm" light={true} />
          ) : (
            <HiOutlineHeart className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default PhonesCardVer;
