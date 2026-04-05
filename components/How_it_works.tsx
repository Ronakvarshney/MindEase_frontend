export const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      title: "Share how you feel",
      desc: "Start a private conversation or a quick check-in. No judgment, no pressure — just be you.",
      tag: "Anonymous & Safe",
    },
    {
      num: "02",
      title: "Get personalized care",
      desc: "Our system learns what helps you most and suggests relevant tools, groups, and resources.",
      tag: "AI Powered",
    },
    {
      num: "03",
      title: "Track & feel better",
      desc: "Monitor your progress over time, celebrate small wins, and build lasting mental resilience.",
      tag: "Progress Tracking",
    },
  ];

  return (
    <section className="py-28 bg-[#222222] relative overflow-hidden">

      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Green glow left */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(29,158,117,0.08) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left — Steps */}
          <div className="flex flex-col gap-10">

            {/* Header */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 w-fit px-4 py-1.5 rounded-full border border-[#1D9E75]/30 bg-[#1D9E75]/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75]" />
                <span className="text-xs font-semibold text-[#1D9E75] tracking-widest uppercase">
                  How it works
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Finding peace is simpler{" "}
                <br className="hidden md:block" />
                than you think.
              </h2>
              <p className="text-white/40 text-sm leading-relaxed max-w-sm">
                Three simple steps — no complicated setup, no long forms. Just you and your wellbeing.
              </p>
            </div>

            {/* Steps */}
            <div className="flex flex-col gap-2">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className="group flex gap-5 p-5 rounded-2xl border border-transparent hover:border-white/8 hover:bg-[#1a1a1a] transition-all duration-200 cursor-default"
                >
                  {/* Number */}
                  <div className="flex flex-col items-center gap-2 pt-1">
                    <span className="text-xs font-bold text-[#1D9E75] font-mono">{s.num}</span>
                    {i < steps.length - 1 && (
                      <div className="w-px flex-1 bg-white/8 min-h-[40px]" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2 pb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-white">{s.title}</h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#1D9E75]/10 text-[#1D9E75] border border-[#1D9E75]/20">
                        {s.tag}
                      </span>
                    </div>
                    <p className="text-sm text-white/40 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Visual */}
          <div className="hidden lg:flex items-center justify-end">
            <div className="relative w-full max-w-md">

              {/* Main card */}
              <div className="rounded-2xl border border-white/10 bg-[#1a1a1a] overflow-hidden">
                <img
                  src="https://picsum.photos/seed/peace/800/600"
                  className="w-full h-64 object-cover opacity-40"
                  alt="Serene landscape"
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{ background: "linear-gradient(to top, #1a1a1a 0%, transparent 60%)" }}
                />
              </div>

              {/* Stat cards */}
              <div className="absolute -bottom-5 left-4 right-4 grid grid-cols-3 gap-3">
                {[
                  { value: "94%", label: "Feel better" },
                  { value: "12k+", label: "Members" },
                  { value: "4.9★", label: "Rating" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-0.5 py-3 px-2 rounded-xl bg-[#222222] border border-white/10"
                  >
                    <span className="text-base font-bold text-white">{stat.value}</span>
                    <span className="text-[10px] text-white/30">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Floating pill */}
              <div className="absolute -top-4 -right-4 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#222222] border border-white/10 shadow-xl">
                <span className="w-2 h-2 rounded-full bg-[#1D9E75] animate-pulse" />
                <span className="text-xs text-white/60 font-medium">Live support available</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};