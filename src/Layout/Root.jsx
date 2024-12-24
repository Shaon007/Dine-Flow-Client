
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { Toaster } from "react-hot-toast";
import { Outlet, useLoaderData } from "react-router-dom";

const Root = () => {

  return (
    <>
      <Navbar></Navbar>
      <Outlet/>
      <Footer></Footer>
      <Toaster/>
    </>
  );
};

export default Root;