"use client";

import { API_URL } from "@/lib/api";
import { agentQuery, resolveAgentProfile } from "@/lib/agentProfiles";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  FaMicrophoneAlt,
  FaRobot,
  FaWhatsapp,
  FaRegCopy,
  FaCheck,
} from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { HiSparkles } from "react-icons/hi2";

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      <span className="chat-typing-dot" />
      <span className="chat-typing-dot animation-delay-150" />
      <span className="chat-typing-dot animation-delay-300" />
    </div>
  );
}

function MessageBubble({ message, isUser, isLoading, assistantLabel }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isUser) {
    return (
      <div className="flex justify-end group">
        <div className="max-w-[78%] sm:max-w-[72%]">
          <div className="bg-indigo-600 text-white px-4 py-3 rounded-2xl rounded-br-md shadow-sm text-[15px] leading-relaxed">
            {message.text}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 group">
      <div className="shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-sm mt-0.5">
        <FaRobot className="text-white text-sm" />
      </div>
      <div className="flex-1 min-w-0 max-w-[85%]">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-semibold text-slate-700">{assistantLabel}</span>
          {isLoading && (
            <span className="text-xs text-slate-400">typing...</span>
          )}
        </div>
        <div className="relative bg-white border border-slate-200/80 px-4 py-3 rounded-2xl rounded-tl-md shadow-sm text-[15px] leading-relaxed text-slate-700">
          {isLoading ? <TypingIndicator /> : message.text}
          {!isLoading && (
            <button
              onClick={handleCopy}
              className="absolute -bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-500"
              title="Copy message"
            >
              {copied ? (
                <FaCheck className="text-xs text-green-600" />
              ) : (
                <FaRegCopy className="text-xs" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ChatAgentInner() {
  const searchParams = useSearchParams();
  const agent = useMemo(
    () => resolveAgentProfile(searchParams.get("profile")),
    [searchParams]
  );
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    setMessages([]);
    setInput("");
  }, [agent.key]);

  const sendMessage = async (text) => {
    const userMessage = text.trim();
    if (!userMessage || loading) return;

    setMessages((msgs) => [...msgs, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/chat/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, profile: agent.key }),
      });
      const data = await res.json();

      setMessages((msgs) => [
        ...msgs,
        {
          sender: "assistant",
          text: data.reply || "I'm not sure how to respond to that.",
        },
      ]);
    } catch {
      setMessages((msgs) => [
        ...msgs,
        {
          sender: "assistant",
          text: "Connection error. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const showWelcome = messages.length === 0 && !loading;

  return (
    <section className="min-h-[calc(100vh-80px)] bg-slate-50 flex flex-col">
      {/* Subtle background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-100/40 rounded-full blur-3xl" />
      </div>

      <div className="relative flex-1 flex flex-col max-w-4xl w-full mx-auto px-4 py-6 sm:py-8">
        {/* Header card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm px-5 py-4 mb-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="relative shrink-0">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md">
                <HiSparkles className="text-white text-lg" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-semibold text-slate-900 tracking-tight">
                {agent.assistantLabel}
              </h1>
              <p className="text-sm text-slate-500 truncate">
                {agent.role}
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Online
            </span>
          </div>
        </div>

        {/* Chat window */}
        <div className="flex-1 flex flex-col bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden min-h-[520px] max-h-[calc(100vh-280px)]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6 chat-scrollbar">
            {showWelcome ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg mb-5">
                  <FaRobot className="text-white text-2xl" />
                </div>
                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                  How can I help you today?
                </h2>
                <p className="text-sm text-slate-500 max-w-md leading-relaxed mb-8">
                  {agent.welcome}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-lg">
                  {agent.suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => sendMessage(suggestion)}
                      className="text-left text-sm text-slate-600 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-slate-200/80 px-4 py-3 rounded-xl transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, idx) => (
                  <MessageBubble
                    key={idx}
                    message={msg}
                    isUser={msg.sender === "user"}
                    isLoading={false}
                    assistantLabel={agent.assistantLabel}
                  />
                ))}
                {loading && (
                  <MessageBubble
                    message={{ text: "" }}
                    isUser={false}
                    isLoading
                    assistantLabel={agent.assistantLabel}
                  />
                )}
              </>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-slate-100 bg-slate-50/50 px-4 sm:px-5 py-4">
            <form onSubmit={handleSend} className="relative">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={agent.chatPlaceholder}
                disabled={loading}
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-14 text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 shadow-sm disabled:opacity-60 transition-all"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="absolute right-2 bottom-2 p-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              >
                <IoMdSend className="text-lg" />
              </button>
            </form>
            <p className="text-[11px] text-slate-400 text-center mt-2.5">
              {agent.chatDisclaimer}
            </p>
          </div>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          <a
            href={`/voiceagent${agentQuery(agent.key)}`}
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 bg-white border border-slate-200/80 hover:border-indigo-300 hover:text-indigo-600 px-3.5 py-2 rounded-full transition-colors shadow-sm"
          >
            <FaMicrophoneAlt className="text-indigo-500" />
            Try Voice Agent
          </a>
          <a
            href={agent.hireHref}
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 bg-white border border-slate-200/80 hover:border-indigo-300 hover:text-indigo-600 px-3.5 py-2 rounded-full transition-colors shadow-sm"
          >
            <FaWhatsapp className="text-emerald-500" />
            {agent.hireLabel}
          </a>
        </div>
      </div>

      <style jsx>{`
        .chat-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }
        .chat-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .chat-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 999px;
        }
        .chat-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-typing-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #94a3b8;
          animation: typingBounce 1.2s infinite ease-in-out;
        }
        .animation-delay-150 {
          animation-delay: 0.15s;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        @keyframes typingBounce {
          0%,
          60%,
          100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}

export default function ChatAgentPage() {
  return (
    <Suspense
      fallback={
        <section className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center text-slate-500">
          Loading chat...
        </section>
      }
    >
      <ChatAgentInner />
    </Suspense>
  );
}
