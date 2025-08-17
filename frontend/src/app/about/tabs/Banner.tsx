import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import "./banner.css";

const Banner: React.FC = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <h1 className="banner-title">Satyam Singh</h1>
        <p className="banner-subtitle">
          Senior Software Developer | MERN & Django | Generative AI Enthusiast
        </p>
        <p className="banner-desc">
          Passionate about building scalable, intelligent, and high-performance
          applications across web and mobile platforms. Always eager to learn
          and work with new technologies.
        </p>

        <div className="social-links">
          <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="icon linkedin" />
          </a>
          <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer">
            <FaGithub className="icon github" />
          </a>
          <a href="https://twitter.com/your-twitter" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="icon twitter" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
