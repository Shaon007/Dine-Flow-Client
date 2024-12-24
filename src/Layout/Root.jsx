
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { Toaster } from "react-hot-toast";
import { Outlet, useLoaderData } from "react-router-dom";

const Root = () => {

  return (
    <div className="">
      <Navbar></Navbar>
      <Outlet/>
      <Footer></Footer>
      <Toaster/>
    </div>
  );
};

export default Root;