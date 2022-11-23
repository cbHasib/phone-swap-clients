import Main from "../Layout/Main";
import About from "../Pages/About/About";

const { createBrowserRouter } = require("react-router-dom");
const { default: Home } = require("../Pages/Home/Home");

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);
