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

export const Features = () => {
  const features = [
    {
      title: "AI Mental Health Chat",
      desc: "Kind, empathetic conversation available 24/7 to listen without judgment.",
      icon: <MessageCircle className="w-6 h-6" />,
      color: "bg-indigo-50 text-indigo-600",
      navigate: "/chat",
    },
    {
      title: "Mood Tracking",
      desc: "Identify patterns in your emotions with a simple, daily visual journal.",
      icon: <Sparkles className="w-6 h-6" />,
      color: "bg-sky-50 text-sky-600",
      navigate: "/therepist",
    },
    {
      title: "Self-Assessments",
      desc: "Gentle check-ins designed to help you understand your current headspace.",
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: "bg-emerald-50 text-emerald-600",
      navigate: "/assessment",
    },
    {
      title: "Therapist Consultation",
      desc: "Connect with certified professionals when you're ready for the next step.",
      icon: <UserCircle className="w-6 h-6" />,
      color: "bg-purple-50 text-purple-600",
      navigate: "/therepist",
    },
    {
      title: "Personalized Wellness",
      desc: "Custom breathing, meditation, and habit plans tailored for you.",
      icon: <Wind className="w-6 h-6" />,
      color: "bg-rose-50 text-rose-600",
      navigate: "/wellness",
    },
    {
      title: "Safe Support Groups",
      desc: "Moderated communities of people who truly understand your experience.",
      icon: <Users className="w-6 h-6" />,
      color: "bg-amber-50 text-amber-600",
      navigate: "",
    },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Complete support for your mind
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Discover tools designed to help you breathe, grow, and heal at your
            own pace.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <Link href={f.navigate}
              key={i}
              className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
            >
              <div
                className={`w-12 h-12 ${f.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {f.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">{f.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
