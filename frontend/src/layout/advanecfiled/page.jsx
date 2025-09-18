// AdvancedFieldsBanner.tsx
import { FaRobot, FaWhatsapp, FaNetworkWired, FaMagic, FaBolt } from "react-icons/fa";

const ADVANCED_FIELDS = [
  {
    title: "n8n Automation",
    icon: <FaNetworkWired className="text-blue-500 text-3xl" />,
    desc: "Built custom workflows and integrations using n8n for automation.",
  },
  {
    title: "WhatsApp Agent",
    icon: <FaWhatsapp className="text-green-500 text-3xl" />,
    desc: "Developed WhatsApp chatbots and agents for real-time customer support.",
  },
  {
    title: "RAG (Retrieval Augmented Generation)",
    icon: <FaMagic className="text-purple-500 text-3xl" />,
    desc: "Implemented RAG pipelines for smarter AI responses using custom data.",
  },
  {
    title: "LiveKit",
    icon: <FaBolt className="text-yellow-500 text-3xl" />,
    desc: "Integrated LiveKit for real-time audio/video and voice agent features.",
  },
  {
    title: "Generative AI",
    icon: <FaRobot className="text-indigo-500 text-3xl" />,
    desc: "Worked on generative AI models for chat, voice, and creative tasks.",
  },
];

export default function AdvancedFieldsBanner() {
  return (
    <section className="w-full py-12 bg-gradient-to-r from-yellow-50 via-blue-50 to-indigo-100">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-indigo-700">
        Advanced Fields I've Worked On
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {ADVANCED_FIELDS.map((field) => (
          <div
            key={field.title}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center w-64 border border-indigo-100 hover:scale-105 transition-transform"
          >
            {field.icon}
            <div className="font-bold text-lg text-indigo-700 mt-4 mb-2">{field.title}</div>
            <div className="text-gray-600 text-center">{field.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}