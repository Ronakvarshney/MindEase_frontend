"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Brain,
  Loader,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAssessmentStore } from "@/store/assessmentStore";
import { Toaster } from "react-hot-toast";

interface Question {
  question_text: string;
  options: string[];
}

const Page = () => {
  const [screen, setScreen] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questionsData, setQuestionsData] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const { addDetails } = useAssessmentStore();
  const navigate = useRouter();

  const handleChange = (indx: number, option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionsData[indx].question_text]: option,
    }));
  };

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/generate/assessment"
        );
        if (res.data) setQuestionsData(res.data.assessment.questions);
      } catch (error: any) {
        console.error("Failed to fetch questions:", error?.message);
      }
    };
    loadQuestions();
  }, []);

  const submitHandler = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/analyze/assessment",
        { answers }
      );
      if (res.data.result) {
        const data = res.data.result;
        addDetails(data.risk_level, data.mental_health_score, data.overall_summary);
        navigate.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const answeredCount = Object.keys(answers).length;
  const totalCount = questionsData.length;
  const progress = totalCount > 0 ? (answeredCount / totalCount) * 100 : 0;
  const allAnswered = answeredCount === totalCount && totalCount > 0;

  // ─── Intro Screen ────────────────────────────────────────────────
  if (screen) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-lg flex flex-col gap-6">

          {/* Card */}
          <div className="rounded-2xl border border-white/10 bg-[#222222] overflow-hidden">

            {/* Green top strip */}
            <div className="h-1 w-full bg-gradient-to-r from-[#1D9E75] via-[#5DCAA5] to-[#1D9E75]" />

            <div className="p-10 flex flex-col items-center text-center gap-7">

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-[#1D9E75]/15 border border-[#1D9E75]/20 flex items-center justify-center">
                <Brain size={32} className="text-[#1D9E75]" />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-center gap-2 w-fit mx-auto px-4 py-1.5 rounded-full border border-[#1D9E75]/30 bg-[#1D9E75]/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75]" />
                  <span className="text-xs font-semibold text-[#1D9E75] tracking-widest uppercase">
                    AI Powered
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-white leading-tight">
                  Start your{" "}
                  <span
                    style={{
                      WebkitTextFillColor: "transparent",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      backgroundImage: "linear-gradient(90deg, #1D9E75, #5DCAA5)",
                    }}
                  >
                    Vibe Check.
                  </span>
                </h1>
                <p className="text-sm text-white/40 leading-relaxed max-w-sm mx-auto">
                  A simple, AI-powered check-in to help you understand your
                  current headspace. No scary forms — just a gentle conversation.
                </p>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-3 w-full">
                {[
                  { icon: ShieldCheck, label: "100% Private", accent: "#1D9E75" },
                  { icon: Sparkles, label: "AI Personalized", accent: "#f59e0b" },
                ].map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/8 bg-white/3"
                    >
                      <Icon size={16} style={{ color: b.accent }} />
                      <span className="text-xs font-semibold text-white/60">
                        {b.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* CTA */}
              <button
                onClick={() => setScreen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#1D9E75] hover:bg-[#178a64] text-white text-sm font-semibold transition-all"
              >
                Begin Assessment
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-white/20">
            Takes about 5 minutes · Results are private · Not a clinical diagnosis
          </p>
        </div>
        <Toaster />
      </div>
    );
  }

  // ─── Questions Screen ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#1a1a1a] px-4 py-24">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain size={16} className="text-[#1D9E75]" />
              <h1 className="text-base font-semibold text-white">
                Mental Health Assessment
              </h1>
            </div>
            <span className="text-xs text-white/30 font-medium">
              {answeredCount}/{totalCount} answered
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-1 w-full bg-white/8 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#1D9E75] to-[#5DCAA5] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-xs text-white/35 leading-relaxed">
            Please answer honestly — this helps us understand your current well-being.
          </p>
        </div>

        {/* Questions */}
        <div className="flex flex-col gap-4">
          {questionsData.map((q, index) => {
            const isAnswered = !!answers[q.question_text];
            return (
              <div
                key={index}
                className={`rounded-2xl border p-5 transition-all duration-200 ${
                  isAnswered
                    ? "border-[#1D9E75]/30 bg-[#1D9E75]/5"
                    : "border-white/8 bg-[#222222]"
                }`}
              >
                {/* Question */}
                <div className="flex items-start gap-3 mb-4">
                  <span
                    className={`text-xs font-bold font-mono flex-shrink-0 mt-0.5 ${
                      isAnswered ? "text-[#1D9E75]" : "text-white/25"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-sm font-medium text-white/80 leading-relaxed">
                    {q.question_text}
                  </h2>
                  {isAnswered && (
                    <CheckCircle2
                      size={16}
                      className="text-[#1D9E75] flex-shrink-0 mt-0.5 ml-auto"
                    />
                  )}
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-6">
                  {q.options.map((opt, optIndex) => {
                    const selected = answers[q.question_text] === opt;
                    return (
                      <label
                        key={optIndex}
                        className={`cursor-pointer flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm transition-all duration-150 ${
                          selected
                            ? "bg-[#1D9E75]/15 border-[#1D9E75]/40 text-[#1D9E75] font-medium"
                            : "bg-white/3 border-white/8 text-white/45 hover:border-white/15 hover:text-white/60 hover:bg-white/5"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={opt}
                          checked={selected}
                          onChange={() => handleChange(index, opt)}
                          className="hidden"
                        />
                        <span
                          className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-all ${
                            selected
                              ? "border-[#1D9E75] bg-[#1D9E75]"
                              : "border-white/20"
                          }`}
                        >
                          {selected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </span>
                        {opt}
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit */}
        {totalCount > 0 && (
          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={submitHandler}
              disabled={!allAnswered || loading}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                allAnswered && !loading
                  ? "bg-[#1D9E75] hover:bg-[#178a64] text-white"
                  : "bg-white/6 text-white/25 cursor-not-allowed border border-white/8"
              }`}
            >
              {loading ? (
                <Loader size={16} className="animate-spin" />
              ) : (
                <>
                  Submit Assessment
                  <ArrowRight size={16} />
                </>
              )}
            </button>
            {!allAnswered && (
              <p className="text-center text-xs text-white/25">
                Answer all {totalCount} questions to submit
              </p>
            )}
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Page;