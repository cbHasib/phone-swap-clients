import { updateProfile } from "firebase/auth";
import React, { useContext } from "react";
import {
  FaCamera,
  FaEnvelope,
  FaGithub,
  FaGoogle,
  FaUnlock,
  FaUser,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useScrollToTop from "../../../hooks/useScrollToTop";
import useTitle from "../../../hooks/useTitle";
import { AuthContext } from "../../../Contexts/UserContext";
import { showAuthErrorToast } from "../../../customFunction/showAuthErrorToast";
import { setJwtToken } from "../../../customFunction/setJwtToken";

const Register = () => {
  useScrollToTop();
  useTitle("Register");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const { loginWithGoogle, loginWithGitHub, register, setLoading } =
    useContext(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoURL = e.target.photoURL.value;

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
  };

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
          <form onSubmit={handleRegister}>
            <div className="flex flex-col mb-2">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <FaUser />
                </span>
                <input
                  type="text"
                  id="name"
                  className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Your Name"
                />
              </div>
            </div>

            <div className="flex flex-col mb-2">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  id="email"
                  className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Your Email"
                />
              </div>
            </div>

            <div className="flex flex-col mb-2">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <FaUnlock />
                </span>
                <input
                  type="password"
                  id="password"
                  className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Your Password"
                />
              </div>
            </div>

            <div className="flex flex-col mb-6">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <FaCamera />
                </span>
                <input
                  type="url"
                  id="photoURL"
                  className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Your Photo URL"
                />
              </div>
            </div>

            <div className="flex w-full">
              <button
                type="submit"
                className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Register
              </button>
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
