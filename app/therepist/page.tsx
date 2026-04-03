"use client";

import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Star,
  Clock,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Shield,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FadeIn } from "@/components/FadeIn";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

interface Iformdata {
  cause: string;
  mode: string;
  date: string;
  contact_info: string;
  meeting_time: string;
}

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [therapists, setTherapists] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fromdata, setformdata] = useState<Iformdata>({
    cause: "",
    mode: "",
    date: "",
    contact_info: "",
    meeting_time: "",
  });

  const filters = [
    "All",
    "Anxiety",
    "Depression",
    "Trauma",
    "Relationship",
    "Workplace",
  ];

  useEffect(() => {
    const getAllTherapists = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:5000/api/v1/getalltherapists",
        );
        console.log(response.data);
        setTherapists(response.data.therapists || []);
      } catch (error) {
        console.error(error);
        toast.error("Sorry, Therapists not exists.");
      } finally {
        setLoading(false);
      }
    };

    getAllTherapists();
  }, []);

  const bookingHandler = async (id: string) => {
    if (!id) return;

    const toastId = toast.loading("Requesting booking...");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/requestbooking",
        { fromdata, id },
        { withCredentials: true },
      );

      if (response.data.booking) {
        toast.success("Booking requested successfully!", { id: toastId });
      } else {
        toast.error("Booking already exists with this therapist.", {
          id: toastId,
        });
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message, { id: toastId });
    } finally {
      setformdata({
        cause: "",
        contact_info: "",
        mode: "",
        date: "",
        meeting_time: "",
      });
    }
  };

  const filteredTherapists = therapists.filter((t) => {
    const name = t.username?.toLowerCase() || "";
    const role = t.role?.toLowerCase() || "";
    const specs = t.specialization;

    const matchesSearch =
      name.includes(searchQuery.toLowerCase()) ||
      role.includes(searchQuery.toLowerCase()) ||
      specs.includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === "All" ||
      t.specialization?.some((s: string) =>
        s.toLowerCase().includes(selectedFilter.toLowerCase()),
      );

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="pt-20 sm:pt-24 pb-16 sm:pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-indigo-600 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6">
              <Shield size={12} className="sm:hidden" />
              <Shield size={14} className="hidden sm:block" />
              Verified & HIPAA Compliant
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-4 sm:mb-6">
              Expert care for{" "}
              <span className="text-mental-blue">every mind.</span>
            </h1>

            <p className="max-w-2xl mx-auto text-sm sm:text-lg text-slate-600 font-medium px-2">
              Connect with certified professionals who understand your journey.
            </p>
          </FadeIn>
        </div>

        <div className="mb-8 sm:mb-12 space-y-4 sm:space-y-6">
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1 group">
              <Search
                className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by name, specialty, or concern..."
                className="w-full pl-11 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 bg-white border border-slate-200 rounded-2xl sm:rounded-[2rem] text-sm sm:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              <Filter
                size={18}
                className="text-slate-400 mr-1 sm:mr-2 flex-shrink-0"
              />
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFilter(f)}
                  className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap ${
                    selectedFilter === f
                      ? "bg-mental-blue text-white"
                      : "bg-white text-slate-600 border"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-center py-16 sm:py-20 text-slate-400 font-medium text-sm sm:text-base">
            Loading therapists...
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8">
          {filteredTherapists.map((t, index) => {
            const availabilityText = t.availability?.length
              ? `${t.availability[0].day} : ${t.availability[0].slot || t.availability[0].slots?.join(", ")}`
              : "Not available";

            return (
              <FadeIn key={t._id} delay={index * 80}>
                <div className="bg-white rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-8 border hover:shadow-2xl transition-all relative">
                  <div className="w-full sm:w-48 h-44 sm:h-48 rounded-2xl sm:rounded-[2rem] overflow-hidden flex-shrink-0 bg-slate-100">
                    <img
                      src={t.profileImage || "https://via.placeholder.com/300"}
                      alt={t.userId?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-3 sm:space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className="text-lg sm:text-2xl font-black text-slate-900">
                          {t.username || "Therapist"}
                        </h3>
                        <p className="text-mental-blue font-bold text-xs sm:text-sm">
                          {t.role || "Therapist"}
                        </p>
                      </div>

                      {/* <div className="flex items-center gap-1 bg-yellow-50 px-2 sm:px-3 py-1 rounded-full">
                        <Star
                          size={12}
                          className="text-yellow-500"
                          fill="currentColor"
                        />
                        <span className="text-xs sm:text-sm font-black text-yellow-700">
                          4.8
                        </span>
                        <span className="text-[10px] sm:text-xs text-yellow-600/60">
                          (120)
                        </span>
                      </div> */}
                    </div>

                    {/* Specializations */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {t.specialization}
                    </div>

                    {/* Meta */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 py-2 border-y">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Clock size={14} />
                        <span className="text-[11px] sm:text-xs font-medium">
                          {t.experience} years exp
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500">
                        <Calendar size={14} />
                        <div className="flex flex-col gap-1">
                          {t.availableSlots?.slice(0, 2).map((it, i) => (
                            <span key={i} className="text-xs">
                              {it.day}: {it.startTime} - {it.endTime}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                      <span className="text-base sm:text-lg font-black text-slate-800">
                        ₹{t.consultationFee}/session
                      </span>
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            // onClick={bookingHandler}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-slate-900 text-white rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold hover:bg-mental-blue"
                          >
                            Book Session <ArrowRight size={14} />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[520px]">
                          <DialogHeader>
                            <DialogTitle>Book Therapy Session</DialogTitle>
                            <DialogDescription>
                              Fill in the details below to request a session
                              with this therapist.
                            </DialogDescription>
                          </DialogHeader>

                          <form className="space-y-4 mt-4">
                            {/* Cause / Reason */}
                            <div className="space-y-1">
                              <label className="text-sm font-semibold">
                                Cause / Reason
                              </label>
                              <textarea
                                name="cause"
                                onChange={(e) =>
                                  setformdata({
                                    ...fromdata,
                                    [e.target.name]: e.target.value,
                                  })
                                }
                                placeholder="Briefly describe why you want to book this session"
                                className="w-full min-h-[90px] rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-mental-blue"
                              />
                            </div>

                            {/* Session Type */}
                            <div className="space-y-1">
                              <label className="text-sm font-semibold">
                                Session Type
                              </label>
                              <select
                                name="mode"
                                onChange={(e) =>
                                  setformdata({
                                    ...fromdata,
                                    [e.target.name]: e.target.value,
                                  })
                                }
                                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-mental-blue"
                              >
                                <option value="">Select session type</option>
                                <option value="online">Online</option>
                                <option value="offline">Offline</option>
                              </select>
                            </div>

                            {/* Desired Date & Time */}
                            <div className="space-y-1">
                              <label className="text-sm font-semibold">
                                Desired Date & Time
                              </label>
                              <input
                                name="date"
                                onChange={(e) =>
                                  setformdata({
                                    ...fromdata,
                                    [e.target.name]: e.target.value,
                                  })
                                }
                                type="datetime-local"
                                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-mental-blue"
                              />
                            </div>

                            {/* Meeting Time Preference */}
                            <div className="space-y-1">
                              <label className="text-sm font-semibold">
                                Preferred Meeting Time
                              </label>
                              <select
                                name="meeting_time"
                                onChange={(e) =>
                                  setformdata({
                                    ...fromdata,
                                    [e.target.name]: e.target.value,
                                  })
                                }
                                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-mental-blue"
                              >
                                <option value="">Select time slot</option>
                                <option value="morning">Morning</option>
                                <option value="afternoon">Afternoon</option>
                                <option value="evening">Evening</option>
                                <option value="night">Night</option>
                              </select>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-1">
                              <label className="text-sm font-semibold">
                                Contact Information
                              </label>
                              <input
                                type="text"
                                name="contact_info"
                                onChange={(e) =>
                                  setformdata({
                                    ...fromdata,
                                    [e.target.name]: e.target.value,
                                  })
                                }
                                placeholder="Phone number or email"
                                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-mental-blue"
                              />
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                              <button
                                type="button"
                                onClick={() =>
                                  setformdata({
                                    cause: "",
                                    mode: "",
                                    meeting_time: "",
                                    date: "",
                                    contact_info: "",
                                  })
                                }
                                className="w-full sm:w-1/2 rounded-xl bg-gray-200 text-gray-800 py-2.5 font-semibold hover:bg-gray-300"
                              >
                                Cancel
                              </button>

                              <button
                                type="button"
                                onClick={() => bookingHandler(t?._id)}
                                className="w-full sm:w-1/2 rounded-xl bg-slate-900 text-white py-2.5 font-semibold hover:bg-mental-blue"
                              >
                                Submit Booking Request
                              </button>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  {/* Decor */}
                  <div className="absolute top-0 right-0 p-3 sm:p-4 opacity-10 hidden sm:block">
                    <CheckCircle2 size={70} className="text-mental-blue" />
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {!loading && filteredTherapists.length === 0 && (
          <div className="text-center py-16 sm:py-20 text-slate-400 text-sm sm:text-base">
            No therapists found.
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}
