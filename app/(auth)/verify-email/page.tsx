"use client";

import { useAuthStore } from "@/store/authStore";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const user = useAuthStore((state: any) => state.user);

  console.log(user);

  const verifyEmail = async () => {
    try {
      const role =
        user?.role || JSON.parse(localStorage.getItem("user") || "{}").role;

      if (!role) {
        console.log("Role not found, please login again");
        router.push("/login");
        return;
      }

      if (!token) {
        console.log("Token not found");
        return;
      }

      const res = await axios.get(
        `http://localhost:5000/api/v1/verify-email/${token}/${role}`,
      );
      if (res.data.message) {
        router.push("/login");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(String(error));
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <svg
              className="w-7 h-7 text-emerald-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-semibold text-center text-white mb-2">
          Verify your email
        </h1>

        <p className="text-center text-zinc-400 text-sm mb-6">
          We’ve sent a verification link to your email address. Please check
          your inbox and click the link to activate your account.
        </p>

        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 mb-6">
          <p className="text-xs text-zinc-500 mb-1">Sent to</p>
          <p className="text-sm text-zinc-200 font-medium">
            yourname@example.com
          </p>
        </div>

        <button
          onClick={verifyEmail}
          className="w-full bg-emerald-600 hover:bg-emerald-700 transition rounded-lg py-2.5 text-white font-medium mb-3"
        >
          Verify Email
        </button>

        <button className="w-full bg-zinc-800 hover:bg-zinc-700 transition rounded-lg py-2.5 text-zinc-200 font-medium">
          Resend Verifiction Link
        </button>

        {/* Footer */}
        <p className="text-center text-xs text-zinc-500 mt-6">
          Didn’t receive the email? Check your spam folder.
        </p>
      </div>
    </div>
  );
}
