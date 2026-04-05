"use client"
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import Link from "next/link";

const articles = [
  {
    title: "Understanding Burnout",
    cat: "Workplace Wellness",
    time: "5 min read",
    type: "Article",
    img: "https://picsum.photos/seed/burn/400/250",
    accent: "#1D9E75",
    accentBg: "rgba(29,158,117,0.12)",
  },
  {
    title: "Guided Sleep Meditation",
    cat: "Sleep Hygiene",
    time: "12 min audio",
    type: "Audio",
    img: "https://picsum.photos/seed/sleep/400/250",
    accent: "#60a5fa",
    accentBg: "rgba(96,165,250,0.12)",
  },
  {
    title: "Building Resilience",
    cat: "Mental Growth",
    time: "8 min read",
    type: "Article",
    img: "https://picsum.photos/seed/grow/400/250",
    accent: "#c084fc",
    accentBg: "rgba(192,132,252,0.12)",
  },
];

export const Community = () => {
  return (
    <section className="py-28 bg-[#1a1a1a] relative overflow-hidden">

      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 w-fit px-4 py-1.5 rounded-full border border-[#1D9E75]/30 bg-[#1D9E75]/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75]" />
              <span className="text-xs font-semibold text-[#1D9E75] tracking-widest uppercase">
                Resources
              </span>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Learn & Connect
              </h2>
              <p className="text-white/40 text-sm leading-relaxed max-w-md">
                Explore our library of expert-backed resources and community wisdom.
              </p>
            </div>
          </div>

          <Link
            href="#"
            className="flex items-center gap-2 text-sm font-semibold text-[#1D9E75] hover:gap-3 transition-all duration-200 w-fit"
          >
            View all resources <ArrowRight size={15} />
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {articles.map((a, i) => (
            <div
              key={i}
              className="group flex flex-col rounded-2xl border border-white/8 bg-[#222222] overflow-hidden hover:border-white/15 hover:bg-[#252525] transition-all duration-200 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={a.img}
                  alt={a.title}
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, #222222 0%, transparent 60%)" }}
                />
                {/* Category badge */}
                <span
                  className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border"
                  style={{
                    backgroundColor: a.accentBg,
                    color: a.accent,
                    borderColor: a.accent + "33",
                  }}
                >
                  {a.cat}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-4 p-5 flex-1">
                <h3
                  className="text-base font-semibold text-white leading-snug transition-colors duration-200"
                  style={{ color: "white" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = a.accent)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
                >
                  {a.title}
                </h3>

                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/8">
                  <span className="flex items-center gap-1.5 text-xs text-white/30">
                    <Clock size={12} /> {a.time}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-white/30">
                    <BookOpen size={12} /> {a.type}
                  </span>
                  <ArrowRight
                    size={14}
                    className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: a.accent }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};