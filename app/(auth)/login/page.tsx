"use client";

import React, { FormEvent, useState } from "react";
import { Mail, Lock, User, ArrowLeft, Loader } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import {
  LoginSchemaValidation,
  RegisterSchemaValidation,
} from "@/validations/auth";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";

const Page: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { setuser} = useAuthStore();
  const navigate = useRouter();
  const [loading, setloading] = useState(false);

  const [istherapist, setistherapist] = useState(false);
  const [errors, seterrors] = useState<{
    email?: string[];
    password?: string[];
    name?: string[];
    role?: string[];
  }>({});
  const [formData, setformData] = useState<{
    name?: string;
    email: string;
    password: string;
    role: string;
    username?: string;
    specialization?: string;
    experience?: string;
    bio?: string;
    therapist_role?: string;
    active?: boolean;
    time?: string;
    day?: string;
    fees?: string;
  }>({
    name: "",
    email: "",
    password: "",
    role: "",
    username: "",
    specialization: "",
    experience: "",
    therapist_role: "",
    bio: "",
    active: false,
    time: "",
    day: "",
    fees: "",
  });

  const forgotHandler = async () => {
    navigate.push("/forgot-password");
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setloading(true);

    if (isLogin) {
      try {
        const validate = LoginSchemaValidation.safeParse(formData);

        if (!validate.success) {
          seterrors(validate.error.flatten().fieldErrors);
          return;
        } else {
          const response = await axios.post(
            "http://localhost:5000/api/v1/login",
            formData,
            { withCredentials: true },
          );
          if (response.data.success) {
            setuser(response.data.user);

            seterrors({});
            setformData({
              name: "",
              email: "",
              password: "",
              role: "",
            });

            toast.success("login successfully");

            navigate.push("/");
          }
        }
      } catch (error) {
        console.log(error.message);
        toast.error(error?.response?.data.error);
      }
    } else {
      try {
        const validate = RegisterSchemaValidation.safeParse(formData);
        if (!validate.success) {
          seterrors(validate.error.flatten().fieldErrors);
        } else {
          const response = await axios.post(
            "http://localhost:5000/api/v1/register",
            formData,
          );
          if (response.data.success) {
            setuser(response.data.user);
            const cachedassements = localStorage.getItem("assessment_store");
            if (cachedassements) {
              localStorage.removeItem("assessment_store");
            }
            seterrors({});
            setformData({
              name: "",
              email: "",
              password: "",
              role: "",
            });
          }
          toast.success("Check your Email inbox, First Verify Email");
        }
      } catch (error) {
        toast.error(error?.message);
      }
    }

    setloading(false);
  };

  return (
    <div className="w-full items-center justify-center flex bg-white">
      <div className="hidden lg:flex lg:w-1/3 relative overflow-hidden bg-indigo-600">
        <div className="relative z-10 w-full flex flex-col justify-between p-16 text-white">
          <div className="flex items-center gap-2 cursor-pointer group">
            <Link href="/" className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-all">
                <ArrowLeft size={20} />
              </div>
              <span className="font-semibold tracking-wide">Back to Home</span>
            </Link>
          </div>

          <div>
            <blockquote className="text-4xl font-medium leading-tight mb-8">
              &quot;Healing takes time, and asking for help is a courageous
              step.&quot;
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-1 bg-white/30 rounded-full"></div>
              <p className="text-indigo-100 font-medium tracking-widest uppercase text-sm">
                Serenity Wellbeing
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 md:mt-20 mt-10 flex flex-col justify-center px-8 sm:px-12 lg:px-24 py-12">
        <div className="max-w-xl w-full mx-auto">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              {isLogin ? "Welcome back" : "Join Serenity"}
            </h2>
            <p className="text-slate-500">
              {isLogin
                ? "Continue your journey to a calmer mind."
                : "Start your path to mental wellness today."}
            </p>
          </div>

          <form className="space-y-3" onSubmit={submitHandler}>
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  Full Name
                </label>
                <div className="relative group">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                    size={20}
                  />
                  <input
                    type="text"
                    name="name"
                    onChange={(e) =>
                      setformData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                  {errors?.name && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.name[0]}
                    </p>
                  )}
                </div>
              </div>
            )}

            {istherapist && !isLogin && (
              <div className="max-w-7xl mx-auto bg-white  rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {" "}
                {/* LEFT SIDE */}{" "}
                <div className="space-y-5">
                  {" "}
                  <h2 className="text-xl font-semibold">
                    {" "}
                    Professional Details{" "}
                  </h2>{" "}
                  <input
                    type="text"
                    onChange={(e) =>
                      setformData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    name="specialization"
                    placeholder="Specialization (e.g. Anxiety, Depression)"
                    className="w-full border p-3 rounded"
                  />{" "}
                  <input
                    type="text"
                    name="therapist_role"
                    onChange={(e) =>
                      setformData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    placeholder="role (e.g. Psychologist)"
                    className="w-full border p-3 rounded"
                  />{" "}
                  <input
                    type="number"
                    name="experience"
                    onChange={(e) =>
                      setformData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    placeholder="Experience (years)"
                    className="w-full border p-3 rounded"
                  />{" "}
                  <input
                    type="number"
                    name="fees"
                    onChange={(e) =>
                      setformData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    placeholder="Consultation Fee (₹)"
                    className="w-full border p-3 rounded"
                  />{" "}
                  <textarea
                    name="bio"
                    onChange={(e) =>
                      setformData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    placeholder="Short professional bio"
                    rows={4}
                    className="w-full border p-3 rounded"
                  />{" "}
                </div>{" "}
                <div className="space-y-5">
                  {" "}
                  <h2 className="text-xl font-semibold">Availability</h2>{" "}
                  <input
                    type="text"
                    name="day"
                    onChange={(e) =>
                      setformData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    placeholder="Day (e.g. Monday)"
                    className="w-full border p-3 rounded"
                  />{" "}
                  <input
                    type="text"
                    name="time"
                    onChange={(e) =>
                      setformData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    placeholder="Time Slots (e.g. 10:00-11:00,14:00-15:00)"
                    className="w-full border p-3 rounded"
                  />{" "}
                  <label className="flex items-center gap-2">
                    {" "}
                    <input
                      type="checkbox"
                      name="active"
                      onChange={(e) =>
                        setformData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />{" "}
                    Active Therapist{" "}
                  </label>{" "}
                  {/* <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
                  >
                    {" "}
                    Create Therapist Profile{" "}
                  </button>{" "} */}
                </div>{" "}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                  size={20}
                />
                <input
                  type="email"
                  placeholder="name@example.com"
                  name="email"
                  onChange={(e) =>
                    setformData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
                {errors?.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email[0]}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-semibold text-slate-700">
                  Password
                </label>
                {isLogin && (
                  <button
                    onClick={forgotHandler}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                  size={20}
                />
                <input
                  type="password"
                  placeholder="••••••••"
                  name="password"
                  onChange={(e) =>
                    setformData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
                {errors?.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.password[0]}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                Role
              </label>

              <div className="relative group">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                  size={20}
                />

                <select
                  name="role"
                  onChange={(e) => [
                    setformData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    }),
                    e.target.value == "therapist" && setistherapist(true),
                  ]}
                  className="
        w-full
        appearance-none
        pl-12 pr-10 py-3.5
        bg-slate-50
        border border-slate-200
        rounded-2xl
        text-slate-700
        focus:outline-none
        focus:ring-2 focus:ring-indigo-500/20
        focus:border-indigo-500
        transition-all
        cursor-pointer
      "
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select role
                  </option>
                  <option value="patient">Patient</option>
                  <option value="admin">Admin</option>
                  <option value="therapist">Therapist</option>
                </select>

                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <button className="w-full items-center text-center flex justify-center py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 transform active:scale-[0.98]">
              {isLogin ? (
                "Sign In"
              ) : loading ? (
                <Loader size={20} />
              ) : (
                "Create Account"
              )}
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">
                  Or continue with
                </span>
              </div>
            </div>

            {isLogin && (
              <div className="grid grid-cols-1 gap-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  UserName
                </label>
                <div className="relative group">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                    size={20}
                  />
                  {/* <button className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all font-medium text-slate-700">
                <Chrome size={18} /> Google
              </button>
              <button className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all font-medium text-slate-700">
                <Github size={18} /> GitHub
              </button> */}
                  <input
                    type="text"
                    name="username"
                    onChange={(e) =>
                      setformData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    placeholder="Enter your 12 characters username"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>
            )}
          </form>

          <p className="mt-10 text-center text-slate-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-indigo-600 hover:underline decoration-2 underline-offset-4 transition-all"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/3 relative overflow-hidden bg-indigo-600">
        <div className="relative z-10 w-full flex flex-col justify-between p-16 text-white">
          <div>
            <blockquote className="text-4xl font-medium leading-tight mb-8">
              &quot;Healing takes time, and asking for help is a courageous
              step.&quot;
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-1 bg-white/30 rounded-full"></div>
              <p className="text-indigo-100 font-medium tracking-widest uppercase text-sm">
                Serenity Wellbeing
              </p>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Page;
