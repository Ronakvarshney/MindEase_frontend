import React from "react";
import { ShieldCheck, ArrowRight, Lock, Clock, Heart } from "lucide-react";
import Link from "next/link";

const trust = [
  { icon: ShieldCheck, label: "100% Anonymous" },
  { icon: Lock, label: "End-to-end Private" },
  { icon: Clock, label: "Available 24/7" },
  { icon: Heart, label: "Always Free to Try" },
];

export const FinalCTA = () => (
  <section className="py-28 bg-[#1a1a1a] relative overflow-hidden">

    {/* Top divider */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

    {/* Green glow center */}
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
      style={{ background: "radial-gradient(circle, rgba(29,158,117,0.08) 0%, transparent 70%)" }}
    />

    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Main card */}
      <div className="rounded-3xl border border-white/10 bg-[#222222] overflow-hidden">

        {/* Top green strip */}
        <div className="h-1 w-full bg-gradient-to-r from-[#1D9E75] via-[#5DCAA5] to-[#1D9E75]" />

        <div className="px-8 py-16 md:px-20 md:py-20 flex flex-col items-center text-center gap-8">

          {/* Badge */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1D9E75]/30 bg-[#1D9E75]/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] animate-pulse" />
            <span className="text-xs font-semibold text-[#1D9E75] tracking-widest uppercase">
              Start today — no sign up needed
            </span>
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Take your first step{" "}
              <span
                style={{
                  WebkitTextFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  backgroundImage: "linear-gradient(90deg, #1D9E75, #5DCAA5)",
                }}
              >
                today.
              </span>
            </h2>
            <p className="text-white/40 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              No sign-up required to start talking. Completely anonymous,
              deeply personal, and always free to try.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/chat"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#1D9E75] hover:bg-[#178a64] text-white text-sm font-semibold transition-all"
            >
              Begin Your Journey
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/groups"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl border border-white/10 hover:bg-white/5 text-white/60 hover:text-white text-sm font-semibold transition-all"
            >
              Explore Support Groups
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 border-t border-white/8 w-full">
            {trust.map((t, i) => {
              const Icon = t.icon;
              return (
                <div key={i} className="flex items-center gap-2 text-white/30">
                  <Icon size={14} className="text-[#1D9E75]" />
                  <span className="text-xs font-medium">{t.label}</span>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      <p className="text-center text-white/50 text-xs mt-8 italic">
        "Asking for help is the first act of courage." — MindEase
      </p>
    </div>
  </section>
);