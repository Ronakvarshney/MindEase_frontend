"use client";

import { ArrowRight, Flower, Sparkles } from "lucide-react";
import { FadeIn } from "./FadeIn";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

export default function Hero() {
  const { user } = useAuthStore();
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full blob opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-100 rounded-full blob opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-6">
            Your wellbeing, prioritized
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            A gentler way to <br />
            <span className="text-indigo-600">find your balance.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
            Safe, private, and judgment-free emotional support whenever you need
            it. Your journey to mental wellness starts with a single, small
            step.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`${user}` ? "/" : "/login"}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-semibold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200/50 flex items-center justify-center gap-2"
            >
              Start Anonymously <ArrowRight size={18} />
            </Link>
            <Link
              href={`${user}` ? "/" : "/login"}
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-semibold hover:bg-slate-50 transition-all"
            >
              Explore Resources
            </Link>
          </div>
        </FadeIn>

        <div className="mt-16 relative mx-auto max-w-3xl">
          <div className="absolute -top-10 z-4 -left-8 p-6 bg-white/90 backdrop-blur-md rounded-[2rem] shadow-2xl border border-white/50 flex items-center gap-4 animate-float">
            <div className="w-12 h-12 bg-mental-blue rounded-2xl flex items-center justify-center text-yellow-600">
              <Sparkles size={24} />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Active wellness
              </p>
              <p className="text-sm font-black text-slate-800">
                Mindful Morning
              </p>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            <Image
              src="/mental-health-care-sketch-diagram.jpg"
              width={200}
              height={200}
              alt="Person meditating in nature"
              className="w-full h-auto grayscale-[20%] brightness-110"
            />
          </div>
          <div className="absolute -bottom-16 -right-12 flex gap-4 items-end">
            <div className="animate-spin-slow">
              <Flower className="text-rose-400" size={56} strokeWidth={1.5} />
            </div>
            <div className="animate-float mb-6">
              <Flower className="text-indigo-400" size={40} strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
