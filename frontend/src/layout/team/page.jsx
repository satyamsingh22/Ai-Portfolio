"use client";

import Link from "next/link";
import { FaArrowRight, FaMobileAlt, FaRobot, FaUserFriends } from "react-icons/fa";
import { MRIDUL_TEAM_SUMMARY, SATYAM_TEAM_SUMMARY } from "@/lib/teamProfiles";

const PREVIEW = [
  {
    ...SATYAM_TEAM_SUMMARY,
    icon: FaRobot,
    accent: "text-indigo-600",
    border: "border-indigo-100 hover:border-indigo-200",
    chip: "bg-indigo-50 text-indigo-700",
  },
  {
    ...MRIDUL_TEAM_SUMMARY,
    icon: FaMobileAlt,
    accent: "text-emerald-600",
    border: "border-emerald-100 hover:border-emerald-200",
    chip: "bg-emerald-50 text-emerald-700",
  },
];

export default function TeamPreview() {
  return (
    <section className="w-full py-16 px-6 bg-gradient-to-b from-slate-50 via-indigo-50/60 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-indigo-700 font-semibold text-sm mb-3">
            <FaUserFriends /> Development Team
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Stronger as a team
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Satyam on AI automation. Mridul on production Flutter. Together we cover
            the full product — voice, chat, WhatsApp, and mobile apps used by millions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {PREVIEW.map((person) => {
            const Icon = person.icon;
            return (
              <Link
                key={person.name}
                href={person.href}
                className={`block bg-white rounded-3xl p-7 shadow-lg border ${person.border} hover:shadow-xl hover:-translate-y-0.5 transition-all`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-14 h-14 rounded-full object-cover object-top border-2 border-white shadow-md"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{person.name}</h3>
                    <p className={`text-sm font-semibold ${person.accent}`}>{person.role}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 flex items-start gap-2 leading-relaxed">
                  <Icon className={`${person.accent} shrink-0 mt-0.5`} />
                  {person.tagline}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {person.skills.slice(0, 4).map((skill) => (
                    <span key={skill} className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${person.chip}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition"
          >
            View Full Team Profiles
            <FaArrowRight className="text-sm" />
          </Link>
        </div>
      </div>
    </section>
  );
}
