"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaCheck,
  FaComments,
  FaMicrophoneAlt,
  FaUserFriends,
} from "react-icons/fa";
import { MRIDUL_TEAM_SUMMARY, SATYAM_TEAM_SUMMARY } from "@/lib/teamProfiles";

const MEMBERS = [
  {
    ...SATYAM_TEAM_SUMMARY,
    accent: {
      cover: "from-indigo-600 via-violet-600 to-purple-700",
      role: "text-indigo-600 bg-indigo-50 border-indigo-100",
      chip: "bg-indigo-50 text-indigo-700 border-indigo-100",
      check: "text-indigo-500",
      primary: "bg-indigo-600 hover:bg-indigo-700",
      ring: "ring-indigo-100",
    },
    voiceHref: "/voiceagent",
    chatHref: "/chatagent",
    coverImage: "/card-header-satyam.png",
  },
  {
    ...MRIDUL_TEAM_SUMMARY,
    accent: {
      cover: "from-teal-600 via-emerald-600 to-cyan-700",
      role: "text-emerald-700 bg-emerald-50 border-emerald-100",
      chip: "bg-emerald-50 text-emerald-800 border-emerald-100",
      check: "text-emerald-500",
      primary: "bg-emerald-600 hover:bg-emerald-700",
      ring: "ring-emerald-100",
    },
    voiceHref: "/voiceagent?profile=mridul",
    chatHref: "/chatagent?profile=mridul",
    coverImage: "/card-header-mridul.png",
  },
];

function MemberCard({ member }) {
  return (
    <article className="group flex flex-col h-full bg-white rounded-3xl shadow-[0_20px_50px_-24px_rgba(79,70,229,0.45)] border border-white/80 overflow-hidden hover:-translate-y-1 hover:shadow-[0_28px_60px_-24px_rgba(79,70,229,0.55)] transition-all duration-300">
      <div className={`relative h-24 bg-gradient-to-br ${member.accent.cover}`}>
        {member.coverImage && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${member.coverImage}')` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
      </div>

      <div className="relative px-7 flex flex-col flex-1 pb-7">
        <div className={`-mt-12 mb-4 w-24 h-24 rounded-full overflow-hidden ring-4 ring-white shadow-lg ${member.accent.ring}`}>
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              width={96}
              height={96}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${member.accent.cover} text-white flex items-center justify-center text-2xl font-bold`}>
              {member.initials}
            </div>
          )}
        </div>

        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">{member.name}</h2>
        <p className={`inline-flex w-fit mt-2 text-xs font-semibold px-2.5 py-1 rounded-full border ${member.accent.role}`}>
          {member.role}
        </p>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">{member.tagline}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {member.skills.map((skill) => (
            <span
              key={skill}
              className={`text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full border ${member.accent.chip}`}
            >
              {skill}
            </span>
          ))}
        </div>

        <ul className="mt-5 space-y-2.5 flex-1">
          {member.highlights.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm text-slate-600 leading-snug">
              <FaCheck className={`${member.accent.check} mt-0.5 shrink-0 text-xs`} />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-2.5">
          <Link
            href={member.href}
            className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold shadow-md transition ${member.accent.primary}`}
          >
            View Profile
            <FaArrowRight className="text-xs" />
          </Link>
          <div className="grid grid-cols-2 gap-2.5">
            <Link
              href={member.voiceHref}
              className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-full text-sm font-semibold border border-slate-200 text-slate-700 bg-slate-50 hover:bg-white hover:border-slate-300 transition"
            >
              <FaMicrophoneAlt className="text-xs" /> Voice
            </Link>
            <Link
              href={member.chatHref}
              className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-full text-sm font-semibold border border-slate-200 text-slate-700 bg-slate-50 hover:bg-white hover:border-slate-300 transition"
            >
              <FaComments className="text-xs" /> Chat
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function TeamPage() {
  return (
    <section className="min-h-screen bg-[#f4f6fb] pb-20">
      <div className="relative overflow-hidden text-white min-h-[280px] md:min-h-[320px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/team-hero-bg.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/80 via-violet-900/55 to-indigo-950/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-indigo-950/40" />

        <div className="relative max-w-5xl mx-auto px-6 py-10 md:py-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/12 border border-white/20 text-xs font-medium mb-3 backdrop-blur-sm">
            <FaUserFriends /> One team. Full delivery.
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3 leading-[1.15]">
            We are stronger
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-violet-200">
              {" "}as a team.
            </span>
          </h1>
          <p className="text-sm md:text-base text-indigo-100 max-w-2xl mx-auto leading-relaxed">
            Satyam owns AI — voice, WhatsApp, and chat. Mridul owns mobile — Flutter at 5M+ users.
            We design, build, and ship the whole product as one unit.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-medium backdrop-blur-sm">
              AI + Flutter under one roof
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-medium backdrop-blur-sm">
              5M+ users in production
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-medium backdrop-blur-sm">
              Idea → launch, no middlemen
            </span>
          </div>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MEMBERS.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>

        <div className="mt-12 relative overflow-hidden rounded-3xl bg-slate-900 text-white px-8 py-12 text-center shadow-xl">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white,transparent_40%)]" />
          <div className="relative">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-3">Work with the team</h3>
            <p className="text-slate-300 mb-7 max-w-lg mx-auto leading-relaxed">
              Need AI automation, a Flutter app, or a full-stack build? Talk to Satyam or Mridul
              directly — or send a message and we&apos;ll route it.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-slate-900 font-semibold shadow-lg hover:bg-indigo-50 transition"
            >
              Contact the Team
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
