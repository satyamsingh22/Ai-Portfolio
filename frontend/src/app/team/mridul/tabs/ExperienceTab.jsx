"use client";

import { motion } from "framer-motion";
import { FaApple, FaBriefcase, FaGooglePlay } from "react-icons/fa";
import { MRIDUL_PROFILE } from "@/lib/teamProfiles";

const ACCENTS = [
  { gradient: "from-emerald-50 via-green-50 to-teal-100", border: "border-emerald-400", text: "text-emerald-700", badge: "bg-emerald-500" },
  { gradient: "from-teal-50 via-cyan-50 to-sky-100", border: "border-teal-400", text: "text-teal-700", badge: "bg-teal-500" },
  { gradient: "from-amber-50 via-orange-50 to-yellow-100", border: "border-amber-400", text: "text-amber-700", badge: "bg-amber-500" },
];

export default function ExperienceTab() {
  const { experience } = MRIDUL_PROFILE;

  return (
    <div className="space-y-8">
      {experience.map((exp, index) => {
        const accent = ACCENTS[index % ACCENTS.length];
        return (
          <motion.div
            key={`${exp.company}-${exp.duration}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className={`flex items-start gap-5 bg-gradient-to-r ${accent.gradient} border ${accent.border} rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300`}
          >
            <div className={`w-14 h-14 shrink-0 rounded-full ${accent.badge} text-white flex items-center justify-center shadow-md`}>
              <FaBriefcase className="text-xl" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <div className={`font-bold text-xl ${accent.text}`}>{exp.company}</div>
                {exp.links?.playStore && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full bg-white/80 text-gray-700 border border-gray-200">
                    <FaGooglePlay className="text-emerald-600" /> Play Store
                  </span>
                )}
                {exp.links?.appStore && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full bg-white/80 text-gray-700 border border-gray-200">
                    <FaApple className="text-gray-700" /> App Store
                  </span>
                )}
              </div>
              <div className="text-gray-500 text-sm mb-1">
                {exp.location} · {exp.duration}
              </div>
              <div className="font-semibold text-gray-800 mb-2">{exp.role}</div>
              <ul className="list-disc list-inside text-gray-600 text-base space-y-1">
                {exp.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
