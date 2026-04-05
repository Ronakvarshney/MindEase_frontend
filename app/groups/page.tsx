"use client";

import React, { useState } from "react";

const groups = [
  {
    id: 1,
    name: "Anxiety Warriors",
    emoji: "🌊",
    members: 128,
    preview: "Remember to breathe deeply...",
    time: "2m",
    badge: 3,
    color: "#dbeafe",
    messages: [
      { sender: "Priya S.", avatar: "PS", avatarBg: "#93c5fd", text: "Hey everyone, had a rough morning with panic attacks again.", time: "9:12 AM", mine: false },
      { sender: "Rahul M.", avatar: "RM", avatarBg: "#6ee7b7", text: "I understand completely. Have you tried the 4-7-8 breathing technique?", time: "9:14 AM", mine: false },
      { sender: "You", avatar: "ME", avatarBg: "#1D9E75", text: "Same here Priya. What helps me is grounding — name 5 things you can see right now.", time: "9:15 AM", mine: true },
      { sender: "Priya S.", avatar: "PS", avatarBg: "#93c5fd", text: "Trying that now... actually helping a bit. Thank you 🙏", time: "9:17 AM", mine: false },
    ],
  },
  {
    id: 2,
    name: "Depression Support",
    emoji: "🌱",
    members: 94,
    preview: "You are not alone in this...",
    time: "15m",
    badge: 1,
    color: "#dcfce7",
    messages: [
      { sender: "Ankit V.", avatar: "AV", avatarBg: "#86efac", text: "Today was really hard. Couldn't get out of bed until noon.", time: "8:30 AM", mine: false },
      { sender: "Meera K.", avatar: "MK", avatarBg: "#fde68a", text: "Getting out of bed at all is a win, Ankit. Be kind to yourself.", time: "8:35 AM", mine: false },
      { sender: "You", avatar: "ME", avatarBg: "#1D9E75", text: "You showed up today. That matters more than you know.", time: "8:40 AM", mine: true },
    ],
  },
  {
    id: 3,
    name: "Mindfulness & Calm",
    emoji: "🧘",
    members: 211,
    preview: "5-min meditation starting soon",
    time: "1h",
    badge: 0,
    color: "#ede9fe",
    messages: [
      { sender: "Sunita R.", avatar: "SR", avatarBg: "#c4b5fd", text: "Good morning! Starting our Sunday session in 5 minutes.", time: "7:55 AM", mine: false },
      { sender: "You", avatar: "ME", avatarBg: "#1D9E75", text: "Looking forward to it! Last week's session really helped my sleep.", time: "7:57 AM", mine: true },
      { sender: "Sunita R.", avatar: "SR", avatarBg: "#c4b5fd", text: "Wonderful to hear. Today we focus on body scan meditation 🌿", time: "7:59 AM", mine: false },
    ],
  },
  {
    id: 4,
    name: "Stress Relief",
    emoji: "🌸",
    members: 76,
    preview: "Sharing coping strategies...",
    time: "3h",
    badge: 0,
    color: "#fce7f3",
    messages: [
      { sender: "Dev P.", avatar: "DP", avatarBg: "#f9a8d4", text: "Work pressure has been insane lately. Anyone else feeling overwhelmed?", time: "6:00 AM", mine: false },
      { sender: "You", avatar: "ME", avatarBg: "#1D9E75", text: "Yes! I started journaling before bed and it really helps clear my head.", time: "6:10 AM", mine: true },
    ],
  },
  {
    id: 5,
    name: "Grief & Loss",
    emoji: "🕊️",
    members: 52,
    preview: "A safe space to heal...",
    time: "1d",
    badge: 0,
    color: "#f3f4f6",
    messages: [
      { sender: "Nisha T.", avatar: "NT", avatarBg: "#d1d5db", text: "It's been six months and some days still feel impossible.", time: "Yesterday", mine: false },
      { sender: "You", avatar: "ME", avatarBg: "#1D9E75", text: "Grief has no timeline, Nisha. We're here with you.", time: "Yesterday", mine: true },
    ],
  },
];

type Group = (typeof groups)[0];
type Message = Group["messages"][0];

export default function GroupChatPage() {
  const [activeGroup, setActiveGroup] = useState<Group | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);

  const filtered = groups.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  const openGroup = (g: Group) => {
    setActiveGroup(g);
    setMessages(g.messages);
    setShowSidebar(false);
  };

  const sendMessage = () => {
    if (!input.trim() || !activeGroup) return;
    const newMsg: Message = {
      sender: "You",
      avatar: "ME",
      avatarBg: "#1D9E75",
      text: input.trim(),
      time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      mine: true,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  return (
    <div className="flex h-screen bg-[#1a1a1a] text-white overflow-hidden">

      {/* Sidebar */}
      <div className={`
        ${showSidebar ? "flex" : "hidden"} md:flex
        flex-col w-full md:w-[300px] lg:w-[320px] flex-shrink-0
        border-r border-white/10 bg-[#222222]
      `}>
        {/* Header */}
        <div className="px-5 pt-6 pb-4 border-b border-white/10">
          <h2 className="text-xs font-semibold tracking-widest text-white/40 uppercase">
            Support Groups
          </h2>
        </div>

        {/* Search */}
        <div className="px-4 pt-3 pb-2">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 16 16">
              <circle cx="6.5" cy="6.5" r="4.5" /><path d="M10.5 10.5l3 3" />
            </svg>
            <input
              type="text"
              placeholder="Search groups..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#2a2a2a] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-white/20 transition-colors"
            />
          </div>
        </div>

        {/* Group List */}
        <div className="flex-1 overflow-y-auto px-3 py-2">
          <p className="text-[10px] font-semibold tracking-widest text-white/30 uppercase px-2 mb-3">
            Your Groups
          </p>
          <div className="flex flex-col gap-1">
            {filtered.map((g) => (
              <button
                key={g.id}
                onClick={() => openGroup(g)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all ${
                  activeGroup?.id === g.id
                    ? "bg-white/10 border border-white/10"
                    : "hover:bg-white/5"
                }`}
              >
                {/* Avatar */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ backgroundColor: g.color + "33" }}
                >
                  {g.emoji}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{g.name}</p>
                  <p className="text-xs text-white/40 truncate mt-0.5">{g.preview}</p>
                </div>

                {/* Meta */}
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="text-[11px] text-white/30">{g.time}</span>
                  {g.badge > 0 && (
                    <span className="bg-[#1D9E75] text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                      {g.badge}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className={`
        ${!showSidebar ? "flex" : "hidden"} md:flex
        flex-1 flex-col min-w-0
      `}>
        {!activeGroup ? (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-white/30">
            <div className="text-5xl">💬</div>
            <p className="text-sm">Select a group to start chatting</p>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-[#222222]">
              {/* Back button (mobile) */}
              <button
                className="md:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setShowSidebar(true)}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 16 16">
                  <path d="M10 12L6 8l4-4" />
                </svg>
              </button>

              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                style={{ backgroundColor: activeGroup.color + "33" }}
              >
                {activeGroup.emoji}
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-white">{activeGroup.name}</p>
                <p className="text-xs text-white/40">{activeGroup.members} members</p>
              </div>

              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-lg border border-white/10 hover:bg-white/10 flex items-center justify-center transition-colors">
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 16 16" className="text-white/50">
                    <circle cx="6" cy="5" r="2.5" /><path d="M1 13c0-2.5 2-4 5-4s5 1.5 5 4" />
                    <circle cx="12" cy="5" r="2" /><path d="M12 9c2 0 3.5 1 3.5 3.5" />
                  </svg>
                </button>
                <button className="w-8 h-8 rounded-lg border border-white/10 hover:bg-white/10 flex items-center justify-center transition-colors">
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 16 16" className="text-white/50">
                    <circle cx="8" cy="8" r="6.5" /><path d="M8 7v5M8 5.5v.5" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4">
              <div className="text-center">
                <span className="text-[11px] text-white/30 bg-white/5 px-3 py-1 rounded-full">Today</span>
              </div>

              {messages.map((m, i) => {
                const prevSender = i > 0 ? messages[i - 1].sender : null;
                const showName = !m.mine && m.sender !== prevSender;

                return (
                  <div key={i} className={`flex items-end gap-2.5 ${m.mine ? "flex-row-reverse" : ""}`}>
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-semibold flex-shrink-0 text-white"
                      style={{ backgroundColor: m.avatarBg }}
                    >
                      {m.avatar}
                    </div>
                    <div className={`flex flex-col max-w-[65%] ${m.mine ? "items-end" : ""}`}>
                      {showName && (
                        <p className="text-[11px] text-white/40 mb-1 pl-1">{m.sender}</p>
                      )}
                      <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        m.mine
                          ? "bg-[#1D9E75] text-white"
                          : "bg-white/8 text-white/90 border border-white/10"
                      }`}
                        style={m.mine ? {} : { backgroundColor: "rgba(255,255,255,0.06)" }}
                      >
                        {m.text}
                      </div>
                      <p className="text-[10px] text-white/25 mt-1 px-1">{m.time}</p>
                    </div>
                  </div>
                );
              })}

              {/* Typing Indicator */}
              <div className="flex items-end gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] text-white/40">...</span>
                </div>
                <div className="px-4 py-3 rounded-2xl bg-white/6 border border-white/10 flex gap-1.5 items-center"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="px-4 py-4 border-t border-white/10 bg-[#222222] flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Share your thoughts..."
                className="flex-1 bg-white/6 border border-white/10 rounded-2xl px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-white/20 transition-colors"
                style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
              />
              <button
                onClick={sendMessage}
                className="w-9 h-9 rounded-full bg-[#1D9E75] hover:bg-[#178a64] flex items-center justify-center flex-shrink-0 transition-colors"
              >
                <svg width="15" height="15" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 16 16">
                  <path d="M2 8l12-6-6 12V8H2z" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}