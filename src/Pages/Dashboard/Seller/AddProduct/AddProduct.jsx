import {
  Button,
  Label,
  Select,
  Spinner,
  Textarea,
  TextInput,
} from "flowbite-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useScrollToTop from "../../../../hooks/useScrollToTop";
import useTitle from "../../../../hooks/useTitle";
import { HiOutlineCloudUpload, HiOutlinePlus } from "react-icons/hi";

const AddProduct = () => {
  const [productPhoto, setProductPhoto] = useState("");
  const [uploadFiles, setUploadFiles] = useState([]);
  const [submitLoad, setSubmitLoad] = useState(false);
  const { register, reset, handleSubmit } = useForm();

  const handleAddProduct = (data) => {
    setSubmitLoad(true);
    data.image = uploadFiles;
    data.post_time = new Date().toString();

    data.seller_name = "Seller Name";
    data.sellerId = 1;
    // seller_isVerified = true;

    data.categoryId = 1;
    data.promoted = false;

    data.sold = false;

    console.log(data);
    toast.success("Product Added Successfully");

    setTimeout(() => {
      setSubmitLoad(false);
    }, 5000);

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
  //  image: "https://picsum.photos/200/300",
   // description:
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
          <div className="grid grid-cols-1 gap-5">
            <div>
              <div className="mb-2 block w-full">
                <Label htmlFor="product_name" value="Product Name" />
              </div>
              <TextInput
                id="product_name"
                type="text"
                placeholder="iPhone 12 Pro Max 256GB"
                required={true}
                shadow={true}
                {...register("product_name")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
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
                placeholder="30000"
                min={0}
                {...register("original_price", {
                  required: true,
                  min: 0,
                  valueAsNumber: true,
                })}
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
                placeholder="25000"
                min={0}
                shadow={true}
                required
                {...register("resale_price", {
                  required: true,
                  min: 0,
                  valueAsNumber: true,
                })}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="contact_number" value="Your Phone Number" />
              </div>
              <TextInput
                id="contact_number"
                type="tel"
                shadow={true}
                required
                placeholder="01XXXXXXXXX"
                {...register("contact_number", {
                  required: true,
                })}
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
                <option value="Poor">Poor</option>
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
            <div className="mb-2 block">
              <Label htmlFor="description" value="Product Description" />
            </div>
            <Textarea
              id="description"
              type="text"
              placeholder="Write a short description about your product"
              required={true}
              rows={3}
            />
          </div>

          <div className="flex flex-col mb-2 overflow-hidden">
            <div className="flex items-center justify-center w-full relative">
              <label
                htmlFor="dropzone-file"
                className={`flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
              >
                {productPhoto && (
                  <img
                    src={productPhoto}
                    alt=""
                    className="absolute w-full h-full rounded-lg object-cover opacity-50"
                    aria-disabled
                  />
                )}

                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <HiOutlineCloudUpload className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                    <span className="font-semibold">
                      Click to upload a Product Photo
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Only Image file is allowed
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  accept="image/*"
                  className="opacity-0 absolute z-10 h-full w-full cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files[0];

                    if (file) {
                      if (file.type.includes("image")) {
                        setUploadFiles(e.target.files);
                        console.log(file);
                        const url = URL.createObjectURL(file);
                        setProductPhoto(url);
                      } else {
                        toast.error("Only Image file is allowed");
                      }
                    } else {
                      setProductPhoto(null);
                      setUploadFiles([]);
                    }
                  }}
                />
              </label>
            </div>
          </div>

          <Button type="submit" disabled={submitLoad}>
            {submitLoad ? (
              <Spinner className="w-5 h-5 mr-2" />
            ) : (
              <HiOutlinePlus className="w-5 h-5 mr-2" />
            )}
            {submitLoad ? "Adding Product..." : "Add Product"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
