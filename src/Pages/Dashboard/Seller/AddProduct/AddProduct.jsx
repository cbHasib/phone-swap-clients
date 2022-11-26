import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useScrollToTop from "../../../../hooks/useScrollToTop";
import useTitle from "../../../../hooks/useTitle";

const AddProduct = () => {
  const [submitLoad, setSubmitLoad] = useState(false);
  const { register, reset, handleSubmit } = useForm();

  const handleAddProduct = (e) => {
    e.preventDefault();
    setSubmitLoad(true);

    /* 
    fetch(`${process.env.REACT_APP_SERVER_URL}/add-new-service`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          reset();
          toast.success(data.message);
        } else {
          toast.error(data.error);
        }
        setLoad(false);
      })
      .catch((error) => {
        setLoad(false);
        toast.error(error.message);
      }); */
  };

  /* 

   _id: 1,
   // name: "Product Name kbdfjbjh b jbjbbhuy  ihiefbiu jhsgfduyguyg  ",
    image: "https://picsum.photos/200/300",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    category: "Category Name",
   // condition: "Good",
   // location: "Dhaka",
 //   resale_price: 200,
  //  original_price: 300,
  //  years_used: 1,
    post_time: "2021-08-01T12:00:00.000Z",
    seller_name: "Seller Name",
    sellerId: 1,
    seller_isVerified: true,

    categoryId: 1,
    promoted: true,
    sold: false,
*/

  useTitle("Add New Product");
  useScrollToTop();

  const sellerLocation = [
    { value: "Dhaka", label: "Dhaka" },
    { value: "Chittagong", label: "Chittagong" },
    { value: "Sylhet", label: "Sylhet" },
    { value: "Rajshahi", label: "Rajshahi" },
    { value: "Khulna", label: "Khulna" },
    { value: "Barisal", label: "Barisal" },
    { value: "Rangpur", label: "Rangpur" },
    { value: "Mymensingh", label: "Mymensingh" },
  ];

  return (
    <>
      <div className="lg:py-10 lg:px-20 mx-auto">
        <form
          onSubmit={handleSubmit(handleAddProduct)}
          className="flex flex-col gap-4 p-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
            <div className="lg:col-span-4">
              <div className="mb-2 block w-full">
                <Label htmlFor="name" value="Product Name" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="iPhone 12 Pro Max 256GB"
                required={true}
                shadow={true}
                {...register("name")}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="original_price" value="Original Price" />
              </div>
              <TextInput
                id="original_price"
                type="number"
                addon="৳"
                shadow={true}
                required
                min={0}
                {...register("original_price")}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="resale_price" value="Resale Price" />
              </div>
              <TextInput
                id="resale_price"
                type="number"
                addon="৳"
                min={0}
                shadow={true}
                required
                {...register("resale_price")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="condition" value="Your Phone Condition" />
              </div>
              <Select
                id="condition"
                required={true}
                shadow={true}
                {...register("condition")}
              >
                <option disabled defaultChecked value="">
                  Select Condition
                </option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Poor">Like New</option>
              </Select>
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="location" value="Your Location" />
              </div>
              <Select
                id="location"
                required={true}
                shadow={true}
                {...register("location")}
              >
                <option disabled defaultChecked value="">
                  Select Location
                </option>
                {sellerLocation.map((location) => (
                  <option key={location.value} value={location.value}>
                    {location.label}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="years_used" value="Used Year" />
              </div>
              <Select
                id="years_used"
                required={true}
                shadow={true}
                {...register("years_used", {
                  required: true,
                  min: 0,
                  valueAsNumber: true,
                })}
              >
                <option disabled defaultChecked value="">
                  Select Years
                </option>

                <option value="1">1 year</option>
                <option value="2">2 year</option>
                <option value="3">3 year</option>
                <option value="4">4 year</option>
                <option value="5">5 year</option>
                <option value="6">6 year</option>
                <option value="7">7 year</option>
                <option value="8">8 year</option>
                <option value="9">9 year</option>
                <option value="10">10 year</option>
              </Select>
            </div>
          </div>

          <div>
            <div className="mb-2 block w-full">
              <Label htmlFor="thumbnail" value="Service Thumbnail" />
            </div>
            <TextInput
              id="thumbnail"
              type="url"
              placeholder="www.example.com/image.jpg"
              required={true}
              shadow={true}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="details" value="Service Details" />
            </div>
            <Textarea
              id="details"
              type="text"
              placeholder="Hasibul Hasan could be the best option for your big day. He has been successfully covering wedding events as well with his photography creativity to make the day special for couples........"
              required={true}
              rows={5}
            />
          </div>

          <Button type="submit">Add Service</Button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
