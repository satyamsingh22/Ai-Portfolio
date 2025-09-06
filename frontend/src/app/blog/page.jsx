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
      <div className="w-full py-16 mb-12 bg-gradient-to-r from-yellow-200 via-pink-200 to-blue-200 shadow-lg relative">
        <h1 className="text-5xl md:text-6xl font-extrabold font-serif text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-pink-600 to-blue-600 drop-shadow-lg tracking-wide">
          All Blog Posts
        </h1>
        <p className="text-center text-lg mt-4 text-gray-700 font-medium">
          Explore the latest articles, tips, and AI insights.
        </p>
        <div className="absolute left-1/2 -bottom-4 transform -translate-x-1/2 w-32 h-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4">
        {/* Blog Cards */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <span className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-400"></span>
            <span className="ml-4 text-lg text-purple-400 font-semibold">
              Loading...
            </span>
          </div>
        ) : paginatedBlogs.length === 0 ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <span className="text-xl text-gray-300 font-semibold">
              No blogs found.
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16 relative z-10">
            {paginatedBlogs.map((post, index) => {
              // Gradient themes for cards
              const gradients = [
                "bg-gradient-to-br from-pink-100 via-yellow-100 to-purple-100",
                "bg-gradient-to-br from-blue-100 via-green-100 to-cyan-100",
                "bg-gradient-to-br from-orange-100 via-red-100 to-yellow-100",
              ];
              const cardGradient = gradients[index % gradients.length];

              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    ref={(el) => (cardsRef.current[index] = el)}
                    className={`rounded-3xl shadow-xl border-4 border-transparent ${cardGradient} transition-all duration-700 hover:scale-105 hover:shadow-2xl relative cursor-pointer mb-6`}
                    style={{
                      borderImage:
                        "linear-gradient(135deg, #a78bfa 0%, #7c3aed 50%, #1e293b 100%) 1",
                    }}
                  >
                    <div className="relative overflow-hidden rounded-t-3xl">
                      <img
                        src={post.image}
                        alt={post.tittle}
                        className="h-56 w-full object-cover transition-all duration-700 group-hover:scale-110 rounded-t-3xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div className="p-7">
                      <h3 className="text-2xl md:text-3xl font-extrabold font-serif text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300 drop-shadow">
                        {post.tittle}
                      </h3>
                      <div className="text-xs md:text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="mr-2">
                          <span className="text-purple-500">By</span>{" "}
                          {post.author}
                        </span>
                        <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                        <span className="text-blue-500">
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
                      <p className="text-gray-700 text-base mb-4 leading-relaxed font-sans">
                        {post.summary}
                      </p>
                      <span className="inline-flex items-center text-purple-600 font-semibold text-base group/link">
                        Read More
                        <svg
                          className="ml-2 w-5 h-5 transition-transform duration-300 group-hover/link:translate-x-1"
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
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-16 mb-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className={`px-5 py-2 rounded-full font-bold bg-gradient-to-r from-yellow-300 to-pink-300 text-gray-800 shadow hover:scale-105 transition-all ${
              page === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Prev
          </button>
          <span className="px-4 py-2 rounded-full bg-white shadow font-semibold text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className={`px-5 py-2 rounded-full font-bold bg-gradient-to-r from-pink-300 to-blue-300 text-gray-800 shadow hover:scale-105 transition-all ${
              page === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Gradient pastel background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-yellow-200 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute top-1/2 -right-16 w-48 h-48 bg-pink-200 rounded-full filter blur-3xl opacity-40 animate-pulse-slow delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-56 h-56 bg-blue-200 rounded-full filter blur-3xl opacity-30 animate-pulse-slow delay-2000"></div>
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
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-float {
          animation: float 0.8s ease-out forwards;
        }
        .animate-pulse-slow {
          animation: pulseSlow 6s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}
