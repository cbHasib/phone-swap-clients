import { Badge, Button, Spinner } from "flowbite-react";
import React, { useState } from "react";
import {
  HiOutlineBan,
  HiOutlineBookmark,
  HiOutlineHeart,
} from "react-icons/hi";
import { TbCurrencyTaka } from "react-icons/tb";
import {
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineUser,
} from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { FcApproval } from "react-icons/fc";
import toast from "react-hot-toast";

const PhonesCardHor = () => {
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [bookLoading, setBookLoading] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);

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

  const handleReport = () => {
    setReportLoading(true);
    setTimeout(() => {
      setReportLoading(false);
      toast.success("Reported");
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
    <div className="w-full bg-white rounded-md shadow dark:bg-gray-900 drop-shadow-md dark:text-gray-100 p-3 flex flex-col md:flex-row hover:drop-shadow-none duration-300">
      <figure className="w-full md:w-[200px] h-[200px] md:h-[150px] rounded-md">
        <img
          src={image}
          alt={name}
          className="object-cover object-center w-full h-full dark:bg-gray-500"
        />
      </figure>

      <div className="flex flex-col md:flex-row items-center justify-between w-full px-5 gap-5 py-3 md:py-1">
        <div className="flex-1">
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex flex-col">
              <h2 className="text-xl font-bold tracking-wide text-ellipsis">
                {name}
              </h2>
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

            <div>
              <div className="flex items-center text-blue-700 text-md font-medium">
                <span className="text-gray-600 dark:text-gray-300">
                  Resale Price:
                </span>
                <TbCurrencyTaka className="w-5 h-5" /> {resale_price}
              </div>

              <div className="flex items-center text-blue-700 text-md font-medium">
                <span className="text-gray-600 dark:text-gray-300">
                  Original Price:
                </span>
                <TbCurrencyTaka className="w-5 h-5" /> {original_price}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between my-2">
            <div>
              <div className="flex items-center justify-center gap-1 w-fit">
                <AiOutlineUser className="text-blue-700" />
                <span>
                  <span className="font-semibold">Seller:</span> {seller_name}
                </span>
                {seller_isVerified && (
                  <span title="Verified Seller">
                    <FcApproval />
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 justify-center w-fit">
                <AiOutlineCalendar className="text-blue-700" />
                <span>
                  <span className="font-semibold">Used:</span> {years_used}{" "}
                  {years_used > 1 ? "years" : "year"}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1 justify-center w-fit">
                <GoLocation className="text-blue-700" />
                <span>{location}</span>
              </div>

              <div className="flex items-center justify-center gap-1 w-fit">
                <AiOutlineClockCircle className="text-blue-700" />
                <span>{postDate}</span>
              </div>
            </div>
          </div>

          <p className="text-gray-500 dark:text-gray-400 text-xs text-justify">
            <span className="font-medium">Details:</span> {description}
          </p>
        </div>

        <div className="flex md:flex-col justify-center-center gap-2">
          <Button
            onClick={() => handleBooking(_id)}
            type="button"
            size="sm"
            className="w-1full"
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

          <Button
            onClick={() => handleAddToWishlist(_id)}
            color="warning"
            size="sm"
            title="Add to Wishlist"
            className="w-1full"
            disabled={wishlistLoading}
          >
            <div className="flex items-center gap-2 ">
              {wishlistLoading ? (
                <Spinner size="sm" light={true} />
              ) : (
                <HiOutlineHeart className="h-5 w-5" />
              )}
              <span>Wishlist</span>
            </div>
          </Button>
          <Button
            onClick={() => handleReport(_id)}
            color="light"
            size="sm"
            title="Report to Admin"
            className="w-1full"
            disabled={reportLoading}
          >
            <div className="flex items-center gap-2 ">
              {reportLoading ? (
                <Spinner size="sm" light={true} />
              ) : (
                <HiOutlineBan className="h-5 w-5" />
              )}
              <span>Report</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhonesCardHor;
