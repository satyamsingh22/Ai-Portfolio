"use client";

import { motion } from "framer-motion";
import { FaTrophy, FaUsers } from "react-icons/fa";
import { MRIDUL_PROFILE } from "@/lib/teamProfiles";

export default function AchievementsTab() {
  const { achievements, codingProfiles } = MRIDUL_PROFILE;

  return (
    <div className="space-y-6">
      {achievements.map((ach, idx) => (
        <motion.div
          key={ach}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          whileHover={{ scale: 1.01 }}
          className="flex items-start bg-emerald-50 border-l-4 border-emerald-400 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <FaTrophy className="text-2xl text-emerald-600 mr-4 mt-1 shrink-0" />
          <div className="font-bold text-emerald-800 text-lg">{ach}</div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: achievements.length * 0.1 }}
        className="flex items-center gap-2 text-gray-600 pt-2"
      >
        <FaUsers className="text-gray-400" />
        <span className="text-sm">Coding profiles: {codingProfiles.join(" · ")}</span>
      </motion.div>
    </div>
  );
}
