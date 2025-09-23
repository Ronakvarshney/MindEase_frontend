import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerschema } from "../../../types/user";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const result = registerschema.safeParse(formData);
    if (!result.success) {
      const errorObj = {};
      result.error.issues.forEach((err) => {
        errorObj[err.path[0]] = err.message;
      });
      setErrors(errorObj);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/register",
        formData
      );
      if (res.data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#0e5a62] px-4 font-manrope">
      <div className="max-w-4xl flex ">
        <div className="w-1/2 hidden md:block">
          <img
            src="/register_image.jpg"
            alt="Login visual"
            className="h-full object-cover rounded-l-lg"
          />{" "}
        </div>
        <div className="bg-[#06454d] text-orange-600 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl sm:text-2xl font-semibold text-center mb-6">
            Register
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-black">
            <div>
              <label
                htmlFor="name"
                className="block text-sm text-gray-300 font-medium"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border  border-gray-400 rounded-lg mt-1 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-300 font-medium"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-400 rounded-lg mt-1 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm text-gray-300 font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password here"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-400 rounded-lg mt-1 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Enter confirm-password here"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border  border-gray-400 rounded-lg mt-1 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full p-2 sm:p-3 bg-[#A10716] text-white rounded-lg mt-4 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 hover:bg-[#830915] focus:ring-opacity-50"
            >
              Register
            </button>
          </form>

          <div className="text-xs flex items-center mt-4 justify-center text-gray-300">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400 font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
