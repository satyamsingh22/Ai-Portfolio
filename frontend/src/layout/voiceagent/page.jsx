"use client";

import { useRef, useState } from "react";
import { FaMicrophoneAlt, FaMicrophoneSlash } from "react-icons/fa";

export default function VoiceAgentPage() {
  const [micOn, setMicOn] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  // Start or stop speech recognition
  const handleMicToggle = () => {
    if (!micOn) {
      // Start listening
      if (
        "webkitSpeechRecognition" in window ||
        "SpeechRecognition" in window
      ) {
        const SpeechRecognition =
          window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = true;
        recognition.continuous = true;

        recognition.onresult = (event) => {
          let interimTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            interimTranscript += event.results[i][0].transcript;
          }
          setTranscript(interimTranscript);
        };

        recognition.onend = () => {
          setMicOn(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
        setMicOn(true);
      } else {
        alert("Speech Recognition is not supported in this browser.");
      }
    } else {
      // Stop listening
      recognitionRef.current && recognitionRef.current.stop();
      setMicOn(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100">
      <div className="w-full max-w-2xl bg-white/80 rounded-2xl shadow-2xl p-8 flex flex-col items-center border border-indigo-100">
        <div className="flex items-center gap-3 mb-4">
          {micOn ? (
            <FaMicrophoneAlt className="text-3xl text-green-500 animate-pulse" />
          ) : (
            <FaMicrophoneSlash className="text-3xl text-red-500 animate-pulse" />
          )}
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-600">
            AI Voice Assistant
          </h1>
        </div>
        <p className="text-gray-700 text-center mb-8">
          {micOn
            ? "Listening... Speak now to interact with AI Satyam!"
            : "Talk to your AI assistant! Click the microphone to start speaking."}
          <br />
          (Voice recognition and AI response coming soon.)
        </p>
        <div className="w-full min-h-[60px] bg-gradient-to-br from-blue-100 via-indigo-100 to-indigo-200 rounded-lg p-4 mb-6 text-indigo-900 text-lg shadow-inner border border-indigo-100">
          {transcript || (
            <span className="text-gray-400">
              Your speech will appear here...
            </span>
          )}
        </div>
        <button
          className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform text-lg ${
            micOn
              ? "bg-gradient-to-r from-green-400 to-blue-600 text-white"
              : "bg-gradient-to-r from-blue-400 to-violet-600 text-white"
          }`}
          onClick={handleMicToggle}
        >
          {micOn ? (
            <>
              <FaMicrophoneSlash className="text-2xl" />
              Stop Listening
            </>
          ) : (
            <>
              <FaMicrophoneAlt className="text-2xl" />
              Start Listening
            </>
          )}
        </button>
      </div>
    </section>
  );
}
