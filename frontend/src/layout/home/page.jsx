"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const TITLES = [
  "Full Stack Developer",
  "Senior Software Developer",
  "MERN Developer",
];

function getDaysSinceStart(startDate) {
  const now = new Date();
  const diff = now.getTime() - startDate.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export default function HomePage() {
  const [text, setText] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = TITLES[titleIndex];
    let typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      setText((prev) =>
        isDeleting
          ? currentTitle.substring(0, prev.length - 1)
          : currentTitle.substring(0, prev.length + 1)
      );

      if (!isDeleting && text === currentTitle) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % TITLES.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, titleIndex]);

  // Experience block state
  const [days, setDays] = useState(() =>
    getDaysSinceStart(new Date("2024-08-01"))
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setDays(getDaysSinceStart(new Date("2024-08-01")));
    }, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  // Total GitHub commits (public, all repos)
  const [commits, setCommits] = useState(null);

  useEffect(() => {
    async function fetchCommits() {
      let total = 0;
      try {
        // 1. Get all public repos
        const reposRes = await fetch(
          "https://api.github.com/users/satyamsingh22/repos?per_page=100"
        );
        const repos = await reposRes.json();

        // 2. For each repo, get your commit count
        for (const repo of repos) {
          const commitsRes = await fetch(
            `https://api.github.com/repos/satyamsingh22/${repo.name}/commits?author=satyamsingh22&per_page=1`
          );
          // Get total from the 'link' header if paginated
          const link = commitsRes.headers.get("link");
          if (link && link.includes('rel="last"')) {
            // Extract the last page number from the link header
            const match = link.match(/&page=(\d+)>; rel="last"/);
            if (match) {
              total += parseInt(match[1], 10);
            }
          } else {
            // If not paginated, check if there is at least one commit
            const commitsArr = await commitsRes.json();
            if (Array.isArray(commitsArr) && commitsArr.length > 0) {
              total += commitsArr.length;
            }
          }
        }
        setCommits(total);
      } catch (e) {
        setCommits(null);
      }
    }
    fetchCommits();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Part */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-600 font-extrabold text-lg mb-2 tracking-widest uppercase drop-shadow-lg">
            Welcome to My Blogs
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-3 text-gray-900 drop-shadow-xl">
            Hi, I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-600">
              Satyam Singh
            </span>
          </h1>
          {/* Typewriter Title */}
          <h2 className="text-2xl md:text-3xl font-semibold mb-5 h-10 text-indigo-700">
            <span className="whitespace-nowrap transition-all ease-in-out duration-300">
              {text}
            </span>
            <span className="ml-1 animate-ping inline-block w-2 h-2 bg-indigo-600 rounded-full" />
          </h2>
          {/* Description */}
          <p className="text-lg text-gray-700 max-w-xl bg-white/60 rounded-xl p-4 shadow-lg border border-indigo-100">
            I'm a{" "}
            <span className="font-bold text-indigo-700">
              Senior Software Developer
            </span>{" "}
            working primarily with{" "}
            <span className="font-semibold text-blue-600">Django</span>, the{" "}
            <span className="font-semibold text-violet-600">MERN stack</span>,
            and{" "}
            <span className="font-semibold text-indigo-700">Generative AI</span>{" "}
            to craft scalable, intelligent, and high-performance applications
            across web and mobile platforms.
          </p>
          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <a
              href="/voiceagent"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-400 to-violet-600 text-white font-bold shadow-lg hover:scale-105 transition-transform"
            >
              Talk with AI Me
            </a>
            <a
              href="/chatagent"
              className="px-6 py-2 rounded-full border-2 border-indigo-400 text-indigo-700 font-bold bg-white/80 hover:bg-indigo-50 shadow-md hover:scale-105 transition-transform"
            >
              AI Chat
            </a>
          </div>
        </div>
        {/* Right Part */}
        <div className="flex-1 flex justify-center items-center relative">
          <div className="relative w-100 h-150 flex items-center justify-center">
            {/* Only border and shadow, no color overlay */}
            <Image
              src="/profile.png"
              alt="Satyam Singh"
              width={420}
              height={420}
              className="rounded-full object-cover shadow-2xl border-8 border-white w-100 h-150"
              priority
            />
            <div className="absolute inset-0 rounded-full border-4 border-indigo-400 pointer-events-none"></div>
          </div>
        </div>
      </div>
      {/* Info Blocks Below Header */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {/* Experience Block */}
        <div className="bg-white/80 rounded-xl shadow-lg p-6 flex flex-col items-center border border-green-100">
          <div className="text-3xl font-bold text-green-600">{days}+</div>
          <div className="text-lg font-semibold text-gray-700 mt-2">
            Days of Experience
          </div>
          <div className="text-xs text-gray-500 mt-1">Since August 2024</div>
        </div>
        {/* GitHub Commits Block */}
        <div className="bg-white/80 rounded-xl shadow-lg p-6 flex flex-col items-center border border-blue-100">
          <div className="text-3xl font-bold text-blue-600">
            {commits !== null ? commits : "--"}
          </div>
          <div className="text-lg font-semibold text-gray-700 mt-2">
            GitHub Commits (total)
          </div>
          <div className="text-xs text-gray-500 mt-1">
            <a
              href="https://github.com/satyamsingh22"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-500"
            >
              View on GitHub
            </a>
          </div>
        </div>
        {/* Placeholder Block */}
        <div className="bg-white/80 rounded-xl shadow-lg p-6 flex flex-col items-center border border-indigo-100">
          <div className="text-3xl font-bold text-indigo-600">?</div>
          <div className="text-lg font-semibold text-gray-700 mt-2">
            Coming Soon
          </div>
          <div className="text-xs text-gray-500 mt-1">More stats</div>
        </div>
      </div>
    </section>
  );
}
