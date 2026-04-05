import { Heart } from "lucide-react";

export const SupportMessage = () => (
  <section className="py-28 bg-[#1a1a1a] relative overflow-hidden">

    {/* Top divider */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

    {/* Subtle green glow */}
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] pointer-events-none"
      style={{ background: "radial-gradient(ellipse, rgba(29,158,117,0.07) 0%, transparent 70%)" }}
    />

    <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-8">

      {/* Heart icon */}
      <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
        <Heart size={24} className="text-rose-400" fill="rgba(251,113,133,0.8)" />
      </div>

      {/* Quote */}
      <blockquote className="flex flex-col gap-6">
        <p className="text-2xl md:text-4xl font-light italic text-white/80 leading-relaxed tracking-wide">
          "You are not broken. You are human.
          <br className="hidden md:block" />
          And help is{" "}
          <span
            style={{
              WebkitTextFillColor: "transparent",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              backgroundImage: "linear-gradient(90deg, #1D9E75, #5DCAA5)",
              fontStyle: "normal",
              fontWeight: 500,
            }}
          >
            always available.
          </span>
          "
        </p>

        {/* Divider line */}
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-white/10" />
          <p className="text-sm text-white/30 font-medium tracking-widest uppercase">
            The MindEase Team
          </p>
          <div className="h-px w-12 bg-white/10" />
        </div>
      </blockquote>

    </div>
  </section>
);