"use client";

import React, { useState } from "react";
import {
  Send,
  User,
  Brain,
  Heart,
  Shield,
  Info,
  ArrowRight,
} from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import axios from "axios";

interface Message {
  role: "user" | "model";
  text: string;
}

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hello, I'm Serenity. I'm here to listen and support you in a safe, judgment-free space. How are you feeling today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setInput("");

    try {
      const response = await axios.post("http://localhost:5000/api/v1/chatting", { message: input });
      console.log(response.data);
      const modelmessage : Message = {role : 'model' , text : response?.data?.response.kwargs?.content} ;
      setMessages((prev)=>[...prev ,modelmessage ])
      // TODO: push model reply into messages when backend returns it
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "I'm feeling a bit anxious today",
    "I need help relaxing",
    "I just need someone to talk to",
    "What are some self-care tips?",
  ];

  return (
    <div className="pt-20 pb-10 bg-cream flex justify-center min-h-screen px-2 sm:px-4">
      <div className="w-full max-w-[1600px] flex bg-transparent">
        <div className="hidden md:flex md:w-[28%] min-w-[280px] border-r-2 bg-white border-slate-700 p-6 flex-col gap-6">
          <div>
            <h2 className="text-xl font-black text-slate-800 mb-2">
              Mental Wellness
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              A safe space to reflect, understand your emotions, and find calm
              through guided AI support.
            </p>
          </div>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-between bg-indigo-600 text-white px-5 py-4 rounded-2xl font-bold shadow-md hover:bg-indigo-700 transition">
              Analyze Mental Health Report
              <ArrowRight size={18} />
            </button>

            <button className="w-full bg-indigo-50 text-indigo-700 px-5 py-4 rounded-2xl font-bold hover:bg-indigo-100 transition">
              Talk & Feel Relaxed
            </button>
          </div>

          <div className="mt-6 bg-slate-50 rounded-2xl p-5 border border-slate-100">
            <h3 className="text-sm font-black text-slate-700 mb-2">
              What Serenity Can Help With
            </h3>
            <ul className="text-xs text-slate-500 space-y-2 leading-relaxed">
              <li>• Anxiety & stress relief</li>
              <li>• Emotional journaling</li>
              <li>• Self-care guidance</li>
              <li>• Thought clarity</li>
            </ul>
          </div>
        </div>

        <div className="w-full md:w-[72%] h-[85vh] md:h-[90vh] mx-auto px-2 sm:px-4 flex flex-col">
          {/* Header */}
          <div className="mb-2 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                <Brain className="text-indigo-500" />
                Serenity AI
              </h1>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                A compassionate AI companion designed to listen, support, and
                guide you gently.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mt-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                Online & listening
              </div>
            </div>

            <div className="bg-white px-4 py-2 rounded-2xl border border-slate-100 flex items-center gap-2 shadow-sm">
              <Shield size={16} className="text-indigo-400" />
              <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                Private & Secure
              </span>
            </div>
          </div>

          {/* Chat Box */}
          <div className="flex-1 bg-white/50 backdrop-blur-md rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col overflow-hidden min-h-1/2">
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2 no-scrollbar">
              {messages.map((msg, i) => (
                <FadeIn key={i} delay={0}>
                  <div
                    className={`flex ${
                      msg.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex max-w-[85%] gap-3 ${
                        msg.role === "user"
                          ? "flex-row-reverse"
                          : "flex-row"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center ${
                          msg.role === "user"
                            ? "bg-indigo-100 text-indigo-600"
                            : "bg-rose-100 text-rose-500"
                        }`}
                      >
                        {msg.role === "user" ? (
                          <User size={20} />
                        ) : (
                          <Heart size={20} fill="currentColor" />
                        )}
                      </div>

                      <div
                        className={`p-5 rounded-[2rem] text-sm leading-relaxed shadow-sm border ${
                          msg.role === "user"
                            ? "bg-indigo-600 text-white border-indigo-500 rounded-tr-none"
                            : "bg-white text-slate-700 border-slate-50 rounded-tl-none"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-500 flex items-center justify-center animate-pulse">
                      <Heart size={20} fill="currentColor" />
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-slate-50 flex gap-1">
                      <span className="w-2 h-2 bg-slate-200 rounded-full animate-bounce"></span>
                      <span
                        className="w-2 h-2 bg-slate-200 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-slate-200 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="px-4 sm:px-6 py-4 flex flex-wrap gap-2">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(s)}
                    className="px-4 py-2 bg-white/80 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-100 rounded-full text-xs font-bold text-slate-500 transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 sm:p-6 bg-white border-t border-slate-100">
              <div className="relative">
                <textarea
                  rows={2}
                  placeholder="Take your time… what’s been on your mind?"
                  className="w-full pl-6 pr-16 py-4 bg-slate-50 border border-slate-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none text-sm font-medium"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />

                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all ${
                    input.trim()
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                      : "bg-slate-200 text-slate-400"
                  }`}
                >
                  <Send size={20} />
                </button>
              </div>

              <div className="mt-4 flex items-center gap-2 justify-center text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                <Info size={12} />
                Serenity AI can make mistakes. For crises, call 988 (US) or your
                local emergency services.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
