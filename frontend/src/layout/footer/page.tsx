import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-blue-400 via-indigo-500 to-violet-600 text-white py-10 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Contact Section */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Contact Me</h2>
          <p className="mb-4 text-white/90">
            I'm here to help you. Get in touch with me!
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FaPhone className="text-lg" />
              <span>+91 8957820454</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-lg" />
              <span>satyamsinghss2203@gmail.com</span>
            </div>
          </div>
        </div>
        {/* Social Media Links */}
        <div>
          <h3 className="text-xl font-semibold mb-2">
            Professional Contact Information
          </h3>
          <div className="flex gap-5 mt-2">
            <a
              href="https://linkedin.com/in/your-linkedin"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-200 transition"
            >
              <FaLinkedin size={28} />
            </a>
            <a
              href="https://github.com/your-github"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-200 transition"
            >
              <FaGithub size={28} />
            </a>
            <a
              href="https://twitter.com/your-twitter"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-200 transition"
            >
              <FaTwitter size={28} />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-white/70 text-sm">
        &copy; {new Date().getFullYear()} Satyam Singh. All rights reserved.
      </div>
    </footer>
  );
}
