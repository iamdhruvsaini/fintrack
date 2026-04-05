
import { createBrowserRouter } from "react-router";
import App from "../App";

import PageNotFound from "../components/PageNotFound";

import Landing from "../app/landing/Landing";
import Dashboard from "../app/dashboard/Dashboard";
import Login from "../app/auth/Login";
import Register from "../app/auth/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);


export default router;