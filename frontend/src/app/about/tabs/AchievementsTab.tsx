import { FaTrophy } from "react-icons/fa";
export default function AchievementsTab() {
  return (
    <div className="space-y-6">
      {[
        "Google Certified",
        "Hackathon Winner",
        "IBM: Quick Start Extending DOORS Next with JavaScript",
        "Complete 2024 Web Development Bootcamp (Udemy)",
      ].map((ach, idx) => (
        <div key={idx} className="flex items-start bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4">
          <FaTrophy className="text-2xl text-yellow-600 mr-4 mt-1" />
          <div>
            <div className="font-bold text-yellow-700 text-lg">{ach}</div>
          </div>
        </div>
      ))}
    </div>
  );
}