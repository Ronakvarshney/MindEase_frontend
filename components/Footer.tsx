
import React from 'react';
import { Heart } from 'lucide-react';

export const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <Heart className="text-white w-5 h-5" fill="white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Serenity</span>
          </div>
          <p className="text-slate-500 max-w-sm mb-6 leading-relaxed">
            Serenity is a modern mental health platform providing safe, accessible emotional support for everyone. 
          </p>
          <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
            <h4 className="text-white text-sm font-bold mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              Emergency Helplines
            </h4>
            <p className="text-xs mb-1">If you are in crisis, please call:</p>
            <p className="text-indigo-400 font-bold text-sm">US: 988 (Suicide & Crisis Lifeline)</p>
            <p className="text-indigo-400 font-bold text-sm">International: 112 or local emergency</p>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6">Platform</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">AI Chat Support</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Mood Journaling</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Find a Therapist</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Safety Standards</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
          </ul>
        </div>
      </div>
      
      <div className="pt-8 border-t border-slate-800 text-xs text-center md:text-left flex flex-col md:flex-row justify-between gap-4">
        <p>© 2024 Serenity Wellbeing Inc. All rights reserved.</p>
        <p className="max-w-lg text-slate-500">
          Disclaimer: Serenity uses AI to provide emotional support and wellness guidance. 
          It is not a substitute for clinical diagnosis or treatment by a licensed medical professional.
        </p>
      </div>
    </div>
  </footer>
);
