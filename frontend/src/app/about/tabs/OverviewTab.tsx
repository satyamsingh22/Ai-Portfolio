"use client";

import {
  FaBuilding,
  FaCode,
  FaGraduationCap,
  FaJs,
  FaNodeJs,
  FaPython,
  FaReact,
  FaTrophy,
} from "react-icons/fa";
import { motion } from "framer-motion";

const OVERVIEW = [
  {
    key: "experience",
    title: "Experience",
    icon: <FaBuilding className="text-4xl text-yellow-600 mb-3" />,
    preview:
      "Senior Software Developer at Kipps.AI and Web Developer Intern at Mediversal Pvt. Ltd.",
  },
  {
    key: "education",
    title: "Education",
    icon: <FaGraduationCap className="text-4xl text-yellow-600 mb-3" />,
    preview:
      "B.Tech in Computer Science (REC Sonbhadra), Class 12 (Ballia), Class 10 (LFCS Mau)",
  },
  {
    key: "achievements",
    title: "Achievements",
    icon: <FaTrophy className="text-4xl text-yellow-600 mb-3" />,
    preview: "Google Certified, Hackathon Winner, IBM & Udemy Certifications",
  },
];

const SKILLS = [
  { name: "JavaScript", icon: <FaJs className="text-yellow-500 text-2xl" /> },
  { name: "Python", icon: <FaPython className="text-blue-500 text-2xl" /> },
  { name: "React", icon: <FaReact className="text-cyan-500 text-2xl" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-600 text-2xl" /> },
];

export default function OverviewTab({
  onReadMore,
}: {
  onReadMore: (key: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Experience, Education, Achievements */}
      {OVERVIEW.map((item, idx) => (
        <motion.div
          key={item.key}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.2, duration: 0.6 }}
          whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
          className="flex flex-col items-center bg-gradient-to-br from-yellow-50 to-yellow-100 
                     border border-yellow-300 rounded-2xl p-6 shadow-lg 
                     hover:shadow-2xl transform transition-transform"
        >
          {item.icon}
          <div className="font-bold text-yellow-700 text-xl mb-2">
            {item.title}
          </div>
          <div className="text-gray-700 text-center mb-4">{item.preview}</div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="mt-auto px-5 py-2 rounded-full bg-yellow-400 text-green-900 
                       font-semibold shadow-md hover:bg-yellow-500 transition"
            onClick={() => onReadMore(item.key)}
          >
            Read More
          </motion.button>
        </motion.div>
      ))}

      {/* Skills Box */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        whileHover={{ scale: 1.05, rotateX: -5, rotateY: 5 }}
        className="flex flex-col items-center bg-gradient-to-br from-yellow-50 to-yellow-100 
                   border border-yellow-300 rounded-2xl p-6 shadow-lg 
                   hover:shadow-2xl transform transition-transform"
      >
        <FaCode className="text-4xl text-yellow-600 mb-3" />
        <div className="font-bold text-yellow-700 text-xl mb-4">Skills</div>
        <div className="grid grid-cols-2 gap-4 w-full mb-4">
          {SKILLS.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + idx * 0.2 }}
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-2 bg-white border border-yellow-200 
                         rounded-lg px-3 py-2 shadow-sm hover:shadow-md"
            >
              {skill.icon}
              <span className="text-gray-800 font-medium">{skill.name}</span>
            </motion.div>
          ))}
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="mt-auto px-5 py-2 rounded-full bg-yellow-400 text-green-900 
                     font-semibold shadow-md hover:bg-yellow-500 transition"
          onClick={() => onReadMore("skills")}
        >
          Full View
        </motion.button>
      </motion.div>
    </div>
  );
}
