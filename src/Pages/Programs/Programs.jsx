import React from "react";
import { useNavigate } from "react-router-dom";

const Programs = () => {
  const navigate = useNavigate();
  const programs = [
    {
      title: "HopeLine",
      subtitle: "A 24/7 Phone Helpline",
      description:
        "24×7 hotline dedicated to providing confidential and compassionate assistance to individuals in distress.",
      image: "/MINDLINE.png.webp",
    },
    {
      title: "Compassion Classroom",
      subtitle: "Volunteers and Counselor training",
      description:
        "Training programs tailored to equip volunteers with necessary skills for student counseling and mental health support.",
      image: "/training.jpg.webp",
    },
    {
      title: "MindChat",
      subtitle: "Chat with Volunteers via MindMantra",
      description:
        "Mental health support via app and web platform, offering empathy, guidance, and resources instantly.",
      image: "/MINDLINE.png.webp",
    },
    {
      title: "Mind Matters",
      subtitle: "Spreading Awareness",
      description:
        "Mental health camps, sessions to educate, destigmatize, and empower individuals in schools, corporations and communities.",
      image: "/hope-talk.png.webp",
    },
    {
      title: "Brighter Tomorrow",
      subtitle: "Suicide Prevention Program",
      description:
        "Reducing suicide rates through education, support, open dialogue, & access to mental health resources and services.",
      image: "/Suicide.jpg.webp",
    },
    {
      title: "Prideful Minds",
      subtitle: "LGBTQ Support Program",
      description:
        "Providing resources & advocacy to empower LGBTQ individuals, fostering inclusion, acceptance, & well-being.",
      image: "/Suicide.jpg.webp",
    },
  ];


  

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-4xl md:max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
          How Can We Help?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              onClick={() =>
                navigate(`/programs/${program.title}`, { state: { program } })
              }
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out"
            >
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-2xl font-semibold text-green-400 mb-1">
                  {program.title}
                </h3>
                <h4 className="text-md text-yellow-500 mb-3">
                  {program.subtitle}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {program.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Programs;
