"use client";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  useRoomContext,
} from "@livekit/components-react";
import { createLocalAudioTrack } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import { FaMicrophoneAlt, FaMicrophoneSlash } from "react-icons/fa";

// Helper component to publish mic audio to LiveKit room
function PublishMicOnJoin({ enabled }) {
  const room = useRoomContext();
  const audioTrackRef = useRef(null);

  useEffect(() => {
    if (!room) return;

    async function publishMic() {
      // Create and publish local audio track
      const audioTrack = await createLocalAudioTrack();
      audioTrackRef.current = audioTrack;
      await room.localParticipant.publishTrack(audioTrack);
    }

    if (enabled) {
      publishMic();
    } else {
      // Unpublish and stop the audio track if it exists
      if (audioTrackRef.current) {
        room.localParticipant.unpublishTrack(audioTrackRef.current);
        audioTrackRef.current.stop();
        audioTrackRef.current = null;
      }
    }

    // Cleanup on unmount
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

export default function VoiceAgentPage() {
  const [isListening, setIsListening] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [assistantSpeaking, setAssistantSpeaking] = useState(false); // NEW
  const [userSpeech, setUserSpeech] = useState("");
  const [token, setToken] = useState(null);
  const [url, setUrl] = useState(null);

  const [isBlinking, setIsBlinking] = useState(false);
  const [blinkKey, setBlinkKey] = useState(0);

  const recognitionRef = useRef(null);

  useEffect(() => {
    async function joinRoom() {
      const res = await fetch(
        "http://localhost:8000/api/voicebot/?call_type=web"
      );
      const data = await res.json();
      setToken(data.token);
      setUrl(data.url);
    }
    joinRoom();
  }, []);

  // Continuous blink loop while speaking
  useEffect(() => {
    let interval;
    if (micOn || assistantSpeaking) {
      interval = setInterval(() => {
        setBlinkKey((k) => k + 1);
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 200); // blink duration
      }, 2000); // blink every 1 second
    }
    return () => clearInterval(interval);
  }, [micOn, assistantSpeaking]);

  // Start/stop speech recognition
  const handleMicToggle = () => {
    if (!micOn) {
      if (
        "webkitSpeechRecognition" in window ||
        "SpeechRecognition" in window
      ) {
        const SpeechRecognition =
          window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.onresult = (event) => {
          const text = event.results[0][0].transcript;
          setUserSpeech(text);

          // Simulate assistant speaking back for demo
          setAssistantSpeaking(true);
          setTimeout(() => setAssistantSpeaking(false), 4000); // fake 4s response
        };
        recognitionRef.current = recognition;
        recognition.start();
        setMicOn(true);
      } else {
        alert("Speech Recognition not supported in this browser.");
      }
    } else {
      recognitionRef.current?.stop();
      setMicOn(false);
    }
  };

  // Reset everything on end
  const handleEnd = () => {
    setIsListening(false);
    setMicOn(false);
    setUserSpeech("");
    setAssistantSpeaking(false);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100">
      {!isListening ? (
        // Initial UI
        <div className="w-full max-w-2xl bg-white/80 rounded-2xl shadow-2xl p-8 flex flex-col items-center border border-indigo-100">
          <div className="flex items-center gap-3 mb-4">
            <FaMicrophoneAlt className="text-3xl text-blue-500 animate-pulse" />
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-600">
              AI Voice Assistant
            </h1>
          </div>
          <p className="text-gray-700 text-center mb-8">
            Talk to your AI assistant! Click the microphone and start speaking.
            <br />
            (Voice recognition and AI response coming soon.)
          </p>
          <button
            onClick={() => {
              setIsListening(true);
              setMicOn(true);
              setUserSpeech("");
            }}
            className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-400 to-violet-600 text-white font-bold shadow-lg hover:scale-105 transition-transform text-lg"
          >
            <FaMicrophoneAlt className="text-2xl" />
            Start Listening
          </button>
        </div>
      ) : (
        // Listening UI
        <div className="w-full max-w-4xl bg-[#1d2758] rounded-2xl shadow-2xl p-8 flex flex-col items-center relative">
          {/* Avatar */}
          <div className="flex justify-center mb-6 relative">
            {/* Outer blinking ring */}
            {isBlinking && (
              <div
                key={blinkKey + "-outer"}
                className="absolute top-1/2 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none animate-outer-blink"
                style={{
                  border: "6px solid #60a5fa", // blue-400
                  boxShadow: "0 0 32px 8px #818cf8", // indigo-400
                  zIndex: 0,
                }}
              ></div>
            )}
            {/* Avatar image */}
            <img
              src="/logo2.png"
              alt="AI Avatar"
              className={`w-32 h-32 rounded-full border-4 border-indigo-500 transition-all duration-200`}
              style={{ zIndex: 1 }}
            />
            {/* Eyelid overlay for blink effect */}
            {isBlinking && (
              <div
                key={blinkKey}
                className="absolute top-0 left-0 w-32 h-32 rounded-full overflow-hidden pointer-events-none"
                style={{ zIndex: 2 }}
              >
                <div className="w-full h-full bg-black/40 animate-blink"></div>
              </div>
            )}
          </div>

          {/* Status */}
          <p className="text-white text-xl mb-4">
            Microphone is{" "}
            {micOn ? (
              <span className="text-green-400 font-bold">On</span>
            ) : (
              <span className="text-red-400 font-bold">Off</span>
            )}
          </p>

          {/* Mic Toggle Button */}
          <button
            onClick={handleMicToggle}
            className={`mb-6 p-4 rounded-full shadow-lg transition-all duration-200 ${
              micOn
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {micOn ? (
              <FaMicrophoneAlt className="text-white text-3xl" />
            ) : (
              <FaMicrophoneSlash className="text-white text-3xl" />
            )}
          </button>

          {/* Chat area */}
          {/* <div className="bg-[#2c356f] text-white w-full rounded-lg p-4 h-40 overflow-y-auto">
            <p className="mb-2">
              <strong>You:</strong>{" "}
              {userSpeech || (
                <span className="text-gray-400">Say something...</span>
              )}
            </p>
            <p className="mb-2">
              <strong>Assistant:</strong>{" "}
              {assistantSpeaking
                ? "I'm thinking... let me answer that."
                : "Waiting for your input."}
            </p>
          </div> */}

          {/* End Conversation */}
          <button
            onClick={handleEnd}
            className="mt-6 px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300"
          >
            End Conversation
          </button>

          {/* LiveKit Room Audio Renderer & Mic Publisher */}
          {token && url && (
            <LiveKitRoom
              token={token}
              serverUrl={url}
              connectOptions={{ autoSubscribe: true }}
              className="hidden"
            >
              <RoomAudioRenderer />
              <PublishMicOnJoin enabled={micOn} />
            </LiveKitRoom>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes blink {
          0% {
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        .animate-blink {
          animation: blink 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes outer-blink {
          0% {
            opacity: 0;
            transform: scale(1);
          }
          20% {
            opacity: 1;
            transform: scale(1.13);
          }
          80% {
            opacity: 1;
            transform: scale(1.13);
          }
          100% {
            opacity: 0;
            transform: scale(1);
          }
        }
        .animate-outer-blink {
          animation: outer-blink 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </section>
  );
}
