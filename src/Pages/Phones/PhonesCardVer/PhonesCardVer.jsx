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
import toast from "react-hot-toast";

const PhonesCardVer = () => {
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [bookLoading, setBookLoading] = useState(false);

  const handleBooking = () => {
    setBookLoading(true);
    setTimeout(() => {
      setBookLoading(false);
      toast.success("Booking Successful");
    }, 2000);
  };

  const handleAddToWishlist = () => {
    setWishlistLoading(true);
    setTimeout(() => {
      setWishlistLoading(false);
      toast.success("Added to Wishlist");
    }, 2000);
  };

  const product = {
    _id: 1,
    name: "Product Name kbdfjbjh b jbjbbhuy  ihiefbiu jhsgfduyguyg  ",
    image: "https://picsum.photos/200/300",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    category: "Category Name",
    condition: "Good",
    location: "Dhaka",
    resale_price: 200,
    original_price: 300,
    years_used: 1,
    post_time: "2021-08-01T12:00:00.000Z",
    seller_name: "Seller Name",
    sellerId: 1,
    seller_isVerified: true,

    categoryId: 1,
    promoted: true,
    sold: false,
  };

  const {
    _id,
    name,
    image,
    description,
    condition,

    location,
    resale_price,
    original_price,
    years_used,
    post_time,
    seller_name,
    seller_isVerified,
  } = product;

  // Date
  const makeDate = new Date(post_time).toDateString().split(" ").slice(1, 4);
  const postDate = makeDate[0] + " " + makeDate[1] + ", " + makeDate[2];
  // Date

  return (
    <div className="max-w-[300px] w-full bg-white rounded-md shadow dark:bg-gray-900 drop-shadow-md dark:text-gray-100 p-3 flex flex-col justify-between text-center hover:-translate-y-1 duration-300 relative">
      <div>
        <figure>
          <img
            src={image}
            alt={name}
            className="object-cover object-center w-full rounded-lg h-48 dark:bg-gray-500"
          />
        </figure>

        <div className="pt-2">
          <div>
            <div className="flex flex-col items-center">
              <h2 className="text-lg font-semibold text-ellipsis">{name}</h2>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Condition:
                </p>
                <Badge
                  color={
                    condition === "Excellent"
                      ? "success"
                      : condition === "Good"
                      ? "info"
                      : "warning"
                  }
                >
                  {condition}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center text-center py-2 gap-1">
            <div className="flex justify-evenly items-center">
              <div className="flex items-center text-blue-700 text-md">
                <span className="text-gray-800 dark:text-gray-300">
                  Resell:
                </span>
                <TbCurrencyTaka className="w-5 h-5" /> {resale_price}
              </div>

              <div className="flex items-center text-blue-700 text-md">
                <span className="text-gray-800 dark:text-gray-300">
                  Original:
                </span>
                <TbCurrencyTaka className="w-5 h-5" /> {original_price}
              </div>
            </div>

            <div className="flex flex-wrap justify-evenly items-center text-gray-500 text-sm dark:text-gray-400">
              <div className="flex items-center gap-1 justify-center w-fit">
                <GoLocation className="text-blue-700 stroke-1" />
                <span>{location}</span>
              </div>
              <div className="flex items-center justify-center gap-1 w-fit">
                <AiOutlineClockCircle className="text-blue-700 stroke-1" />
                <span>{postDate}</span>
              </div>
            </div>

            <div className="flex justify-evenly items-center gap-1 dark:text-gray-300">
              <div className="flex items-center justify-center gap-1 w-fit">
                <AiOutlineUser className="text-blue-700" />
                <span>{seller_name}</span>
                {seller_isVerified && (
                  <span title="Verified Seller">
                    <FcApproval />
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 justify-center w-fit">
                <AiOutlineCalendar className="text-blue-700" />
                <span>
                  {years_used} {years_used > 1 ? "years used" : "year used"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {description.slice(0, 100) + "..."}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 px-3 py-2">
        <Button
          onClick={() => handleBooking(_id)}
          type="button"
          size="sm"
          title="View Details"
          className="flex-1"
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

        <Button
          color="warning"
          size="sm"
          title="Add to Wishlist"
          className="w-fit"
          onClick={() => handleAddToWishlist(_id)}
          disabled={wishlistLoading}
        >
          {wishlistLoading ? (
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
