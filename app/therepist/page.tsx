"use client";

import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Clock,
  Calendar,
  ArrowRight,
  Shield,
  Video,
  MapPin,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

interface Iformdata {
  cause: string;
  mode: string;
  date: string;
  contact_info: string;
  meeting_time: string;
}

const filters = ["All", "Anxiety", "Depression", "Trauma", "Relationship", "Workplace"];

const emptyForm: Iformdata = { cause: "", mode: "", date: "", contact_info: "", meeting_time: "" };

const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-white/40 uppercase tracking-widest">{label}</label>
    {children}
  </div>
);

const inputCls = "w-full px-4 py-3 bg-[#2a2a2a] border border-white/8 rounded-xl text-sm text-white placeholder-white/20 outline-none focus:border-[#1D9E75]/50 transition-colors";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [therapists, setTherapists] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formdata, setFormdata] = useState<Iformdata>(emptyForm);

  useEffect(() => {
    const getAllTherapists = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/v1/getalltherapists");
        setTherapists(response.data.therapists || []);
      } catch (error) {
        toast.error("Sorry, therapists not found.");
      } finally {
        setLoading(false);
      }
    };
    getAllTherapists();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const bookingHandler = async (id: string) => {
    if (!id) return;
    const toastId = toast.loading("Requesting booking...");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/requestbooking",
        { fromdata: formdata, id },
        { withCredentials: true }
      );
      if (response.data.booking) {
        toast.success("Booking requested successfully!", { id: toastId });
      } else {
        toast.error("Booking already exists with this therapist.", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong.", { id: toastId });
    } finally {
      setFormdata(emptyForm);
    }
  };

  const filteredTherapists = therapists.filter((t) => {
    const name = t.username?.toLowerCase() || "";
    const role = t.role?.toLowerCase() || "";
    const specs = t.specialization || "";
    const q = searchQuery.toLowerCase();
    const matchesSearch = name.includes(q) || role.includes(q) || specs.includes(q);
    const matchesFilter =
      selectedFilter === "All" ||
      t.specialization?.some((s: string) => s.toLowerCase().includes(selectedFilter.toLowerCase()));
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-20 pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-5">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1D9E75]/30 bg-[#1D9E75]/10">
            <Shield size={13} className="text-[#1D9E75]" />
            <span className="text-xs font-semibold text-[#1D9E75] tracking-widest uppercase">
              Verified & HIPAA Compliant
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Expert care for{" "}
            <span
              style={{
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                backgroundImage: "linear-gradient(90deg, #1D9E75, #5DCAA5)",
              }}
            >
              every mind.
            </span>
          </h1>
          <p className="text-white/40 text-sm max-w-xl leading-relaxed">
            Connect with certified professionals who understand your journey.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
            <input
              type="text"
              placeholder="Search by name, specialty, or concern..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#222222] border border-white/8 rounded-xl text-sm text-white placeholder-white/25 outline-none focus:border-white/15 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Filter size={14} className="text-white/25 flex-shrink-0" />
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedFilter === f
                    ? "bg-[#1D9E75] text-white"
                    : "border border-white/8 text-white/40 hover:border-white/15 hover:text-white/60"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20 gap-2">
            <div className="w-4 h-4 border-2 border-[#1D9E75] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-white/30">Loading therapists...</span>
          </div>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredTherapists.map((t) => (
            <div
              key={t._id}
              className="flex gap-5 p-5 rounded-2xl border border-white/8 bg-[#222222] hover:border-white/15 transition-all duration-200"
            >
              {/* Avatar */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-[#2a2a2a]">
                <img
                  src={t.profileImage || "https://via.placeholder.com/200"}
                  alt={t.username}
                  className="w-full h-full object-cover opacity-80"
                />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col gap-3 min-w-0">
                <div>
                  <h3 className="text-base font-semibold text-white truncate">
                    {t.username || "Therapist"}
                  </h3>
                  <p className="text-xs text-[#1D9E75] font-medium mt-0.5">
                    {t.role || "Therapist"}
                  </p>
                </div>

                {/* Specs */}
                {Array.isArray(t.specialization) && (
                  <div className="flex flex-wrap gap-1.5">
                    {t.specialization.slice(0, 3).map((s: string, i: number) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold border border-white/8 text-white/40 bg-white/3"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                {/* Meta */}
                <div className="flex flex-wrap gap-4">
                  <span className="flex items-center gap-1.5 text-xs text-white/30">
                    <Clock size={11} /> {t.experience}y exp
                  </span>
                  {t.availableSlots?.[0] && (
                    <span className="flex items-center gap-1.5 text-xs text-white/30">
                      <Calendar size={11} />
                      {t.availableSlots[0].day}: {t.availableSlots[0].startTime}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/8">
                  <span className="text-sm font-bold text-white">
                    ₹{t.consultationFee}
                    <span className="text-xs text-white/30 font-normal">/session</span>
                  </span>

                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1D9E75] hover:bg-[#178a64] text-white text-xs font-semibold transition-all">
                        Book Session <ArrowRight size={12} />
                      </button>
                    </DialogTrigger>

                    <DialogContent className="bg-[#222222] border border-white/10 text-white max-w-md rounded-2xl p-0 overflow-hidden">
                      {/* Green top strip */}
                      <div className="h-1 w-full bg-gradient-to-r from-[#1D9E75] via-[#5DCAA5] to-[#1D9E75]" />

                      <div className="p-6 flex flex-col gap-5">
                        <DialogHeader>
                          <DialogTitle className="text-base font-semibold text-white">
                            Book a Session
                          </DialogTitle>
                          <p className="text-xs text-white/35 mt-1">
                            Fill in the details to request a session with{" "}
                            <span className="text-white/60">{t.username}</span>.
                          </p>
                        </DialogHeader>

                        <div className="flex flex-col gap-4">
                          <FormField label="Reason / Cause">
                            <textarea
                              name="cause"
                              rows={3}
                              placeholder="Briefly describe why you want to book..."
                              value={formdata.cause}
                              onChange={handleFormChange}
                              className={inputCls + " resize-none"}
                            />
                          </FormField>

                          <div className="grid grid-cols-2 gap-3">
                            <FormField label="Session Type">
                              <select name="mode" value={formdata.mode} onChange={handleFormChange} className={inputCls}>
                                <option value="">Select type</option>
                                <option value="online">Online</option>
                                <option value="offline">Offline</option>
                              </select>
                            </FormField>

                            <FormField label="Time Preference">
                              <select name="meeting_time" value={formdata.meeting_time} onChange={handleFormChange} className={inputCls}>
                                <option value="">Select slot</option>
                                <option value="morning">Morning</option>
                                <option value="afternoon">Afternoon</option>
                                <option value="evening">Evening</option>
                                <option value="night">Night</option>
                              </select>
                            </FormField>
                          </div>

                          <FormField label="Desired Date & Time">
                            <input
                              type="datetime-local"
                              name="date"
                              value={formdata.date}
                              onChange={handleFormChange}
                              className={inputCls}
                            />
                          </FormField>

                          <FormField label="Contact Info">
                            <input
                              type="text"
                              name="contact_info"
                              placeholder="Phone number or email"
                              value={formdata.contact_info}
                              onChange={handleFormChange}
                              className={inputCls}
                            />
                          </FormField>
                        </div>

                        <div className="flex gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => setFormdata(emptyForm)}
                            className="flex-1 py-3 rounded-xl border border-white/10 text-white/40 hover:text-white hover:border-white/20 text-sm font-semibold transition-all"
                          >
                            Clear
                          </button>
                          <button
                            type="button"
                            onClick={() => bookingHandler(t._id)}
                            className="flex-1 py-3 rounded-xl bg-[#1D9E75] hover:bg-[#178a64] text-white text-sm font-semibold transition-all"
                          >
                            Submit Request
                          </button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!loading && filteredTherapists.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-white/20">
            <Search size={32} />
            <p className="text-sm">No therapists found matching your search.</p>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}