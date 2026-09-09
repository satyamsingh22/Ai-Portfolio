import { motion } from "framer-motion";
import {
  FaExchangeAlt,
  FaHome,
  FaPlane,
  FaRobot,
  FaShoppingBag,
  FaComments,
  FaBriefcase,
} from "react-icons/fa";

const PROJECTS = [
  {
    name: "YoTrip",
    type: "Built Project",
    icon: <FaPlane className="text-3xl text-sky-600" />,
    gradient: "from-sky-50 via-blue-50 to-indigo-100",
    border: "border-sky-400",
    summary:
      "MakeMyTrip-style travel platform for booking flights, cars, and hotels with an integrated AI assistant.",
    highlights: [
      "Built end-to-end travel booking flows for flights, car rentals, and hotel reservations.",
      "Integrated search, comparison, and booking management across multiple travel categories.",
      "Added an AI travel assistant to help users plan trips and get instant booking support.",
    ],
    tags: ["React", "Next.js", "Django", "AI Assistant"],
  },
  {
    name: "Direct Sell UAE",
    type: "Built Project",
    icon: <FaHome className="text-3xl text-emerald-600" />,
    gradient: "from-emerald-50 via-green-50 to-teal-100",
    border: "border-emerald-400",
    summary:
      "Property marketplace for the UAE where users can list, buy, sell, and rent properties.",
    highlights: [
      "Developed listing, search, and filter flows for property buyers, sellers, and renters.",
      "Built role-based flows for property owners, agents, and end users.",
      "Designed scalable APIs for property data, accounts, and listing lifecycle management.",
    ],
    tags: ["React", "Next.js", "Django", "PostgreSQL"],
  },
  {
    name: "Plutex",
    type: "Built Project",
    icon: <FaExchangeAlt className="text-3xl text-amber-600" />,
    gradient: "from-amber-50 via-orange-50 to-yellow-100",
    border: "border-amber-400",
    summary:
      "Currency exchange platform for secure fiat conversion and exchange workflows.",
    highlights: [
      "Built user-facing currency exchange flows with admin rate and transaction controls.",
      "Implemented exchange rate management and transaction tracking.",
      "Focused on reliable backend logic and production-ready exchange operations.",
    ],
    tags: ["React", "Django", "PostgreSQL", "Fintech"],
  },
  {
    name: "Instagram Automation – One More Reply",
    type: "Personal",
    icon: <FaRobot className="text-3xl text-pink-600" />,
    gradient: "from-pink-50 via-rose-50 to-red-100",
    border: "border-pink-400",
    summary:
      "Automated Instagram interaction system using Meta Webhooks for comments, DMs, and mentions.",
    highlights: [
      "Handled real-time Instagram events with secure webhook validation.",
      "Built template-based messaging and keyword-triggered auto-replies.",
    ],
    tags: ["Django", "Next.js", "Meta Graph API"],
  },
  {
    name: "Job Portal",
    type: "Personal",
    icon: <FaBriefcase className="text-3xl text-violet-600" />,
    gradient: "from-violet-50 via-purple-50 to-fuchsia-100",
    border: "border-violet-400",
    summary: "MERN-based job portal with JWT auth and role-based access control.",
    highlights: [
      "Built flows for job seekers, employers, and admins.",
      "Added admin panel for job postings, applications, and company management.",
    ],
    tags: ["React", "Node.js", "MongoDB", "Redux"],
  },
  {
    name: "Chatting Application",
    type: "Personal",
    icon: <FaComments className="text-3xl text-cyan-600" />,
    gradient: "from-cyan-50 via-sky-50 to-blue-100",
    border: "border-cyan-400",
    summary: "Social platform with authentication, photo uploads, and real-time chat.",
    highlights: [
      "Built MERN stack app with Redux state management.",
      "Integrated Socket.io for real-time messaging and notifications.",
    ],
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
  },
];

export default function ProjectsTab() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-2">
        <FaShoppingBag className="text-2xl text-yellow-600" />
        <div>
          <h3 className="text-xl font-bold text-gray-900">Team & Personal Projects</h3>
          <p className="text-gray-600 text-sm">
            Selected builds across travel, real estate, fintech, and AI — personal and collaborative work.
          </p>
        </div>
      </div>

      {PROJECTS.map((project, index) => (
        <motion.div
          key={project.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 }}
          className={`bg-gradient-to-r ${project.gradient} ${project.border} border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow`}
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
              {project.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h4 className="font-bold text-xl text-gray-900">{project.name}</h4>
                <span className="text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded-full bg-white/80 text-gray-700 border border-gray-200">
                  {project.type}
                </span>
              </div>
              <p className="text-gray-700 mb-3">{project.summary}</p>
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
      ))}
    </div>
  );
}
