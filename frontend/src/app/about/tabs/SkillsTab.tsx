import { FaCode, FaLaptopCode, FaTools, FaUsers } from "react-icons/fa";

export default function SkillsTab() {
  const skills = [
    {
      title: "Programming",
      icon: <FaCode className="text-2xl text-yellow-600 mr-4 mt-1" />,
      items: "Java, Python, C/C++, JavaScript",
      gradient: "from-yellow-50 via-yellow-100 to-yellow-200",
      border: "border-yellow-400",
    },
    {
      title: "Technologies",
      icon: <FaLaptopCode className="text-2xl text-blue-600 mr-4 mt-1" />,
      items:
        "React, Django, NodeJS, ExpressJS, Kafka, Docker, SQL, PHP, PostgreSQL, MongoDB, RESTful APIs, Celery, Redis, Generative AI, Meta",
      gradient: "from-blue-50 via-blue-100 to-blue-200",
      border: "border-blue-400",
    },
    {
      title: "Tools",
      icon: <FaTools className="text-2xl text-green-600 mr-4 mt-1" />,
      items: "Git, Figma, VS Code, Jira, Cursor",
      gradient: "from-green-50 via-green-100 to-green-200",
      border: "border-green-400",
    },
    {
      title: "Soft Skills",
      icon: <FaUsers className="text-2xl text-purple-600 mr-4 mt-1" />,
      items: "Teamwork, Communication, Adaptability, Critical Thinking, Time Management",
      gradient: "from-purple-50 via-purple-100 to-purple-200",
      border: "border-purple-400",
    },
  ];

  return (
    <div className="space-y-6">
      {skills.map((skill, idx) => (
        <div
          key={idx}
          className={`flex items-start bg-gradient-to-r ${skill.gradient} ${skill.border} rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300`}
        >
          {skill.icon}
          <div>
            <div className={`font-bold text-lg ${skill.border.split("-")[1]}-700`}>
              {skill.title}
            </div>
            <div className="text-gray-700 mt-1">{skill.items}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
