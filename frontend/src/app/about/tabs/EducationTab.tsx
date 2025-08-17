import { FaGraduationCap } from "react-icons/fa";
export default function EducationTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-start bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4">
        <FaGraduationCap className="text-2xl text-yellow-600 mr-4 mt-1" />
        <div>
          <div className="font-bold text-yellow-700 text-lg">
            B.Tech in Computer Science and Engineering
          </div>
          <div className="text-gray-500 text-sm mb-1">
            Rajkiya Engineering College, Sonbhadra (Expected June 2025)
          </div>
        </div>
      </div>
      <div className="flex items-start bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4">
        <FaGraduationCap className="text-2xl text-yellow-600 mr-4 mt-1" />
        <div>
          <div className="font-bold text-yellow-700 text-lg">Class 12</div>
          <div className="text-gray-500 text-sm mb-1">
            Shri Hari Inter College, Ballia (2020)
          </div>
        </div>
      </div>
      <div className="flex items-start bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4">
        <FaGraduationCap className="text-2xl text-yellow-600 mr-4 mt-1" />
        <div>
          <div className="font-bold text-yellow-700 text-lg">Class 10</div>
          <div className="text-gray-500 text-sm mb-1">
            LFCS Mau (2017)
          </div>
        </div>
      </div>
    </div>
  );
}