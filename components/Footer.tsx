"use client";

import { Heart, Github, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

const platform = [
  { label: "AI Chat Support", href: "/chat" },
  { label: "Mood Journaling", href: "#" },
  { label: "Find a Therapist", href: "/therepist" },
  { label: "Support Groups", href: "/groups" },
  { label: "Safety Standards", href: "#" },
];

const company = [
  { label: "About Us", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Contact Support", href: "#" },
];

const socials = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Github, href: "#", label: "Github" },
];

export default function Footer() {
  return (
    <footer className="bg-[#141414] border-t border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-16">

          {/* Brand col */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2.5 w-fit group">
              <div className="w-8 h-8 bg-[#1D9E75] rounded-lg flex items-center justify-center group-hover:opacity-85 transition-opacity">
                <Heart className="text-white w-4 h-4" fill="white" />
              </div>
              <span className="text-base font-semibold tracking-tight text-white">
                MindEase
              </span>
            </Link>

            <p className="text-sm text-white/35 max-w-xs leading-relaxed">
              A modern mental health platform providing safe, accessible
              emotional support — whenever you need it most.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-200"
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>

            {/* Crisis line */}
            <div className="flex items-start gap-3 p-4 rounded-xl border border-[#1D9E75]/20 bg-[#1D9E75]/8">
              <span className="w-2 h-2 rounded-full bg-[#1D9E75] animate-pulse mt-1 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-[#1D9E75] mb-0.5">
                  Crisis Support Line
                </p>
                <p className="text-xs text-white/35 leading-relaxed">
                  If you're in immediate distress, call{" "}
                  <span className="text-white/60 font-medium">iCall: 9152987821</span>
                </p>
              </div>
            </div>
          </div>

          {/* Platform links */}
          <div className="flex flex-col gap-5">
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest">
              Platform
            </h4>
            <ul className="flex flex-col gap-3">
              {platform.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/40 hover:text-white transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {company.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/40 hover:text-white transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} MindEase Wellbeing Inc. All rights reserved.
          </p>
          <p className="text-xs text-white/30 max-w-md text-center md:text-right leading-relaxed">
            MindEase uses AI to provide emotional support and wellness guidance.
            It is not a substitute for clinical diagnosis or treatment by a
            licensed medical professional.
          </p>
        </div>

      </div>
    </footer>
  );
}