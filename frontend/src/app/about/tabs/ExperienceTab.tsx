export default function ExperienceTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-start bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4">
        <img
          src="/company-logos/kippsai.png"
          alt="Kipps.AI"
          className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-yellow-300 bg-white"
        />
        <div>
          <div className="font-bold text-yellow-700 text-lg">Kipps.AI</div>
          <div className="text-gray-500 text-sm mb-1">(Feb 2025 – Present)</div>
          <div className="font-semibold text-gray-800">Senior Software Developer, Udaipur</div>
          <div className="text-gray-600 text-base mt-1">
            Built and integrated intelligent chatbots, WhatsApp integration, scalable real-time solutions.
          </div>
        </div>
      </div>
      <div className="flex items-start bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4">
        <img
          src="/company-logos/mediversal.png"
          alt="Mediversal Pvt. Ltd."
          className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-yellow-300 bg-white"
        />
        <div>
          <div className="font-bold text-yellow-700 text-lg">Mediversal Pvt. Ltd.</div>
          <div className="text-gray-500 text-sm mb-1">(Aug 2024 – Jan 2025)</div>
          <div className="font-semibold text-gray-800">Web Developer Intern, Patna</div>
          <div className="text-gray-600 text-base mt-1">
            Developed LMS, lab report management, loyalty systems, secure login, and full-stack projects.
          </div>
        </div>
      </div>
    </div>
  );
}