"use client";

import { motion } from "framer-motion";
import { FaCloud, FaDatabase, FaMobileAlt, FaServer, FaTools } from "react-icons/fa";
import { MRIDUL_PROFILE } from "@/lib/teamProfiles";

const CATEGORY_META = {
  Flutter: { icon: FaMobileAlt, gradient: "from-emerald-50 via-green-50 to-teal-100", border: "border-emerald-400", text: "text-emerald-700" },
  Backend: { icon: FaServer, gradient: "from-blue-50 via-sky-50 to-blue-100", border: "border-blue-400", text: "text-blue-700" },
  Databases: { icon: FaDatabase, gradient: "from-indigo-50 via-violet-50 to-indigo-100", border: "border-indigo-400", text: "text-indigo-700" },
  "Deployment & Cloud": { icon: FaCloud, gradient: "from-cyan-50 via-sky-50 to-cyan-100", border: "border-cyan-400", text: "text-cyan-700" },
  Tools: { icon: FaTools, gradient: "from-amber-50 via-yellow-50 to-amber-100", border: "border-amber-400", text: "text-amber-700" },
};

export default function SkillsTab() {
  const { skills } = MRIDUL_PROFILE;

  return (
    <div className="space-y-6">
      {Object.entries(skills).map(([category, items], idx) => {
        const meta = CATEGORY_META[category] || CATEGORY_META.Tools;
        const Icon = meta.icon;
        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-gradient-to-r ${meta.gradient} ${meta.border} border rounded-lg p-5 shadow-lg hover:shadow-xl transition-shadow duration-300`}
          >
            <div className="flex items-center gap-3 mb-3">
              <Icon className={`text-2xl ${meta.text}`} />
              <div className={`font-bold text-lg ${meta.text}`}>{category}</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <span
                  key={skill}
                  className="text-sm font-medium px-3 py-1.5 rounded-lg bg-white/90 text-gray-700 border border-white shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
