
import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const FinalCTA = () => (
  <section className="py-24 bg-white">
    <div className="max-w-5xl mx-auto px-4 text-center">
      <div className="bg-gradient-to-br from-indigo-50 to-sky-50 rounded-[3rem] p-12 md:p-20 relative overflow-hidden border border-indigo-100 shadow-sm">
        <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
        
        <h2 className="text-4xl font-bold text-slate-900 mb-6">Take your first step today.</h2>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          No sign-up required to start talking. Completely anonymous, deeply personal, and always free to try.
        </p>
        <div className="space-y-4">
          <button className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200">
            Begin Your Journey
          </button>
          <p className="text-slate-400 text-sm flex items-center justify-center gap-2">
            <ShieldCheck size={16} /> Privacy-first. No judgment. Ever.
          </p>
        </div>
      </div>
    </div>
  </section>
);
