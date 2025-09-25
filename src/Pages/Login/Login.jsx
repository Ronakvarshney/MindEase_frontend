// src/LoginPage.jsx

import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { loginschema } from "../../../types/user";
import useAuthStore from "../../../store/authStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { setToken, setemail, setrole } = useAuthStore();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = loginschema.safeParse({ email, password, role });
    if (!result.success) {
      const errobj = {};
      result.error.issues.forEach((err) => (errobj[err.path[0]] = err.message));
      setErrors(errobj);
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        {
          email,
          password,
          role,
        },
        { withCredentials: true }
      );
      if (res.data.success) {
        setToken(res.data.token);
        setemail(res.data.email);
        setrole(res.data.role);
        navigate("/");
      } else {
        toast.error("email doesn't exists, first register");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e5a62] flex items-center justify-center font-manrope px-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-[#06454d] rounded-xl shadow-lg overflow-hidden">
        <div className="hidden md:block md:w-1/2">
          <img
            src="/register_image.jpg"
            alt="Login visual"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 text-white flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl font-medium text-center text-orange-500 mb-6">
            Login to Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-black">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-400 text-sm font-medium"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm text-gray-400 font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">
                Role
              </label>
              <select
                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Select Role</option>
                <option value="patient">Patient</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-[#A10716] text-white py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center text-gray-400 gap-2 text-xs mt-4">
              <Link to="/forgot-password" className="hover:text-indigo-600">
                Forgot Password?
              </Link>
              <span className="text-orange-500">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-indigo-500 hover:text-indigo-600"
                >
                  Sign Up
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
