"use client";

import { useState } from "react";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMicrophoneAlt,
  FaPaperPlane,
  FaPhone,
  FaRobot,
  FaUser,
} from "react-icons/fa";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100  pb-12">
      {/* Banner Section */}
      <div
        className="w-full min-h-[180px] md:min-h-[280px] flex items-center justify-center shadow-lg mb-10 rounded-b-3xl relative overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-2 py-6 md:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg tracking-wide mb-2 md:mb-3 text-center">
            Get In Touch
          </h1>
          <p className="text-white text-center text-sm sm:text-base md:text-lg font-medium max-w-lg md:max-w-xl drop-shadow mb-2">
            Have an idea, project, or just want to connect?{" "}
            <br className="hidden md:block" />I love collaborating on innovative
            tech, AI, and web solutions. <br />
            Reach out for freelance work, partnerships, or a friendly chat about
            software and AI!
          </p>
          <span className="inline-block mt-2 px-4 py-1 rounded-full bg-indigo-600/80 text-white font-semibold text-xs md:text-sm shadow text-center whitespace-normal">
            Senior Developer | Generative AI | Open for Collaboration
          </span>
        </div>
      </div>

      {/* Main Content - Grid Layout */}
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10">
        {/* Left Side - Profile Section */}
        <div className="bg-gradient-to-br from-indigo-100 via-blue-100 to-yellow-400 rounded-3xl shadow-2xl p-8 border border-indigo-100 backdrop-blur-md flex flex-col items-center text-center">
          <img
            src="/imag1.png"
            alt="Satyam Singh"
            className="w-32 h-32 rounded-full object-cover shadow-lg mb-4 border-4 border-indigo-200"
          />
          <h2 className="text-2xl font-bold text-indigo-700 mb-2">
            Satyam Singh
          </h2>
          <p className="text-gray-700 mb-4">
            Senior Software Developer | Django & MERN | Generative AI Enthusiast
          </p>
          <p className="text-gray-600 mb-6">
            Passionate about building scalable, intelligent, and
            high-performance applications. <br />
            <span className="font-semibold text-indigo-700">
              Let’s connect for projects, collaborations, or just a tech chat!
            </span>
          </p>

          {/* Contact Info */}
          <div className="flex flex-col gap-2 items-center mb-4">
            <div className="flex items-center gap-2 text-indigo-700">
              <FaPhone className="text-lg" />
              <span>+91 8957820454</span>
            </div>
            <div className="flex items-center gap-2 text-indigo-700">
              <FaEnvelope className="text-lg" />
              <span>satyamsinghss2203@gmail.com</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mb-4">
            <a
              href="https://linkedin.com/in/satyam-singh-bb1751259"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-700 hover:text-blue-600 text-2xl"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/satyamsingh22"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-700 hover:text-gray-800 text-2xl"
            >
              <FaGithub />
            </a>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2 w-full items-center">
            <a
              href="/chatagent"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-400 to-violet-600 text-white font-semibold shadow hover:scale-105 transition-transform"
            >
              <FaRobot className="text-lg" />
              Chat with AI Satyam
            </a>
            <a
              href="/voiceagent"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-400 to-blue-600 text-white font-semibold shadow hover:scale-105 transition-transform"
            >
              <FaMicrophoneAlt className="text-lg" />
              Voice Agent
            </a>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="bg-white/90 rounded-3xl shadow-2xl p-8 border border-indigo-100 backdrop-blur-md">
          <p className="text-lg text-gray-700 mb-8 text-center">
            Have a question, project, or just want to say hi? Fill out the form
            below and I'll get back to you soon!
          </p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-xl" />
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-indigo-200 focus:border-violet-400 focus:ring-2 focus:ring-indigo-100 bg-white/80 text-gray-900 font-semibold shadow transition-all duration-300"
              />
            </div>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-xl" />
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-indigo-200 focus:border-violet-400 focus:ring-2 focus:ring-indigo-100 bg-white/80 text-gray-900 font-semibold shadow transition-all duration-300"
              />
            </div>
            <div className="relative">
              <FaPaperPlane className="absolute left-4 top-4 text-indigo-400 text-xl" />
              <textarea
                name="message"
                required
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={5}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-indigo-200 focus:border-violet-400 focus:ring-2 focus:ring-indigo-100 bg-white/80 text-gray-900 font-semibold shadow transition-all duration-300 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-400 to-violet-600 text-white shadow-lg hover:scale-105 transition-transform"
            >
              Send Message
            </button>
          </form>
          {submitted && (
            <div className="mt-6 text-center text-green-600 font-semibold animate-fade-in">
              Thank you! Your message has been sent.
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s ease;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
