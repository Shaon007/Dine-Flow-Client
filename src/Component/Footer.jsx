import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubscribe = () => {
    console.log("Subscribed with:", email);
    setEmail("");
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Modal form submitted");
    setIsModalOpen(false); // Close the modal on form submission
  };

  return (
    <div>
      <footer className="max-w-[1600px] mx-auto flex justify-center px-4 text-gray-800 bg-[#1F2937]">
        <div className="container px-6 py-6">
          <Link to='/' className="flex justify-center text-white">
            <img className="w-36 lg:w-44" src="https://i.postimg.cc/Rhn1dWfV/Screenshot-2024-12-08-210839-removebg-preview.png" alt="" />
          </Link>

          <div className="flex flex-col justify-center mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
              placeholder="Email Address"
            />
            <button
              onClick={handleSubscribe}
              className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80"
            >
              Subscribe
            </button>
          </div>

          <hr className="h-px bg-gray-200 border-none my-7" />

          <div className="flex flex-col items-center justify-center md:flex-row">
            <div className="flex mt-4 md:m-0">
              <div className="flex justify-center items-center">
                <Link
                  to="/"
                  className="px-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 hover:underline"
                >
                  Home
                </Link>
                <Link
                  to="/allProduct"
                  className="px-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 hover:underline"
                >
                  All Product
                </Link>
                <Link
                  to="/myProfile"
                  className="px-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 hover:underline"
                >
                  Profile
                </Link>
                <Link
                  to=""
                  className="px-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 hover:underline"
                >
                  FAQ
                </Link>
                <button
                  onClick={handleModal}
                  className="px-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 hover:underline"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mt-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500"
            >
              <FaLinkedin size={24} />
            </a>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} EquiSports. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Contact Us Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              onClick={handleModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-center mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4 text-center">
              Have a question or feedback? Fill out the form below!
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
