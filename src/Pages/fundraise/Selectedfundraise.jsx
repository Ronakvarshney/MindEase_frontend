import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog.tsx";
import useAuthStore from "../../../store/authStore";
import { toast, ToastContainer } from "react-toastify";

const Selectedfundraise = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { email } = useAuthStore();

  useEffect(() => {
    const getEvent = async () => {
      try {
        if (!id) return console.log("Event ID not found");

        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/fundraiseEvent`,
          { id }
        );
        setEvent(response.data.event);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getEvent();
  }, [id]);

  const handleParticipate = async () => {
    if (!email || !event) return;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/eventparticipate`,
        { event, email },
        {withCredentials : true}
      );
      toast.success(response?.data?.message || "Participation successful!");
    } catch (error) {
      console.error(error);
      toast.error("Error while registering participation,First login");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#041e22]">
        <p className="text-lg font-semibold text-gray-500 animate-pulse">
          Loading event details...
        </p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#041e22]">
        <p className="text-lg font-semibold text-red-500">Event not found!</p>
      </div>
    );
  }

  const progress =
    event.goalAmount > 0
      ? Math.min((event.raisedAmount / event.goalAmount) * 100, 100)
      : 0;

  return (
    <div className="min-h-screen bg-[#041e22] p-4 md:p-8 font-manrope">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-[#043d43] border border-gray-700 rounded-2xl shadow-lg overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-auto max-h-96 object-cover rounded-t-2xl"
          />
          <div className="p-6 space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-100">
              {event.title}
            </h1>
            <p className="text-gray-300 text-sm sm:text-base">
              {event.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-4 text-sm sm:text-base">
              <div>
                <h2 className="font-semibold text-gray-200">Organizer</h2>
                <p className="text-gray-300">{event.organizer}</p>
              </div>
              <div>
                <h2 className="font-semibold text-gray-200">Location</h2>
                <p className="text-gray-300">
                  {event.location.venue}, {event.location.city},{" "}
                  {event.location.country}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-4 text-sm sm:text-base">
              <div>
                <h2 className="font-semibold text-gray-200">Date</h2>
                <p className="text-gray-300">
                  {new Date(event.date).toLocaleDateString("en-IN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <h2 className="font-semibold text-gray-200">Time</h2>
                <p className="text-gray-300">{event.time}</p>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-200 mb-2">
                Fundraising Progress
              </h2>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div
                  className="bg-green-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-gray-300 text-sm sm:text-base">
                Raised:{" "}
                <span className="font-semibold text-green-400">
                  ₹{event.raisedAmount.toLocaleString()}
                </span>{" "}
                / Goal:{" "}
                <span className="font-semibold text-gray-100">
                  ₹{event.goalAmount.toLocaleString()}
                </span>
              </p>
            </div>

            <div className="mt-6 text-sm sm:text-base">
              <h2 className="font-semibold text-gray-200">Contact</h2>
              <p className="text-gray-300">📧 {event.contactEmail}</p>
              <p className="text-gray-300">📞 {event.contactPhone}</p>
            </div>

            <Dialog>
              <DialogTrigger className="w-full sm:w-auto mt-6 bg-green-600 hover:bg-green-700 text-white py-3 px-6 font-medium rounded-xl shadow-md transition">
                Participate and Raise Funds
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  {email ? (
                    <div>
                      <DialogTitle className="py-3 text-2xl font-manrope">
                        Confirm Participation
                      </DialogTitle>
                      <DialogDescription className="flex flex-col mt-2 gap-2">
                        Are you sure you want to participate in this event? Your
                        contribution will support this cause.
                        <label className="text-gray-300">
                          Your Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          readOnly
                          className="p-2 rounded-md border border-gray-600 bg-gray-800 text-gray-200"
                        />
                        <button
                          onClick={handleParticipate}
                          className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
                        >
                          Participate
                        </button>
                      </DialogDescription>
                    </div>
                  ) : (
                    <div className="text-center text-gray-300">
                      Please{" "}
                      <a href="/login" className="text-green-400 underline">
                        login
                      </a>{" "}
                      to participate.
                    </div>
                  )}
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-[#043d43] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
            <img
              src="/homeless-woman-holding-hands-out-help.jpg"
              alt="Help the Homeless"
              className="w-full h-auto max-h-64 object-cover"
            />
            <div className="p-6 text-center">
              <h2 className="text-2xl font-semibold mb-4 text-gray-100">
                Help for the Poor Who Suffer from Mental Damage
              </h2>
              <p className="text-gray-300 mb-6 text-sm sm:text-base">
                Your donation can provide food, shelter, and hope for those in
                need.
              </p>
              <Dialog>
                <DialogTrigger className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-red-500 px-6 py-3 rounded-md font-semibold text-white shadow-md hover:scale-105 transform transition duration-300">
                  Donate
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Donation</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to donate? Your support will help
                      those in need.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Selectedfundraise;
