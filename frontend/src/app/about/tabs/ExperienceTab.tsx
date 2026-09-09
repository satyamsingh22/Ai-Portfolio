import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ExperienceTab() {
  const [showMore, setShowMore] = useState(false);

  const experiences = [
    {
      name: "Fawks.AI",
      role: "Founding Engineer, Remote",
      duration: "April 2026 – Present",
      link: "https://fawks.ai/",
      logo: "/logo2.png",
      gradient: "from-violet-50 via-indigo-50 to-indigo-100",
      border: "border-indigo-400",
      highlights: [
        "Built an AI-powered Voice, Chat, and WhatsApp automation platform from scratch using Django, Redis, Celery, LiveKit, Qdrant, and Meta WhatsApp APIs.",
        "Developed scalable VoiceBot systems using LiveKit for real-time, two-way voice communication.",
        "Implemented a knowledge base using Qdrant for semantic search and intelligent response generation.",
        "Built WhatsApp automation agents using Meta APIs for lead handling and automated customer interactions.",
        "Designed a campaign automation engine for lead nurturing, outreach, and conversion workflows.",
        "Led product ideation, market research, and problem-solving to deliver business-focused solutions.",
        "Deployed and scaled applications on GCP and Docker ensuring high availability and performance.",
      ],
    },
    {
      name: "Kipps.AI",
      role: "Senior Software Developer, Udaipur, Rajasthan",
      duration: "Feb 2025 – April 2026",
      link: "https://www.kipps.ai/",
      logo: "/kipps.jpeg",
      gradient: "from-yellow-50 via-yellow-100 to-yellow-200",
      border: "border-yellow-400",
      highlights: [
        "Contributed to the development of an advanced VoiceBot system using LiveKit for real-time, two-way voice communication.",
        "Worked on intelligent ChatBot solutions using Pinecone to automate client interactions and improve response accuracy.",
        "Built a Meta WhatsApp Agent powered by a centralized Knowledge Base for automated replies, lead handling, and campaign execution.",
        "Collaborated on the design and enhancement of a Campaign System for WhatsApp and VoiceBot leads.",
        "Implemented automation workflows using n8n for lead processing, campaign scheduling, and CRM synchronization.",
        "Deployed and scaled applications on Google Cloud Platform (GCP) for high availability and performance.",
        "Worked with multiple LLM models (OpenAI, Anthropic, Gemini, Mistral) for diverse client use cases.",
      ],
    },
    {
      name: "Mediversal Pvt. Ltd.",
      role: "Web Developer Intern, Patna, Bihar",
      duration: "August 2024 – January 2025",
      link: "https://www.mediversal.in/",
      logo: "/mediversal.png",
      gradient: "from-blue-50 via-blue-100 to-blue-200",
      border: "border-blue-400",
      highlights: [
        "Developed LMS, lab report management, 2nd Inning, and loyalty systems from scratch using React, Next.js, Node.js, Express, and Twilio.",
        "Worked on full-stack development, handling frontend, backend, and database integration.",
        "Implemented OTP-based authentication systems to ensure secure and seamless user login and verification.",
        "Collaborated with cross-functional teams to design and deploy scalable web applications.",
      ],
    },
    {
      name: "IIIT Delhi",
      role: "Full-Stack Developer (Website Project)",
      duration: "Jun 2024 – Aug 2024",
      link: "https://www.iiitd.ac.in/",
      logo: "/iii.png",
      gradient: "from-green-50 via-green-100 to-green-200",
      border: "border-green-400",
      highlights: [
        "Developed a complete research lab website for IIIT Delhi's VLSI Circuits & Systems Lab from scratch.",
        "Implemented team onboarding, publications management, and an admin dashboard for easy content updates.",
        "Built backend using Django ORM for efficient database operations and relational mapping.",
        "Deployed the project on Render, ensuring smooth hosting and scalability.",
      ],
    },
    {
      name: "FV Salon Academy",
      role: "Web Developer (Project)",
      duration: "Jul 2024 – Aug 2024",
      link: "https://www.fvsalonacademy.com/",
      logo: "/f.png",
      gradient: "from-purple-50 via-purple-100 to-purple-200",
      border: "border-purple-400",
      highlights: [
        "Designed and customized full-stack website for FV Salon Academy to improve online presence and customer engagement.",
        "Worked on MERN stack development (MongoDB, Express, React, NodeJS) for dynamic and responsive UI/UX.",
        "Integrated secure authentication and data management for smooth salon operations.",
        "Optimized performance and ensured deployment-ready production build.",
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {experiences.map((exp, index) => {
        if (index > 2 && !showMore) return null;
        return (
          <motion.div
            key={index}
            className={`flex items-start bg-gradient-to-r ${exp.gradient} ${exp.border} rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Image
              src={exp.logo}
              alt={exp.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover mr-6 border-2 bg-white"
            />
            <div>
              <div className={`font-bold text-xl ${exp.border.split("-")[1]}-700`}>
                {exp.name}
              </div>
              <div className="text-gray-500 text-sm mb-1">{`(${exp.duration})`}</div>
              <a
                href={exp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm mb-2 block"
              >
                Visit Website
              </a>
              <div className="font-semibold text-gray-800">{exp.role}</div>
              <ul className="list-disc list-inside text-gray-600 text-base mt-2 space-y-1">
                {exp.highlights.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        );
      })}

      <div className="flex justify-end">
        <button
          onClick={() => setShowMore(!showMore)}
          className="px-6 py-3 bg-yellow-500 text-white rounded-lg shadow-lg hover:bg-yellow-600 transition-colors duration-300"
        >
          {showMore ? "Show Less" : "Read More"}
        </button>
      </div>
    </div>
  );
}
