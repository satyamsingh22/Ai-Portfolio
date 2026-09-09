"use client";

import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaCode,
  FaGraduationCap,
  FaProjectDiagram,
  FaTrophy,
} from "react-icons/fa";
import { MRIDUL_PROFILE } from "@/lib/teamProfiles";

const OVERVIEW = [
  {
    key: "experience",
    title: "Experience",
    icon: FaBriefcase,
    accent: { badge: "bg-emerald-600", ring: "ring-emerald-200", text: "text-emerald-700", gradient: "from-emerald-50 to-teal-100", border: "border-emerald-200", button: "bg-emerald-600 hover:bg-emerald-700" },
    preview:
      "Flutter Developer → Full-Stack Developer at Abhiman Innovations — built PollPe from scratch, now serving 5M+ users on Android & iOS.",
  },
  {
    key: "projects",
    title: "Projects",
    icon: FaProjectDiagram,
    accent: { badge: "bg-violet-600", ring: "ring-violet-200", text: "text-violet-700", gradient: "from-violet-50 to-fuchsia-100", border: "border-violet-200", button: "bg-violet-600 hover:bg-violet-700" },
    preview:
      "Splitr, HRMS, an E-Commerce backend, and an AI WhatsApp/Telegram bot — full-stack builds across Flutter, Django, and Node.js.",
  },
  {
    key: "education",
    title: "Education",
    icon: FaGraduationCap,
    accent: { badge: "bg-blue-600", ring: "ring-blue-200", text: "text-blue-700", gradient: "from-blue-50 to-indigo-100", border: "border-blue-200", button: "bg-blue-600 hover:bg-blue-700" },
    preview: "B.Tech in Computer Science, Rajkiya Engineering College, Sonbhadra — SGPA 7.95.",
  },
  {
    key: "achievements",
    title: "Achievements",
    icon: FaTrophy,
    accent: { badge: "bg-amber-500", ring: "ring-amber-200", text: "text-amber-700", gradient: "from-amber-50 to-yellow-100", border: "border-amber-200", button: "bg-amber-500 hover:bg-amber-600" },
    preview: "GATE 2024 qualified, Android Lead at GDSC, App Developer Certificate from Sonbhadra Police.",
  },
];

const SKILL_PREVIEW = ["Flutter", "Dart", "BLoC", "Node.js", "PostgreSQL", "Docker"];

export default function OverviewTab({ onReadMore }) {
  const m = MRIDUL_PROFILE;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {OVERVIEW.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.12, duration: 0.55 }}
            whileHover={{ scale: 1.03, y: -4 }}
            className={`flex flex-col items-center text-center bg-gradient-to-br ${item.accent.gradient}
                       border ${item.accent.border} rounded-2xl p-6 shadow-md
                       hover:shadow-xl transition-shadow`}
          >
            <span className={`w-14 h-14 rounded-2xl ${item.accent.badge} text-white flex items-center justify-center text-2xl shadow-lg ring-4 ${item.accent.ring} mb-4`}>
              <Icon />
            </span>
            <div className={`font-bold ${item.accent.text} text-xl mb-2`}>{item.title}</div>
            <div className="text-gray-600 text-sm leading-relaxed mb-5">{item.preview}</div>
            <motion.button
              whileTap={{ scale: 0.92 }}
              className={`mt-auto px-5 py-2 rounded-full text-white font-semibold text-sm shadow-md transition ${item.accent.button}`}
              onClick={() => onReadMore(item.key)}
            >
              Read More →
            </motion.button>
          </motion.div>
        );
      })}

      {/* Skills preview card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.55 }}
        whileHover={{ scale: 1.01 }}
        className="flex flex-col items-center bg-gradient-to-br from-slate-50 to-cyan-100/60
                   border border-cyan-200 rounded-2xl p-6 shadow-md
                   hover:shadow-xl transition-shadow md:col-span-2"
      >
        <span className="w-14 h-14 rounded-2xl bg-cyan-600 text-white flex items-center justify-center text-2xl shadow-lg ring-4 ring-cyan-200 mb-4">
          <FaCode />
        </span>
        <div className="font-bold text-cyan-800 text-xl mb-4">Skills</div>
        <div className="flex flex-wrap justify-center gap-3 w-full mb-4">
          {SKILL_PREVIEW.map((skill, idx) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.65 + idx * 0.07 }}
              whileHover={{ scale: 1.1, y: -2 }}
              className="bg-white border border-cyan-200 rounded-lg px-4 py-2 shadow-sm hover:shadow-md text-gray-800 font-medium text-sm"
            >
              {skill}
            </motion.div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mb-3">
          Plus {m.skills.Flutter.length + m.skills.Backend.length - SKILL_PREVIEW.length}+ more across
          mobile, backend, and deployment.
        </p>
        <motion.button
          whileTap={{ scale: 0.92 }}
          className="mt-auto px-5 py-2 rounded-full bg-cyan-600 text-white
                     font-semibold text-sm shadow-md hover:bg-cyan-700 transition"
          onClick={() => onReadMore("skills")}
        >
          Full View →
        </motion.button>
      </motion.div>
    </div>
  );
}
