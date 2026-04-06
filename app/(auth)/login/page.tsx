"use client";

import React, { FormEvent, useState } from "react";
import {
  Mail,
  Lock,
  User,
  ArrowLeft,
  Loader,
  Heart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";
import {
  LoginSchemaValidation,
  RegisterSchemaValidation,
} from "@/validations/auth";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";

const InputField = ({
  icon: Icon,
  label,
  error,
  right,
  ...props
}: {
  icon: any;
  label: string;
  error?: string;
  right?: React.ReactNode;
  [key: string]: any;
}) => (
  <div className="flex flex-col gap-1.5">
    <div className="flex items-center justify-between">
      <label className="text-xs font-semibold text-white/50 uppercase tracking-widest">
        {label}
      </label>
      {right}
    </div>
    <div className="relative">
      <Icon
        size={15}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
      />
      <input
        {...props}
        className="w-full pl-11 pr-4 py-3 bg-[#2a2a2a] border border-white/8 rounded-xl text-sm text-white placeholder-white/20 outline-none focus:border-[#1D9E75]/50 focus:bg-[#2a2a2a] transition-colors"
      />
    </div>
    {error && <p className="text-xs text-red-400">{error}</p>}
  </div>
);

const Page: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { setuser } = useAuthStore();
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);
  const [isTherapist, setIsTherapist] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [formData, setFormData] = useState<Record<string, any>>({
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
    if (name === "role") setIsTherapist(value === "therapist");
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (isLogin) {
      try {
        const validate = LoginSchemaValidation.safeParse(formData);
        if (!validate.success) {
          setErrors(validate.error.flatten().fieldErrors);
          return;
        }
        const response = await axios.post(
          "http://localhost:5000/api/v1/login",
          formData,
          { withCredentials: true },
        );
        if (response.data.success) {
          setuser(response.data.user);
          setErrors({});
          toast.success("Logged in successfully");
          navigate.push("/");
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.error || "Login failed");
      }
    } else {
      try {
        const validate = RegisterSchemaValidation.safeParse(formData);
        if (!validate.success) {
          setErrors(validate.error.flatten().fieldErrors);
          return;
        }
        const response = await axios.post(
          "http://localhost:5000/api/v1/register",
          formData,
        );
        if (response.data.success) {
          setuser(response.data.user);
          localStorage.removeItem("assessment_store");
          setErrors({});
          toast.success("Check your Email inbox to verify");
        }
      } catch (error: any) {
        toast.error(error?.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex ">
      <div className="hidden lg:flex lg:w-[420px] flex-shrink-0 flex-col justify-between p-12 border-r border-white/8 bg-[#141414]">
        <div className="flex flex-col py-20 gap-8">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-1 rounded-full bg-[#1D9E75]" />
            <blockquote className="text-2xl font-light text-white/70 leading-relaxed italic">
              "Healing takes time, and asking for help is a courageous step."
            </blockquote>
            <p className="text-xs font-semibold text-white/25 uppercase tracking-widest">
              — MindEase Wellbeing
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { icon: ShieldCheck, label: "100% Private & Secure" },
              { icon: Sparkles, label: "AI-Powered Support" },
              { icon: Heart, label: "Judgment-Free Space" },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#1D9E75]/15 flex items-center justify-center flex-shrink-0">
                    <Icon size={13} className="text-[#1D9E75]" />
                  </div>
                  <span className="text-xs text-white/35">{f.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-white/25 hover:text-white/50 transition-colors w-fit"
        >
          <ArrowLeft size={13} /> Back to home
        </Link>
      </div>

      {/* Right — Form */}
      <div className="flex-1 py-20 flex items-center justify-center px-4 sm:px-8  overflow-y-auto">
        <div className="w-full max-w-md flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-white">
              {isLogin ? "Welcome back" : "Create account"}
            </h2>
            <p className="text-sm text-white/35">
              {isLogin
                ? "Continue your journey to a calmer mind."
                : "Start your path to mental wellness today."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            {/* Name — register only */}
            {!isLogin && (
              <InputField
                icon={User}
                label="Full Name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                error={errors?.name?.[0]}
              />
            )}

            {/* Email */}
            <InputField
              icon={Mail}
              label="Email Address"
              type="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors?.email?.[0]}
            />

            {/* Password */}
            <InputField
              icon={Lock}
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors?.password?.[0]}
              right={
                isLogin && (
                  <button
                    type="button"
                    onClick={() => navigate.push("/forgot-password")}
                    className="text-[11px] font-semibold text-[#1D9E75] hover:opacity-75 transition-opacity"
                  >
                    Forgot password?
                  </button>
                )
              }
            />            
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-widest">
                  Role
                </label>
                <div className="relative">
                  <User
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none"
                  />
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full appearance-none pl-11 pr-10 py-3 bg-[#2a2a2a] border border-white/8 rounded-xl text-sm text-white/70 outline-none focus:border-[#1D9E75]/50 transition-colors cursor-pointer"
                  >
                    <option value="" disabled>
                      Select role
                    </option>
                    <option value="patient">Patient</option>
                    <option value="admin">Admin</option>
                    <option value="therapist">Therapist</option>
                  </select>
                  <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none"
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

            {/* Therapist extra fields */}
            {isTherapist && !isLogin && (
              <div className="flex flex-col gap-4 p-5 rounded-xl border border-[#1D9E75]/20 bg-[#1D9E75]/5">
                <p className="text-xs font-semibold text-[#1D9E75] uppercase tracking-widest">
                  Professional Details
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      name: "specialization",
                      placeholder: "Specialization (e.g. Anxiety)",
                    },
                    {
                      name: "therapist_role",
                      placeholder: "Role (e.g. Psychologist)",
                    },
                    {
                      name: "experience",
                      placeholder: "Experience (years)",
                      type: "number",
                    },
                    {
                      name: "fees",
                      placeholder: "Consultation Fee (₹)",
                      type: "number",
                    },
                  ].map((f) => (
                    <input
                      key={f.name}
                      type={f.type || "text"}
                      name={f.name}
                      placeholder={f.placeholder}
                      value={formData[f.name]}
                      onChange={handleChange}
                      className="px-3 py-2.5 bg-[#2a2a2a] border border-white/8 rounded-lg text-xs text-white placeholder-white/20 outline-none focus:border-[#1D9E75]/40 transition-colors"
                    />
                  ))}
                </div>

                <textarea
                  name="bio"
                  rows={3}
                  placeholder="Short professional bio..."
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-[#2a2a2a] border border-white/8 rounded-lg text-xs text-white placeholder-white/20 outline-none focus:border-[#1D9E75]/40 transition-colors resize-none"
                />

                <p className="text-xs font-semibold text-white/35 uppercase tracking-widest">
                  Availability
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="day"
                    placeholder="Day (e.g. Monday)"
                    value={formData.day}
                    onChange={handleChange}
                    className="px-3 py-2.5 bg-[#2a2a2a] border border-white/8 rounded-lg text-xs text-white placeholder-white/20 outline-none focus:border-[#1D9E75]/40 transition-colors"
                  />
                  <input
                    type="text"
                    name="time"
                    placeholder="Time (e.g. 10:00-11:00)"
                    value={formData.time}
                    onChange={handleChange}
                    className="px-3 py-2.5 bg-[#2a2a2a] border border-white/8 rounded-lg text-xs text-white placeholder-white/20 outline-none focus:border-[#1D9E75]/40 transition-colors"
                  />
                </div>

                <label className="flex items-center gap-2.5 cursor-pointer w-fit">
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleChange}
                    className="w-4 h-4 rounded accent-[#1D9E75]"
                  />
                  <span className="text-xs text-white/45">
                    Mark as Active Therapist
                  </span>
                </label>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#1D9E75] hover:bg-[#178a64] text-white text-sm font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <Loader size={16} className="animate-spin" />
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Toggle */}
          <p className="text-center text-sm text-white/35">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
                setIsTherapist(false);
              }}
              className="font-semibold text-[#1D9E75] hover:opacity-75 transition-opacity"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default Page;
