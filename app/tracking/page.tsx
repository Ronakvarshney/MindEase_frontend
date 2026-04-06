"use client";

import { useState, useMemo } from "react";
import {
  TrendingUp, Calendar, Zap, Tag, Smile,
  ChevronLeft, ChevronRight, BarChart2, Plus
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────
interface MoodEntry {
  date: string;
  mood: number;
  emoji: string;
  label: string;
  note: string;
  energy: number;
  triggers: string[];
}

// ── Data ────────────────────────────────────────────────────────────
const moods = [
  { value: 5, emoji: "😄", label: "Great",   color: "#1D9E75" },
  { value: 4, emoji: "🙂", label: "Good",    color: "#5DCAA5" },
  { value: 3, emoji: "😐", label: "Okay",    color: "#f59e0b" },
  { value: 2, emoji: "😔", label: "Low",     color: "#fb923c" },
  { value: 1, emoji: "😰", label: "Rough",   color: "#f87171" },
];

const triggerOptions = [
  { id: "sleep",    label: "Poor Sleep",    emoji: "😴" },
  { id: "work",     label: "Work Stress",   emoji: "💼" },
  { id: "exercise", label: "Exercised",     emoji: "🏃" },
  { id: "social",   label: "Social Time",   emoji: "👥" },
  { id: "diet",     label: "Ate Well",      emoji: "🥗" },
  { id: "anxiety",  label: "Anxious",       emoji: "😬" },
  { id: "grateful", label: "Grateful",      emoji: "🙏" },
  { id: "lonely",   label: "Lonely",        emoji: "🌧️" },
];

// Dummy past entries for demo
const generateDummyEntries = (): MoodEntry[] => {
  const entries: MoodEntry[] = [];
  const today = new Date();
  const moodPool = [
    { value: 4, emoji: "🙂", label: "Good" },
    { value: 5, emoji: "😄", label: "Great" },
    { value: 3, emoji: "😐", label: "Okay" },
    { value: 2, emoji: "😔", label: "Low" },
    { value: 4, emoji: "🙂", label: "Good" },
    { value: 5, emoji: "😄", label: "Great" },
    { value: 3, emoji: "😐", label: "Okay" },
    { value: 4, emoji: "🙂", label: "Good" },
    { value: 2, emoji: "😔", label: "Low" },
    { value: 5, emoji: "😄", label: "Great" },
    { value: 4, emoji: "🙂", label: "Good" },
    { value: 3, emoji: "😐", label: "Okay" },
    { value: 5, emoji: "😄", label: "Great" },
    { value: 4, emoji: "🙂", label: "Good" },
  ];
  for (let i = 13; i >= 1; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const m = moodPool[i % moodPool.length];
    entries.push({
      date: d.toISOString().split("T")[0],
      mood: m.value,
      emoji: m.emoji,
      label: m.label,
      note: "",
      energy: Math.floor(Math.random() * 5) + 5,
      triggers: [],
    });
  }
  return entries;
};

const getMoodColor = (value: number) => {
  return moods.find((m) => m.value === value)?.color || "#ffffff20";
};

const getDayName = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-IN", { weekday: "short" });
};

const getDateLabel = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
};

// ── Subcomponents ────────────────────────────────────────────────────
const SectionHeader = ({ icon: Icon, title, accent = "#1D9E75" }: { icon: any; title: string; accent?: string }) => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: accent + "20" }}>
      <Icon size={15} style={{ color: accent }} />
    </div>
    <h2 className="text-sm font-semibold text-white">{title}</h2>
  </div>
);

// ── Page ────────────────────────────────────────────────────────────
export default function Page() {
  const [entries, setEntries] = useState<MoodEntry[]>(generateDummyEntries);
  const [selectedMood, setSelectedMood] = useState<typeof moods[0] | null>(null);
  const [note, setNote]           = useState("");
  const [energy, setEnergy]       = useState(5);
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [activeTab, setActiveTab] = useState<"week" | "month">("week");

  const todayStr = new Date().toISOString().split("T")[0];
  const alreadyLogged = entries.some((e) => e.date === todayStr);

  // Last 7 entries for chart
  const chartData = useMemo(() => entries.slice(-7), [entries]);

  // Calendar days for current month
  const calendarDays = useMemo(() => {
    const year  = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const first = new Date(year, month, 1).getDay();
    const days  = new Date(year, month + 1, 0).getDate();
    return { first, days, year, month };
  }, [calendarMonth]);

  const entryMap = useMemo(() => {
    const map: Record<string, MoodEntry> = {};
    entries.forEach((e) => { map[e.date] = e; });
    return map;
  }, [entries]);

  // Insights
  const avgMood = useMemo(() => {
    if (!entries.length) return 0;
    return (entries.reduce((s, e) => s + e.mood, 0) / entries.length).toFixed(1);
  }, [entries]);

  const bestDay = useMemo(() => {
    if (entries.length < 2) return "—";
    const dayTotals: Record<string, { sum: number; count: number }> = {};
    entries.forEach((e) => {
      const day = new Date(e.date).toLocaleDateString("en-IN", { weekday: "long" });
      if (!dayTotals[day]) dayTotals[day] = { sum: 0, count: 0 };
      dayTotals[day].sum += e.mood;
      dayTotals[day].count++;
    });
    let best = ""; let bestAvg = 0;
    Object.entries(dayTotals).forEach(([day, { sum, count }]) => {
      const avg = sum / count;
      if (avg > bestAvg) { bestAvg = avg; best = day; }
    });
    return best;
  }, [entries]);

  const streak = useMemo(() => {
    let count = 0;
    const today = new Date();
    for (let i = 0; i < entries.length; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toISOString().split("T")[0];
      if (entryMap[key]) count++;
      else break;
    }
    return count;
  }, [entries, entryMap]);

  const toggleTrigger = (id: string) => {
    setSelectedTriggers((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (!selectedMood) return;
    const newEntry: MoodEntry = {
      date: todayStr,
      mood: selectedMood.value,
      emoji: selectedMood.emoji,
      label: selectedMood.label,
      note,
      energy,
      triggers: selectedTriggers,
    };
    setEntries((prev) => [...prev.filter((e) => e.date !== todayStr), newEntry]);
    setSubmitted(true);
    setSelectedMood(null);
    setNote("");
    setEnergy(5);
    setSelectedTriggers([]);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-20 pb-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-5">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1D9E75]/30 bg-[#1D9E75]/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75]" />
            <span className="text-xs font-semibold text-[#1D9E75] tracking-widest uppercase">Mood Tracking</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            How are you{" "}
            <span style={{ WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text", backgroundClip: "text", backgroundImage: "linear-gradient(90deg, #1D9E75, #5DCAA5)" }}>
              feeling today?
            </span>
          </h1>
          <p className="text-white/40 text-sm max-w-md leading-relaxed">
            Track your mood daily to discover patterns, understand triggers, and celebrate your progress.
          </p>
        </div>

        {/* ── Insights Row ── */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Avg Mood",    value: `${avgMood}/5`, icon: Smile,     accent: "#1D9E75" },
            { label: "Day Streak",  value: `${streak}d`,   icon: Zap,       accent: "#f59e0b" },
            { label: "Best Day",    value: bestDay || "—", icon: TrendingUp, accent: "#60a5fa" },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="flex flex-col gap-2 p-4 rounded-2xl border border-white/8 bg-[#222222]">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: s.accent + "18" }}>
                  <Icon size={13} style={{ color: s.accent }} />
                </div>
                <p className="text-xl font-bold text-white">{s.value}</p>
                <p className="text-[10px] text-white/30">{s.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ── Check-in Card ── */}
          <div className="rounded-2xl border border-white/8 bg-[#222222] overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-[#1D9E75] via-[#5DCAA5] to-[#1D9E75]" />
            <div className="p-6 flex flex-col gap-5">
              <SectionHeader icon={Plus} title={alreadyLogged ? "Today's Mood Logged ✓" : "Log Today's Mood"} />

              {(submitted || alreadyLogged) ? (
                <div className="flex flex-col items-center gap-3 py-6">
                  <span className="text-5xl">{entryMap[todayStr]?.emoji || "😊"}</span>
                  <p className="text-sm font-semibold text-white">{entryMap[todayStr]?.label}</p>
                  <p className="text-xs text-white/35">You've logged your mood for today.</p>
                  <button onClick={() => setSubmitted(false)} className="text-xs text-[#1D9E75] hover:opacity-75 transition-opacity mt-2">
                    Update entry
                  </button>
                </div>
              ) : (
                <>
                  {/* Mood selector */}
                  <div className="flex justify-between gap-2">
                    {moods.map((m) => (
                      <button
                        key={m.value}
                        onClick={() => setSelectedMood(m)}
                        className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all ${
                          selectedMood?.value === m.value
                            ? "border-opacity-50"
                            : "border-white/8 hover:border-white/15"
                        }`}
                        style={selectedMood?.value === m.value ? { borderColor: m.color + "60", backgroundColor: m.color + "12" } : {}}
                      >
                        <span className="text-2xl">{m.emoji}</span>
                        <span className="text-[10px] text-white/40">{m.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Energy slider */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-white/40 uppercase tracking-widest">Energy Level</label>
                      <span className="text-xs font-bold text-white">{energy}/10</span>
                    </div>
                    <input
                      type="range" min={1} max={10} step={1}
                      value={energy}
                      onChange={(e) => setEnergy(Number(e.target.value))}
                      className="w-full accent-[#1D9E75]"
                    />
                  </div>

                  {/* Triggers */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-white/40 uppercase tracking-widest">Triggers / Context</label>
                    <div className="flex flex-wrap gap-2">
                      {triggerOptions.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => toggleTrigger(t.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all ${
                            selectedTriggers.includes(t.id)
                              ? "bg-[#1D9E75]/15 border-[#1D9E75]/40 text-[#1D9E75]"
                              : "border-white/8 text-white/35 hover:border-white/15"
                          }`}
                        >
                          <span>{t.emoji}</span> {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Note */}
                  <textarea
                    rows={2}
                    placeholder="Any thoughts about today? (optional)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/8 rounded-xl text-xs text-white placeholder-white/20 outline-none focus:border-[#1D9E75]/40 resize-none transition-colors"
                  />

                  <button
                    onClick={handleSubmit}
                    disabled={!selectedMood}
                    className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                      selectedMood
                        ? "bg-[#1D9E75] hover:bg-[#178a64] text-white"
                        : "bg-white/6 text-white/20 cursor-not-allowed"
                    }`}
                  >
                    Save Today's Mood
                  </button>
                </>
              )}
            </div>
          </div>

          {/* ── 7-Day Chart ── */}
          <div className="rounded-2xl border border-white/8 bg-[#222222] p-6 flex flex-col gap-5">
            <SectionHeader icon={BarChart2} title="Mood Trend" accent="#60a5fa" />

            <div className="flex items-end gap-2 h-36 pt-2">
              {chartData.map((e, i) => {
                const heightPct = (e.mood / 5) * 100;
                const color = getMoodColor(e.mood);
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="text-xs">{e.emoji}</span>
                    <div
                      className="w-full rounded-t-lg transition-all duration-500"
                      style={{ height: `${heightPct}%`, backgroundColor: color + "60", border: `1px solid ${color}40` }}
                      title={`${e.label} — ${getDateLabel(e.date)}`}
                    />
                    <span className="text-[9px] text-white/25">{getDayName(e.date)}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/8">
              {moods.map((m) => (
                <div key={m.value} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color }} />
                  <span className="text-[10px] text-white/30">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Calendar ── */}
        <div className="rounded-2xl border border-white/8 bg-[#222222] p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <SectionHeader icon={Calendar} title="Monthly View" accent="#a78bfa" />
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCalendarMonth((d) => { const n = new Date(d); n.setMonth(d.getMonth() - 1); return n; })}
                className="w-7 h-7 rounded-lg border border-white/8 flex items-center justify-center text-white/30 hover:text-white hover:border-white/20 transition-all"
              >
                <ChevronLeft size={13} />
              </button>
              <span className="text-xs font-semibold text-white/60 w-24 text-center">
                {calendarMonth.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
              </span>
              <button
                onClick={() => setCalendarMonth((d) => { const n = new Date(d); n.setMonth(d.getMonth() + 1); return n; })}
                className="w-7 h-7 rounded-lg border border-white/8 flex items-center justify-center text-white/30 hover:text-white hover:border-white/20 transition-all"
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="text-center text-[10px] text-white/20 py-1">{d}</div>
            ))}

            {/* Empty cells */}
            {Array.from({ length: calendarDays.first }).map((_, i) => (
              <div key={`e-${i}`} />
            ))}

            {/* Days */}
            {Array.from({ length: calendarDays.days }).map((_, i) => {
              const day = i + 1;
              const dateStr = `${calendarDays.year}-${String(calendarDays.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const entry = entryMap[dateStr];
              const isToday = dateStr === todayStr;
              return (
                <div
                  key={day}
                  title={entry ? `${entry.emoji} ${entry.label}` : ""}
                  className={`aspect-square rounded-lg flex items-center justify-center text-[11px] transition-all ${
                    isToday ? "ring-1 ring-[#1D9E75]/50" : ""
                  }`}
                  style={entry ? { backgroundColor: getMoodColor(entry.mood) + "25" } : { backgroundColor: "rgba(255,255,255,0.03)" }}
                >
                  {entry ? (
                    <span className="text-base leading-none">{entry.emoji}</span>
                  ) : (
                    <span className={isToday ? "text-[#1D9E75] font-bold" : "text-white/20"}>{day}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Trigger Insights ── */}
        <div className="rounded-2xl border border-white/8 bg-[#222222] p-6 flex flex-col gap-5">
          <SectionHeader icon={Tag} title="Insights" accent="#f59e0b" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Total entries", value: entries.length, sub: "days tracked" },
              { label: "Good days", value: entries.filter((e) => e.mood >= 4).length, sub: "mood ≥ Good" },
              { label: "Rough days", value: entries.filter((e) => e.mood <= 2).length, sub: "need more care" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col gap-1 p-4 rounded-xl bg-[#1a1a1a] border border-white/5">
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-white/30">{s.label}</p>
                <p className="text-[10px] text-white/20">{s.sub}</p>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl border border-[#f59e0b]/15 bg-[#f59e0b]/5">
            <span className="text-lg">💡</span>
            <p className="text-xs text-white/45 leading-relaxed">
              <span className="text-white/70 font-medium">Pattern detected: </span>
              Your best mood days are on <span className="text-[#f59e0b]">{bestDay || "weekdays"}</span>. Try to protect your energy on those days and schedule important tasks accordingly.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}