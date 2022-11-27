import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { HiOutlineCloudUpload, HiUser } from "react-icons/hi";
import { Button, Spinner, TextInput } from "flowbite-react";
import useScrollToTop from "../../../../hooks/useScrollToTop";
import useTitle from "../../../../hooks/useTitle";
import { getCurrentDate } from "../../../../customFunction/getCurrentDate";

const AddProductCategory = () => {
  useScrollToTop();
  useTitle("Add Product Category");

  const [categoryPhoto, setCategoryPhoto] = useState("");
  const [uploadFiles, setUploadFiles] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const navigate = useNavigate();

  const date = getCurrentDate();

  const handleAddCategory = async (data) => {
    setSubmitLoading(true);
    if (uploadFiles.length > 0) {
      const formData = new FormData();
      formData.append("image", uploadFiles[0]);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_KEY}&name=${data.name}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const imgData = await response.json();

      if (imgData.success) {
        data.image = imgData.data.display_url;
      } else {
        data.image = "https://i.ibb.co/FwzH053/default-User-Avatar.jpg";
      }
    } else {
      data.image = "https://i.ibb.co/FwzH053/default-User-Avatar.jpg";
    }

    data.image || (data.image = "");

    const { name, image } = data;
    const category = { name, image, date };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/productCategory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(category),
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        setSubmitLoading(false);
        reset();
        navigate("/dashboard/product-category");
      } else {
        toast.error(data.error);
        setSubmitLoading(false);
      }
    } catch (error) {}
    setSubmitLoading(false);
    reset();
    setCategoryPhoto("");
  };

  return (
    <div className="flex justify-center items-center h-full py-14 w-full bg-gray-200 dark:bg-slate-900 px-5">
      <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
          Add New Product Category
        </div>

        <div className="mt-8">
          <form onSubmit={handleSubmit(handleAddCategory)}>
            <div className="mb-2 block">
              <TextInput
                id="name"
                type="text"
                placeholder="Category Name"
                required={true}
                icon={HiUser}
                {...register("name", { required: true })}
              />
            </div>

            <div className="flex flex-col mb-6 overflow-hidden">
              <div className="flex items-center justify-center w-full relative">
                <label
                  htmlFor="dropzone-file"
                  className={`flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
                >
                  {categoryPhoto && (
                    <img
                      src={categoryPhoto}
                      alt=""
                      className="absolute w-full h-full rounded-lg object-cover opacity-50"
                      aria-disabled
                    />
                  )}

                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <HiOutlineCloudUpload className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                      <span className="font-semibold">
                        Click to upload a Category Photo
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
                          const url = URL.createObjectURL(file);
                          setCategoryPhoto(url);
                        } else {
                          toast.error("Only Image file is allowed");
                        }
                      } else {
                        setCategoryPhoto(null);
                        setUploadFiles([]);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            <div className="flex w-full">
              <Button disabled={submitLoading} type="submit" className="w-full">
                <div className={`mr-3 ${submitLoading || "hidden"}`}>
                  <Spinner size="sm" light={true} />
                </div>
                {submitLoading ? "Loading..." : "Register"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductCategory;
