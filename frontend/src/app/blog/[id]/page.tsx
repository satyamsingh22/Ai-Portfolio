"use client";
import axios from "axios";
import matter from "gray-matter";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/blog/${id}/`);
        setBlog(res.data);
      } catch (e) {
        setBlog(null);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
          <p className="text-indigo-700 font-medium text-lg">
            Loading blog content...
          </p>
        </div>
      </div>
    );

  if (!blog)
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="text-center p-8 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-indigo-100/70 transform hover:scale-105 transition-transform duration-300">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Blog Not Found
          </h2>
          <p className="text-gray-600 max-w-md">
            The blog post you're looking for doesn't exist or may have been
            removed.
          </p>
          <button
            onClick={() => window.history.back()}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Go Back
          </button>
        </div>
      </div>
    );

  let markdownContent = blog?.content || "";
  if (markdownContent) {
    const parsed = matter(markdownContent);
    markdownContent = parsed.content;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 flex flex-col gap-12">
      {/* Section 1: Header */}
      <section
        id="header"
        className="max-w-4xl mx-auto text-center animate-fade-in bg-white/80 rounded-3xl shadow-xl border border-indigo-100/70 p-8 mb-0 transition-transform duration-300 hover:scale-[1.02]"
      >
        <div className="inline-block px-4 py-2 mb-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full border border-indigo-100/60 shadow-sm">
          <span className="text-sm font-medium text-indigo-600">
            Blog Article
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          {blog.tittle}
        </h1>
        <div className="flex items-center justify-center space-x-4 text-gray-600">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-indigo-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">{blog.author}</span>
          </div>
          <span>•</span>
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-indigo-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              {new Date(blog.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
        {/* Section navigation dots */}
        <div className="flex justify-center mt-6 gap-3">
          <button
            onClick={() =>
              document
                .getElementById("header")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="w-4 h-4 rounded-full bg-indigo-400 border-2 border-indigo-700 shadow transition-all hover:scale-125"
          ></button>
          <button
            onClick={() =>
              document
                .getElementById("content")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="w-4 h-4 rounded-full bg-purple-400 border-2 border-purple-700 shadow transition-all hover:scale-125"
          ></button>
          <button
            onClick={() =>
              document
                .getElementById("footer")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="w-4 h-4 rounded-full bg-pink-400 border-2 border-pink-700 shadow transition-all hover:scale-125"
          ></button>
        </div>
      </section>

      {/* Section 2: Content */}
      <section
        id="content"
        className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-indigo-100/60 animate-fade-in-up transition-transform duration-300 hover:scale-[1.01]"
      >
        {blog.image && (
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10"></div>
            <img
              src={blog.image}
              alt={blog.tittle}
              className="w-full h-72 md:h-96 object-cover transition-all duration-700 hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30 inline-block">
                <p className="text-sm font-medium">Featured Image</p>
              </div>
            </div>
          </div>
        )}
        <article className="p-8 md:p-12 h-[400px] md:h-[700px] overflow-y-auto scrollbar-thin">
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    className="text-4xl font-bold text-gray-900 mt-10 mb-6 pb-3 border-b border-indigo-100/60"
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    className="text-3xl font-bold text-gray-800 mt-10 mb-5 text-indigo-700"
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    className="text-2xl font-semibold text-gray-800 mt-8 mb-4 text-indigo-600"
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p
                    className="text-lg text-gray-700 mb-6 leading-8"
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="mb-6 pl-7 list-disc" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="mb-6 pl-7 list-decimal" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li
                    className="text-lg text-gray-700 ml-4 pl-2 leading-7 marker:text-indigo-500"
                    {...props}
                  />
                ),
                a: ({ node, ...props }) => (
                  <a
                    className="text-indigo-600 hover:text-indigo-800 underline transition-colors duration-300 font-medium"
                    {...props}
                  />
                ),
                strong: ({ node, ...props }) => (
                  <strong className="font-bold text-gray-900" {...props} />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="border-l-4 border-indigo-500 pl-6 py-2 my-8 bg-indigo-50/50 italic text-gray-700 rounded-r-lg"
                    {...props}
                  />
                ),
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto my-8 rounded-lg shadow-sm border border-indigo-100">
                    <table
                      className="min-w-full divide-y divide-indigo-100"
                      {...props}
                    />
                  </div>
                ),
                th: ({ node, ...props }) => (
                  <th
                    className="px-6 py-3 bg-indigo-50 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider"
                    {...props}
                  />
                ),
                td: ({ node, ...props }) => (
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-t border-indigo-100"
                    {...props}
                  />
                ),
                pre: ({ node, ...props }) => (
                  <pre
                    className="bg-gray-900 text-green-400 rounded-xl p-5 my-8 overflow-x-auto text-sm font-mono border border-gray-800 shadow-inner scrollbar-thin"
                    {...props}
                  />
                ),
                code: ({ node, ...props }) => (
                  <code
                    className="bg-gray-100 text-pink-600 px-2 py-1 rounded text-sm font-mono"
                    {...props}
                  />
                ),
                img: ({ node, ...props }) => (
                  <div className="my-8 rounded-xl overflow-hidden border border-indigo-100/60 shadow-md hover:scale-105 transition-transform duration-300">
                    <img className="w-full h-auto" {...props} />
                  </div>
                ),
              }}
            >
              {markdownContent}
            </ReactMarkdown>
          </div>
        </article>
      </section>

      {/* Section 3: Footer */}
      <section
        id="footer"
        className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-3xl shadow-xl border border-indigo-100/70 p-8 flex flex-col sm:flex-row justify-between items-center animate-fade-in-up transition-transform duration-300 hover:scale-[1.02]"
      >
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
            {blog.author.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-gray-800">
              Written by {blog.author}
            </p>
            <p className="text-sm text-gray-500">
              Posted on {new Date(blog.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="px-5 py-2.5 bg-indigo-100 text-indigo-700 rounded-full font-medium hover:bg-indigo-200 transition-colors duration-300 flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Back to Top
        </button>
      </section>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }

        /* Custom scrollbar for code blocks */
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(72, 187, 120, 0.6);
          border-radius: 3px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(72, 187, 120, 0.8);
        }

        /* Smooth scrolling for the entire page */
        html {
          scroll-behavior: smooth;
        }

        /* Prose styling for better readability */
        .prose {
          color: #374151;
        }

        .prose p {
          margin-bottom: 1.5rem;
        }

        .prose h1,
        .prose h2,
        .prose h3,
        .prose h4 {
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1.5rem;
        }

        .prose ul,
        .prose ol {
          margin-bottom: 1.5rem;
        }

        .prose blockquote {
          margin: 2rem 0;
          padding: 1.5rem;
          font-style: italic;
        }

        .prose code {
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.9em;
        }

        .prose pre {
          margin: 2rem 0;
          padding: 1.5rem;
          border-radius: 0.5rem;
          overflow-x: auto;
        }

        .prose table {
          width: 100%;
          margin: 2rem 0;
          border-collapse: collapse;
        }

        .prose th,
        .prose td {
          padding: 0.75rem 1rem;
          border: 1px solid #e5e7eb;
        }
      `}</style>
    </div>
  );
}
