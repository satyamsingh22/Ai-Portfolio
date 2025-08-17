"use client";
import { motion } from "framer-motion";

const TABS = [
  { label: "Overview", key: "overview" },
  { label: "Experience", key: "experience" },
  { label: "Education", key: "education" },
  { label: "Achievements", key: "achievements" },
  { label: "Skills", key: "skills" },
];

export default function BannerWithTabs({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (key: string) => void }) {
  return (
    <div>
      {/* Banner */}
      <div className="w-full h-56 md:h-72 bg-gradient-to-r from-blue-400 via-indigo-500 to-violet-600 flex items-center justify-center shadow-lg mb-0 rounded-b-3xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg tracking-wide">
          About Me
        </h1>
      </div>
      {/* Tabs */}
      <div className="w-full mb-6">
        <div className="flex w-full gap-2 md:gap-6 border-b border-yellow-300 bg-white/80 rounded-t-2xl px-2 md:px-8 py-3 shadow-lg backdrop-blur-md overflow-x-auto">
          {TABS.map((tab) => (
            <motion.button
              key={tab.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative flex-1 min-w-[120px] px-5 py-2 md:px-8 md:py-3 font-semibold rounded-t-xl transition-all duration-300 outline-none
                ${
                  activeTab === tab.key
                    ? "text-green-900"
                    : "text-yellow-800 hover:text-green-700"
                }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
              {activeTab === tab.key && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-green-700 rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}