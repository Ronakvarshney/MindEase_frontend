"use client";
import { useMounted } from "@/hooks/mount";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useRouter();
  const mounted = useMounted();

  const logoutHandler = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/logout", {
        withCredentials: true,
      });
      if (response.data.message) {
        logout();
        navigate.push("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <Heart className="text-white w-5 h-5" fill="white" />
            </div>
            <Link href="/">
              <span className="text-xl font-bold tracking-tight text-slate-800">
                MindEase
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-indigo-600 transition-colors">How it works</a>
            <a href="/dashboard" className="hover:text-indigo-600 transition-colors">Dashboard</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Journaling</a>

            {/* ✅ Only render auth UI after client hydration */}
            {!mounted ? (
              <div className="w-24 h-9" /> // placeholder to prevent layout shift
            ) : user ? (
              <button
                onClick={logoutHandler} // ✅ no need for arrow wrapper
                className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition-all shadow-sm"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition-all shadow-sm"
              >
                Talk to AI
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}