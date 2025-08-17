"use client";
import { useEffect, useRef, useState } from "react";
import { FaUserCircle, FaPaperPlane, FaRobot } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";
import { IoMdSend } from "react-icons/io";
import { RiLoader4Fill } from "react-icons/ri";

export default function ChatAgentPage() {
  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: "Namaste! I'm AI Satyam. Ask me anything about my skills, projects, or experiences.",
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
          text: data.reply || "I'm not sure how to respond to that.",
        },
      ]);
    } catch (error) {
      setMessages((msgs) => [
        ...msgs,
        { sender: "assistant", text: "Connection error. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-900">
      {/* Floating particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-indigo-500/20"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 20 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-3xl bg-gray-800 rounded-2xl shadow-2xl flex flex-col border border-indigo-400/30 overflow-hidden z-10" style={{ height: "85vh" }}>
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-20 blur-lg"></div>
        
        {/* Header */}
        <div className="relative px-6 py-5 rounded-t-2xl bg-gradient-to-r from-gray-800 to-gray-900 border-b border-indigo-400/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <FaRobot className="text-3xl text-indigo-400" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-800 animate-pulse"></div>
            </div>
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
              AI Satyam
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-indigo-300/80">Live</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Chat Area */}
        <div
          className="flex-1 overflow-y-auto px-6 py-6 space-y-6 bg-gradient-to-b from-gray-800/90 to-gray-900/90 custom-scrollbar"
          style={{ minHeight: 0, maxHeight: "calc(85vh - 140px)" }}
        >
          {messages.map((msg, idx) =>
            msg.sender === "user" ? (
              <div key={idx} className="flex justify-end">
                <div className="flex flex-col items-end max-w-[85%]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-indigo-300/70">You</span>
                    <FaUserCircle className="text-xl text-indigo-400" />
                  </div>
                  <div className="relative">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-4 py-3 rounded-xl rounded-br-none shadow-lg max-w-full break-words">
                      {msg.text}
                    </div>
                    <div className="absolute -bottom-3 right-0 w-4 h-4 overflow-hidden">
                      <div className="w-4 h-4 bg-indigo-600 rounded-br-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div key={idx} className="flex justify-start">
                <div className="flex flex-col items-start max-w-[85%]">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="relative">
                      <FaRobot className="text-xl text-indigo-400" />
                    </div>
                    <span className="text-xs text-indigo-300/70">
                      {loading && idx === messages.length - 1
                        ? "AI is thinking..."
                        : "AI Satyam"}
                    </span>
                  </div>
                  <div className="relative">
                    <div className="bg-gray-700/80 text-gray-100 px-4 py-3 rounded-xl rounded-bl-none shadow-lg max-w-full break-words">
                      {msg.text}
                    </div>
                    <div className="absolute -bottom-3 left-0 w-4 h-4 overflow-hidden">
                      <div className="w-4 h-4 bg-gray-700/80 rounded-bl-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-700/80 px-4 py-3 rounded-xl rounded-bl-none">
                <RiLoader4Fill className="text-indigo-400 animate-spin text-xl" />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <form
          onSubmit={handleSend}
          className="relative px-6 py-4 bg-gray-800/80 border-t border-indigo-400/20"
        >
          <div className="relative flex items-center">
            <input
              type="text"
              className="flex-1 px-5 py-3 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 bg-gray-700/90 text-gray-100 placeholder-gray-400 pr-12 shadow-lg"
              placeholder="Message AI Satyam..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:scale-110 transition-transform disabled:opacity-50"
            >
              {loading ? (
                <RiLoader4Fill className="animate-spin" />
              ) : (
                <IoMdSend className="text-lg" />
              )}
            </button>
          </div>
          <div className="mt-2 text-xs text-center text-gray-500">
            AI Satyam may produce inaccurate information about people, places, or facts.
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-100px) translateX(20px);
          }
          100% {
            transform: translateY(-200px) translateX(0);
          }
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #6366f1 #2d3748;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #6366f1;
          border-radius: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #2d3748;
          border-radius: 6px;
        }
      `}</style>
    </section>
  );
}