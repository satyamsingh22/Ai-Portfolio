"use client";

import { motion } from "framer-motion";
import {
  FaMoneyBillWave,
  FaProjectDiagram,
  FaRobot,
  FaShoppingCart,
  FaUsersCog,
} from "react-icons/fa";
import { MRIDUL_PROFILE } from "@/lib/teamProfiles";

const ICONS = {
  Splitr: <FaMoneyBillWave className="text-3xl text-violet-600" />,
  HRMS: <FaUsersCog className="text-3xl text-blue-600" />,
  "E-Commerce Platform": <FaShoppingCart className="text-3xl text-rose-600" />,
  "AI Bot": <FaRobot className="text-3xl text-cyan-600" />,
};

const ACCENTS = [
  { gradient: "from-violet-50 via-purple-50 to-fuchsia-100", border: "border-violet-400" },
  { gradient: "from-blue-50 via-sky-50 to-indigo-100", border: "border-blue-400" },
  { gradient: "from-rose-50 via-pink-50 to-red-100", border: "border-rose-400" },
  { gradient: "from-cyan-50 via-sky-50 to-blue-100", border: "border-cyan-400" },
];

export default function ProjectsTab() {
  const { projects } = MRIDUL_PROFILE;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-2">
        <FaProjectDiagram className="text-2xl text-emerald-600" />
        <div>
          <h3 className="text-xl font-bold text-gray-900">Personal & Independent Builds</h3>
          <p className="text-gray-600 text-sm">
            Full-stack projects spanning fintech, HR tooling, e-commerce, and AI automation.
          </p>
        </div>
      </div>

      {projects.map((project, index) => {
        const accent = ACCENTS[index % ACCENTS.length];
        return (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className={`bg-gradient-to-r ${accent.gradient} ${accent.border} border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow`}
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                {ICONS[project.name] || <FaProjectDiagram className="text-3xl text-gray-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h4 className="font-bold text-xl text-gray-900">{project.name}</h4>
                  <span className="text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded-full bg-white/80 text-gray-700 border border-gray-200">
                    {project.duration}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{project.subtitle}</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                  {project.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-3 py-1 rounded-full bg-white/90 text-gray-700 border border-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
