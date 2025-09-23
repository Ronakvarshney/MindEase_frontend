import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [resetToken, setresetToken] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const [Data, setData] = useState({
    password: "",
    confirm_password: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      setresetToken(token);
    } else {
      toast.error("reset token not found");
    }
  }, [location.search]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      if (Data.password != Data.confirm_password) {
        alert("passwords are not match");
        return;
      }

      const response = await axios.post("http://localhost:3000/api/reset-password" , {password : Data.password , resetToken});
      if(response.data.success){
        toast("Password change successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 ">
      {loader ? (
        <div className="flex w-screen flex-col items-center justify-center gap-5">
          <p className="s text-xl font-medium">Your data is Loading</p>
        </div>
      ) : (
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="text-center text-2xl font-bold text-gray-800">
            Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            Enter your email and create a new password.
          </p>

          <form className="mt-6 space-y-4" onSubmit={submitHandler}>
       

            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                name="password"
                required
                onChange={(e) =>
                  setData((d) => ({ ...d, [e.target.name]: e.target.value }))
                }
                placeholder="Enter new password"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm_password"
                required
                onChange={(e) =>
                  setData((d) => ({ ...d, [e.target.name]: e.target.value }))
                }
                placeholder="Confirm new password"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-[#A10716] py-2 text-white transition-all hover:bg-[#870511]"
            >
              Reset Password
            </button>
          </form>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default ResetPassword;
