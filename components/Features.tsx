import React from "react";
import {
  MessageCircle,
  Sparkles,
  CheckCircle2,
  UserCircle,
  Wind,
  Users,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "AI Mental Health Chat",
    desc: "Kind, empathetic conversation available 24/7 to listen without judgment.",
    icon: MessageCircle,
    accent: "#1D9E75",
    bg: "rgba(29,158,117,0.12)",
    navigate: "/chat",
  },
  {
    title: "Mood Tracking",
    desc: "Identify patterns in your emotions with a simple, daily visual journal.",
    icon: Sparkles,
    accent: "#5DCAA5",
    bg: "rgba(93,202,165,0.12)",
    navigate: "/therepist",
  },
  {
    title: "Self-Assessments",
    desc: "Gentle check-ins designed to help you understand your current headspace.",
    icon: CheckCircle2,
    accent: "#60a5fa",
    bg: "rgba(96,165,250,0.12)",
    navigate: "/assessment",
  },
  {
    title: "Therapist Consultation",
    desc: "Connect with certified professionals when you're ready for the next step.",
    icon: UserCircle,
    accent: "#c084fc",
    bg: "rgba(192,132,252,0.12)",
    navigate: "/therepist",
  },
  {
    title: "Personalized Wellness",
    desc: "Custom breathing, meditation, and habit plans tailored for you.",
    icon: Wind,
    accent: "#f472b6",
    bg: "rgba(244,114,182,0.12)",
    navigate: "/wellness",
  },
  {
    title: "Safe Support Groups",
    desc: "Moderated communities of people who truly understand your experience.",
    icon: Users,
    accent: "#fb923c",
    bg: "rgba(251,146,60,0.12)",
    navigate: "/groups",
  },
];

export const Features = () => {
  return (
    <section className="py-28 bg-[#1a1a1a] relative overflow-hidden">

      {/* Subtle top border line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1D9E75]/30 bg-[#1D9E75]/10 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75]" />
            <span className="text-xs font-semibold text-[#1D9E75] tracking-widest uppercase">
              Everything you need
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Complete support for your mind
          </h2>
          <p className="text-white/40 max-w-xl text-base leading-relaxed">
            Discover tools designed to help you breathe, grow, and heal — at
            your own pace.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Link
                key={i}
                href={f.navigate}
                className="group relative flex flex-col gap-5 p-7 rounded-2xl border border-white/8 bg-[#222222] hover:border-white/15 hover:bg-[#252525] transition-all duration-200"
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                  style={{ backgroundColor: f.bg }}
                >
                  <Icon size={20} style={{ color: f.accent }} />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-semibold text-white">
                    {f.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {f.desc}
                  </p>
                </div>

                {/* Arrow */}
                <div
                  className="mt-auto flex items-center gap-1.5 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: f.accent }}
                >
                  Explore
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Hover left border accent */}
                <div
                  className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ backgroundColor: f.accent }}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};