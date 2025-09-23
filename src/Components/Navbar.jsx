// src/Navbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi"; // hamburger & close icons

const Navbar = () => {
  const navigate = useNavigate();
  const tokendata = localStorage.getItem("token");
  const [toggle, setToggle] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const logoutHandler = async () => {
    localStorage.removeItem("token");
    try {
      const res = await axios.post("http://localhost:3000/api/logout", null, {
        withCredentials: true,
      });
      console.log(res.data);
      if (res.data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav className="bg-[#043d43] backdrop-blur-md text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <img
            src="/src/assets/brain-logo-icon-human-brain-icon-creative-simple-mind-symbol-vector-illustration_118339-6640.avif"
            width={45}
            className="rounded-full"
          />
          <h1 className="text-2xl md:text-3xl font-semibold">𝓜𝓲𝓷𝓭𝓔𝓪𝓼𝓮</h1>
        </div>

        <ul className="hidden md:flex space-x-8">
          <li>
            <Link to="/" className="hover:text-yellow-400 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/bootcamp" className="hover:text-yellow-400 transition">
              Bootcamp
            </Link>
          </li>
          <li>
            <Link to="/blogs" className="hover:text-yellow-400 transition">
              Explore
            </Link>
          </li>
          <li>
            <Link to="/community" className="hover:text-yellow-400 transition">
              Join Community
            </Link>
          </li>

          {tokendata ? (
            <div className="relative flex items-center gap-3">
              <FaUser
                className="text-xl cursor-pointer"
                onClick={() => setToggle(!toggle)}
              />
              {toggle && (
                <div className="absolute top-full right-0 mt-4 ml-14 bg-white shadow-lg rounded-lg p-3">
                  <Link
                    to="/dashboard"
                    className="block text-black py-1 px-2 text-sm hover:bg-gray-200 rounded"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="w-full py-1 bg-blue-500 px-2 mt-2 text-sm hover:bg-blue-800 rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-6 bg-green-800 py-1 hover:scale-110  px-4 rounded-md">
              <li>
                <Link to="/login" className="  transition">
                  Login
                </Link>
              </li>
            </div>
          )}
        </ul>

        <div className="md:hidden">
          {mobileMenu ? (
            <HiX
              className="text-3xl cursor-pointer"
              onClick={() => setMobileMenu(false)}
            />
          ) : (
            <HiMenu
              className="text-3xl cursor-pointer"
              onClick={() => setMobileMenu(true)}
            />
          )}
        </div>
      </div>

      {mobileMenu && (
        <div className="md:hidden mt-3 space-y-4 px-4">
          <Link
            to="/"
            className="block hover:text-yellow-400"
            onClick={() => setMobileMenu(false)}
          >
            Home
          </Link>
          <Link
            to="/bootcamp"
            className="block hover:text-yellow-400"
            onClick={() => setMobileMenu(false)}
          >
            Bootcamp
          </Link>
          <Link
            to="/blogs"
            className="block hover:text-yellow-400"
            onClick={() => setMobileMenu(false)}
          >
            Blog
          </Link>

          {tokendata ? (
            <>
              <Link
                to="/dashboard"
                className="block hover:text-yellow-400"
                onClick={() => setMobileMenu(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  logoutHandler();
                  setMobileMenu(false);
                }}
                className="w-full text-left py-1 bg-blue-500 px-2 mt-2 text-sm hover:bg-blue-800 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="block hover:text-yellow-400"
                onClick={() => setMobileMenu(false)}
              >
                Register
              </Link>
              <Link
                to="/login"
                className="block hover:text-yellow-400"
                onClick={() => setMobileMenu(false)}
              >
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
