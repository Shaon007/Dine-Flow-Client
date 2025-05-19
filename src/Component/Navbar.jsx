import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState("light");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');

    // document.documentElement.se.add(newTheme);
  };

  const handleLogout = () => {
    logOut();
    setDropdownOpen(false);
  };

  const toggleHamburgerMenu = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownOpen &&
      !event.target.closest(".profile-dropdown") &&
      !event.target.closest(".profile-icon")
    ) {
      setDropdownOpen(false);
    }
    if (hamburgerOpen && !event.target.closest(".hamburger-menu")) {
      setHamburgerOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen, hamburgerOpen]);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`max-w-[1600px] mx-auto flex justify-between items-center px-2 md:px-16 py-2  fixed top-0 w-full z-50 shadow-lg transition-all duration-300 ${scrolled ? "bg-[#1F2937] shadow-md" : "bg-black bg-opacity-40"
      }`}>
      {/* Logo */}
      <div className="text-lg gap-2 flex justify-center items-center">
        <NavLink className="font-bold md:text-2xl text-stone-700" to="/">
          <h2 className="font-mono text-red-400 font-semibold">Dine<span className="font-semibold md:text-2xl italic text-red-600  ">Flow</span></h2>
        </NavLink>
      </div>

      {/* Navigation Links */}
      <div className="gap-6 items-center hidden lg:flex text-xl">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-cyan-200 hover:text-gray-600 underline underline-offset-8"
              : "text-cyan-300 hover:text-cyan-500 transition-colors duration-200"
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-cyan-200 hover:text-gray-600 underline underline-offset-8"
              : "text-cyan-300 hover:text-cyan-500"
          }
          to="/allFoods"
        >
          AllFoods
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-cyan-200 hover:text-gray-600 underline underline-offset-8"
              : "text-cyan-300 hover:text-cyan-500"
          }
          to="/gallery"
        >
          Gallery
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-cyan-200 hover:text-gray-600 underline underline-offset-8 "
              : "text-cyan-300 hover:text-cyan-500"
          }
          to="/contact"
        >
          Contact
        </NavLink>
      </div>

      <div className="flex gap-2">
        {/* Theme Toggle and User Actions */}
        <div className="flex gap-4 items-center">
          {/* Toggle Switch */}
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="hidden"
              onChange={toggleTheme}
              checked={theme === "dark"}
            />
            <div className="w-12 h-6 bg-gray-300 rounded-full p-1 flex items-center justify-start dark:bg-gray-700 transition-colors duration-300">
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${theme === "dark" ? "transform translate-x-6" : ""
                  }`}
              ></div>
            </div>
          </label>

          {/* Profile Icon with Dropdown Menu for smaller devices */}
          {user ? (
            <div className="relative flex items-center profile-icon">
              {/* Profile Image */}
              <img
                className="rounded-full w-10 h-10 object-cover border-2 border-white cursor-pointer"
                src={user.photoURL ? user.photoURL : "https://i.pinimg.com/736x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg"}
                alt="Profile"
                title={user.displayName || "Profile"}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {/* Profile Links  */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-52 w-48 bg-white border rounded-lg shadow-lg z-50 profile-dropdown ">
                  <NavLink
                    to="/myFoods"
                    className="block px-4 py-2 hover:bg-cyan-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Foods
                  </NavLink>
                  <NavLink
                    to="/addFood"
                    className="block px-4 py-2 hover:bg-cyan-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Add Food
                  </NavLink>
                  <NavLink
                    to="/myOrders"
                    className="block px-4 py-2 hover:bg-cyan-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Orders
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-cyan-200"
                  >
                    Log Out
                  </button>
                  <button
                    onClick={() => setDropdownOpen(false)}
                    className="absolute top-2 right-2 text-gray-500"
                  >
                    X
                  </button>
                </div>
              )}

              <div className="hidden lg:block">
                <button
                  onClick={handleLogout}
                  className=" ml-2 px-4 py-3 bg-cyan-700  rounded-lg text-stone-200 hover:bg-stone-100 text-semibold"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-4 items-center ">
              {/* Login Button */}
              <NavLink
                to="/login"
                className="px-4 py-2 border-2 bg-gray-500 rounded-lg text-white hover:bg-stone-100"
              >
                Login
              </NavLink>
            </div>
          )}
        </div>

        {/* Hamburger Menu */}
        <div className="lg:hidden flex items-center ">
          <button
            onClick={toggleHamburgerMenu}
            className="text-stone-700 hover:text-stone-900 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Hamburger Menu Links */}
      {hamburgerOpen && (
        <div className="lg:hidden absolute top-16 right-0 max-w-2xl bg-white shadow-lg p-4 z-50 hamburger-menu rounded-md">
          <NavLink
            className="block px-4 py-2 text-stone-700 hover:bg-gray-100"
            to="/"
            onClick={toggleHamburgerMenu}
          >
            Home
          </NavLink>
          <NavLink
            className="block px-4 py-2 text-stone-700 hover:bg-gray-100"
            to="/allFoods"
            onClick={toggleHamburgerMenu}
          >
            AllFoods
          </NavLink>
          <NavLink
            className="block px-4 py-2 text-stone-700 hover:bg-gray-100"
            to="/gallery"
            onClick={toggleHamburgerMenu}
          >
            Gallery
          </NavLink>
          <button
            onClick={() => setHamburgerOpen(false)}
            className="absolute top-2 right-2 text-gray-500"
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
