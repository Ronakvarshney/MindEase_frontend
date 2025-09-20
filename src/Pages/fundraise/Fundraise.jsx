import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Fundraise = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getFundraiseEvents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/fundraise`
        );
        setEvents(response.data.events); // store events
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    getFundraiseEvents();
  }, []);

  return (
    <div className="bg-[#041e22] min-h-screen py-10 px-10 md:px-20">
      <h1 className="text-4xl font-medium text-green-500 text-center ">
        Fundraising Event
      </h1>
      <h2 className="text-center text-5xl font-medium text-yellow-600 mb-2">
        Donation Campaigns
      </h2>
      <p className="text-center text-gray-500 mb-10 ">
        Participate in Events to raise funds for Poors who can't affords
        treatments
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => {
          const progress = Math.round(
            (event.raisedAmount / event.goalAmount) * 100
          );

          return (
            <div
              key={event._id}
              className="bg-slate-800 shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <Link to={event._id}>
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-64 object-contains"
                />

                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-200 mb-2">
                    {event.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {event.description}
                  </p>

                  <p className="text-sm text-gray-400 mb-2">
                    📍 {event.location.venue}, {event.location.city}
                  </p>

                  <p className="text-sm text-gray-500 mb-4">
                    📅 {new Date(event.date).toDateString()} | ⏰ {event.time}
                  </p>

                  <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                    <div
                      className="bg-green-500 h-3 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Raised:{" "}
                    <span className="font-semibold text-green-600">
                      ₹{event.raisedAmount.toLocaleString()}
                    </span>{" "}
                    / Goal:{" "}
                    <span className="font-semibold text-indigo-600">
                      ₹{event.goalAmount.toLocaleString()}
                    </span>
                  </p>

                  <div className="text-sm text-gray-500">
                    <p>📧 {event.contactEmail}</p>
                    <p>📞 {event.contactPhone}</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Fundraise;
