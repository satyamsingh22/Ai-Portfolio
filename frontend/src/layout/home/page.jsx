"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const TITLES = [
  "Full Stack Developer",
  "Senior Software Developer",
  "AI Integration Expert",
];

function getDaysSinceStart(startDate) {
  const now = new Date();
  const diff = now.getTime() - startDate.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function getExperienceDuration(startDate) {
  const now = new Date();
  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
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

  const [experience, setExperience] = useState(() =>
    getExperienceDuration(new Date("2024-08-01"))
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setExperience(getExperienceDuration(new Date("2024-08-01")));
    }, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  const [commits, setCommits] = useState(null);
  useEffect(() => {
    async function fetchOverallContributions() {
      try {
        const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

        const userQuery = `
        query {
          viewer {
            createdAt
          }
        }
      `;

        const userRes = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: userQuery }),
        });
        const userData = await userRes.json();
        const createdAt = new Date(userData.data.viewer.createdAt);

        // 2. Loop year by year
        const today = new Date();
        let total = 0;

        for (
          let year = createdAt.getFullYear();
          year <= today.getFullYear();
          year++
        ) {
          const from = new Date(year, 0, 1).toISOString();
          const to = new Date(year, 11, 31, 23, 59, 59).toISOString();

          const query = `
          query {
            viewer {
              contributionsCollection(from: "${from}", to: "${to}") {
                totalCommitContributions
                restrictedContributionsCount
                totalIssueContributions
                totalPullRequestContributions
                totalPullRequestReviewContributions
                totalRepositoryContributions
              }
            }
          }
        `;

          const response = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${GITHUB_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
          });

          const data = await response.json();
          const c = data.data.viewer.contributionsCollection;

          total +=
            c.totalCommitContributions +
            c.restrictedContributionsCount +
            c.totalIssueContributions +
            c.totalPullRequestContributions +
            c.totalPullRequestReviewContributions +
            c.totalRepositoryContributions;
        }

        setCommits(total);
      } catch (error) {
        console.error("Error fetching GitHub contributions:", error);
        setCommits(null);
      }
    }

    fetchOverallContributions();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-600 font-extrabold text-lg mb-2 tracking-widest uppercase drop-shadow-lg">
            Welcome to My Blogs Page
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
          <div className="flex flex-col gap-4 mt-6 w-fit">
            <div className="flex gap-4 flex-wrap">
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
            <a
              href="https://wa.me/15557877787"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-full border-2 border-green-400 text-green-700 font-bold bg-white/80 hover:bg-green-50 shadow-md hover:scale-105 transition-transform"
              style={{
                minWidth: 140,
                textAlign: "center",
                fontSize: "1.1rem",
                letterSpacing: "0.5px",
              }}
            >
              Chat with my WhatsApp Agent
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
          <div className="flex gap-2 items-center justify-center text-3xl font-bold">
            {experience.years > 0 && (
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-300 shadow">
                {experience.years}{" "}
                <span className="text-base font-semibold">
                  Year{experience.years > 1 ? "s" : ""}
                </span>
              </span>
            )}
            {experience.months > 0 && (
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-300 shadow">
                {experience.months}{" "}
                <span className="text-base font-semibold">
                  Month{experience.months > 1 ? "s" : ""}
                </span>
              </span>
            )}
            {experience.days > 0 && (
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-300 shadow">
                {experience.days}{" "}
                <span className="text-base font-semibold">
                  Day{experience.days > 1 ? "s" : ""}
                </span>
              </span>
            )}
            {experience.years === 0 &&
              experience.months === 0 &&
              experience.days === 0 && (
                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-300 shadow">
                  Just Started!
                </span>
              )}
          </div>
          <div className="text-lg font-semibold text-gray-700 mt-2">
            Experience
          </div>
          <div className="text-xs text-gray-500 mt-1">Since August 2024</div>
        </div>
        {/* GitHub Commits Block */}
        <div className="bg-white/80 rounded-xl shadow-lg p-6 flex flex-col items-center border border-blue-100">
          <div className="text-3xl font-bold text-blue-600 min-h-[2.5rem] flex items-center justify-center">
            {commits === null ? (
              <svg
                className="animate-spin h-7 w-7 text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              commits.toLocaleString()
            )}
          </div>
          <div className="text-lg font-semibold text-gray-700 mt-2">
            Total GitHub Commits
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
