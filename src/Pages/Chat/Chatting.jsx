import { Link } from "react-router-dom";

const Chatting = () => {
  const bots = [
    {
      id: "1777689698698",
      name: "Captain Jarvis",
      tag: "Trained Model",
      role: "Mental Health Support",
      description:
        "Your tough, no-nonsense AI mentor who resolve your queries related to mental health ",
      tags: ["AI mentor", "Take action", "Tough", "Get results"],
    },
    {
      id: "2880979079079",
      name: "Friend Jarvis",
      tag : "Paid",
      role: "Companionship & Emotional Support",
      description:
        "Your caring AI friend, always there to chat, share a giggle, lend an ear, and offer support.",
      tags: ["AI friend", "Uplifting", "Offer support"],
    },
    {
      id: "3698687807099",
      name: "Coach Jarvis",
      tag: "Ask Anything",
      role: "Self-Reflection & Mindfulness",
      description:
        "Your go-to AI for fitness and wellness tips, motivating you to hit your goals and stay healthy. ask anything",
      tags: ["Coach", "Fitness", "Wellness", "Motivating"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#041e22] flex flex-col items-center p-4">
      <div className="max-w-6xl w-full mx-auto flex flex-col lg:flex-row text-white justify-between p-5 bg-[#0b515c] rounded-xl gap-6">
        <div className="flex flex-col gap-3 lg:max-w-3xl">
          <h1 className="text-2xl md:text-3xl font-semibold leading-snug">
            Your True AI Friend to Talk To...
          </h1>
          <p className="text-gray-200 text-sm md:text-base leading-relaxed">
            MindEase AI is more than just a chatbot. It’s your trusted,
            privacy-first companion. From creative brainstorming and business
            strategies to lifestyle, education, and well-being, MindEase helps
            you explore ideas and make better decisions without ever
            compromising your data.
          </p>
        </div>

        <div className="bg-slate-800 text-white flex flex-col sm:flex-row items-center gap-4 font-medium p-4 rounded-lg w-full lg:max-w-md">
          <div className="flex flex-col flex-1 text-center sm:text-left">
            <h1 className="text-base md:text-lg font-medium">
              How can I help? What happened today?
            </h1>
            <Link to="/chatting/3">
              <button className="bg-green-600 p-2 rounded-md mt-3 w-full sm:w-auto hover:bg-green-700 transition">
                Chat With AI
              </button>
            </Link>
          </div>

          <img
            src="src/assets/robotai.png"
            alt="AI Robot"
            className="w-24 sm:w-32 lg:w-40 object-contain"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-6xl">
        {bots.map((bot) => (
          <div
            key={bot.id}
            className="bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition flex flex-col justify-between"
          >
            <Link to={`/chatting/${bot.id}`} className="block">
              <div className="flex justify-between">
                <h2 className="text-lg md:text-xl font-bold text-gray-200">
                  {bot.name}
                </h2>
                <p className="bg-[#930d9f] text-xs rounded-2xl text-white p-2 font-manrope">{bot.tag}</p>
              </div>

              <p className="text-sm text-gray-300">{bot.role}</p>
              <p className="mt-2 text-gray-400 text-sm md:text-base">
                {bot.description}
              </p>
              <div className="flex justify-center mt-4">
                <img
                  src="src/assets/robotai.png"
                  alt={bot.name}
                  className="w-32 md:w-48 object-contain"
                />
              </div>
            </Link>

            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {bot.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chatting;
