"use client";

import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";
import { MRIDUL_PROFILE } from "@/lib/teamProfiles";

const ACCENTS = [
  { bg: "bg-blue-50", border: "border-blue-200", icon: "text-blue-600", detail: "text-blue-600" },
  { bg: "bg-emerald-50", border: "border-emerald-200", icon: "text-emerald-600", detail: "text-emerald-600" },
  { bg: "bg-violet-50", border: "border-violet-200", icon: "text-violet-600", detail: "text-violet-600" },
];

export default function EducationTab() {
  const { education } = MRIDUL_PROFILE;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      {education.map((item, idx) => {
        const accent = ACCENTS[idx % ACCENTS.length];
        return (
          <motion.div
            key={item.degree}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.12 }}
            whileHover={{ y: -8 }}
            className="flex flex-col items-center text-center bg-white rounded-2xl border border-gray-200 shadow-md p-6
                       transition-shadow hover:shadow-xl duration-300"
          >
            <div className={`mb-4 flex items-center justify-center w-20 h-20 rounded-full ${accent.bg} border ${accent.border}`}>
              <FaGraduationCap className={`text-3xl ${accent.icon}`} />
            </div>
            <div className={`text-sm font-semibold mb-2 ${accent.detail}`}>{item.year}</div>
            <div className="text-lg font-bold text-gray-800 mb-1 leading-snug">{item.degree}</div>
            <div className="text-gray-500 text-sm mb-2">{item.school}</div>
            <div className={`text-sm font-semibold ${accent.detail}`}>{item.detail}</div>
          </motion.div>
        );
      })}
    </div>
  );
}
