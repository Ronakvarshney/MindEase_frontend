import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SelectedProgram = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { program } = location?.state || {};

  if (!program) return <div>Program not found</div>;

  return (
    <div className="bg-[#2c452f] min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-6xl bg-white w-full border-2 border-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">
          {program.title}
        </h1>

        <div className="w-full flex items-center justify-center h-96 mb-6">
          <img
            src={program.image}
            alt={program.title}
            className="w-1/2 h-full object-cover rounded-lg shadow-md"
          />
        </div>

        <h2 className="text-xl font-semibold text-center text-gray-900 mb-4">
          {program.subtitle}
        </h2>

        <p className="text-lg text-gray-400 text-center mb-6">
          {program.description}
        </p>

        {/* Lorem Ipsum Text */}
        <div className="bg-slate-800 p-6 rounded-lg shadow-sm mb-4">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            More Information
          </h3>
          <p className="text-lg text-gray-300 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            eget ante purus. Pellentesque tincidunt vel leo nec volutpat. Fusce
            non dolor vel libero vestibulum consequat. Proin laoreet mollis
            diam. Curabitur et nulla sit amet lorem placerat gravida. Sed sit
            amet dui ut turpis vehicula condimentum. Aliquam erat volutpat.
            Etiam tempus nisl nec lorem posuere, ut aliquet turpis posuere.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Suspendisse potenti. Phasellus vitae leo nec odio pharetra
            scelerisque. Ut vel velit quam. Integer vitae arcu euismod, tempor
            lectus a, feugiat nisl. Cras ut dui vitae urna consectetur euismod.
            Curabitur bibendum erat euismod turpis auctor, vel auctor odio
            varius.
          </p>
        </div>
      </div>
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 py-1 px-4 text-white mt-4  rounded-xl text-sm"
      >
        Back
      </button>
    </div>
  );
};

export default SelectedProgram;
