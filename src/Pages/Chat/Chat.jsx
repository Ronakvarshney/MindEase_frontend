import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Chat = () => {
  const [messages, Setmessages] = useState([]);
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const generateChat = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/generate-chat",
        { input: input },
        { withCredentials: true }
      );
      const data = response.data.resp;
      const cleanedData = data.replace(/```json\n|\n```/g, "").trim();
      const dataextracted = JSON.parse(cleanedData);
      setAnswer(dataextracted);
    } catch (error) {
      toast.error("You are Unauthorized! Please Login");
      console.error("Error fetching chat:", error.message);
      setAnswer("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full min-h-screen bg-[#041e22] py-10">
      <main className="w-full max-w-4xl bg-[#083a42]  mx-auto rounded-2xl shadow-lg flex flex-col overflow-hidden h-[80vh]">
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
              ME
            </div>
            <div>
              <h4 className="text-md font-medium text-gray-200">MindEase — Support Chat</h4>
              <p className="text-xs text-gray-300">
                Healthy, empathetic responses — mental health only
              </p>
            </div>
          </div>
        </header>

        <div
          className="flex-1 p-6 overflow-auto"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(99,102,241,0.03) 0%, transparent 60%)",
          }}
        >
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {messages?.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.who === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${
                    m.who === "user"
                      ? "bg-indigo-600 text-white rounded-tr-2xl rounded-bl-2xl rounded-tl-lg"
                      : "bg-gray-100 text-gray-800 rounded-tl-2xl rounded-br-2xl rounded-tr-lg"
                  } p-4 max-w-[75%]`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {m.text}
                  </p>
                  <div className="mt-2 text-[11px] text-gray-400 text-right">
                    {m.time}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing placeholder */}
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
              <p className="text-xs ml-2">MindEase is typing...</p>
            </div>
          </div>
        </div>

        {/* Input area */}
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 000 2.828l3.414 3.414L21 10.828V7h-5.828z"
                />
              </svg>
            </button>

            <input
            type="text"

              placeholder="Type a message... (UI-only)"
              className="flex-1 rounded-2xl border text-white border-gray-200 px-4 py-3 focus:outline-none bg-[#041e22] text-sm"
            />

            <button className="bg-indigo-600 text-white px-4 py-2 rounded-2xl text-sm font-medium">
              Send
            </button>
          </div>
        </div>
        <ToastContainer />
      </main>
    </div>
  );
};

export default Chat;
