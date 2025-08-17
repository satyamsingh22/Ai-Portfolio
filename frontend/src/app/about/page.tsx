"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AchievementsTab from "./tabs/AchievementsTab";
import Banner from "./tabs/Banner";
import EducationTab from "./tabs/EducationTab";
import ExperienceTab from "./tabs/ExperienceTab";
import OverviewTab from "./tabs/OverviewTab";
import SkillsTab from "./tabs/SkillsTab";

const TABS = [
  {
    key: "overview",
    label: "Overview",
    component: (
      <OverviewTab
        onReadMore={(key: string) => {
          window.location.hash = `#${key}`;
        }}
      />
    ),
  },
  { key: "experience", label: "Experience", component: <ExperienceTab /> },
  { key: "education", label: "Education", component: <EducationTab /> },
  {
    key: "achievements",
    label: "Achievements",
    component: <AchievementsTab />,
  },
  { key: "skills", label: "Skills", component: <SkillsTab /> },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Listen to hash changes
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (TABS.some((tab) => tab.key === hash)) {
        setActiveTab(hash);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <section className="min-h-[90vh] bg-gradient-to-br from-[#fef7e6] via-[#fbe29a] to-[#c4e6c3] pb-16">
      {/* Banner */}
      <Banner />

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
              onClick={() => {
                setActiveTab(tab.key);
                window.location.hash = `#${tab.key}`;
              }}
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

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.95 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full flex justify-center"
      >
        <div className="w-4/5 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] transition-all duration-500">
          <div className="text-lg text-gray-800 min-h-[140px] px-2 pb-2">
            {TABS.find((tab) => tab.key === activeTab)?.component}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
