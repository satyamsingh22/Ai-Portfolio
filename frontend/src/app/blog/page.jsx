"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const BLOGS = [
  {
    id: 1,
    tittle: "How I Built My AI Portfolio",
    author: "Satyam Singh",
    created_at: "2024-06-01T12:00:00Z",
    summary:
      "A deep dive into the tech stack, design, and AI integrations powering my portfolio website.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    tittle: "10 Tips for MERN Developers",
    author: "Satyam Singh",
    created_at: "2024-05-20T10:00:00Z",
    summary:
      "Level up your MERN stack skills with these practical tips and best practices.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    tittle: "Generative AI in Real Projects",
    author: "Satyam Singh",
    created_at: "2024-04-15T09:00:00Z",
    summary:
      "How to use generative AI models in production web apps, with real-world examples.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  },
];

export default function BlogPage() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [page, setPage] = useState(1);
  const blogsPerPage = 3;
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

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
    if (sectionRef.current) observer.observe(sectionRef.current);

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
  }, [blogs, page]);

  const getAllBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/blog/");
      console.log("Fetched blogs:", response.data);
      setBlogs(response.data);
    } catch (error) {
      setBlogs(BLOGS); // fallback to static data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  // Pagination logic
  const paginatedBlogs = blogs.slice(
    (page - 1) * blogsPerPage,
    page * blogsPerPage
  );

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen py-0 bg-gradient-to-br from-gray-900 via-purple-900 via-blue-900 to-black overflow-hidden relative"
    >
      {/* Banner */}
      <div className="w-full py-20 mb-16 bg-gradient-to-r from-yellow-200 via-pink-200 to-blue-200 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold font-serif text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-pink-600 to-blue-600 drop-shadow-lg tracking-tight mb-4">
            All Blog Posts
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-800 font-medium leading-relaxed">
            Explore the latest articles, tips, and AI insights from my journey
            as a developer.
          </p>
        </div>
        <div className="absolute left-1/2 -bottom-4 transform -translate-x-1/2 w-40 h-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Blog Cards */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-400 mx-auto mb-4"></div>
              <span className="text-lg text-purple-200 font-semibold">
                Loading articles...
              </span>
            </div>
          </div>
        ) : paginatedBlogs.length === 0 ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                ></path>
              </svg>
              <span className="text-xl text-gray-300 font-semibold">
                No blogs found. Check back later for new content!
              </span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {paginatedBlogs.map((post, index) => {
              // Gradient themes for cards (inside card, not just border)
              const gradients = [
                "bg-gradient-to-br from-green-700 via-yellow-500 to-blue-100",
                "bg-gradient-to-br from-blue-100 via-cyan-100 to-green-100",
                "bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100",
              ];
              const cardGradient = gradients[index % gradients.length];
              const avatarUrl =
                post.avatar ||
                "https://api.dicebear.com/7.x/initials/svg?seed=" +
                  encodeURIComponent(post.author);

              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group block h-full"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    ref={(el) => (cardsRef.current[index] = el)}
                    className={`rounded-3xl shadow-xl border border-white/30 transition-all duration-500 hover:scale-[1.04] hover:shadow-2xl h-full flex flex-col overflow-hidden backdrop-blur-md ${cardGradient}`}
                    style={{
                      fontFamily: "Inter, Nunito, Montserrat, sans-serif",
                    }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.tittle}
                        className="h-56 w-full object-cover transition-all duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center gap-3 px-7 pt-5 pb-2">
                      <img
                        src={avatarUrl}
                        alt={post.author}
                        className="w-9 h-9 rounded-full border-2 border-purple-200 shadow"
                      />
                      <div>
                        <span className="block text-base font-semibold text-gray-800">
                          {post.author}
                        </span>
                        <span className="block text-xs text-gray-500 font-medium">
                          {new Date(post.created_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="p-7 pt-2 flex-grow flex flex-col">
                      <h3 className="text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors duration-300 line-clamp-2 tracking-tight leading-snug font-serif">
                        {post.tittle}
                      </h3>
                      <p className="text-gray-700 mb-5 leading-relaxed flex-grow line-clamp-3 font-medium">
                        {post.summary}
                      </p>
                      <div className="inline-flex items-center text-purple-600 font-semibold text-sm group-hover:text-purple-800 transition-colors mt-auto">
                        Read More
                        <svg
                          className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {blogs.length > blogsPerPage && (
          <div className="flex justify-center items-center gap-4 mt-16 mb-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`px-5 py-2.5 rounded-full font-semibold bg-gradient-to-r from-yellow-400 to-pink-400 text-gray-900 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ${
                page === 1 ? "opacity-50 cursor-not-allowed grayscale" : ""
              }`}
            >
              Previous
            </button>
            <span className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow font-semibold text-gray-200">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`px-5 py-2.5 rounded-full font-semibold bg-gradient-to-r from-pink-400 to-blue-400 text-gray-900 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ${
                page === totalPages
                  ? "opacity-50 cursor-not-allowed grayscale"
                  : ""
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Gradient pastel background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-yellow-300 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-1/2 -right-16 w-56 h-56 bg-pink-300 rounded-full filter blur-3xl opacity-25 animate-pulse-slow delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-blue-300 rounded-full filter blur-3xl opacity-20 animate-pulse-slow delay-2000"></div>
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
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
