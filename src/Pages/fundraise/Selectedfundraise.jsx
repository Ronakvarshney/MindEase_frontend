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
} from "@/components/ui/dialog";

const Selectedfundraise = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvent = async () => {
      try {
        if (id) {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/fundraiseEvent`,
            { id }
          );
          setEvent(response.data.event);
        } else {
          console.log("Event ID not found");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getEvent();
  }, [id]);

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

  return (
    <div className="min-h-screen bg-[#041e22] p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Event Details */}
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
            <p className="text-gray-300 text-sm sm:text-base">{event.description}</p>

            <div className="grid sm:grid-cols-2 gap-4 mt-4 text-sm sm:text-base">
              <div>
                <h2 className="font-semibold text-gray-200">Organizer</h2>
                <p className="text-gray-300">{event.organizer}</p>
              </div>
              <div>
                <h2 className="font-semibold text-gray-200">Location</h2>
                <p className="text-gray-300">
                  {event.location.venue}, {event.location.city}, {event.location.country}
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

            {/* Fundraising Progress */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-200 mb-2">
                Fundraising Progress
              </h2>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div
                  className="bg-green-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${(event.raisedAmount / event.goalAmount) * 100}%` }}
                ></div>
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

            {/* Contact */}
            <div className="mt-6 text-sm sm:text-base">
              <h2 className="font-semibold text-gray-200">Contact</h2>
              <p className="text-gray-300">📧 {event.contactEmail}</p>
              <p className="text-gray-300">📞 {event.contactPhone}</p>
            </div>

            {/* Participate Button */}
            <Dialog>
              <DialogTrigger>
                <button className="w-full sm:w-auto mt-6 bg-green-600 hover:bg-green-700 text-white py-3 px-6 font-medium rounded-xl shadow-md transition">
                  Participate and Raise Funds
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Participation</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to participate in this event? Your
                    contribution will support this cause.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Donation Card */}
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
                Your donation can provide food, shelter, and hope for those in need.
              </p>
              <Dialog>
                <DialogTrigger>
                  <button className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-red-500 px-6 py-3 rounded-md font-semibold text-white shadow-md hover:scale-105 transform transition duration-300">
                    Donate
                  </button>
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
    </div>
  );
};

export default Selectedfundraise;
