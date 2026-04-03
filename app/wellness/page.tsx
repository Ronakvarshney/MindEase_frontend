"use client"
import React from 'react';
import { 
  Smile, Frown, Meh, Sun, Wind, Book, 
  Calendar, ArrowUpRight, CheckCircle2, 
  Clock, Flame, Star, Coffee, Sparkles,
  Heart
} from 'lucide-react';
import { FadeIn } from '@/components/FadeIn';



export default function Page(){
  const habits = [
    { title: 'Morning Meditation', completed: true, time: '10 min', icon: <Wind size={18} /> },
    { title: 'Daily Journaling', completed: true, time: '5 min', icon: <Book size={18} /> },
    { title: 'Deep Breathing', completed: false, time: '3 min', icon: <Wind size={18} /> },
    { title: 'Sleep Routine', completed: false, time: '15 min', icon: <Calendar size={18} /> },
  ];

  const recommendations = [
    { title: 'Box Breathing', duration: '5m', type: 'Exercise', color: 'bg-indigo-50 text-indigo-600' },
    { title: 'Coping with Burnout', duration: '8m', type: 'Article', color: 'bg-rose-50 text-rose-600' },
    { title: 'Natural Sleep Sounds', duration: '30m', type: 'Audio', color: 'bg-sky-50 text-sky-600' },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <FadeIn>
            <div className="space-y-1">
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                Good morning, <span className="text-mental-blue">Alex.</span>
              </h1>
              <p className="text-slate-500 font-medium">Monday, June 12 • Take a deep breath.</p>
            </div>
          </FadeIn>
          
          <div className="flex gap-4">
            <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
                <Flame size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Streak</p>
                <p className="text-sm font-black text-slate-800">12 Days</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">
                <Star size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Points</p>
                <p className="text-sm font-black text-slate-800">1,240</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Mood Tracker */}
            <FadeIn delay={100}>
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <Coffee className="text-mental-orange" />
                  How are you feeling right now?
                </h3>
                <div className="grid grid-cols-5 gap-4">
                  {[
                    { icon: <Frown />, label: 'Low', color: 'hover:bg-rose-50 hover:text-rose-500' },
                    { icon: <Meh />, label: 'Neutral', color: 'hover:bg-slate-50 hover:text-slate-500' },
                    { icon: <Smile />, label: 'Good', color: 'hover:bg-indigo-50 hover:text-indigo-500' },
                    { icon: <Sun />, label: 'Great', color: 'hover:bg-amber-50 hover:text-amber-500' },
                    { icon: <Sparkles />, label: 'Inspired', color: 'hover:bg-purple-50 hover:text-purple-500' }
                  ].map((mood, i) => (
                    <button 
                      key={i}
                      className={`flex flex-col items-center gap-3 p-4 rounded-[2rem] border border-slate-50 transition-all group ${mood.color}`}
                    >
                      <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-current group-hover:bg-opacity-10 transition-colors">
                        {React.cloneElement(mood.icon as React.ReactElement, { size: 28 })}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-inherit">
                        {mood.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Progress Charts (Visual Only) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FadeIn delay={200}>
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Clock className="text-mental-blue" />
                    Weekly Wellness
                  </h3>
                  <div className="flex items-end gap-2 h-32 mt-8">
                    {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div 
                          className={`w-full rounded-t-xl transition-all duration-1000 ${i === 3 ? 'bg-mental-blue' : 'bg-slate-100'}`} 
                          style={{ height: `${h}%` }}
                        ></div>
                        <span className="text-[8px] font-bold text-slate-400">
                          {['S','M','T','W','T','F','S'][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={300}>
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-500" />
                    Activity Score
                  </h3>
                  <div className="flex items-center justify-center h-32">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path className="text-slate-50 stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="text-emerald-500 stroke-current" strokeDasharray="75, 100" strokeLinecap="round" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <text x="18" y="20.35" className="text-xs font-black text-slate-800" textAnchor="middle" fill="currentColor">75%</text>
                      </svg>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Personalized Recommendations */}
            <FadeIn delay={400}>
              <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Suggested for You</h3>
                  <button className="text-sm font-bold text-slate-400 hover:text-white flex items-center gap-1">
                    View Library <ArrowUpRight size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendations.map((rec, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-3xl hover:bg-white/10 transition-colors cursor-pointer group">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-3 ${rec.color}`}>
                        <Sparkles size={16} />
                      </div>
                      <h4 className="font-bold text-sm mb-1">{rec.title}</h4>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{rec.type} • {rec.duration}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* Daily Habits Check-in */}
            <FadeIn delay={500}>
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-slate-800">Daily Habits</h3>
                  <span className="text-xs font-bold text-mental-blue">50% Done</span>
                </div>
                <div className="space-y-4">
                  {habits.map((h, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 group">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${h.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-white text-slate-400'}`}>
                          {h.icon}
                        </div>
                        <div>
                          <p className={`text-sm font-bold ${h.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{h.title}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{h.time}</p>
                        </div>
                      </div>
                      <button className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${h.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-200 hover:border-mental-blue'}`}>
                        {h.completed && <CheckCircle2 size={14} />}
                      </button>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-4 bg-slate-50 text-slate-400 text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-slate-100 transition-colors">
                  + Add New Habit
                </button>
              </div>
            </FadeIn>

            {/* Quick Consultation Promo */}
            <FadeIn delay={600}>
              <div className="bg-gradient-to-br from-indigo-600 to-mental-blue rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                    <Heart size={24} fill="white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Need to talk?</h3>
                  <p className="text-indigo-100 text-sm mb-6 leading-relaxed">Your therapist Dr. Sarah Chen has an opening today at 4 PM.</p>
                  <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
                    Book Session <ArrowUpRight size={18} />
                  </button>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Sparkles size={100} />
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </div>
  );
};
