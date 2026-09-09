import Link from "next/link";
import {
  FaComments,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMicrophoneAlt,
  FaPhone,
} from "react-icons/fa";
import { MRIDUL_PROFILE } from "@/lib/teamProfiles";
import "./banner.css";

export default function Banner() {
  const m = MRIDUL_PROFILE;

  return (
    <div className="mridul-banner">
      <Link href="/team" className="mridul-banner-back">
        ← Back to Team
      </Link>
      <div className="mridul-banner-content">
        <h1 className="mridul-banner-title">{m.name}</h1>
        <p className="mridul-banner-subtitle">{m.role}</p>
        <p className="mridul-banner-desc">
          Passionate about building scalable, high-performance mobile and
          full-stack applications. Built PollPe from scratch — 5M+ users on
          Android and iOS. Always eager to learn and work with new technologies.
        </p>

        <div className="mridul-social-links">
          <a href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin className="linkedin" />
          </a>
          <a href={m.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub className="github" />
          </a>
          <a href={`mailto:${m.email}`} aria-label="Email">
            <FaEnvelope className="email" />
          </a>
          <a href={`tel:${m.phone.replace(/\s/g, "")}`} aria-label="Call">
            <FaPhone className="phone" />
          </a>
        </div>

        <div className="mridul-agent-actions">
          <Link href="/voiceagent?profile=mridul" className="mridul-agent-btn mridul-agent-btn-voice">
            <FaMicrophoneAlt /> Talk with AI Me
          </Link>
          <Link href="/chatagent?profile=mridul" className="mridul-agent-btn mridul-agent-btn-chat">
            <FaComments /> AI Chat
          </Link>
        </div>
      </div>
    </div>
  );
}
