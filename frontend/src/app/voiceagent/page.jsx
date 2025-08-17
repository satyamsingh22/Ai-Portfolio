"use client";
import { useRef, useState } from "react";
import { FaMicrophoneAlt, FaMicrophoneSlash } from "react-icons/fa";

export default function VoiceAgentPage() {
  const [isListening, setIsListening] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [userSpeech, setUserSpeech] = useState(""); // <-- NEW: store what user says
  const recognitionRef = useRef(null);

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
          setUserSpeech(text); // <-- set what user said
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
          <div className="flex justify-center mb-6">
            <img
              src="/robot-avatar.png"
              alt="AI Avatar"
              className="w-32 h-32 rounded-full border-4 border-indigo-500"
            />
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
          <div className="bg-[#2c356f] text-white w-full rounded-lg p-4 h-40 overflow-y-auto">
            <p className="mb-2">
              <strong>You:</strong>{" "}
              {userSpeech || (
                <span className="text-gray-400">Say something...</span>
              )}
            </p>
            <p className="mb-2">
              <strong>Satyam Singh:</strong> Hi, I'm a Senior Software Engineer
              at Kipps AI. Are you looking to collaborate on a...
            </p>
          </div>

          {/* End Conversation */}
          <button
            onClick={handleEnd}
            className="mt-6 px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300"
          >
            End Conversation
          </button>
        </div>
      )}
    </section>
  );
}
