import { updateProfile } from "firebase/auth";
import React, { useContext, useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useScrollToTop from "../../../hooks/useScrollToTop";
import useTitle from "../../../hooks/useTitle";
import { AuthContext } from "../../../Contexts/UserContext";
import { showAuthErrorToast } from "../../../customFunction/showAuthErrorToast";
import { setJwtToken } from "../../../customFunction/setJwtToken";
import { useForm } from "react-hook-form";
import {
  HiLockClosed,
  HiMail,
  HiOutlineCloudUpload,
  HiPhone,
  HiUser,
} from "react-icons/hi";
import { Button, Label, Radio, Spinner, TextInput } from "flowbite-react";

const Register = () => {
  useScrollToTop();
  useTitle("Register");

  const [userPhoto, setUserPhoto] = useState("");
  const [uploadFiles, setUploadFiles] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);

  const { register: userData, handleSubmit, reset } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const { loginWithGoogle, loginWithGitHub, register, setLoading } =
    useContext(AuthContext);

  const handleRegister = async (data) => {
    const password = data.password;

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

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
        toast.success("Image uploaded successfully");
        data.image = imgData.data.display_url;
      } else {
        toast.error("Image upload failed");
        data.image = "https://i.ibb.co/FwzH053/default-User-Avatar.jpg";
      }
    } else {
      data.image = "https://i.ibb.co/FwzH053/default-User-Avatar.jpg";
      toast.success("Image not found. Default image set");
    }

    data.isVerified = false;
    // Date format: 12 Nov, 2022
    const dateNow = new Date().toDateString().split(" ").slice(1, 4);
    data.joinDate = dateNow[0] + " " + dateNow[1] + ", " + dateNow[2];
    // Date End
    data.wishlist = [];
    data.image || (data.image = "");

    const { name, email, phone, role, image, joinDate, wishlist } = data;

    try {
      const { user } = await register(email, password);
      await updateProfile(user, {
        displayName: name,
        photoURL: image,
      });
      const { uid } = user;
      const newUser = {
        _id: uid,
        name,
        email,
        phone,
        role,
        isVerified: false,
        image,
        joinDate,
        wishlist,
      };
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        // navigate(from);
        setJwtToken(user.email);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      showAuthErrorToast(error);
    }
    setSubmitLoading(false);
    reset();
  };

  /*  

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    register(email, password)
      .then((result) => {
        toast.success("Registration successful");
        // JWT TOKEN
        setJwtToken(result.user);

        updateProfile(result.user, {
          displayName: name,
          photoURL: photoURL,
        })
          .then(() => {
            setLoading(false);
            toast.info("Profile Updated");
          })
          .catch((error) => {
            showAuthErrorToast(error);
          });

        navigate(from, { replace: true });
      })
      .catch((error) => {
        showAuthErrorToast(error);
        setLoading(false);
      });
      
      */

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then((result) => {
        // JWT TOKEN
        setJwtToken(result.user);

        navigate(from, { replace: true });
        toast.success(`Welcome ${result.user.displayName}`);
      })
      .catch((error) => {
        showAuthErrorToast(error);
        setLoading(false);
      });
  };

  const handleGithubLogin = () => {
    loginWithGitHub()
      .then((result) => {
        // JWT TOKEN
        setJwtToken(result.user);

        navigate(from, { replace: true });
        toast.success(`Welcome ${result.user.displayName}`);
      })
      .catch((error) => {
        showAuthErrorToast(error);
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center h-full py-14 w-full bg-gray-200 dark:bg-slate-900 px-5">
      <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
          Create a new account
        </div>
        <div className="flex gap-4 item-center">
          <button
            onClick={handleGithubLogin}
            type="button"
            className="py-2 px-4 flex justify-center items-center  bg-black/80 hover:bg-black focus:ring-black focus:ring-offset-black text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            <FaGithub className="mr-2" />
            GitHub
          </button>
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            <FaGoogle className="mr-2" />
            Google
          </button>
        </div>

        <div className="mt-8">
          <form onSubmit={handleSubmit(handleRegister)}>
            <div className="mb-2 block">
              <TextInput
                id="name"
                type="text"
                placeholder="Your Name"
                required={true}
                icon={HiUser}
                {...userData("name", { required: true })}
              />
            </div>

            <div className="mb-2 block">
              <TextInput
                id="email"
                type="email"
                placeholder="Your Email"
                required={true}
                icon={HiMail}
                {...userData("email", { required: true })}
              />
            </div>

            <div className="mb-2 block">
              <TextInput
                id="phone"
                type="tel"
                placeholder="Your Phone"
                required={true}
                icon={HiPhone}
                {...userData("phone", { required: true })}
              />
            </div>

            <div className="mb-2 block">
              <TextInput
                id="password"
                type="password"
                placeholder="Your Password"
                required={true}
                icon={HiLockClosed}
                {...userData("password", { required: true })}
              />
            </div>

            <fieldset className="flex gap-4 mb-4" id="radio">
              <legend className="dark:text-gray-300 font-semibold mb-1">
                Register as:
              </legend>
              <div className="flex items-center gap-2">
                <Radio
                  id="buyer"
                  name="role"
                  value="buyer"
                  {...userData("role", { required: true })}
                  defaultChecked={true}
                />
                <Label htmlFor="buyer">Buyer</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="seller"
                  name="role"
                  value="seller"
                  {...userData("role", { required: true })}
                />
                <Label htmlFor="seller">Seller</Label>
              </div>
            </fieldset>

            <div className="flex flex-col mb-6 overflow-hidden">
              <div className="flex items-center justify-center w-full relative">
                <label
                  htmlFor="dropzone-file"
                  className={`flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
                >
                  {userPhoto && (
                    <img
                      src={userPhoto}
                      alt=""
                      className="absolute w-full h-full rounded-lg object-cover opacity-50"
                      aria-disabled
                    />
                  )}

                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <HiOutlineCloudUpload className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                      <span className="font-semibold">
                        Click to upload a Profile Photo
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
                    // {...userData("image")}
                    onChange={(e) => {
                      const file = e.target.files[0];

                      if (file) {
                        if (file.type.includes("image")) {
                          setUploadFiles(e.target.files);
                          const url = URL.createObjectURL(file);
                          setUserPhoto(url);
                        } else {
                          toast.error("Only Image file is allowed");
                        }
                      } else {
                        setUserPhoto(null);
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

        <div className="flex items-center justify-center mt-6">
          <Link
            to="/login"
            className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white"
          >
            <span className="ml-2">
              Already have an account ?{" "}
              <span className="text-blue-700 font-semibold underline">
                Sign in
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
