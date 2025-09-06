"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(false); // loader state
  const router = useRouter();

  const getallBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/blog/");
      setBlog(response.data);
    } catch (error) {
      // Optionally handle error
    } finally {
      setLoading(false);
    }
  };

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

      // Enhanced 3D effect with perspective and depth
      banner.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03) translateZ(10px)`;

      // Parallax effect for child elements
      const title = banner.querySelector("h1");
      const description = banner.querySelector("p");
      const shapes = banner.querySelectorAll(".shape");

      if (title) {
        title.style.transform = `translateX(${x * 0.03}px) translateY(${
          y * 0.03
        }px)`;
      }

      if (description) {
        description.style.transform = `translateX(${x * 0.02}px) translateY(${
          y * 0.02
        }px)`;
      }

      shapes.forEach((shape, index) => {
        const depth = (index + 1) * 0.5;
        shape.style.transform = `translateX(${x * 0.01 * depth}px) translateY(${
          y * 0.01 * depth
        }px)`;
      });
    };

    const handleMouseLeave = () => {
      const banner = bannerRef.current;
      if (!banner) return;

      // Reset all transforms with smooth transition
      banner.style.transform = "";

      const title = banner.querySelector("h1");
      const description = banner.querySelector("p");
      const shapes = banner.querySelectorAll(".shape");

      if (title) title.style.transform = "";
      if (description) description.style.transform = "";
      shapes.forEach((shape) => (shape.style.transform = ""));
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

  useEffect(() => {
    getallBlogs();
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#ffe5e9] via-[#f5eee6] to-[#d7eacc]">
      {/* 3D Banner - Now full width */}
      <div className="w-full px-0 pb-10">
        <div
          ref={bannerRef}
          className="relative w-full rounded-3xl shadow-2xl bg-gradient-to-r from-yellow-100 via-blue-100 to-green-100 px-6 md:px-10 py-14 flex flex-col items-center justify-center transition-all duration-500 overflow-hidden max-w-none"
          style={{
            perspective: "1200px",
            transformStyle: "preserve-3d",
          }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 drop-shadow-lg mb-3 text-center transition-transform duration-300">
            My Blog
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl text-center bg-white/70 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-indigo-100/50 transition-transform duration-300">
            Insights, tutorials, and stories from my journey as a developer, AI
            enthusiast, and lifelong learner.
          </p>

          {/* Enhanced 3D decorative shapes with depth */}
          <div className="shape absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-blue-200 to-violet-200 rounded-full blur-lg opacity-60 animate-pulse transition-transform duration-500" />
          <div className="shape absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-tr from-yellow-200 to-green-100 rounded-full blur-xl opacity-50 animate-pulse transition-transform duration-500" />
          <div className="shape absolute top-10 right-12 w-12 h-12 bg-gradient-to-r from-pink-200 to-pink-300 rounded-full blur-md opacity-40 transition-transform duration-500" />
          <div className="shape absolute bottom-10 left-12 w-10 h-10 bg-gradient-to-r from-green-200 to-green-300 rounded-full blur-md opacity-40 transition-transform duration-500" />

          {/* Additional 3D effect elements */}
          <div className="shape absolute top-1/2 left-1/4 w-8 h-8 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full blur-sm opacity-30 animate-bounce transition-transform duration-500" />
          <div className="shape absolute bottom-1/3 right-1/4 w-6 h-6 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-full blur-sm opacity-40 animate-ping transition-transform duration-500" />
        </div>
      </div>

      {/* Blog Cards Container - Fixed to prevent layout shift */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 px-4 pb-16">
        {loading ? (
          <div className="col-span-3 flex justify-center items-center py-20">
            <svg
              className="animate-spin h-10 w-10 text-indigo-500"
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
                d="M4 12a8 8 0 008-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <span className="ml-4 text-indigo-600 text-lg font-semibold">
              Loading blogs...
            </span>
          </div>
        ) : blog.length > 0 ? (
          blog.map((post) => (
            <div
              key={post.id}
              className={`bg-gradient-to-br ${post.color} bg-white/70 backdrop-blur-xl border border-indigo-100/50 rounded-2xl shadow-xl p-0 flex flex-col transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl overflow-hidden group`}
              style={{
                boxShadow:
                  "0 8px 32px 0 rgba(31, 38, 135, 0.12), 0 1.5px 6px 0 rgba(0,0,0,0.07)",
                transformStyle: "preserve-3d",
              }}
              onClick={() => router.push(`/blog/${post.id}`)}
              role="button"
              tabIndex={0}
            >
              {post.image && (
                <div className="overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.tittle}
                    className="w-full h-48 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-500"
                    style={{
                      borderBottom: "1px solid rgba(224, 231, 239, 0.7)",
                    }}
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-bold text-indigo-800 mb-2 line-clamp-2">
                  {post.tittle}
                </h2>
                <div className="text-gray-500 text-sm mb-3 flex items-center">
                  <span className="mr-2">By {post.author}</span> •
                  <span className="ml-2">
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed flex-1">
                  {post.summary}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-300 mt-2 group/readmore"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/blog/${post.id}`);
                  }}
                >
                  Read More
                  <span className="ml-1 group-hover/readmore:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </a>
              </div>
            </div>
          ))
        ) : (
          // Empty state when no blogs are available
          <div className="col-span-3 text-center py-16">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-indigo-100/50">
              <h3 className="text-2xl font-bold text-indigo-700 mb-4">
                No blog posts yet
              </h3>
              <p className="text-gray-600 mb-6">
                Check back later for new articles and insights.
              </p>
              <div className="w-48 h-48 mx-auto bg-gradient-to-br from-indigo-100 to-violet-100 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-20 w-20 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Load More Button - Only show if there are blogs */}
      {blog.length > 0 && (
        <div className="mb-16">
          <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 transform hover:-translate-y-1">
            Load More Articles
          </button>
        </div>
      )}
    </section>
  );
}
