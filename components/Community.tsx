
import { ArrowRight, Clock, BookOpen } from 'lucide-react';

export const Community = () => {
  const articles = [
    { title: "Understanding Burnout", cat: "Workplace Wellness", time: "5 min read", img: "https://picsum.photos/seed/burn/400/250" },
    { title: "Guided Sleep Meditation", cat: "Sleep Hygiene", time: "12 min audio", img: "https://picsum.photos/seed/sleep/400/250" },
    { title: "Building Resilience", cat: "Mental Growth", time: "8 min read", img: "https://picsum.photos/seed/grow/400/250" }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Learn & Connect</h2>
            <p className="text-slate-600">Explore our library of expert-backed resources and community wisdom.</p>
          </div>
          <button className="flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all">
            View all resources <ArrowRight size={18} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((a, i) => (
            <div key={i} className="bg-white rounded-3xl overflow-hidden border border-slate-100 group cursor-pointer hover:shadow-xl transition-all">
              <div className="h-48 overflow-hidden relative">
                <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  {a.cat}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">{a.title}</h3>
                <div className="flex items-center gap-4 text-slate-400 text-sm">
                  <span className="flex items-center gap-1.5"><Clock size={14} /> {a.time}</span>
                  <span className="flex items-center gap-1.5"><BookOpen size={14} /> Article</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
