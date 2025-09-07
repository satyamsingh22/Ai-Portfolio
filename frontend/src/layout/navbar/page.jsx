"use client";

import { useState } from "react";
import {
  FaBars,
  FaComments,
  FaEnvelope,
  FaMicrophoneAlt,
  FaRobot,
  FaTimes,
} from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-gradient-to-b from-blue-50 via-indigo-50 to-indigo-100 shadow-xl relative z-20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left Logo */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-tr from-blue-400 via-indigo-400 to-violet-600 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
          <a
            href="/"
            className="relative bg-gradient-to-r from-blue-400 to-violet-500 text-white text-3xl font-bold rounded-full w-14 h-14 flex justify-center items-center shadow-lg border-4 border-white select-none cursor-pointer"
          >
            SS
          </a>
        </div>

        {/* Desktop Tabs */}
        <ul className="hidden md:flex gap-8 bg-white/60 backdrop-blur-md rounded-full px-10 py-2 shadow-md border border-indigo-100">
          <li className="relative group">
            <a
              href="/"
              className="font-semibold text-indigo-700 hover:text-violet-600 transition-colors duration-200 flex items-center"
            >
              <FaRobot className="inline mr-2 text-blue-400" />
              Home
            </a>
            <span className="absolute left-0 -bottom-1 w-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-600 rounded-full transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className="relative group">
            <a
              href="/about"
              className="font-semibold text-indigo-700 hover:text-violet-600 transition-colors duration-200 flex items-center"
            >
              <FaMicrophoneAlt className="inline mr-2 text-indigo-400" />
              About
            </a>
            <span className="absolute left-0 -bottom-1 w-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-600 rounded-full transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className="relative group">
            <a
              href="/contact"
              className="font-semibold text-indigo-700 hover:text-violet-600 transition-colors duration-200"
            >
              Contact
            </a>
            <span className="absolute left-0 -bottom-1 w-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-600 rounded-full transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className="relative group">
            <a
              href="/blog"
              className="font-semibold text-indigo-700 hover:text-violet-600 transition-colors duration-200 flex items-center"
            >
              <FaComments className="inline mr-2 text-violet-500" />
              Blog
            </a>
            <span className="absolute left-0 -bottom-1 w-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-600 rounded-full transition-all duration-300 group-hover:w-full"></span>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-indigo-700 text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 shadow-lg border-t border-indigo-100 z-30 animate-fade-in">
          <ul className="flex flex-col gap-2 py-4 px-6">
            <li>
              <a
                href="/"
                className="flex items-center gap-2 py-2 font-semibold text-indigo-700 hover:text-violet-600"
                onClick={() => setMenuOpen(false)}
              >
                <FaRobot className="text-blue-400" />
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="flex items-center gap-2 py-2 font-semibold text-indigo-700 hover:text-violet-600"
                onClick={() => setMenuOpen(false)}
              >
                <FaMicrophoneAlt className="text-indigo-400" />
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="flex items-center gap-2 py-2 font-semibold text-indigo-700 hover:text-violet-600"
                onClick={() => setMenuOpen(false)}
              >
                <FaEnvelope className="text-pink-400" />{" "}
                {/* Contact icon added */}
                Contact
              </a>
            </li>
            <li>
              <a
                href="/blog"
                className="flex items-center gap-2 py-2 font-semibold text-indigo-700 hover:text-violet-600"
                onClick={() => setMenuOpen(false)}
              >
                <FaComments className="text-violet-500" />
                Blog
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* Gradient Divider */}
      <hr className="w-full h-1 border-none mt-4 bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-600 animate-gradient-x" />
    </nav>
  );
}
