"use client";
import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  User,
  CalendarDays,
  Mail,
  Activity,
} from "lucide-react";
import axios from "axios";

export default function TherapistDashboard() {
  const [bookings, setBookings] = useState([]);
  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/bookings", {
        withCredentials: true,
      });

      if (res.data.success) {
        setBookings(res.data.bookings);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      if (id && status) {
        const res = await axios.put(
          `http://localhost:5000/api/v1/update/booking?id=${id}&status=${status}`,
          {},
          { withCredentials: true },
        );
        if (res.data.success) {
          await fetchBookings();
        }
      }
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

  const getStatusBadge = (status: string) => {
    if (status === "pending") return "bg-yellow-100 text-yellow-700";
    if (status === "confirmed") return "bg-green-100 text-green-700";
    return "bg-red-100 text-red-700";
  };

  const renderSection = (title: string, data , showActions = false) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      <h2 className="text-lg font-semibold mb-4 text-slate-800">{title}</h2>

      {data.length === 0 ? (
        <p className="text-sm text-slate-500">No data available</p>
      ) : (
        <div className="space-y-4">
          {data.map((b) => (
            <div
              key={b._id}
              className="p-5 border rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition"
            >
              <div className="space-y-2">
                <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <User size={16} />
                  {b.paitent?.username || "Unknown Patient"}
                </p>

                <p className="flex items-center gap-2 text-xs text-slate-500">
                  <Mail size={14} />
                  {b.paitent?.email || "No email available"}
                </p>

                <p className="flex items-center gap-2 text-xs text-slate-500">
                  <CalendarDays size={14} />
                  {new Date(b.scheduledAt).toLocaleString()}
                </p>

                <p className="text-xs text-slate-500">
                  Mode: <span className="font-medium">{b.meetingMode}</span>
                </p>

                <p className="text-xs text-slate-500">
                  Reason: <span className="italic">{b.cause}</span>
                </p>

                <p className="text-xs text-slate-400">
                  Therapist: {b.therapist?.username}
                </p>
              </div>

              <div className="flex flex-col items-end gap-3">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadge(
                    b.status,
                  )}`}
                >
                  {b.status}
                </span>

                {showActions && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(b._id, "confirmed")}
                      className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded flex items-center gap-1 text-xs"
                    >
                      <CheckCircle size={14} /> Accept
                    </button>

                    <button
                      onClick={() => updateStatus(b._id, "cancelled")}
                      className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded flex items-center gap-1 text-xs"
                    >
                      <XCircle size={14} /> Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-20 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Therapist Dashboard
            </h1>
            <p className="text-sm text-slate-500 flex items-center gap-2">
              <Activity size={14} className="text-indigo-500" />
              Manage your sessions and requests
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <p className="text-sm text-slate-500">Pending Requests</p>
            <h2 className="text-2xl font-bold text-yellow-600">
              {pending.length}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <p className="text-sm text-slate-500">Accepted</p>
            <h2 className="text-2xl font-bold text-green-600">
              {accepted.length}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <p className="text-sm text-slate-500">Rejected</p>
            <h2 className="text-2xl font-bold text-red-600">
              {rejected.length}
            </h2>
          </div>
        </div>

        {renderSection("Pending Requests", pending, true)}
        {renderSection("Accepted Sessions", accepted)}
        {renderSection("Rejected Requests", rejected)}
      </div>
    </div>
  );
}
