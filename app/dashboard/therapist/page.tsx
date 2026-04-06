"use client";

import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  User,
  CalendarDays,
  Mail,
  Activity,
  Clock,
  Video,
  FileText,
} from "lucide-react";
import axios from "axios";

interface Booking {
  _id: string;
  status: string;
  scheduledAt: string;
  meetingMode: string;
  cause: string;
  paitent?: { username?: string; email?: string };
  therapist?: { username?: string };
}

const statusConfig: Record<
  string,
  { color: string; bg: string; border: string; label: string }
> = {
  pending: {
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.2)",
    label: "Pending",
  },
  confirmed: {
    color: "#1D9E75",
    bg: "rgba(29,158,117,0.1)",
    border: "rgba(29,158,117,0.2)",
    label: "Confirmed",
  },
  cancelled: {
    color: "#f87171",
    bg: "rgba(248,113,113,0.1)",
    border: "rgba(248,113,113,0.2)",
    label: "Cancelled",
  },
};

export default function TherapistDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/bookings", {
        withCredentials: true,
      });
      if (res.data.success) setBookings(res.data.bookings);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/update/booking?id=${id}&status=${status}`,
        {},
        { withCredentials: true },
      );
      if (res.data.success) fetchBookings();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const pending = bookings.filter((b) => b.status === "pending");
  const accepted = bookings.filter((b) => b.status === "confirmed");
  const rejected = bookings.filter((b) => b.status === "cancelled");

  const stats = [
    { label: "Pending", value: pending.length, accent: "#f59e0b", icon: Clock },
    {
      label: "Accepted",
      value: accepted.length,
      accent: "#1D9E75",
      icon: CheckCircle,
    },
    {
      label: "Rejected",
      value: rejected.length,
      accent: "#f87171",
      icon: XCircle,
    },
  ];

  const BookingCard = ({
    b,
    showActions,
  }: {
    b: Booking;
    showActions?: boolean;
  }) => {
    const s = statusConfig[b.status] || statusConfig["pending"];
    return (
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 rounded-xl border border-white/8 bg-[#1a1a1a] hover:border-white/15 hover:bg-[#1e1e1e] transition-all duration-200">
        {/* Left info */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#1D9E75]/15 flex items-center justify-center flex-shrink-0">
              <User size={13} className="text-[#1D9E75]" />
            </div>
            <span className="text-sm font-semibold text-white">
              {b.paitent?.username || "Unknown Patient"}
            </span>
          </div>

          <div className="flex flex-wrap gap-4 pl-1">
            <span className="flex items-center gap-1.5 text-xs text-white/35">
              <Mail size={11} />
              {b.paitent?.email || "No email"}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/35">
              <CalendarDays size={11} />
              {new Date(b.scheduledAt).toLocaleString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/35">
              <Video size={11} />
              {b.meetingMode}
            </span>
          </div>

          {b.cause && (
            <div className="flex items-start gap-1.5 pl-1">
              <FileText
                size={11}
                className="text-white/25 mt-0.5 flex-shrink-0"
              />
              <span className="text-xs text-white/30 italic leading-relaxed">
                {b.cause}
              </span>
            </div>
          )}
        </div>

        {/* Right — badge + actions */}
        <div className="flex flex-col items-start md:items-end gap-3 flex-shrink-0">
          <span
            className="px-3 py-1 rounded-full text-[11px] font-semibold border"
            style={{
              color: s.color,
              backgroundColor: s.bg,
              borderColor: s.border,
            }}
          >
            {s.label}
          </span>

          {showActions && (
            <div className="flex gap-2">
              <button
                onClick={() => updateStatus(b._id, "confirmed")}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border border-[#1D9E75]/30 bg-[#1D9E75]/10 text-[#1D9E75] hover:bg-[#1D9E75]/20 transition-all"
              >
                <CheckCircle size={13} /> Accept
              </button>
              <button
                onClick={() => updateStatus(b._id, "cancelled")}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border border-red-400/20 bg-red-400/10 text-red-400 hover:bg-red-400/20 transition-all"
              >
                <XCircle size={13} /> Reject
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const Section = ({
    title,
    data,
    showActions,
    accent = "#ffffff30",
  }: {
    title: string;
    data: Booking[];
    showActions?: boolean;
    accent?: string;
  }) => (
    <div className="rounded-2xl border border-white/8 bg-[#222222] p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">{title}</h2>
        <span className="text-xs text-white/25">{data.length} total</span>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 gap-2 text-white/20">
          <CalendarDays size={24} />
          <p className="text-xs">No records found</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {data.map((b) => (
            <BookingCard key={b._id} b={b} showActions={showActions} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-20 pb-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold text-white">
              Therapist Dashboard
            </h1>
            <div className="flex items-center gap-1.5 text-xs text-white/35">
              <Activity size={13} className="text-[#1D9E75]" />
              Manage your sessions and requests
            </div>
          </div>
        </div>

        {/* Stats */}
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

        {loading ? (
          <div className="flex items-center justify-center py-20 gap-2">
            <div className="w-4 h-4 border-2 border-[#1D9E75] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-white/30">Loading bookings...</span>
          </div>
        ) : (
          <>
            <Section
              title="Pending Requests"
              data={pending}
              showActions
              accent="#f59e0b"
            />
            <Section
              title="Accepted Sessions"
              data={accepted}
              accent="#1D9E75"
            />
            <Section
              title="Rejected Requests"
              data={rejected}
              accent="#f87171"
            />
          </>
        )}
      </div>
    </div>
  );
}
