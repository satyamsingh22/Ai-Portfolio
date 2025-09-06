"use client";
import Link from "next/link";
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
  },
];

export default function RecentBlogs() {
  const recentBlogs = [...BLOGS]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 3);

  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-float");
            }, index * 200);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardsRef.current.forEach((card) => {
      if (card) cardObserver.observe(card);
    });

    return () => {
      observer.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 bg-gradient-to-br from-[#fff5f7] via-[#f0f9ff] to-[#fef6e4] overflow-hidden opacity-0"
    >
      <div className="container mx-auto px-4">
        {/* Animated pastel background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-pink-200 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
          <div className="absolute top-1/2 -right-16 w-48 h-48 bg-blue-200 rounded-full filter blur-3xl opacity-40 animate-pulse-slow delay-1000"></div>
          <div className="absolute bottom-0 left-1/3 w-56 h-56 bg-yellow-200 rounded-full filter blur-3xl opacity-30 animate-pulse-slow delay-2000"></div>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 relative">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-600">
            Recent Blog Posts
          </span>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full"></div>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {recentBlogs.map((post, index) => (
            <div
              key={post.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white rounded-2xl shadow-xl border border-white/80 overflow-hidden transform transition-all duration-700 opacity-0 hover:scale-105 hover:shadow-2xl group"
              style={{
                transformStyle: "preserve-3d",
                boxShadow: "0 10px 30px -10px rgba(236, 72, 153, 0.3)",
              }}
            >
              <div className="relative overflow-hidden">
                <div
                  className="h-48 w-full bg-cover bg-center transition-all duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${post.image})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div className="p-6 relative">
                <div className="absolute -top-4 left-6">
                  <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-blue-500 text-white text-xs font-semibold rounded-full shadow-md">
                    New
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors duration-300">
                  {post.title}
                </h3>

                <div className="text-xs text-gray-500 mb-3 flex items-center">
                  <span className="mr-2">By {post.author}</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                  <span>
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {post.summary}
                </p>

                <Link
                  href="/blog"
                  className="inline-flex items-center text-pink-600 font-semibold text-sm group/link"
                >
                  Read More
                  <svg
                    className="ml-2 w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 relative z-10">
          <Link href="/blog">
            <button className="relative px-8 py-4 bg-gradient-to-r from-pink-500 to-blue-600 text-white font-bold rounded-full overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="relative z-10">View All Blogs</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className="absolute top-0 left-0 w-8 h-full bg-white/20 transform -skew-x-12 -translate-x-16 transition-all duration-1000 group-hover:translate-x-96 animate-shine"></div>
              </div>
            </button>
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(20px) rotateX(10deg);
            opacity: 0;
          }
          100% {
            transform: translateY(0) rotateX(0);
            opacity: 1;
          }
        }

        @keyframes pulseSlow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes shine {
          0% {
            left: -100%;
          }
          100% {
            left: 200%;
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-float {
          animation: float 0.8s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulseSlow 6s infinite ease-in-out;
        }

        .animate-shine {
          animation: shine 1.5s infinite;
        }
      `}</style>
    </section>
  );
}
