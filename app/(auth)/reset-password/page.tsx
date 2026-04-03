"use client";

import React, { useState } from "react";
import {
  Lock,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function Page() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchparams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const token = searchparams.get("token");
    if (!token) {
      console.log("token not get");
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/reset-password", {
        token,
        password,
      });
      if (response) {
        setLoading(false);
        setSubmitted(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-cream flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-[3rem] p-10 md:p-12 border border-slate-100 shadow-xl shadow-indigo-500/5 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <ShieldCheck size={120} />
          </div>

          <button className="mb-8 flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors group">
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-sm font-bold tracking-wide uppercase">
              Back to Login
            </span>
          </button>

          {!submitted ? (
            <>
              <div className="mb-8">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-[1.5rem] flex items-center justify-center mb-6">
                  <Lock size={32} />
                </div>
                <h1 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
                  Reset Password
                </h1>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Set a new secure password for your account to regain access to
                  your sanctuary.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-bold rounded-2xl flex items-center gap-2">
                    <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">
                    New Password
                  </label>
                  <div className="relative group">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                      size={20}
                    />
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">
                    Confirm New Password
                  </label>
                  <div className="relative group">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                      size={20}
                    />
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <button
                  disabled={loading}
                  className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Update Password <Sparkles size={18} />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
                Password Reset!
              </h2>
              <p className="text-slate-500 font-medium leading-relaxed mb-8">
                Your password has been successfully updated. You can now use
                your new password to sign in to your account.
              </p>
              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-indigo-600 transition-all">
                Sign In Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
