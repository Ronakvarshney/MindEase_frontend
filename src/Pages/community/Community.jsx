import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import useAuthStore from "../../../store/authStore.js";
import toast, { Toaster } from "react-hot-toast";
import { Menu } from "lucide-react"; // icon for sidebar toggle

const groups = [
  "Anxiety",
  "Depression",
  "Stress",
  "Motivation",
  "Relationships",
];

const Community = () => {
  const socket = useRef(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [socketId, setSocketId] = useState("");
  const [activeGroup, setActiveGroup] = useState(groups[0]);
  const activeGroupRef = useRef(activeGroup);
  const [sidebarOpen, setSidebarOpen] = useState(false); // for mobile toggle

  const { email } = useAuthStore();

  useEffect(() => {
    socket.current = io(import.meta.env.VITE_BACKEND_URL, {
      auth: { email },
    });

    socket.current.on("connect", () => {
      console.log("✅ Connected:", socket.current.id);
      setSocketId(socket.current.id);
      socket.current.emit("join_group", activeGroupRef.current);
    });

    socket.current.on("receive_message", ({ email, message, group }) => {
      if (group === activeGroupRef.current) {
        setChat((prev) => [...prev, { email, message }]);
      }
    });

    socket.current.on("user_joined", ({ email }) => {
      toast.success(`${email} joined ${activeGroupRef.current}`);
    });

    socket.current.on("disconnect", () => {
      console.log("❌ Disconnected");
      setSocketId("");
      setChat([]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    activeGroupRef.current = activeGroup;
    setChat([]);
    if (socket.current) {
      socket.current.emit("join_group", activeGroup);
    }
  }, [activeGroup]);

  const sendMessage = () => {
    if (socket.current && message.trim() !== "") {
      socket.current.emit("send_message", {
        email,
        message,
        group: activeGroup,
      });
      setMessage("");
    }
  };

  const changeGroup = (group) => {
    setActiveGroup(group);
    setSidebarOpen(false); // auto close sidebar on mobile
  };

  return (
    <div className="font-manrope">
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } w-64 bg-[#053d46] shadow-md border-r transition-transform duration-300 ease-in-out z-40 md:translate-x-0 md:static md:inset-0`}
        >
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-200">Groups</h2>
          </div>
          <div className="p-2 space-y-2">
            {groups.map((g, i) => (
              <div
                key={i}
                onClick={() => changeGroup(g)}
                className={`p-3 rounded-lg cursor-pointer transition ${
                  activeGroup === g
                    ? "bg-indigo-500 text-white shadow"
                    : "bg-gray-50 hover:bg-gray-200"
                }`}
              >
                {g}
              </div>
            ))}
          </div>
        </div>

        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Chat Area */}
        <div className="flex-1 bg-[#011f24] flex flex-col">
          {/* Topbar */}
          <div className="p-4 border-b bg-[#053d46] shadow-sm flex justify-between items-center">
            <div className="flex items-center space-x-3">
              {/* Sidebar Toggle on Mobile */}
              <button
                className="md:hidden text-gray-200"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={24} />
              </button>
              <h1 className="text-xl font-bold text-gray-200">
                Community Chat
              </h1>
            </div>
            <span className="text-xs md:text-sm text-gray-200 ">
              Active Group: <b className="text-indigo-300">{activeGroup}</b>
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {chat.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.email === email ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-xs shadow break-words ${
                    m.email === email
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p className="text-sm font-semibold">{m.email}</p>
                  <p>{m.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t bg-white flex items-center">
            <input
              type="text"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Message in ${activeGroup}...`}
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={sendMessage}
              className="ml-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
            >
              Send
            </button>
          </div>
        </div>

        <Toaster />
      </div>
    </div>
  );
};

export default Community;
