

export const HowItWorks = () => {
  const steps = [
    { num: "01", title: "Share how you feel", desc: "Start a private conversation or a quick check-in. Just be you." },
    { num: "02", title: "Get personalized care", desc: "Our system learns what helps you most and suggests relevant tools." },
    { num: "03", title: "Track & Feel Better", desc: "Monitor your progress over time and celebrate the small wins." }
  ];

  return (
    <section className="py-24 bg-indigo-600 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8 leading-tight">Finding peace is simpler <br />than you think.</h2>
            <div className="space-y-12">
              {steps.map((s, i) => (
                <div key={i} className="flex gap-6">
                  <span className="text-4xl font-black text-indigo-400/50">{s.num}</span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                    <p className="text-indigo-100 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-md p-1 rounded-3xl border border-white/20">
              <img src="https://picsum.photos/seed/peace/800/800" className="rounded-[22px] w-full aspect-square object-cover mix-blend-soft-light opacity-80" alt="Serene landscape" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
