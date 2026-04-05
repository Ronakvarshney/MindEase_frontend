"use client";

import { useMounted } from "@/hooks/mount";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";
import { Heart, LayoutDashboard, BookOpen, Info, LogOut, LogIn } from "lucide-react";
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
    <nav className="fixed top-0 w-full z-50 bg-[#1a1a1a]/80 backdrop-blur-md border-b border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-[#1D9E75] rounded-lg flex items-center justify-center transition-opacity group-hover:opacity-85">
              <Heart className="text-white w-4 h-4" fill="white" />
            </div>
            <span className="text-base font-semibold tracking-tight text-white">
              MindEase
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            <a
              href="#"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/6 transition-all"
              style={{ backgroundColor: "transparent" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <Info size={14} />
              How it works
            </a>
            <a
              href="/dashboard"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-white/50 hover:text-white transition-all"
              style={{ backgroundColor: "transparent" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <LayoutDashboard size={14} />
              Dashboard
            </a>
            <a
              href="#"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-white/50 hover:text-white transition-all"
              style={{ backgroundColor: "transparent" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <BookOpen size={14} />
              Journaling
            </a>
          </div>

          {/* Auth Button */}
          <div className="flex items-center">
            {!mounted ? (
              <div className="w-24 h-9" />
            ) : user ? (
              <button
                onClick={logoutHandler}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-sm text-white/60 hover:text-white hover:bg-white/6 transition-all"
              >
                <LogOut size={14} />
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1D9E75] hover:bg-[#178a64] text-white text-sm font-semibold transition-all"
              >
                <LogIn size={14} />
                Get Started
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}