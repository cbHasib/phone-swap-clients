import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import PhoneLayout from "../Layout/PhoneLayout";
import About from "../Pages/About/About";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import Blog from "../Pages/Blog/Blog";
import SingleBlog from "../Pages/Blog/SingleBlog";
import Contact from "../Pages/Contact/Contact";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import Profile from "../Pages/Dashboard/Profile/Profile/Profile";
import UpdateProfile from "../Pages/Dashboard/Profile/UpdateProfile/UpdateProfile";
import TestDash from "../Pages/Dashboard/Test/TestDash";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Phones from "../Pages/Phones/Phones/Phones";

const { createBrowserRouter } = require("react-router-dom");
const { default: Home } = require("../Pages/Home/Home");

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/post/:cat_slug/:slug",
        element: <SingleBlog />,
      },
    ],
  },
  {
    path: "category",
    element: <PhoneLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Phones />,
      },
      {
        path: "/category",
        element: <Phones />,
      },
      {
        path: "/category/:id",
        element: <Phones />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/update-profile",
        element: <UpdateProfile />,
      },
      {
        path: "/dashboard/test",
        element: <TestDash />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
    errorElement: <ErrorPage />,
  },
]);
