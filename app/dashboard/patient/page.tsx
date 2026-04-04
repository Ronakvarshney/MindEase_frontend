"use client";
import React, { useEffect, useState } from "react";
import { MessageSquare, ShieldCheck, CalendarDays, Brain } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAssessmentStore } from "@/store/assessmentStore";

export default function Dashboard() {
  const router = useRouter();
  const {getDetails} = useAssessmentStore();
  const [bookings, setBookings] = useState([]);
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
        if (res.data.success) {
          setBookings(res.data.bookings);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Dummy quiz (replace with API/store later)
    const result = getDetails();
    setQuiz({
      mental_health_score : result.mental_health ,
      overall_summary : result.summary ,
      risk_level : result.risk_level
    });

    fetchBookings();
  }, []);




  return (
    <div className="min-h-screen bg-slate-50 p-6 mt-20">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-sm text-slate-500 flex items-center gap-2">
              <ShieldCheck size={14} className="text-green-500" /> Secure space
            </p>
          </div>

          <button
            onClick={() => router.push("/chat")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
          >
            <MessageSquare size={16} /> Chat
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-slate-500">Total Requests</p>
            <h2 className="text-xl font-bold">{bookings.length}</h2>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-slate-500">Pending</p>
            <h2 className="text-xl font-bold">
              {bookings.filter(b => b.status === "pending").length}
            </h2>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-slate-500">Completed</p>
            <h2 className="text-xl font-bold">
              {bookings.filter(b => b.status === "confirmed").length}
            </h2>
          </div>
        </div>

        {/* Mental Health Section */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <Brain size={18} className="text-indigo-500" />
            <h2 className="text-lg font-semibold text-slate-800">Mental Health Report</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-indigo-50 p-4 rounded-xl">
              <p className="text-sm text-slate-500">Score</p>
              <h3 className="text-xl font-bold text-indigo-600">{quiz.mental_health_score}</h3>
            </div>
            <div className="bg-yellow-50 p-4 rounded-xl">
              <p className="text-sm text-slate-500">Risk Level</p>
              <h3 className="text-xl font-bold text-yellow-600">{quiz.risk_level}</h3>
            </div>
            <div className="bg-slate-100 p-4 rounded-xl">
              <p className="text-sm text-slate-500">Summary</p>
              <p className="text-sm text-slate-700">{quiz.overall_summary}</p>
            </div>
          </div>
        </div>

        {/* Bookings Section */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <CalendarDays size={18} /> Requested Bookings
            </h2>
          </div>

          {loading ? (
            <p className="text-sm text-slate-500">Loading...</p>
          ) : bookings.length === 0 ? (
            <p className="text-sm text-slate-500">No bookings found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500 border-b">
                    <th className="py-2">Therapist</th>
                    <th>Specialization</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b, i) => (
                    <tr key={i} className="border-b hover:bg-slate-50">
                      <td className="py-2">{b.therapist?.username || "N/A"}</td>
                      <td>{b.therapist?.specialization || "N/A"}</td>
                      <td>{new Date(b.scheduledAt).toLocaleDateString()}</td>
                      <td>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            b.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : b.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}