import { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ForgotPassword = () => {
  const { email } = useAuthStore();
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [Email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    let countdown;
    if (isTimerRunning && timer > 0) {
      countdown = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(countdown);
  }, [isTimerRunning, timer]);


  const formHandler = async (e) => {
    e.preventDefault();
    if (email || Email) {
      try {
        const response = await axios.post("http://localhost:3000/api/forgot-password", { email: email || Email });
        console.log(response.data);
        toast(response.data.message)
      } catch (error) {
        toast(error.response.data.message)
      }
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 ">
      {loader ? (
        <div className="flex w-screen flex-col items-center justify-center gap-5">
          <p className=" text-xl font-medium">Your data is Loading</p>
        </div>
      ) : (
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="text-center text-2xl font-bold text-gray-800">
            Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            Enter your email and we’ll send you a link to verify.
          </p>

          <form className="mt-6 space-y-4" onSubmit={formHandler}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={email || Email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-[#A10716] py-2 text-white transition-all"
            >
              Send Mail
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Didn't receive Email?{" "}
            {isTimerRunning && timer > 0 ? (
              <span className="text-gray-500">
                Resend in {formatTime(timer)}
              </span>
            ) : (
              <button
                onClick={() => {
                  setTimer(300);
                  setIsTimerRunning(true);
                }}
                className="text-blue-600 hover:underline"
              >
                Resend
              </button>
            )}
          </p>
        </div>
      )}
      <Toaster/>
    </div>
  );
};

export default ForgotPassword;
