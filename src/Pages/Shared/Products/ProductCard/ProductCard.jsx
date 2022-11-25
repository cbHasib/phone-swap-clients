import { Button } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineHeart } from "react-icons/hi";
import { TbCurrencyTaka } from "react-icons/tb";
import { AiOutlineClockCircle } from "react-icons/ai";
import { GoLocation } from "react-icons/go";

const ProductCard = () => {
  const navigate = useNavigate();

  const product = {
    _id: 1,
    name: "Product Name",
    price: 100,
    image: "https://picsum.photos/200/300",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    category: "Category Name",
    rating: 4.5,
    numReviews: 10,
    condition: "New",
  };

  const { _id, name, price, image, description, condition } = product;

  return (
    <div className="max-w-[300px] w-full bg-white rounded-md shadow dark:bg-gray-900 drop-shadow-md dark:text-gray-100 p-3 flex flex-col justify-between text-center hover:-translate-y-1 duration-300 relative">
      <div className="bg-yellow-400 text-white p-1.5 rounded-full absolute top-1 right-1">
        {condition}
      </div>
      <div>
        <figure>
          <img
            src={image}
            alt={name}
            className="object-cover object-center w-full rounded-lg h-48 dark:bg-gray-500"
          />
        </figure>

        <div className="pt-2">
          <h2 className="text-xl font-semibold tracking-wide text-ellipsis ">
            {name}
          </h2>
          <div className="flex flex-col justify-center text-center">
            <div className="flex justify-center items-center text-blue-700 text-xl font-bold">
              <TbCurrencyTaka className="w-5 h-5" />
              <h2>{price}</h2>
            </div>

            <div className="flex flex-wrap justify-between items-center my-2 font-medium text-gray-500 dark:text-gray-300 gap-2">
              <div className="flex items-center gap-1 justify-center w-fit">
                <GoLocation className="text-blue-700 stroke-1" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center justify-center gap-1 w-fit">
                <AiOutlineClockCircle className="text-blue-700 stroke-1" />
                <span>8 mins ago</span>
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
          onClick={() => navigate(`/services/${_id}`)}
          type="button"
          size="sm"
          title="View Details"
          className="flex-1"
        >
          View Details
        </Button>

        <Button
          color="warning"
          size="sm"
          title="Add to Wishlist"
          className="w-fit"
        >
          <HiOutlineHeart className="h-5 w-5" />
          <span aria-hidden="true" className="hidden">
            Wishlist
          </span>
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
