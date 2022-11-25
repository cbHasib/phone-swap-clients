import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import PhoneLayout from "../Layout/PhoneLayout";
import About from "../Pages/About/About";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import Blog from "../Pages/Blog/Blog";
import SingleBlog from "../Pages/Blog/SingleBlog";
import Contact from "../Pages/Contact/Contact";
import Buyers from "../Pages/Dashboard/Admin/Buyers/Buyers";
import Dashboard from "../Pages/Dashboard/Admin/Dashboard/Dashboard";
import Products from "../Pages/Dashboard/Admin/Products/Products";
import ReportedProduct from "../Pages/Dashboard/Admin/ReportedProduct/ReportedProduct";
import Sellers from "../Pages/Dashboard/Admin/Sellers/Sellers";
import VerificationRequest from "../Pages/Dashboard/Admin/VerificationRequest/VerificationRequest";
import MyOrders from "../Pages/Dashboard/Buyer/MyOrders/MyOrders";
import MyWishlist from "../Pages/Dashboard/Buyer/MyWishlist/MyWishlist";
import Profile from "../Pages/Dashboard/Profile/Profile/Profile";
import UpdateProfile from "../Pages/Dashboard/Profile/UpdateProfile/UpdateProfile";
import AddProduct from "../Pages/Dashboard/Seller/AddProduct/AddProduct";
import MyBuyers from "../Pages/Dashboard/Seller/MyBuyers/MyBuyers";
import MyProducts from "../Pages/Dashboard/Seller/MyProducts/MyProducts";
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
        path: "/dashboard/sellers",
        element: <Sellers />,
      },
      {
        path: "/dashboard/buyers",
        element: <Buyers />,
      },
      {
        path: "/dashboard/products",
        element: <Products />,
      },
      {
        path: "/dashboard/reported-products",
        element: <ReportedProduct />,
      },
      {
        path: "/dashboard/verification-request",
        element: <VerificationRequest />,
      },
      {
        path: "/dashboard/my-products",
        element: <MyProducts />,
      },
      {
        path: "/dashboard/add-product",
        element: <AddProduct />,
      },
      {
        path: "/dashboard/my-buyers",
        element: <MyBuyers />,
      },
      {
        path: "/dashboard/my-orders",
        element: <MyOrders />,
      },
      {
        path: "/dashboard/my-wishlist",
        element: <MyWishlist />,
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
