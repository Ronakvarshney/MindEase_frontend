"use client";

import React, { useEffect, useState } from "react";
import {
  MessageSquare,
  ShieldCheck,
  CalendarDays,
  Brain,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAssessmentStore } from "@/store/assessmentStore";

interface Booking {
  status: string;
  scheduledAt: string;
  therapist?: {
    username?: string;
    specialization?: string;
  };
}

const statusConfig: Record<string, { icon: any; label: string; color: string; bg: string; border: string }> = {
  pending: {
    icon: Clock,
    label: "Pending",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.2)",
  },
  confirmed: {
    icon: CheckCircle2,
    label: "Confirmed",
    color: "#1D9E75",
    bg: "rgba(29,158,117,0.1)",
    border: "rgba(29,158,117,0.2)",
  },
  completed: {
    icon: CheckCircle2,
    label: "Completed",
    color: "#1D9E75",
    bg: "rgba(29,158,117,0.1)",
    border: "rgba(29,158,117,0.2)",
  },
  cancelled: {
    icon: XCircle,
    label: "Cancelled",
    color: "#f87171",
    bg: "rgba(248,113,113,0.1)",
    border: "rgba(248,113,113,0.2)",
  },
};

const getRiskColor = (level: string) => {
  const l = level?.toLowerCase();
  if (l === "low") return { color: "#1D9E75", bg: "rgba(29,158,117,0.1)", border: "rgba(29,158,117,0.2)" };
  if (l === "moderate") return { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)" };
  if (l === "high") return { color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.2)" };
  return { color: "#ffffff50", bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.1)" };
};

export default function Dashboard() {
  const router = useRouter();
  const { getDetails } = useAssessmentStore();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState({
    mental_health_score: 0,
    risk_level: "",
    overall_summary: "",
  });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/requestbookings",
          { withCredentials: true }
        );
        if (res.data.success) setBookings(res.data.bookings);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const result = getDetails();
    setQuiz({
      mental_health_score: result.mental_health,
      overall_summary: result.summary,
      risk_level: result.risk_level,
    });

    fetchBookings();
  }, []);

  const pending = bookings.filter((b) => b.status === "pending").length;
  const completed = bookings.filter(
    (b) => b.status === "confirmed" || b.status === "completed"
  ).length;
  const riskStyle = getRiskColor(quiz.risk_level);

  const stats = [
    { label: "Total Requests", value: bookings.length, icon: CalendarDays, accent: "#60a5fa" },
    { label: "Pending", value: pending, icon: Clock, accent: "#f59e0b" },
    { label: "Completed", value: completed, icon: CheckCircle2, accent: "#1D9E75" },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-20 pb-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold text-white">Dashboard</h1>
            <div className="flex items-center gap-1.5 text-xs text-white/35">
              <ShieldCheck size={13} className="text-[#1D9E75]" />
              Your private wellness space
            </div>
          </div>

          <button
            onClick={() => router.push("/chat")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1D9E75] hover:bg-[#178a64] text-white text-sm font-semibold transition-all"
          >
            <MessageSquare size={15} />
            Chat with AI
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-4 p-5 rounded-2xl border border-white/8 bg-[#222222]"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: s.accent + "18" }}
                >
                  <Icon size={18} style={{ color: s.accent }} />
                </div>
                <div>
                  <p className="text-xs text-white/35 mb-0.5">{s.label}</p>
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl border border-white/8 bg-[#222222] p-6 flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#1D9E75]/15 flex items-center justify-center">
              <Brain size={16} className="text-[#1D9E75]" />
            </div>
            <h2 className="text-sm font-semibold text-white">Mental Health Report</h2>
            <div className="ml-auto flex items-center gap-1.5 text-xs text-white/25">
              <TrendingUp size={12} />
              Latest assessment
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex flex-col gap-2 p-5 rounded-xl border border-white/8 bg-[#1a1a1a]">
              <p className="text-xs text-white/35 uppercase tracking-widest">Score</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-white">
                  {quiz.mental_health_score || "—"}
                </span>
                <span className="text-xs text-white/30 mb-1">/100</span>
              </div>
              <div className="h-1 w-full bg-white/8 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${quiz.mental_health_score}%`,
                    background: "linear-gradient(90deg, #1D9E75, #5DCAA5)",
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 p-5 rounded-xl border border-white/8 bg-[#1a1a1a]">
              <p className="text-xs text-white/35 uppercase tracking-widest">Risk Level</p>
              <div className="flex items-center gap-2 mt-1">
                <AlertCircle size={16} style={{ color: riskStyle.color }} />
                <span
                  className="text-lg font-bold capitalize"
                  style={{ color: riskStyle.color }}
                >
                  {quiz.risk_level || "—"}
                </span>
              </div>
              <span
                className="w-fit px-3 py-1 rounded-full text-[10px] font-semibold border"
                style={{
                  color: riskStyle.color,
                  backgroundColor: riskStyle.bg,
                  borderColor: riskStyle.border,
                }}
              >
                {quiz.risk_level
                  ? `${quiz.risk_level.charAt(0).toUpperCase() + quiz.risk_level.slice(1)} Risk`
                  : "Not assessed"}
              </span>
            </div>

            <div className="flex flex-col gap-2 p-5 rounded-xl border border-white/8 bg-[#1a1a1a]">
              <p className="text-xs text-white/35 uppercase tracking-widest">Summary</p>
              <p className="text-xs text-white/50 leading-relaxed">
                {quiz.overall_summary || "Complete the assessment to see your summary."}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/8 bg-[#222222] p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#60a5fa]/15 flex items-center justify-center">
                <CalendarDays size={16} className="text-[#60a5fa]" />
              </div>
              <h2 className="text-sm font-semibold text-white">Requested Bookings</h2>
            </div>
            <span className="text-xs text-white/25">{bookings.length} total</span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-10 gap-2">
              <div className="w-4 h-4 border-2 border-[#1D9E75] border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-white/30">Loading bookings...</span>
            </div>
          ) : bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2 text-white/25">
              <CalendarDays size={28} />
              <p className="text-sm">No bookings yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8">
                    {["Therapist", "Specialization", "Date", "Status"].map((h) => (
                      <th
                        key={h}
                        className="pb-3 text-left text-[10px] font-semibold text-white/30 uppercase tracking-widest"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b, i) => {
                    const s = statusConfig[b.status] || statusConfig["pending"];
                    const StatusIcon = s.icon;
                    return (
                      <tr
                        key={i}
                        className="border-b border-white/5 hover:bg-white/3 transition-colors"
                      >
                        <td className="py-3.5 text-white/70 font-medium">
                          {b.therapist?.username || "—"}
                        </td>
                        <td className="py-3.5 text-white/40 text-xs">
                          {b.therapist?.specialization || "—"}
                        </td>
                        <td className="py-3.5 text-white/40 text-xs">
                          {new Date(b.scheduledAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="py-3.5">
                          <span
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border"
                            style={{
                              color: s.color,
                              backgroundColor: s.bg,
                              borderColor: s.border,
                            }}
                          >
                            <StatusIcon size={11} />
                            {s.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}