"use client";

import { ArrowRight, Sparkles, ShieldCheck, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

const stats = [
  { label: "Always Available", value: "24/7" },
  { label: "Anonymous", value: "100%" },
  { label: "Support Groups", value: "5+" },
];

export default function Hero() {
  const { user } = useAuthStore();

  return (
    <section className="relative min-h-screen bg-[#1a1a1a] overflow-hidden flex items-center">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #1D9E75 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-8 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #1D9E75 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-2 w-fit px-4 py-2 rounded-full border border-[#1D9E75]/30 bg-[#1D9E75]/10">
              <ShieldCheck size={14} className="text-[#1D9E75]" />
              <span className="text-xs font-semibold text-[#1D9E75] tracking-wide uppercase">
                Safe & Anonymous Support
              </span>
            </div>

            {/* Heading */}
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                You don't have to <br />
                <span
                  className="relative inline-block"
                  style={{
                    WebkitTextFillColor: "transparent",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    backgroundImage: "linear-gradient(90deg, #1D9E75, #5DCAA5)",
                  }}
                >
                  face it alone.
                </span>
              </h1>
              <p className="text-base md:text-lg text-white/50 leading-relaxed max-w-md">
                A calm, judgment-free space to connect with others who truly
                understand. Share, listen, and heal — at your own pace.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={user ? "/dashboard" : "/login"}
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#1D9E75] hover:bg-[#178a64] text-white text-sm font-semibold transition-all duration-200"
              >
                Start Anonymously
                <ArrowRight size={16} />
              </Link>
              <Link
                href={user ? "/dashboard" : "/login"}
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 hover:bg-white/5 text-white/70 hover:text-white text-sm font-semibold transition-all duration-200"
              >
                Explore Resources
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4 border-t border-white/8">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-0.5">
                  <span className="text-xl font-bold text-white">
                    {s.value}
                  </span>
                  <span className="text-xs text-white/40">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#222222]">
                <Image
                  src="/mental-health-care-sketch-diagram.jpg"
                  width={600}
                  height={500}
                  alt="Mental wellness"
                  className="w-full h-72 object-cover opacity-80"
                />
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(to top, #1a1a1a 0%, transparent 50%)",
                  }}
                />
              </div>

              <div className="absolute -top-5 -left-10 bg-[#222222] border border-white/10 rounded-2xl p-4 flex items-center gap-3 shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-[#1D9E75]/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles size={18} className="text-[#1D9E75]" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">
                    Active now
                  </p>
                  <p className="text-sm font-semibold text-white">
                    Mindful Morning
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-8 bg-[#222222] border border-white/10 rounded-2xl p-4 flex items-center gap-3 shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-[#1D9E75]/20 flex items-center justify-center flex-shrink-0">
                  <Users size={18} className="text-[#1D9E75]" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">
                    Support group
                  </p>
                  <p className="text-sm font-semibold text-white">
                    Anxiety Warriors
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-5 left-4 bg-[#222222] border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-xl">
                <span className="w-2 h-2 rounded-full bg-[#1D9E75] animate-pulse" />
                <span className="text-xs text-white/60 font-medium">
                  Check your Mental Health
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
