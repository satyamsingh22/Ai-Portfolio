import { FaCode } from "react-icons/fa";
export default function SkillsTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-start bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4">
        <FaCode className="text-2xl text-yellow-600 mr-4 mt-1" />
        <div>
          <div className="font-bold text-yellow-700 text-lg">Programming</div>
          <div className="text-gray-700">Java, C/C++, JavaScript</div>
        </div>
      </div>
      <div className="flex items-start bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4">
        <FaCode className="text-2xl text-yellow-600 mr-4 mt-1" />
        <div>
          <div className="font-bold text-yellow-700 text-lg">Technologies</div>
          <div className="text-gray-700">
            React, Django, NodeJS, ExpressJS, Kafka, Docker, SQL, PHP, PostgreSQL, MongoDB, RESTful APIs, Celery, Redis, Generative AI
          </div>
        </div>
      </div>
      <div className="flex items-start bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4">
        <FaCode className="text-2xl text-yellow-600 mr-4 mt-1" />
        <div>
          <div className="font-bold text-yellow-700 text-lg">Tools</div>
          <div className="text-gray-700">Git, Figma, VS Code, Jira, Cursor</div>
        </div>
      </div>
      <div className="flex items-start bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4">
        <FaCode className="text-2xl text-yellow-600 mr-4 mt-1" />
        <div>
          <div className="font-bold text-yellow-700 text-lg">Soft Skills</div>
          <div className="text-gray-700">
            Teamwork, Communication, Adaptability, Critical Thinking, Time Management
          </div>
        </div>
      </div>
    </div>
  );
}