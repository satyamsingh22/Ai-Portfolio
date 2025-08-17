import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ExperienceTab() {
  const [showMore, setShowMore] = useState(false);

  const experiences = [
    {
      name: "Kipps.AI",
      role: "Senior Software Developer, Udaipur",
      duration: "Feb 2025 – Present",
      link: "https://www.kipps.ai/",
      logo: "/kipps.jpeg",
      gradient: "from-yellow-50 via-yellow-100 to-yellow-200",
      border: "border-yellow-400",
      highlights: [
        "Building and integrating intelligent chatbots trained on custom data for client-specific use cases.",
        "Developed seamless chatbot embedding into websites and implemented WhatsApp integration using Meta’s API.",
        "Designed and implemented WhatsApp signup embedding for smooth user onboarding directly via WhatsApp.",
        "Built a WhatsApp Agent from scratch, capable of handling real-time customer queries and automations.",
        "Leveraged Celery, Django, Redis, and OpenAI for background processing and AI-powered conversations.",
        "Collaborated within a TypeScript + Python stack to deliver scalable, real-time chatbot solutions.",
      ],
    },
    {
      name: "Mediversal Pvt. Ltd.",
      role: "Web Developer Intern, Patna",
      duration: "Aug 2024 – Jan 2025",
      link: "https://www.mediversal.in/",
      logo: "/mediversal.png",
      gradient: "from-blue-50 via-blue-100 to-blue-200",
      border: "border-blue-400",
      highlights: [
        "Developed full-stack web applications including LMS, lab report management, loyalty systems and more, from scratch.",
        "Designed and implemented secure OTP-based authentication systems for user verification.",
        "Managed complete development cycle – frontend, backend, and database integration for scalable solutions.",
        "Collaborated with cross-functional teams to deploy and optimize production-ready web applications.",
      ],
    },
    {
      name: "Freelancer (IIIT Delhi)",
      role: "Full-Stack Developer (Website Project)",
      duration: "Jun 2024 – Aug 2024",
      link: "https://www.iiitd.ac.in/",
      logo: "/iii.png",
      gradient: "from-green-50 via-green-100 to-green-200",
      border: "border-green-400",
      highlights: [
        "Developed a complete research lab website for IIIT Delhi’s VLSI Circuits & Systems Lab from scratch.",
        "Implemented team onboarding, publications management, and an admin dashboard for easy content updates.",
        "Built backend using Django ORM for efficient database operations and relational mapping.",
        "Deployed the project on Render, ensuring smooth hosting and scalability.",
      ],
    },
    {
      name: "FV Salon Academy",
      role: "Web Developer (Freelance)",
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
        if (index > 1 && !showMore) return null; // Hide extra experiences initially
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
              {/* Website link below the year */}
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

      {/* Read More / Show Less Button */}
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
