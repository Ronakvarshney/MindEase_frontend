"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  User,
  Heart,
  Shield,
  Info,
  ArrowRight,
  Brain,
  Sparkles,
  Wind,
  BookOpen,
} from "lucide-react";
import axios from "axios";

interface Message {
  role: "user" | "model";
  text: string;
}

const suggestions = [
  "I'm feeling anxious today",
  "I need help relaxing",
  "I just need to talk",
  "Give me self-care tips",
];

const capabilities = [
  { icon: Sparkles, label: "Anxiety & stress relief" },
  { icon: BookOpen, label: "Emotional journaling" },
  { icon: Wind, label: "Self-care guidance" },
  { icon: Brain, label: "Thought clarity" },
];

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hello, I'm MindEase. I'm here to listen and support you in a safe, judgment-free space. How are you feeling today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setInput("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/chatting",
        { message: input },
      );
      const modelMessage: Message = {
        role: "model",
        text: response?.data?.response.kwargs?.content,
      };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-16 flex">
      <aside className="hidden md:flex w-[280px] min-w-[280px] flex-col gap-6 p-6 border-r border-white/8 bg-[#222222]">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#1D9E75]/20 flex items-center justify-center">
              <Heart
                size={16}
                className="text-[#1D9E75]"
                fill="rgba(29,158,117,0.6)"
              />
            </div>
            <span className="text-sm font-semibold text-white">
              MindEase AI
            </span>
          </div>
          <p className="text-xs text-white/35 leading-relaxed">
            A safe space to reflect, understand your emotions, and find calm
            through guided AI support.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#1D9E75] hover:bg-[#178a64] text-white text-sm font-semibold transition-all">
            Analyze Health Report
            <ArrowRight size={15} />
          </button>
          <button className="w-full px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-white/60 hover:text-white text-sm font-semibold transition-all text-left">
            Talk & Feel Relaxed
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">
            What I can help with
          </p>
          <div className="flex flex-col gap-1">
            {capabilities.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div className="w-6 h-6 rounded-lg bg-[#1D9E75]/15 flex items-center justify-center flex-shrink-0">
                    <Icon size={12} className="text-[#1D9E75]" />
                  </div>
                  <span className="text-xs text-white/40">{c.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-auto flex items-center gap-2 px-3 py-2.5 rounded-xl border border-white/8 bg-white/3">
          <Shield size={13} className="text-[#1D9E75] flex-shrink-0" />
          <span className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">
            Private & Secure
          </span>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Brain size={16} className="text-[#1D9E75]" />
              <h1 className="text-sm font-semibold text-white">MindEase AI</h1>
            </div>
            <p className="text-xs text-white/35">
              A compassionate AI companion — here to listen and guide you
              gently.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1D9E75] animate-pulse" />
            <span className="text-xs text-white/30 font-medium">
              Online & listening
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 flex flex-col gap-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-end gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  msg.role === "user" ? "bg-[#1D9E75]/20" : "bg-rose-500/15"
                }`}
              >
                {msg.role === "user" ? (
                  <User size={14} className="text-[#1D9E75]" />
                ) : (
                  <Heart
                    size={14}
                    className="text-rose-400"
                    fill="rgba(251,113,133,0.7)"
                  />
                )}
              </div>

              <div
                className={`max-w-[70%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#1D9E75] text-white rounded-br-sm"
                    : "bg-[#2a2a2a] text-white/80 border border-white/8 rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-end gap-3">
              <div className="w-7 h-7 rounded-lg bg-rose-500/15 flex items-center justify-center flex-shrink-0">
                <Heart
                  size={14}
                  className="text-rose-400 animate-pulse"
                  fill="rgba(251,113,133,0.7)"
                />
              </div>
              <div className="px-5 py-3.5 rounded-2xl rounded-bl-sm bg-[#2a2a2a] border border-white/8 flex gap-1.5 items-center">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-white/25 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {messages.length === 1 && (
          <div className="px-6 sm:px-8 pb-4 flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => setInput(s)}
                className="px-4 py-2 rounded-full border border-white/10 bg-white/4 hover:bg-white/8 hover:border-white/20 text-xs text-white/45 hover:text-white/70 font-medium transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="px-4 sm:px-8 pb-6 pt-2 border-t border-white/8">
          <div className="relative flex items-end gap-3">
            <textarea
              rows={2}
              placeholder="Take your time… what's been on your mind?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1 resize-none px-5 py-3.5 rounded-2xl bg-[#2a2a2a] border border-white/10 focus:border-white/20 text-sm text-white placeholder-white/25 outline-none transition-colors leading-relaxed"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all mb-0.5 ${
                input.trim()
                  ? "bg-[#1D9E75] hover:bg-[#178a64] text-white"
                  : "bg-white/8 text-white/20 cursor-not-allowed"
              }`}
            >
              <Send size={16} />
            </button>
          </div>

          <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-white/20 font-medium uppercase tracking-widest">
            <Info size={11} />
            MindEase AI can make mistakes. For crises, call iCall: 9152987821
          </div>
        </div>
      </div>
    </div>
  );
}
