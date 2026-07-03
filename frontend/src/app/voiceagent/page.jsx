"use client";

import { API_URL } from "@/lib/api";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  useIsSpeaking,
  useLocalParticipant,
  useRoomContext,
  useVoiceAssistant,
} from "@livekit/components-react";
import { createLocalAudioTrack } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import {
  FaMicrophoneAlt,
  FaMicrophoneSlash,
  FaPhoneSlash,
  FaRobot,
  FaComments,
  FaUser,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const FEATURES = [
  {
    title: "Real-time Voice AI",
    desc: "Talk naturally with an AI powered by LiveKit & GPT-4o",
  },
  {
    title: "Human-like Responses",
    desc: "Get instant spoken answers about skills, projects & experience",
  },
  {
    title: "Secure & Private",
    desc: "End-to-end encrypted voice session via LiveKit cloud",
  },
];

function PublishMicOnJoin({ enabled }) {
  const room = useRoomContext();
  const audioTrackRef = useRef(null);

  useEffect(() => {
    if (!room) return;

    async function publishMic() {
      const audioTrack = await createLocalAudioTrack();
      audioTrackRef.current = audioTrack;
      await room.localParticipant.publishTrack(audioTrack);
    }

    if (enabled) {
      publishMic();
    } else if (audioTrackRef.current) {
      room.localParticipant.unpublishTrack(audioTrackRef.current);
      audioTrackRef.current.stop();
      audioTrackRef.current = null;
    }

    return () => {
      if (audioTrackRef.current) {
        room.localParticipant.unpublishTrack(audioTrackRef.current);
        audioTrackRef.current.stop();
        audioTrackRef.current = null;
      }
    };
  }, [room, enabled]);

  return null;
}

function AudioWaveform({ color = "indigo", active }) {
  return (
    <div className="flex items-end justify-center gap-[3px] h-6">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={`wave-bar wave-bar-${color} ${active ? "wave-bar-active" : ""}`}
          style={{ animationDelay: `${i * 0.12}s` }}
        />
      ))}
    </div>
  );
}

function ConnectingToSatyam() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 text-center">
      <div className="relative flex items-center justify-center w-44 h-44 mb-8">
        <span className="connect-ring connect-ring-1" />
        <span className="connect-ring connect-ring-2" />
        <span className="connect-ring connect-ring-3" />
        <div className="relative z-10 w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl ring-2 ring-amber-100">
          <img src="/logo2.png" alt="Satyam" className="w-full h-full object-cover" />
        </div>
      </div>
      <h2 className="text-xl font-semibold text-slate-900 mb-2">
        Connecting to Satyam
        <span className="connecting-dots" />
      </h2>
      <p className="text-sm text-slate-500 max-w-xs">
        Setting up your secure voice session. This may take a few seconds...
      </p>
      <div className="mt-8">
        <AudioWaveform color="amber" active />
      </div>
    </div>
  );
}

function VoiceVisualizer({ userSpeaking, assistantSpeaking, micOn }) {
  const mode = assistantSpeaking
    ? "assistant"
    : userSpeaking
      ? "user"
      : micOn
        ? "idle"
        : "muted";

  return (
    <div className="relative flex items-center justify-center w-48 h-48 sm:w-56 sm:h-56">
      {mode === "assistant" && (
        <>
          <span className="speak-ring speak-ring-assistant-1" />
          <span className="speak-ring speak-ring-assistant-2" />
          <span className="speak-ring speak-ring-assistant-3" />
        </>
      )}
      {mode === "user" && (
        <>
          <span className="speak-ring speak-ring-user-1" />
          <span className="speak-ring speak-ring-user-2" />
          <span className="speak-ring speak-ring-user-3" />
        </>
      )}
      {mode === "idle" && (
        <>
          <span className="voice-ring voice-ring-1" />
          <span className="voice-ring voice-ring-2" />
        </>
      )}

      <div
        className={`relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl transition-all duration-300 ${
          mode === "assistant"
            ? "ring-4 ring-emerald-300/60 scale-105"
            : mode === "user"
              ? "ring-4 ring-indigo-300/60"
              : "ring-2 ring-indigo-100"
        }`}
      >
        <img src="/logo2.png" alt="AI Satyam" className="w-full h-full object-cover" />
      </div>

      {mode !== "muted" && (
        <div className="absolute bottom-1 z-20 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm border border-slate-200/80">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wide">
            Live
          </span>
        </div>
      )}
    </div>
  );
}

function SpeakingIndicator({ role, label, active, color }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-300 w-full max-w-xs ${
        active
          ? color === "user"
            ? "bg-indigo-50 border-indigo-200 shadow-sm"
            : "bg-emerald-50 border-emerald-200 shadow-sm"
          : "bg-slate-50 border-slate-100 opacity-50"
      }`}
    >
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
          color === "user"
            ? "bg-indigo-100 text-indigo-600"
            : "bg-emerald-100 text-emerald-600"
        }`}
      >
        {color === "user" ? (
          <FaUser className="text-sm" />
        ) : (
          <FaRobot className="text-sm" />
        )}
      </div>
      <div className="flex-1 min-w-0 text-left">
        <p className="text-xs font-semibold text-slate-700">{label}</p>
        <p className="text-[11px] text-slate-400">
          {active ? "Speaking..." : "Silent"}
        </p>
      </div>
      <AudioWaveform color={color} active={active} />
    </div>
  );
}

function CallSession({ micOn, setMicOn, onEndCall, callDuration, formatDuration }) {
  const { state: agentState } = useVoiceAssistant();
  const { localParticipant } = useLocalParticipant();
  const userSpeaking = useIsSpeaking(localParticipant);

  const assistantSpeaking = agentState === "speaking";
  const assistantThinking = agentState === "thinking";
  const isConnecting =
    agentState === "connecting" || agentState === "initializing";

  if (isConnecting) {
    return <ConnectingToSatyam />;
  }

  const statusLabel = assistantSpeaking
    ? "Satyam is speaking"
    : assistantThinking
      ? "Satyam is thinking..."
      : userSpeaking
        ? "You're speaking"
        : !micOn
          ? "Mic Muted"
          : "Listening";

  const statusColor = assistantSpeaking
    ? "text-emerald-700 bg-emerald-50 border-emerald-200"
    : assistantThinking
      ? "text-violet-700 bg-violet-50 border-violet-200"
      : userSpeaking
        ? "text-indigo-700 bg-indigo-50 border-indigo-200"
        : !micOn
          ? "text-slate-600 bg-slate-100 border-slate-200"
          : "text-indigo-700 bg-indigo-50 border-indigo-200";

  const dotColor = assistantSpeaking
    ? "bg-emerald-500 animate-pulse"
    : assistantThinking
      ? "bg-violet-500 animate-pulse"
      : userSpeaking
        ? "bg-indigo-500 animate-pulse"
        : !micOn
          ? "bg-slate-400"
          : "bg-indigo-500";

  return (
    <>
      <RoomAudioRenderer />
      <PublishMicOnJoin enabled={micOn} />

      <div className="flex-1 flex flex-col items-center justify-between px-6 py-8">
        <div className="flex flex-col items-center gap-4 w-full">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${statusColor}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
            {statusLabel}
          </span>

          <VoiceVisualizer
            userSpeaking={userSpeaking && micOn}
            assistantSpeaking={assistantSpeaking}
            micOn={micOn}
          />

          <div className="text-center">
            <h3 className="text-lg font-semibold text-slate-900">AI Satyam</h3>
            <p className="text-sm text-slate-500 mt-0.5">
              {assistantSpeaking
                ? "Listen to my response..."
                : assistantThinking
                  ? "Processing your question..."
                  : userSpeaking
                    ? "I can hear you clearly"
                    : micOn
                      ? "Speak now — I'm listening..."
                      : "Unmute your mic to talk"}
            </p>
          </div>

          <div className="flex flex-col gap-2 w-full max-w-xs mt-2">
            <SpeakingIndicator
              role="user"
              label="You"
              active={userSpeaking && micOn}
              color="user"
            />
            <SpeakingIndicator
              role="assistant"
              label="Satyam"
              active={assistantSpeaking}
              color="assistant"
            />
          </div>
        </div>

        <div className="flex items-center gap-5 mt-6">
          <button
            onClick={() => setMicOn((v) => !v)}
            title={micOn ? "Mute microphone" : "Unmute microphone"}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md transition-all ${
              micOn
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-slate-200 hover:bg-slate-300 text-slate-600"
            }`}
          >
            {micOn ? (
              <FaMicrophoneAlt className="text-xl" />
            ) : (
              <FaMicrophoneSlash className="text-xl" />
            )}
          </button>

          <button
            onClick={onEndCall}
            title="End call"
            className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-md transition-colors"
          >
            <FaPhoneSlash className="text-xl" />
          </button>
        </div>

        <p className="text-[11px] text-slate-400 mt-4 text-center">
          {formatDuration(callDuration)} · Press red button to end call
        </p>
      </div>
    </>
  );
}

export default function VoiceAgentPage() {
  const [isInCall, setIsInCall] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [token, setToken] = useState(null);
  const [url, setUrl] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isInCall && token) {
      timerRef.current = setInterval(() => {
        setCallDuration((d) => d + 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isInCall, token]);

  const formatDuration = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const startCall = async () => {
    setConnecting(true);
    setIsInCall(true);
    setCallDuration(0);
    try {
      const res = await fetch(`${API_URL}/voicebot/?call_type=web`);
      const data = await res.json();
      setToken(data.token);
      setUrl(data.url);
      setMicOn(true);
    } catch {
      alert("Failed to connect. Please try again.");
      setIsInCall(false);
    } finally {
      setConnecting(false);
    }
  };

  const endCall = () => {
    setIsInCall(false);
    setMicOn(false);
    setToken(null);
    setUrl(null);
    setCallDuration(0);
    setConnecting(false);
    clearInterval(timerRef.current);
  };

  const showConnecting = isInCall && (connecting || !token);

  return (
    <section className="min-h-[calc(100vh-80px)] bg-slate-50 flex flex-col">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-100/40 rounded-full blur-3xl" />
      </div>

      <div className="relative flex-1 flex flex-col max-w-3xl w-full mx-auto px-4 py-6 sm:py-8">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm px-5 py-4 mb-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md shrink-0">
              <FaMicrophoneAlt className="text-white text-lg" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-semibold text-slate-900 tracking-tight">
                AI Voice Assistant
              </h1>
              <p className="text-sm text-slate-500 truncate">
                Powered by LiveKit · GPT-4o · Deepgram
              </p>
            </div>
          </div>
          {isInCall && token && !connecting && (
            <span className="text-sm font-mono text-slate-500 tabular-nums shrink-0">
              {formatDuration(callDuration)}
            </span>
          )}
        </div>

        <div className="flex-1 flex flex-col bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden min-h-[520px]">
          {!isInCall ? (
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg mb-6">
                <HiSparkles className="text-white text-3xl" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                Talk to AI Satyam
              </h2>
              <p className="text-sm text-slate-500 max-w-md leading-relaxed mb-8">
                Have a real-time voice conversation about my AI automation work,
                voice agents, WhatsApp bots, projects, and professional experience.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl mb-8">
                {FEATURES.map(({ title, desc }) => (
                  <div
                    key={title}
                    className="text-left bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3.5"
                  >
                    <h3 className="text-sm font-semibold text-slate-800 mb-1">{title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={startCall}
                disabled={connecting}
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition-colors disabled:opacity-60"
              >
                <FaMicrophoneAlt className="text-lg" />
                Start Voice Call
              </button>

              <p className="text-xs text-slate-400 mt-4">
                Allow microphone access when prompted
              </p>
            </div>
          ) : showConnecting ? (
            <ConnectingToSatyam />
          ) : (
            token &&
            url && (
              <LiveKitRoom
                token={token}
                serverUrl={url}
                connectOptions={{ autoSubscribe: true }}
                className="flex-1 flex flex-col"
              >
                <CallSession
                  micOn={micOn}
                  setMicOn={setMicOn}
                  onEndCall={endCall}
                  callDuration={callDuration}
                  formatDuration={formatDuration}
                />
              </LiveKitRoom>
            )
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-4">
          <a
            href="/chatagent"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 bg-white border border-slate-200/80 hover:border-indigo-300 hover:text-indigo-600 px-3.5 py-2 rounded-full transition-colors shadow-sm"
          >
            <FaComments className="text-indigo-500" />
            Prefer Text Chat?
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 bg-white border border-slate-200/80 hover:border-indigo-300 hover:text-indigo-600 px-3.5 py-2 rounded-full transition-colors shadow-sm"
          >
            <FaRobot className="text-indigo-500" />
            Hire for AI Automation
          </a>
        </div>
      </div>

      <style jsx>{`
        .connect-ring {
          position: absolute;
          border-radius: 50%;
          border: 2px solid rgba(245, 158, 11, 0.4);
          animation: connectPulse 2s ease-out infinite;
        }
        .connect-ring-1 { width: 100%; height: 100%; }
        .connect-ring-2 { width: 120%; height: 120%; animation-delay: 0.5s; border-color: rgba(245, 158, 11, 0.25); }
        .connect-ring-3 { width: 140%; height: 140%; animation-delay: 1s; border-color: rgba(245, 158, 11, 0.15); }

        .voice-ring {
          position: absolute;
          border-radius: 50%;
          border: 2px solid rgba(99, 102, 241, 0.3);
          animation: voicePulse 2.4s ease-out infinite;
        }
        .voice-ring-1 { width: 100%; height: 100%; }
        .voice-ring-2 { width: 115%; height: 115%; animation-delay: 0.5s; }

        .speak-ring {
          position: absolute;
          border-radius: 50%;
          animation: speakPulse 1s ease-out infinite;
        }
        .speak-ring-user-1 { width: 100%; height: 100%; border: 2px solid rgba(99, 102, 241, 0.5); }
        .speak-ring-user-2 { width: 115%; height: 115%; border: 2px solid rgba(99, 102, 241, 0.35); animation-delay: 0.2s; }
        .speak-ring-user-3 { width: 130%; height: 130%; border: 2px solid rgba(99, 102, 241, 0.2); animation-delay: 0.4s; }

        .speak-ring-assistant-1 { width: 100%; height: 100%; border: 2px solid rgba(16, 185, 129, 0.5); }
        .speak-ring-assistant-2 { width: 115%; height: 115%; border: 2px solid rgba(16, 185, 129, 0.35); animation-delay: 0.2s; }
        .speak-ring-assistant-3 { width: 130%; height: 130%; border: 2px solid rgba(16, 185, 129, 0.2); animation-delay: 0.4s; }

        .wave-bar {
          display: inline-block;
          width: 3px;
          height: 6px;
          border-radius: 2px;
          background: #cbd5e1;
          transition: background 0.2s;
        }
        .wave-bar-active {
          animation: waveAnim 0.6s ease-in-out infinite alternate;
        }
        .wave-bar-indigo.wave-bar-active { background: #6366f1; }
        .wave-bar-emerald.wave-bar-active { background: #10b981; }
        .wave-bar-amber.wave-bar-active { background: #f59e0b; }
        .wave-bar-user.wave-bar-active { background: #6366f1; }
        .wave-bar-assistant.wave-bar-active { background: #10b981; }

        .connecting-dots::after {
          content: "";
          animation: dots 1.5s steps(4, end) infinite;
        }

        @keyframes connectPulse {
          0% { transform: scale(0.9); opacity: 0.7; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        @keyframes voicePulse {
          0% { transform: scale(0.9); opacity: 0.6; }
          100% { transform: scale(1.15); opacity: 0; }
        }
        @keyframes speakPulse {
          0% { transform: scale(0.85); opacity: 0.8; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        @keyframes waveAnim {
          0% { height: 6px; }
          100% { height: 22px; }
        }
        @keyframes dots {
          0% { content: ""; }
          25% { content: "."; }
          50% { content: ".."; }
          75% { content: "..."; }
        }
      `}</style>
    </section>
  );
}
