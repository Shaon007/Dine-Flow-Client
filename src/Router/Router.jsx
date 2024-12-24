import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Error from "../Pages/Error";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ForgotPass from "../Pages/ForgotPass";
import MyProfile from "../Component/MyProfile";
import PrivateRoute from "./PrivateRoute";
import AllFoods from "../Pages/AllFoods";
import Gallery from "../Pages/Gallery";
import MyFoods from "../Pages/MyFoods";

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
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot",
        element: <ForgotPass />,
      },
      {
        path: "/allFoods",
        element: <AllFoods />,
      },
      {
        path: "/gallery",
        element: <Gallery/>,
      },
      {
        path: "/myFoods",
        element: <MyFoods />,
      },
      {
        path: "/myProfile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
    ]
  }
])

export default router;