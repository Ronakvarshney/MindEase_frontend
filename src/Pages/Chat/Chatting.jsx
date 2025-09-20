import { Link } from "react-router-dom";

const Chatting = () => {
  const bots = [
    {
      id: "1",
      name: "Captain Panda",
      role: "Mental Health Support",
      description:
        "Your tough, no-nonsense AI mentor who pushes you to take action and get results.",
      tags: ["AI mentor", "Take action", "Tough", "Get results"],
    },

    {
      id: "2",
      name: "Friend Panda",
      role: "Companionship & Emotional Support",
      description:
        "Your caring AI friend, always there to chat, share a giggle, lend an ear, and offer support, making every conversation uplifting and heartfelt.",
      tags: ["AI friend", "Uplifting", "Offer support"],
    },
    {
      id: "3",
      name: "Coach Panda",
      role: "Self-Reflection & Mindfulness",
      description:
        "Your go-to AI for fitness and wellness tips, motivating you to hit your goals and stay healthy.",
      tags: ["Coach", "Fitness", "Wellness", "Motivating"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#041e22] flex flex-col items-center p-4">
      <div className="max-w-6xl mx-auto flex text-white justify-between p-5 bg-[#0b515c] rounded-xl">
        <div className="flex flex-col max-w-4xl">
          <h1 className="text-3xl font-medium">
            Your True AI Friend to Talk To...
          </h1>
          <p>
            MindEase AI is more than just a chatbot. It’s your trusted,
            privacy-first companion. From creative brainstorming and business
            strategies to lifestyle, education, and well-being, Earkick helps
            you explore ideas and make better decisions without ever
            compromising your data.
          </p>
        </div>
        <div className="bg-slate-800 text-white font-medium p-6 rounded-lg">
          <h1>How can I help? What happened today?</h1>
          <button className="bg-green-600 p-2 rounded-md mt-2">
            Chat With AI
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-6xl">
        {bots.map((bot) => (
          <div
            key={bot.id}
            className="bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
          >
            <Link to={bot.id}>
              <h2 className="text-xl font-bold text-gray-200">{bot.name}</h2>
              <p className="text-sm text-gray-300">{bot.role}</p>
              <p className="mt-2 text-gray-400">{bot.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {bot.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chatting;
