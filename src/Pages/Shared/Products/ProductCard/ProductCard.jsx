import { Button } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineHeart } from "react-icons/hi";
import { TbCurrencyTaka } from "react-icons/tb";

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
    <div className="max-w-[380px] w-full bg-white rounded-md shadow-md dark:bg-gray-900 drop-shadow-2xl dark:text-gray-100 p-3 flex flex-col justify-between text-center hover:-translate-y-1 duration-300 relative">
      <div className="bg-orange-500 text-white p-1.5 rounded-full absolute top-1 right-1">
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

        <div className="px-3 py-2 space-y-3">
          <h2 className="text-xl font-semibold tracking-wide text-ellipsis ">
            {name}
          </h2>
          <div className="flex justify-center items-center">
            <div className="flex items-center text-blue-700 text-lg font-bold">
              <TbCurrencyTaka className="w-5 h-5" />

              <h2>{price}</h2>
            </div>
          </div>
        </div>
        <p className="">{description.slice(0, 30) + "..."}</p>
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
