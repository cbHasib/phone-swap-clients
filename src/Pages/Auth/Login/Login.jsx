import { Button, Modal, Spinner } from "flowbite-react";
import React, { useContext, useState } from "react";
import { FaEnvelope, FaGithub, FaGoogle, FaUnlock } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Contexts/UserContext";
import useScrollToTop from "../../../hooks/useScrollToTop";
import useTitle from "../../../hooks/useTitle";
import { showAuthErrorToast } from "../../../customFunction/showAuthErrorToast";
import { useForm } from "react-hook-form";
import { setJwtToken } from "../../../customFunction/setJwtToken";
import { getCurrentDate } from "../../../customFunction/getCurrentDate";

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { register, reset, handleSubmit } = useForm();
  const {
    loginWithGoogle,
    loginWithGitHub,
    signIn,
    resetPassword,
    setLoading,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const showModal = () => {
    setIsOpen(true);
  };

  useScrollToTop();
  useTitle("Login");
  const hideModal = () => {
    setIsOpen(false);
  };
  const date = getCurrentDate();

  const handleLogin = (data) => {
    setSubmitLoading(true);
    const { email, password } = data;

    if (!email || !password) {
      toast.error("Please fill all the fields");
      setSubmitLoading(false);
      return;
    }

    setLoading(true);
    signIn(email, password)
      .then((result) => {
        setJwtToken(result.user.email);
        reset();
        navigate(from);
        setSubmitLoading(false);
        toast.success(`Welcome back ${result.user.displayName}`);
      })
      .catch((err) => {
        setLoading(false);
        showAuthErrorToast(err);
        setSubmitLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(async (result) => {
        const { displayName, email, photoURL, uid } = result.user;

        const newUser = {
          name: displayName,
          email,
          phone: "",
          role: "buyer",
          isVerified: false,
          image: photoURL,
          joinDate: date,
          wishlist: [],
          uid,
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

          navigate(from, { replace: true });
          toast.success(`Welcome back ${result.user.displayName}`);
          setJwtToken(email);
        } else {
          toast.error(data.error);
        }
      })
      .catch((error) => {
        showAuthErrorToast(error);
        setLoading(false);
      });
  };

  const handleGithubLogin = () => {
    loginWithGitHub()
      .then(async (result) => {
        const { displayName, email, photoURL, uid } = result.user;

        const newUser = {
          name: displayName,
          email,
          phone: "",
          role: "buyer",
          isVerified: false,
          image: photoURL,
          joinDate: date,
          wishlist: [],
          uid,
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

          navigate(from, { replace: true });
          toast.success(`Welcome back ${result.user.displayName}`);
          setJwtToken(email);
        } else {
          toast.error(data.error);
        }
      })
      .catch((error) => {
        showAuthErrorToast(error);
        setLoading(false);
      });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (!email) {
      toast.error("Email is required");
      return;
    }
    resetPassword(email)
      .then(() => {
        toast.success("Reset email sent successfully. Check your inbox/spam.");
        setLoading(false);
      })
      .catch((error) => {
        showAuthErrorToast(error);
        // toast.error("Something went wrong. Check you email and try again.");
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center h-full py-14 w-full bg-gray-200 dark:bg-slate-900 px-5">
      <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
          Login To Your Account
        </div>
        <div className="flex gap-4 item-center">
          <button
            type="button"
            onClick={handleGithubLogin}
            className="py-2 px-4 flex justify-center items-center  bg-black/80 hover:bg-black focus:ring-black focus:ring-offset-black text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            <FaGithub className="mr-2" />
            GitHub
          </button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            <FaGoogle className="mr-2" />
            Google
          </button>
        </div>
        <div className="mt-8">
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="flex flex-col mb-2">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  name="email"
                  {...register("email")}
                  id="email"
                  required
                  className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Your email"
                />
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <FaUnlock />
                </span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  {...register("password")}
                  className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Your password"
                />
              </div>
            </div>
            <div className="flex items-center mb-6 -mt-4">
              <div className="flex ml-auto">
                <span
                  onClick={showModal}
                  className="inline-flex text-xs font-thin text-gray-500 sm:text-sm dark:text-gray-300 hover:text-gray-700 dark:hover:text-white cursor-pointer"
                >
                  Forgot Your Password?
                </span>
              </div>
            </div>
            <div className="flex w-full">
              <Button disabled={submitLoading} type="submit" className="w-full">
                <div className={`mr-3 ${submitLoading || "hidden"}`}>
                  <Spinner size="sm" light={true} />
                </div>
                {submitLoading ? "Loading..." : "Login"}
              </Button>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center mt-6">
          <Link
            to="/register"
            className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white"
          >
            <span className="ml-2">
              You don&#x27;t have an account?{" "}
              <span className="text-blue-700 font-semibold underline">
                Register
              </span>
            </span>
          </Link>
        </div>
      </div>

      <>
        <Modal show={isOpen} size="md" popup={true} onClose={hideModal}>
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8 text-center">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Reset your password
              </h3>
              <form onSubmit={handleResetPassword}>
                <div className="flex flex-col mb-2">
                  <div className="flex relative ">
                    <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                      <svg
                        width="15"
                        height="15"
                        fill="currentColor"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
                      </svg>
                    </span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Your email"
                    />
                  </div>
                </div>

                <div className="flex w-full">
                  <button
                    type="submit"
                    className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg mt-4"
                  >
                    Reset
                  </button>
                </div>
              </form>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered?{" "}
                <Link
                  to="/register"
                  className="text-blue-700 hover:underline dark:text-blue-500"
                >
                  Create account
                </Link>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};

export default Login;
