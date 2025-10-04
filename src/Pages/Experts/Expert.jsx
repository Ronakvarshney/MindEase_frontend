import React from "react";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const Expert = () => {
  const navigate = useNavigate();

  const topics = [
    "Depression",
    "Anxiety",
    "Relationship Issues",
    "Grief",
    "Alcohol/Substance Addiction",
    "Post-Traumatic Stress",
    "Study-Related Concerns",
    "Eating/Sleep-Related Issues",
    "Job/Career Concerns",
  ];

  return (
    <div className="flex flex-col  py-12 px-4 md:px-12 w-full items-center">
      {/* Heading */}
      <div className="text-center max-w-3xl mb-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-600 mb-4">
          Meet Our Network of Mental Health Experts
        </h2>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg font-medium mb-1">
          We are associated with a highly qualified team of some of the best names in Psychology,
        </p>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg font-medium">
          who come with years of experience in providing excellent care.
        </p>
      </div>

      {/* Image */}
      <div className="flex justify-center mb-8 w-full">
        <img
          src="/video-call-illustration-download-in-svg-png-gif-file-formats--chat-communication-mobile-app-network-illustrations-3992761.webp"
          alt="Experts Illustration"
          className="w-3/4 sm:w-2/3 md:w-1/2 max-w-md rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 w-full max-w-6xl">
        {topics.map((topic, index) => (
          <div key={index} className="flex md:justify-center sm:justify-between">
            <span className="flex items-center  gap-2 bg-[#053138]  shadow-lg w-full py-4 px-4 text-center text-base sm:text-lg md:text-md text-medium text-gray-300 transform hover:scale-105 transition duration-300">
              <TiTick className="text-2xl text-green-500" />
              {topic}
            </span>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/booking")}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg text-lg sm:text-xl shadow-md transform hover:scale-105 transition duration-300"
        >
          Schedule Your Booking
        </button>
      </div>
    </div>
  );
};

export default Expert;
