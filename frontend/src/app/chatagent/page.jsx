"use client";
import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";

export default function ChatAgentPage() {
  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: "Hi! I'm AI Satyam. You can ask me anything about myself or my experience.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((msgs) => [...msgs, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();

      setMessages((msgs) => [
        ...msgs,
        {
          sender: "assistant",
          text: data.reply || "Sorry, I couldn't understand that.",
        },
      ]);
    } catch (error) {
      setMessages((msgs) => [
        ...msgs,
        { sender: "assistant", text: "Error connecting to server. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100">
      <div
        className="w-full max-w-2xl bg-white/80 rounded-3xl shadow-2xl flex flex-col border border-indigo-100"
        style={{ height: "80vh" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-8 py-6 rounded-t-3xl bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-600 shadow-lg">
          <SiOpenai className="text-3xl text-white drop-shadow-xl animate-spin-slow" />
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide drop-shadow-lg">
            Chat with AI Satyam
          </h1>
        </div>
        {/* Chat Area */}
        <div
          className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-gradient-to-br from-blue-100 via-indigo-100 to-indigo-200 custom-scrollbar"
          style={{ minHeight: 0, maxHeight: "calc(80vh - 160px)" }} // 160px = header + input area approx
        >
          {messages.map((msg, idx) =>
            msg.sender === "user" ? (
              <div key={idx} className="flex justify-end items-end">
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-500">You</span>
                    <FaUserCircle className="text-2xl text-indigo-500 drop-shadow" />
                  </div>
                  <div className="bg-gradient-to-r from-indigo-400 to-violet-500 text-white px-5 py-3 rounded-2xl rounded-br-sm shadow-lg animate-pop-in max-w-xs break-words">
                    {msg.text}
                  </div>
                </div>
              </div>
            ) : (
              <div key={idx} className="flex justify-start items-end">
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-1">
                    <SiOpenai className="text-2xl text-blue-500 drop-shadow" />
                    <span className="text-xs text-gray-500">AI Satyam</span>
                  </div>
                  <div className="bg-white/90 border border-indigo-100 text-indigo-900 px-5 py-3 rounded-2xl rounded-bl-sm shadow-lg animate-pop-in max-w-xs break-words">
                    {msg.text}
                  </div>
                </div>
              </div>
            )
          )}
          {loading && (
            <div className="text-center text-indigo-500 text-sm">
              AI Satyam is typing...
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        {/* Input Area */}
        <form
          onSubmit={handleSend}
          className="flex items-center gap-3 px-6 py-4 bg-white/80 rounded-b-3xl border-t border-indigo-100"
        >
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-full border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-inner text-indigo-900"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-400 to-violet-600 text-white font-bold shadow-lg hover:scale-105 transition-transform"
            disabled={loading}
          >
            {loading ? "..." : "Send"}
          </button>
        </form>
      </div>
      <style jsx>{`
        .animate-pop-in {
          animation: pop-in 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes pop-in {
          0% {
            transform: scale(0.8) translateY(20px);
            opacity: 0;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
        .animate-spin-slow {
          animation: spin 2.5s linear infinite;
        }
        @keyframes spin {
          100% {
            transform: rotate(360deg);
          }
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #6366f1 #e0e7ff;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #6366f1;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #e0e7ff;
          border-radius: 8px;
        }
      `}</style>
    </section>
  );
}
