import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Register from "../pages/Register";
import Login from "../pages/Login";
import { adminRoutes } from "./admin.routes";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <App />,
    children: adminRoutes,
  },

  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
