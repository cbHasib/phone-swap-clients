import Main from "../Layout/Main";
import PhoneLayout from "../Layout/PhoneLayout";
import About from "../Pages/About/About";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/category",
    element: <PhoneLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Phones />,
      },
      {
        path: "category",
        element: <Phones />,
      },
      {
        path: "/category/:id",
        element: <Phones />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
    errorElement: <ErrorPage />,
  },
]);
