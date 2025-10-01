import React from "react";
import Programs from "../Programs/Programs";
import Expert from "../Experts/Expert";
import { Link, useNavigate } from "react-router-dom";
import { Marquee } from "../../Components/ui/marquee";
import { cn } from "@/lib/utils";

const Home = () => {
  const navigate = useNavigate();
  const generateQuiz = () => {
    navigate("/generateQuestion");
  };

  const reviews = [
    {
      name: "Jack",
      username: "@jack",
      body: "I've never seen anything like this before. It's amazing. I love it.",
      img: "https://avatar.vercel.sh/jack",
    },
    {
      name: "Jill",
      username: "@jill",
      body: "I don't know what to say. I'm speechless. This is amazing.",
      img: "https://avatar.vercel.sh/jill",
    },
    {
      name: "John",
      username: "@john",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/john",
    },
    {
      name: "Jane",
      username: "@jane",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/jane",
    },
    {
      name: "Jenny",
      username: "@jenny",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/jenny",
    },
    {
      name: "James",
      username: "@james",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/james",
    },
  ];
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);

  return (
    <div>
      <div className="flex flex-col justify-center items-center bg-[#041e22]">
        <div className="flex flex-col md:flex-row items-center justify-between w-full px-6 py-12 ">
          <div className="w-full md:w-1/2 text-center md:text-left ml-5 space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-200 leading-tight">
              Empower Your Mind, <br /> Embrace a Healthier Tomorrow{" "}
            </h1>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed">
              Join our{" "}
              <span className="font-semibold text-purple-700">
                AI-powered Mental Health Platform
              </span>
              designed to support you in tough times. Explore resources, connect
              with AI, and take the first step towards mental well-being.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <button
                onClick={() => navigate("/chatting")}
                className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-lg shadow-md font-medium transition"
              >
                Chat with AI
              </button>
              <button
                onClick={generateQuiz}
                className="bg-white border border-purple-600 text-purple-700 hover:bg-purple-100 px-5 py-3 rounded-lg shadow-md font-medium transition"
              >
                Take Quiz
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
            <img
              src="/flat-illustration-world-health-day-celebration.png"
              alt="Mental Health"
              className="w-3/4 md:w-2/3 rounded-xl"
            />
          </div>
        </div>

        <div className="text-center mt-6 text-white px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
            Welcome to Our Crisis Management Platform
          </h1>
          <p className="text-sm sm:text-base md:text-lg">
            We are here to help you navigate through tough times. Explore more
            below.
          </p>
        </div>

        <Programs />
        <div className="flex flex-col md:flex-row items-center bg-[#03252a] py-10 gap-6 md:gap-12 px-4 md:px-12">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="/hand-drawn-adhd-illustration.png"
              alt="Chat with AI"
              className="w-3/4 sm:w-2/3 md:w-full max-w-sm"
            />
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left space-y-4 text-white">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-yellow-600">
              ᴄʜᴀᴛ ᴡɪᴛʜ ᴀɪ ᴛᴏ ɢᴇᴛ ʀɪᴅ ꜰʀᴏᴍ ᴍᴇɴᴛᴀʟ ʜᴇᴀʟᴛʜ ɪꜱꜱᴜᴇꜱ
            </h2>

            <p className="text-sm sm:text-base md:text-base leading-relaxed text-green-500">
              🇴​​🇵​​🇪​​🇳​​🇮​​🇳​​🇬​ ​🇺​​🇵​ ​🇦​​🇧​​🇴​​🇺​​🇹​
              ​🇾​​🇴​​🇺​​🇷​ ​🇲​​🇪​​🇳​​🇹​​🇦​​🇱​ ​🇭​​🇪​​🇦​​
              ​🇱​​🇹​​🇭​ ​🇮​​🇸​ ​🇹​​🇭​​🇪​ ​🇫​​🇮​​🇷​​🇸​​🇹​
              ​🇸​​🇹​​🇪​​🇵
            </p>

            <p className="text-xs sm:text-sm md:text-base leading-relaxed text-gray-300">
              AI can play a significant role in addressing mental health issues
              by providing accessible, personalized, and effective support.
              Chatbots and virtual therapists, available 24/7, offer immediate,
              non-judgmental assistance, allowing individuals to express their
              feelings and receive guidance at any time.
            </p>

            <div className="flex justify-center md:justify-start mt-3">
              <button
                onClick={() => navigate("/chatting")}
                className="bg-blue-500 px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-white text-sm sm:text-base hover:scale-105 transition-transform duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center text-white gap-6 mb-10 px-4 bg-[#021416] py-10 w-full">
          <h1 className="text-3xl md:text-5xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Support Our Work
          </h1>

          <div className="flex flex-col md:flex-row gap-6 mt-5 w-full max-w-6xl  justify-center">
            <div className="w-full md:w-1/3 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
              <Link to="/fundraise">
                <div className=" flex flex-col items-center text-center">
                  <img
                    src="/people-stacking-hands-together-park.jpg"
                    alt="Volunteer"
                    className="w-full rounded-t-md mb-4"
                  />
                  <h2 className="text-xl px-6 font-semibold mb-2">Fundraise</h2>
                  <p className="text-gray-300 px-6 mb-4 text-sm">
                    Help us by starting a fundraiser and support our cause to
                    reach more people.
                  </p>
                </div>
              </Link>
            </div>

            <div className="w-full md:w-1/3 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
              <Link to="/donate">
                <div className="p-6 flex flex-col items-center text-center">
                  <img
                    src="src/assets/illustration-charity-support.png"
                    alt="Fundraise"
                    className="w-2/3 h-1/2 mb-4"
                  />
                  <h2 className="text-xl font-semibold mb-2">Donate</h2>
                  <p className="text-gray-300 text-sm">
                    Your donations make a huge impact in helping communities in
                    need.
                  </p>
                </div>
              </Link>
            </div>

            <div className="w-full  md:w-1/3 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
              <Link to="/community">
                <div className=" flex flex-col items-center text-center">
                  <img
                    src="/people-stacking-hands-together-park.jpg"
                    alt="Volunteer"
                    className="w-full rounded-t-md mb-4"
                  />
                  <h2 className="text-xl px-6 font-semibold mb-2">Community</h2>
                  <p className="text-gray-300 px-6 mb-4 text-sm">
                    Join our team as a volunteer and contribute your time and
                    skills.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-6 md:gap-12 px-4 md:px-12 py-6">
          <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-600">
              ᴘʀɪᴏʀɪᴛɪᴢᴇ ʏᴏᴜʀ ᴍᴇɴᴛᴀʟ ʜᴇᴀʟᴛʜ
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-green-500">
              𝒯𝒶𝓀𝑒 𝓉𝒽𝑒 𝒻𝒾𝓇𝓈𝓉 𝓈𝓉𝑒𝓅.{" "}
              <span className="text-orange-700">
                𝒞heck Your Mental Health Condition With AI Powered Quiz
              </span>
            </p>
            <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
              AI-powered quizzes provide a quick, accessible, and non-invasive
              way to assess emotional and psychological state. These quizzes use
              AI to analyze responses and detect patterns related to mental
              health concerns like anxiety, depression, or stress.
            </p>
            <button
              onClick={generateQuiz}
              className="mt-4 bg-red-500 px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold text-white hover:scale-105 transition-transform duration-300"
            >
              Analyze Mental Health with AI Powered Quiz
            </button>
          </div>

          <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
            <img
              src="/freepik__background__7098.png"
              alt="AI Quiz"
              className="w-3/4 sm:w-2/3 md:w-full max-w-sm"
            />
          </div>
        </div>

        <Expert />

        <div className="w-full bg-gray-100 flex items-center justify-center px-4">
          <p className=" mx-auto  p-4 rounded-lg text-sm sm:text-lg md:text-2xl font-semibold">
            Review from Our Users
          </p>
        </div>
        <div className="relative w-full overflow-hidden py-4 bg-gray-900">
          <div className="flex animate-marquee whitespace-nowrap gap-6">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="flex-none w-96 p-4 bg-gray-800 text-white rounded-xl border border-gray-700"
              >
                <div className="flex items-center gap-2">
                  <img src={review.img} className="w-10 h-10 rounded-full" />
                  <div>
                    <figcaption className="font-medium">
                      {review.name}
                    </figcaption>
                    <p className="text-sm text-gray-300">{review.username}</p>
                  </div>
                </div>
                <blockquote className="mt-2 text-xs md:text-sm">
                  {review.body}
                </blockquote>
              </div>
            ))}
            {reviews.map((review, idx) => (
              <div
                key={`dup-${idx}`}
                className="flex-none w-64 p-4 bg-gray-800 text-white rounded-xl border border-gray-700"
              >
                <div className="flex items-center gap-2">
                  <img src={review.img} className="w-10 h-10 rounded-full" />
                  <div>
                    <figcaption className="font-medium">
                      {review.name}
                    </figcaption>
                    <p className="text-sm text-gray-300">{review.username}</p>
                  </div>
                </div>
                <blockquote className="mt-2 text-sm">{review.body}</blockquote>
              </div>
            ))}
          </div>

          <style jsx>{`
            .animate-marquee {
              animation: marquee 20s linear infinite;
            }
            @keyframes marquee {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
          `}</style>
        </div>

        {/* <Marquee reverse pauseOnHover className="[--duration:20s] mt-2">
          {secondRow.map((review, indx) => (
            <span
              key={indx}
              className="inline-block px-4 py-2 rounded-lg bg-gray-800 text-white mx-2"
            >
              <div className="flex items-center gap-2">
                <img src={review.img} className="rounded-full w-10 h-10" />
                <div>
                  <figcaption>{review.name}</figcaption>
                  <p>{review.username}</p>
                </div>
              </div>
              <blockquote className="mt-2 text-sm">{review.body}</blockquote>
            </span>
          ))}
        </Marquee> */}
      </div>
    </div>
  );
};

export default Home;
