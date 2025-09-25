import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
          console.log(response.data);
        } else {
          console.log("event id not found");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getEvent();
  }, [id]);

  console.log(event?.imageUrl);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading event details...
        </p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-red-500">Event not found!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#041e22] p-6 flex justify-between">
      <div className="max-w-4xl bg-[#043d43]  w-full border-2 border-gray-700 shadow-lg rounded-2xl overflow-hidden">
        <div className="items-center flex w-full justify-center mt-4">
          <img
            src={event.imageUrl}
            alt={event.title}
            className=" h-72  object-contain rounded-lg shadow-md shadow-green-500"
          />
        </div>

        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-bold text-gray-200">{event.title}</h1>
          <p className="text-gray-400">{event.description}</p>

          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-300">Organizer</h2>
              <p className="text-gray-400">{event.organizer}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-300">Location</h2>
              <p className="text-gray-400">
                {event.location.venue}, {event.location.city},{" "}
                {event.location.country}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-300">Date</h2>
              <p className="text-gray-400">
                {new Date(event.date).toLocaleDateString("en-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-300">Time</h2>
              <p className="text-gray-400">{event.time}</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-300 mb-2">
              Fundraising Progress
            </h2>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{
                  width: `${(event.raisedAmount / event.goalAmount) * 100}%`,
                }}
              ></div>
            </div>
            <p className="mt-2 text-gray-400">
              Raised:{" "}
              <span className="font-semibold text-green-600">
                ₹{event.raisedAmount.toLocaleString()}
              </span>{" "}
              / Goal:{" "}
              <span className="font-semibold">
                ₹{event.goalAmount.toLocaleString()}
              </span>
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-300">Contact</h2>
            <p className="text-gray-400">📧 {event.contactEmail}</p>
            <p className="text-gray-400">📞 {event.contactPhone}</p>
          </div>

          <div className="mt-8">
            <button className="w-full bg-green-600 text-white py-3 font-medium rounded-xl shadow-md hover:bg-green-700 transition">
              Participate and Raise Funds
            </button>
          </div>
        </div>
      </div>
      <div className="text-white flex flex-col md:w-1/2 w-full ml-20 p-4">
        <div className="bg-[#043d43]  w-1/2 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
          <img
            src="/homeless-woman-holding-hands-out-help.jpg"
            alt="Help the Homeless"
            className="w-full object-cover"
          />

          <div className="p-6 text-center">
            <h1 className="text-2xl md:text-2xl font-medium mb-4">
              Help For the Poors Who Suffers from Mental Damage
            </h1>
            <p className="text-gray-300 mb-6 text-sm md:text-base">
              Your donation can provide food, shelter, and hope for those in
              need.
            </p>
            <button className="bg-gradient-to-r from-pink-500 to-red-500 px-6 py-3 rounded-md font-semibold text-white shadow-md hover:scale-105 transform transition duration-300">
              Donate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selectedfundraise;
