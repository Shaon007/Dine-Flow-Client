import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Error from "../Pages/Error";
import Home from "../Pages/Home";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home />,

      },
    ]
  }
])

export default router;