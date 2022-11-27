import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import PhoneLayout from "../Layout/PhoneLayout";
import About from "../Pages/About/About";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import Blog from "../Pages/Blog/Blog";
import SingleBlog from "../Pages/Blog/SingleBlog";
import Contact from "../Pages/Contact/Contact";
import Admins from "../Pages/Dashboard/Admin/Admins/Admins";
import Buyers from "../Pages/Dashboard/Admin/Buyers/Buyers";
import Dashboard from "../Pages/Dashboard/Admin/Dashboard/Dashboard";
import Products from "../Pages/Dashboard/Admin/Products/Products";
import ReportedProduct from "../Pages/Dashboard/Admin/ReportedProduct/ReportedProduct";
import Sellers from "../Pages/Dashboard/Admin/Sellers/Sellers";
import VerificationRequest from "../Pages/Dashboard/Admin/VerificationRequest/VerificationRequest";
import MyOrders from "../Pages/Dashboard/Buyer/MyOrders/MyOrders";
import MyWishlist from "../Pages/Dashboard/Buyer/MyWishlist/MyWishlist";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import Profile from "../Pages/Dashboard/Profile/Profile/Profile";
import UpdateProfile from "../Pages/Dashboard/Profile/UpdateProfile/UpdateProfile";
import AddProduct from "../Pages/Dashboard/Seller/AddProduct/AddProduct";
import MyBuyers from "../Pages/Dashboard/Seller/MyBuyers/MyBuyers";
import MyProducts from "../Pages/Dashboard/Seller/MyProducts/MyProducts";
import TestDash from "../Pages/Dashboard/Test/TestDash";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Phones from "../Pages/Phones/Phones/Phones";
import AdminRoute from "./AdminRoute/AdminRoute";
import BuyerRoute from "./BuyerRoute/BuyerRoute";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import SellerRoute from "./SellerRoute/SellerRoute";

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
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <DashboardHome />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/update-profile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/admins",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Admins />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/sellers",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Sellers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/buyers",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Buyers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/products",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Products />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/reported-products",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ReportedProduct />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/verification-request",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <VerificationRequest />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-products",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <MyProducts />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-product",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <AddProduct />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-buyers",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <MyBuyers />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-orders",
        element: (
          <PrivateRoute>
            <BuyerRoute>
              <MyOrders />
            </BuyerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-wishlist",
        element: (
          <PrivateRoute>
            <BuyerRoute>
              <MyWishlist />
            </BuyerRoute>
          </PrivateRoute>
        ),
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
