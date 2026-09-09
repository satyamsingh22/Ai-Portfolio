export const SATYAM_AGENT = {
  key: "satyam",
  name: "Satyam Singh",
  shortName: "Satyam",
  assistantLabel: "AI Satyam",
  role: "AI Automation Engineer · Voice · WhatsApp · Chatbot",
  welcome:
    "Hello! I'm AI Satyam — your intelligent assistant built on Satyam Singh's professional profile. Ask me about AI automation, voice agents, WhatsApp bots, chatbots, projects, or work experience.",
  suggestions: [
    "What AI automation services do you offer?",
    "Tell me about your Voice Agent experience",
    "What is your experience at Fawks.AI?",
    "What tech stack do you specialize in?",
  ],
  chatPlaceholder: "Ask about my skills, projects, or AI automation services...",
  chatDisclaimer: "AI Satyam can make mistakes. Verify important information.",
  voiceHeadline: "Talk to AI Satyam",
  voiceBlurb:
    "Have a real-time voice conversation about my AI automation work, voice agents, WhatsApp bots, projects, and professional experience.",
  connectingTitle: "Connecting to Satyam",
  avatar: "/logo2.png",
  speakingPrefix: "Satyam",
  hireHref: "/contact",
  hireLabel: "Hire for Automation",
  accent: "indigo",
};

export const MRIDUL_AGENT = {
  key: "mridul",
  name: "Mridul Mishra",
  shortName: "Mridul",
  assistantLabel: "AI Mridul",
  role: "Flutter & Full-Stack Developer · PollPe 5M+ users",
  welcome:
    "Hello! I'm AI Mridul — built on Mridul Mishra's professional profile. Ask me about Flutter, PollPe, full-stack work, projects, or experience. I only speak about Mridul's work.",
  suggestions: [
    "How did you build PollPe for 5M+ users?",
    "Tell me about your Flutter experience",
    "What projects have you built besides PollPe?",
    "What is your backend and deployment stack?",
  ],
  chatPlaceholder: "Ask about Flutter, PollPe, projects, or experience...",
  chatDisclaimer: "AI Mridul can make mistakes. Verify important information.",
  voiceHeadline: "Talk to AI Mridul",
  voiceBlurb:
    "Have a real-time voice conversation about my Flutter apps, PollPe, full-stack work, and professional experience.",
  connectingTitle: "Connecting to Mridul",
  avatar: "/mridul.png",
  speakingPrefix: "Mridul",
  hireHref: "/team/mridul",
  hireLabel: "View Mridul's Profile",
  accent: "emerald",
};

export function resolveAgentProfile(value) {
  return value === "mridul" ? MRIDUL_AGENT : SATYAM_AGENT;
}

export function agentQuery(profileKey) {
  return profileKey === "mridul" ? "?profile=mridul" : "";
}
