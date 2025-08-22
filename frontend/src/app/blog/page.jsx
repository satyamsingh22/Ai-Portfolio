"use client";
import { useEffect, useRef } from "react";

const BLOGS = [
  {
    id: 1,
    title: "How I Built My AI Portfolio",
    author: "Satyam Singh",
    created_at: "2024-06-01T12:00:00Z",
    summary:
      "A deep dive into the tech stack, design, and AI integrations powering my portfolio website.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    color: "from-blue-100 via-indigo-100 to-violet-100",
  },
  {
    id: 2,
    title: "10 Tips for MERN Developers",
    author: "Satyam Singh",
    created_at: "2024-05-20T10:00:00Z",
    summary:
      "Level up your MERN stack skills with these practical tips and best practices.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    color: "from-green-100 via-yellow-100 to-pink-100",
  },
  {
    id: 3,
    title: "Generative AI in Real Projects",
    author: "Satyam Singh",
    created_at: "2024-04-15T09:00:00Z",
    summary:
      "How to use generative AI models in production web apps, with real-world examples.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    color: "from-yellow-100 via-pink-100 to-blue-100",
  },
];

export default function BlogPage() {
  // 3D Banner Animation
  const bannerRef = useRef(null);
  useEffect(() => {
    const handleMouseMove = (e) => {
      const banner = bannerRef.current;
      if (!banner) return;
      const { left, top, width, height } = banner.getBoundingClientRect();
      const x = e.clientX - left - width / 2;
      const y = e.clientY - top - height / 2;
      const rotateX = (-y / height) * 10;
      const rotateY = (x / width) * 10;
      banner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    };
    const handleMouseLeave = () => {
      const banner = bannerRef.current;
      if (banner) banner.style.transform = "";
    };
    const banner = bannerRef.current;
    if (banner) {
      banner.addEventListener("mousemove", handleMouseMove);
      banner.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (banner) {
        banner.removeEventListener("mousemove", handleMouseMove);
        banner.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-[#ffe5e9] via-[#f5eee6] to-[#d7eacc]">
      {/* 3D Banner */}
      <div
        ref={bannerRef}
        className="relative w-full max-w-3xl mx-auto mb-12 rounded-3xl shadow-2xl bg-gradient-to-r from-yellow-100 via-blue-100 to-green-100 p-10 flex flex-col items-center justify-center transition-transform duration-300"
        style={{
          perspective: "1200px",
          willChange: "transform",
        }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-600 drop-shadow-lg mb-3 text-center">
          My Blog
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl text-center bg-white/60 rounded-xl p-4 shadow-lg border border-indigo-100">
          Insights, tutorials, and stories from my journey as a developer, AI
          enthusiast, and lifelong learner.
        </p>
        {/* Decorative 3D shapes */}
        <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-blue-200 to-violet-200 rounded-full blur-lg opacity-60 animate-pulse" />
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-tr from-yellow-200 to-green-100 rounded-full blur-xl opacity-50 animate-pulse" />
      </div>

      {/* Blog Cards */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {BLOGS.map((post) => (
          <div
            key={post.id}
            className={`bg-gradient-to-br ${post.color} bg-white/70 backdrop-blur-xl border border-indigo-100 rounded-2xl shadow-xl p-0 flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
            style={{
              boxShadow:
                "0 8px 32px 0 rgba(31, 38, 135, 0.12), 0 1.5px 6px 0 rgba(0,0,0,0.07)",
            }}
          >
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-44 object-cover rounded-t-2xl"
                style={{ borderBottom: "1px solid #e0e7ef" }}
              />
            )}
            <div className="p-7 flex flex-col flex-1">
              <h2 className="text-2xl font-bold text-indigo-800 mb-2">
                {post.title}
              </h2>
              <div className="text-gray-500 text-sm mb-2">
                {post.author} • {new Date(post.created_at).toLocaleDateString()}
              </div>
              <p className="text-gray-800 mb-4">{post.summary}</p>
              <a
                href="#"
                className="inline-block mt-auto text-indigo-600 font-semibold hover:underline"
              >
                Read More &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
