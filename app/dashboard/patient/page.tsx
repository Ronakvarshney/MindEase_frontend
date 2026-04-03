"use client";
import React, { useEffect, useState } from "react";
import {
  Wind,
  Book,
  ArrowUpRight,
  ArrowRight,
  Clock,
  Heart,
  ShieldAlert,
  MessageSquare,
  LineChart,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useAssessmentStore } from "@/store/assessmentStore";

export default function Page() {
  const navigate = useRouter();
  const { getDetails } = useAssessmentStore();
  const [result, setresult] = useState({
    risk_level: "",
    overall_summary: "",
    mental_health_score: 0,
  });

  useEffect(() => {
    // const loadResult = async () => {
    //   try {
    //     const res = await axios.get("/api/assessment/get_result");
    //     if (res.data.details) {
    //       setresult({
    //         risk_level: res.data.details.risk_level,
    //         overall_summary: res.data.details.overall_summary,
    //         mental_health_score: res.data.details.health_score,
    //       });
    //     }
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // };

    const details = getDetails();
    setresult({
      risk_level: details.risk_level,
      overall_summary: details.summary,
      mental_health_score: details.mental_health,
    });

  }, []);

  console.log(result);

  const featureCards = [
    {
      title: "Personal Journal",
      desc: "Private, encrypted thoughts",
      icon: <Book size={20} />,
      color: "bg-amber-50 text-amber-600",
      link: "#",
    },
    {
      title: "Wellness Activities",
      desc: "Breathing & Meditation",
      icon: <Wind size={20} />,
      color: "bg-emerald-50 text-emerald-600",
      link: "#",
    },
    {
      title: "Book Therapist",
      desc: "Your healing journey way.",
      icon: <LineChart size={20} />,
      color: "bg-purple-50 text-purple-600",
      link: "/therepist",
    },
    {
      title: "Support Groups",
      desc: "Connect with peers anonymously",
      icon: <Heart size={20} />,
      color: "bg-rose-50 text-rose-600",
      link: "#",
    },
  ];

  const notifications = [
    { title: "Time to Breathe", time: "10:30 AM", type: "Reminder" },
    { title: "Mood Check-in", time: "2:00 PM", type: "Prompt" },
  ];

  return (
    <div className="pt-20 pb-10 bg-[#FCFBFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Welcome back,
            </h1>
            <p className="text-slate-500 font-medium mt-1 flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-500" />
              You are in a safe, private space.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => navigate.push("/chat")}
                className="p-8 rounded-[2.5rem] text-left transition-all hover:scale-[1.02] border flex flex-col justify-between h-64 bg-indigo-600 text-white shadow-indigo-200"
              >
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black mb-1">
                    Talk to Serenity AI
                  </h3>
                  <p className="text-sm opacity-80 font-medium">
                    24/7 empathetic companion
                  </p>
                </div>
              </button>

              <button
                onClick={() => navigate.push("/assessment")}
                className="p-8 rounded-[2.5rem]  text-left transition-all hover:scale-[1.02] border flex flex-col justify-between h-64 bg-white text-indigo-600 border-indigo-100 shadow-sm"
              >
                {result.mental_health_score ||
                result.risk_level ||
                result.overall_summary ? (
                  <div className="flex flex-col justify-between h-full">
                    <h1>Mental Health Report</h1>

                    <div className="space-y-2">
                      {result.mental_health_score && (
                        <p className="text-sm font-bold text-slate-800">
                          Status:{" "}
                          <span className="text-indigo-600">
                            {result.mental_health_score}
                          </span>
                        </p>
                      )}

                      {result.risk_level && (
                        <p className="text-xs font-medium text-rose-500 uppercase tracking-wide">
                          Risk Level: {result.risk_level}
                        </p>
                      )}

                      {result.overall_summary && (
                        <p className="text-xs text-rose-500">
                          {result.overall_summary}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col justify-between h-full">
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
                      <Zap size={24} />
                    </div>

                    <div>
                      <h3 className="text-xl font-black mb-1">
                        Mental Vibe Check
                      </h3>
                      <p className="text-sm opacity-80 font-medium">
                        Get to know your state
                      </p>
                    </div>
                  </div>
                )}
              </button>
            </div>

            {/* <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                <Smile size={120} />
              </div>
              <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                <Coffee size={18} className="text-amber-500" />
                Quick Mood Log
              </h3>
              <div className="grid grid-cols-5 gap-3">
                {[
                  {
                    icon: <Frown />,
                    label: "Low",
                    color: "bg-rose-50 text-rose-500 border-rose-100",
                  },
                  {
                    icon: <Meh />,
                    label: "Meh",
                    color: "bg-slate-50 text-slate-500 border-slate-100",
                  },
                  {
                    icon: <Smile />,
                    label: "Good",
                    color: "bg-indigo-50 text-indigo-500 border-indigo-100",
                  },
                  {
                    icon: <Sun />,
                    label: "Great",
                    color: "bg-amber-50 text-amber-500 border-amber-100",
                  },
                  {
                    icon: <Sparkles />,
                    label: "Inspire",
                    color: "bg-purple-50 text-purple-500 border-purple-100",
                  },
                ].map((mood, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedMood(i)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-3xl border-2 transition-all ${
                      selectedMood === i
                        ? `${mood.color.replace("border-", "border-")} scale-105 shadow-md`
                        : "bg-white border-transparent hover:border-slate-100 grayscale hover:grayscale-0"
                    }`}
                  >
                    {React.cloneElement(
                      mood.icon as React.ReactElement<{ size?: number }>,
                      { size: 24 },
                    )}
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
                      {mood.label}
                    </span>
                  </button>
                ))}
              </div>
            </div> */}

            {/* 3. Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featureCards.map((card, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                  <Link href={card.link}>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}
                      >
                        {card.icon}
                      </div>
                      <ArrowUpRight
                        size={16}
                        className="text-slate-300 group-hover:text-indigo-400 transition-colors"
                      />
                    </div>
                    <h4 className="font-black text-slate-800 mb-1">
                      {card.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {card.desc}
                    </p>
                  </Link>
                </div>
              ))}
            </div>

            {/* 4. Weekly View (Visual Only) */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                  <LineChart size={18} className="text-indigo-400" />
                  Mental Wellbeing Trend
                </h3>
                <div className="flex items-end gap-3 h-32">
                  {[30, 60, 40, 80, 50, 70, 90].map((h, i) => (
                    <div key={i} className="flex-1 group relative">
                      <div
                        className={`w-full rounded-t-lg transition-all duration-1000 bg-white/10 group-hover:bg-indigo-500/50 cursor-help ${i === 6 ? "bg-indigo-400" : ""}`}
                        style={{ height: `${h}%` }}
                      ></div>
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Day {i + 1}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <span>Mon</span>
                  <span>Sun</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar (4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-rose-50 border border-rose-100 rounded-[2.5rem] p-6 text-rose-900">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <ShieldAlert className="text-rose-500" size={24} />
                </div>
                <h3 className="font-black text-sm uppercase tracking-widest">
                  Help is here
                </h3>
              </div>
              <p className="text-xs font-medium mb-4 opacity-80 leading-relaxed">
                If you feel like you&apos;re in immediate danger or need someone
                to talk to right now.
              </p>
              <button className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black text-sm hover:bg-rose-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-200">
                Call 988 (Lifeline)
              </button>
            </div>

            {/* 2. Reminders / Notifications */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">
                Reminders
              </h3>
              <div className="space-y-4">
                {notifications.map((n, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-100 transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors">
                      <Clock size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {n.title}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                        {n.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Community Highlights */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-[2.5rem] p-8">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">
                Community
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/150?u=${i}`}
                      className="w-10 h-10 rounded-full border-4 border-white"
                      alt="avatar"
                    />
                  ))}
                  <div className="w-10 h-10 rounded-full bg-indigo-200 border-4 border-white flex items-center justify-center text-[10px] font-black text-indigo-700">
                    +12
                  </div>
                </div>
                <p className="text-xs font-bold text-indigo-900">
                  14 people are currently in the &quot;Mindfulness&quot; group.
                </p>
                <button className="mt-2 text-indigo-600 text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                  Join Room <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* 4. Daily Wisdom Quote */}
            <div className="p-8 text-center bg-cream rounded-[2.5rem] border border-orange-100/50">
              <Heart
                className="w-8 h-8 text-rose-300 mx-auto mb-4"
                fill="currentColor"
              />
              <p className="text-sm italic font-medium text-slate-600 leading-relaxed">
                &quot;You don&apos;t have to see the whole staircase, just take
                the first step.&quot;
              </p>
              <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                MLK Jr.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
