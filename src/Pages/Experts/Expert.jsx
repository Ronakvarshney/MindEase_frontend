import React from "react";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const Expert = () => {
  const navigate = useNavigate();

  return (
    <div className=" flex flex-col bg-[#032225] py-10 w-full items-center justify-start px-2">
      <div className="space-y-2 mr-5">
        <h2 className="text-4xl font-semibold text-center text-indigo-700 mb-4">
          Meet Our Networks of Mental Health Experts
        </h2>
        <p className="text-gray-400 text-xs text-center font-medium">
          We are associated with a highly qualified team of some of the best
          names in Psychology,
        </p>
        <p className="text-gray-400 text-xs text-center font-medium">
          who come with years of experience in providing excellent care.
        </p>

        <div className="flex items-center justify-center">
          <img
            src="/video-call-illustration-download-in-svg-png-gif-file-formats--chat-communication-mobile-app-network-illustrations-3992761.webp"
            className="w-80 hover:scale-110 transition"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-4 pt-3">
          {[
            "Depression",
            "Anxiety",
            "Relationship Issues",
            "Grief",
            "Alcohol/Substance Addiction",
            "Post-Traumatic Stress",
            "Study-Related Concerns",
            "Eating/Sleep-Related Issues",
            "Job/Career Concerns",
          ].map((topic, index) => (
            <div key={index} className="flex justify-center">
              <span className="p-4 flex items-center justify-between px-4 bg-[#053138] rounded-xl shadow-lg w-full text-center text-lg font-semibold text-gray-300 transform hover:scale-105 transition duration-300">
                <TiTick className="text-2xl text-green-600 mr-2" />
                {topic}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate("/booking")}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg text-xl shadow-md transform hover:scale-105 transition duration-300"
        >
          Schedule Your Booking
        </button>
      </div>
    </div>
  );
};

export default Expert;
