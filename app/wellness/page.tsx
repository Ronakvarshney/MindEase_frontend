"use client";

import { useState } from "react";
import {
  Wind, Dumbbell, BookOpen, Moon, Sun, Coffee,
  Heart, Brain, Smile, ChevronDown, ChevronUp, Play, Pause,
} from "lucide-react";

// ── Data ────────────────────────────────────────────────────────────────
const categories = [
  { id: "breathing",  label: "Breathing",  icon: Wind      },
  { id: "exercise",   label: "Movement",   icon: Dumbbell  },
  { id: "journal",    label: "Journaling", icon: BookOpen  },
  { id: "sleep",      label: "Sleep",      icon: Moon      },
  { id: "mindset",    label: "Mindset",    icon: Brain     },
];

const exercises = [
  // Breathing
  {
    id: 1, cat: "breathing", title: "4-7-8 Breathing",
    desc: "Inhale for 4 counts, hold for 7, exhale for 8. Activates your parasympathetic nervous system instantly.",
    steps: ["Sit comfortably and close your eyes", "Inhale through your nose for 4 counts", "Hold your breath for 7 counts", "Exhale through your mouth for 8 counts", "Repeat 4 cycles"],
    duration: "5 min", level: "Beginner", accent: "#1D9E75",
  },
  {
    id: 2, cat: "breathing", title: "Box Breathing",
    desc: "Used by Navy SEALs to stay calm under pressure. Equal counts for inhale, hold, exhale, hold.",
    steps: ["Exhale fully to start", "Inhale for 4 counts", "Hold for 4 counts", "Exhale for 4 counts", "Hold empty for 4 counts", "Repeat 5–6 cycles"],
    duration: "6 min", level: "Beginner", accent: "#5DCAA5",
  },
  // Movement
  {
    id: 3, cat: "exercise", title: "5-Minute Morning Stretch",
    desc: "Gentle stretches to wake up your body and set a calm, positive tone for the day.",
    steps: ["Neck rolls — 30s each side", "Shoulder circles — 10 reps", "Cat-cow spinal stretch — 1 min", "Standing forward fold — 1 min", "Chest opener — 1 min", "Shake it out"],
    duration: "5 min", level: "Beginner", accent: "#60a5fa",
  },
  {
    id: 4, cat: "exercise", title: "Anxiety-Relief Walk",
    desc: "A mindful 10-minute walk that actively reduces cortisol and clears mental fog.",
    steps: ["Step outside or open a window", "Walk at a comfortable pace", "Focus on 5 things you can see", "Notice 4 things you can touch", "Listen for 3 distinct sounds", "Take 3 deep breaths at the end"],
    duration: "10 min", level: "All levels", accent: "#a78bfa",
  },
  // Journaling
  {
    id: 5, cat: "journal", title: "Morning Brain Dump",
    desc: "Write 3 pages of unfiltered thoughts every morning. Clears mental clutter before your day begins.",
    steps: ["Grab a notebook — no phones", "Write non-stop for 10 minutes", "Don't edit, judge, or re-read", "Any thought counts — even 'I don't know what to write'", "Close the notebook when done"],
    duration: "10 min", level: "All levels", accent: "#f59e0b",
  },
  {
    id: 6, cat: "journal", title: "Gratitude + Intention",
    desc: "3 things you're grateful for + 1 intention. The simplest habit with the biggest mood impact.",
    steps: ["Write 3 specific things you're grateful for", "Be specific — not 'family' but 'my sister's text this morning'", "Write 1 clear intention for today", "Read it aloud once", "Return tonight and reflect"],
    duration: "5 min", level: "Beginner", accent: "#f472b6",
  },
  // Sleep
  {
    id: 7, cat: "sleep", title: "Wind-Down Ritual",
    desc: "A 20-minute pre-sleep routine that signals your brain it's time to rest.",
    steps: ["Dim all lights 30 min before bed", "Put phone on Do Not Disturb", "Stretch or do light yoga for 5 min", "Write tomorrow's top 3 tasks", "Read fiction for 10 min", "4-7-8 breathing in bed"],
    duration: "20 min", level: "All levels", accent: "#818cf8",
  },
  {
    id: 8, cat: "sleep", title: "Body Scan Meditation",
    desc: "Progressive relaxation from toes to head. Fall asleep faster and sleep deeper.",
    steps: ["Lie flat on your back", "Close your eyes and breathe slowly", "Focus on your feet — relax them", "Move up — calves, thighs, hips...", "Continue to stomach, chest, arms", "End at the top of your head"],
    duration: "15 min", level: "Beginner", accent: "#c084fc",
  },
  // Mindset
  {
    id: 9, cat: "mindset", title: "Cognitive Reframing",
    desc: "Challenge negative thoughts by asking 3 simple questions. A CBT-based technique.",
    steps: ["Write down the negative thought", "Ask: Is this thought 100% true?", "Ask: What evidence contradicts it?", "Ask: What would I tell a friend?", "Write a more balanced version", "Read the new version 3 times"],
    duration: "10 min", level: "Intermediate", accent: "#fb923c",
  },
  {
    id: 10, cat: "mindset", title: "Daily Affirmations",
    desc: "5 personalized affirmations said with intention. Rewires negative self-talk over time.",
    steps: ["Choose 5 affirmations that feel true-ish", "'I am learning to trust myself'", "'My feelings are valid'", "'I am doing my best'", "Say each slowly, out loud", "Notice resistance — that's where growth is"],
    duration: "5 min", level: "Beginner", accent: "#1D9E75",
  },
];

const dailyTips = [
  { icon: Sun,     tip: "Get 10 min of sunlight before noon. It regulates your circadian rhythm and boosts serotonin." },
  { icon: Coffee,  tip: "Delay caffeine by 90 min after waking. Let cortisol peak naturally first." },
  { icon: Heart,   tip: "Text one person you care about today. Connection is the #1 predictor of happiness." },
  { icon: Smile,   tip: "Smile for 60 seconds — even forced. Your brain can't distinguish fake from real smiles." },
  { icon: Moon,    tip: "Sleep and wake at the same time daily. Consistency beats duration for sleep quality." },
];

const journalPrompts = [
  "What am I feeling right now, and where do I feel it in my body?",
  "What's one small thing I can do today to take care of myself?",
  "What would I say to a friend going through what I'm going through?",
  "What am I holding onto that I could let go of today?",
  "What does 'feeling okay' look like for me right now?",
  "What is one thing that went unexpectedly well this week?",
];

// ── Components ────────────────────────────────────────────────────────
const LevelBadge = ({ level, accent }: { level: string; accent: string }) => (
  <span
    className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold border"
    style={{ color: accent, backgroundColor: accent + "15", borderColor: accent + "30" }}
  >
    {level}
  </span>
);

const ExerciseCard = ({ ex }: { ex: typeof exercises[0] }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`rounded-2xl border bg-[#222222] transition-all duration-200 overflow-hidden ${
        open ? "border-white/15" : "border-white/8 hover:border-white/12"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-4 p-5 text-left"
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ backgroundColor: ex.accent + "18" }}
        >
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ex.accent }} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="text-sm font-semibold text-white">{ex.title}</h3>
            <LevelBadge level={ex.level} accent={ex.accent} />
          </div>
          <p className="text-xs text-white/40 leading-relaxed">{ex.desc}</p>
          <span className="text-[10px] text-white/25 mt-1 block">{ex.duration}</span>
        </div>

        <div className="flex-shrink-0 mt-1">
          {open
            ? <ChevronUp size={15} className="text-white/30" />
            : <ChevronDown size={15} className="text-white/30" />
          }
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 pl-[60px]">
          <div className="flex flex-col gap-2 pt-3 border-t border-white/8">
            {ex.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span
                  className="text-[10px] font-bold font-mono flex-shrink-0 mt-0.5"
                  style={{ color: ex.accent }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xs text-white/55 leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────
export default function Page() {
  const [activeCategory, setActiveCategory] = useState("breathing");
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [promptIndex, setPromptIndex] = useState(0);

  // Simple breathing animation toggle
  const toggleBreathing = () => {
    setBreathingActive((prev) => !prev);
    setBreathPhase("inhale");
  };

  const filteredExercises = exercises.filter((e) => e.cat === activeCategory);

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-20 pb-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-5">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1D9E75]/30 bg-[#1D9E75]/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75]" />
            <span className="text-xs font-semibold text-[#1D9E75] tracking-widest uppercase">
              Personalised Wellness
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Small habits.{" "}
            <span
              style={{
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                backgroundImage: "linear-gradient(90deg, #1D9E75, #5DCAA5)",
              }}
            >
              Lasting change.
            </span>
          </h1>
          <p className="text-white/40 text-sm max-w-lg leading-relaxed">
            Science-backed exercises, breathing techniques, journaling prompts, and daily habits to support your mental wellness — one small step at a time.
          </p>
        </div>

        {/* ── Breathing Widget ── */}
        <div className="rounded-2xl border border-white/8 bg-[#222222] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-8">
          <div className="flex flex-col gap-3 flex-1">
            <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">Quick Relief</p>
            <h2 className="text-xl font-bold text-white">4-7-8 Breathing</h2>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Press start and follow the circle. 3 cycles reduces anxiety in under 2 minutes.
            </p>
            <button
              onClick={toggleBreathing}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all w-fit mt-2 ${
                breathingActive
                  ? "border border-white/10 text-white/50 hover:text-white"
                  : "bg-[#1D9E75] hover:bg-[#178a64] text-white"
              }`}
            >
              {breathingActive ? <><Pause size={15}/> Stop</> : <><Play size={15}/> Start</>}
            </button>
          </div>

          {/* Animated circle */}
          <div className="relative flex items-center justify-center w-36 h-36 flex-shrink-0">
            <div
              className="absolute inset-0 rounded-full border-2 border-[#1D9E75]/20 transition-all duration-[4000ms]"
              style={{
                transform: breathingActive ? "scale(1.3)" : "scale(1)",
                borderColor: breathingActive ? "rgba(29,158,117,0.5)" : "rgba(29,158,117,0.2)",
              }}
            />
            <div
              className="absolute inset-3 rounded-full bg-[#1D9E75]/10 transition-all duration-[4000ms]"
              style={{ transform: breathingActive ? "scale(1.15)" : "scale(1)" }}
            />
            <div className="flex flex-col items-center gap-1 z-10">
              <Wind size={22} className="text-[#1D9E75]" />
              <span className="text-xs text-white/50 font-medium">
                {breathingActive ? "Breathe..." : "Ready"}
              </span>
            </div>
          </div>
        </div>

        {/* ── Exercises by Category ── */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-base font-semibold text-white">Wellness Exercises</h2>

            {/* Category tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {categories.map((c) => {
                const Icon = c.icon;
                const active = activeCategory === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setActiveCategory(c.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                      active
                        ? "bg-[#1D9E75] text-white"
                        : "border border-white/8 text-white/40 hover:text-white/60 hover:border-white/15"
                    }`}
                  >
                    <Icon size={13} />
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {filteredExercises.map((ex) => (
              <ExerciseCard key={ex.id} ex={ex} />
            ))}
          </div>
        </div>

        {/* ── Journal Prompt ── */}
        <div className="rounded-2xl border border-[#f59e0b]/20 bg-[#f59e0b]/5 p-6 sm:p-8 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#f59e0b]/20 flex items-center justify-center">
                <BookOpen size={15} className="text-[#f59e0b]" />
              </div>
              <h2 className="text-sm font-semibold text-white">Journal Prompt of the Day</h2>
            </div>
            <button
              onClick={() => setPromptIndex((i) => (i + 1) % journalPrompts.length)}
              className="text-xs text-[#f59e0b]/60 hover:text-[#f59e0b] transition-colors font-medium"
            >
              Next prompt →
            </button>
          </div>

          <blockquote className="text-lg text-white/80 font-light leading-relaxed italic pl-4 border-l-2 border-[#f59e0b]/30">
            "{journalPrompts[promptIndex]}"
          </blockquote>

          <p className="text-xs text-white/25">
            Tip: Set a timer for 10 minutes and write without stopping. Don't edit.
          </p>
        </div>

        {/* ── Daily Tips ── */}
        <div className="flex flex-col gap-5">
          <h2 className="text-base font-semibold text-white">Daily Mental Health Tips</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {dailyTips.map((t, i) => {
              const Icon = t.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl border border-white/8 bg-[#222222] hover:border-white/15 transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#1D9E75]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={14} className="text-[#1D9E75]" />
                  </div>
                  <p className="text-xs text-white/45 leading-relaxed">{t.tip}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Bottom reminder ── */}
        <div className="flex flex-col items-center gap-3 text-center py-6 border-t border-white/8">
          <Heart size={18} className="text-rose-400" fill="rgba(251,113,133,0.6)" />
          <p className="text-sm text-white/30 max-w-md leading-relaxed">
            Progress isn't linear. Some days, showing up is enough. Be patient with yourself.
          </p>
        </div>

      </div>
    </div>
  );
}