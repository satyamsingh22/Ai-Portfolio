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
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading blog content...</p>
        </div>
      </div>
    );

  if (!blog)
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-sm border border-gray-200 max-w-md">
          <div className="text-5xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Blog Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The blog post you're looking for doesn't exist or may have been
            removed.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-5 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition-colors"
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-gray-100">
      {/* Banner Section - Full Width Gradient */}
      <div className="relative w-full mb-8">
        <div className="bg-gradient-to-r from-yellow-900 via-red-900 to-gray-900 w-full shadow-lg">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start justify-between px-8 py-10">
            {/* Left Side */}
            <div className="relative z-10">
              <button
                onClick={() => window.history.back()}
                className="flex items-center text-gray-200 hover:text-yellow-300 mb-6 text-sm font-medium"
              >
                ← Back to Blog
              </button>

              {/* Tags + Meta */}
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <span className="px-3 py-1 bg-gray-800 bg-opacity-70 text-yellow-200 rounded-full text-sm font-medium">
                  Comparison Blog
                </span>
                <span className="px-3 py-1 bg-gray-800 bg-opacity-70 text-yellow-200 rounded-full text-sm font-medium">
                  AI Voice Agent
                </span>
                <span className="flex items-center text-gray-300 text-sm">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6 2a1 1 0 00-1 1v1H4a2 2..."></path>
                  </svg>
                  {new Date(blog.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center text-gray-300 text-sm">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a8 8 0 100 16..."></path>
                  </svg>
                  5 min
                </span>
              </div>

              {/* Title with stylish font */}
              <h1 className="text-5xl font-extrabold font-serif tracking-wide text-yellow-100 mb-4 leading-snug drop-shadow">
                {blog.tittle}
              </h1>

              {/* Summary */}
              {blog.summary && (
                <p className="text-lg text-gray-200 mb-8 leading-relaxed font-light">
                  {blog.summary}
                </p>
              )}

              {/* Author with Gradient Initials */}
              <div className="flex items-center gap-3 border-t border-gray-700 pt-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-yellow-700 via-red-700 to-gray-800 text-yellow-100 font-bold text-xl shadow-lg">
                  {blog.author
                    ? blog.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : "A"}
                </div>
                <div>
                  <p className="font-semibold text-yellow-100">{blog.author}</p>
                  <p className="text-sm text-gray-400">Author</p>
                </div>
              </div>
            </div>

            {/* Right Side - Featured Image */}
            {blog.image && (
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-md self-end ml-auto">
                <img
                  src={blog.image}
                  alt={blog.tittle}
                  className="w-full max-w-lg h-64 lg:h-110 object-cover rounded-2xl"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Blog Content + Right Side Boxes */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Blog Content */}
        <div className="flex-1 bg-gray-900 rounded-2xl shadow-md p-8 mb-8 lg:mb-0 border border-gray-800">
          <article className="prose max-w-none prose-lg prose-invert prose-code:font-mono prose-code:text-base prose-code:bg-gray-800 prose-code:rounded prose-code:px-2 prose-code:py-1 prose-code:text-yellow-300 prose-blockquote:border-yellow-700 prose-blockquote:bg-gray-800 prose-blockquote:italic prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:rounded-lg prose-h1:text-yellow-200 prose-h2:text-yellow-300 prose-h3:text-yellow-400 prose-a:text-yellow-400 prose-a:underline hover:prose-a:text-yellow-200">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    className="text-3xl font-extrabold text-yellow-200 mt-10 mb-6 drop-shadow"
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    className="text-2xl font-bold text-yellow-300 mt-8 mb-5"
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    className="text-xl font-semibold text-yellow-400 mt-6 mb-4"
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p
                    className="text-gray-200 mb-5 leading-relaxed text-lg"
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="mb-5 pl-6 list-disc" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="mb-5 pl-6 list-decimal" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="text-gray-300 mb-2 text-base" {...props} />
                ),
                a: ({ node, ...props }) => (
                  <a
                    className="text-yellow-400 underline hover:text-yellow-200 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="border-l-4 border-yellow-700 pl-4 py-2 my-6 bg-gray-800 italic text-gray-300 rounded-lg"
                    {...props}
                  />
                ),
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto my-6">
                    <table
                      className="min-w-full divide-y divide-gray-700"
                      {...props}
                    />
                  </div>
                ),
                th: ({ node, ...props }) => (
                  <th
                    className="px-4 py-2 bg-gray-800 text-left text-base font-semibold text-yellow-300"
                    {...props}
                  />
                ),
                td: ({ node, ...props }) => (
                  <td
                    className="px-4 py-2 text-base text-gray-200 border-t border-gray-700"
                    {...props}
                  />
                ),
                pre: ({ node, ...props }) => (
                  <pre
                    className="bg-gray-800 text-yellow-300 rounded-lg p-4 my-6 overflow-x-auto text-base font-mono"
                    {...props}
                  />
                ),
                code: ({ node, ...props }) => (
                  <code
                    className="bg-gray-900 text-yellow-300 px-2 py-1 rounded font-mono text-base"
                    {...props}
                  />
                ),
                img: ({ node, ...props }) => (
                  <div className="my-8 flex justify-center">
                    <img
                      className="w-full max-w-xl h-auto rounded-lg shadow-lg"
                      {...props}
                    />
                  </div>
                ),
              }}
            >
              {markdownContent}
            </ReactMarkdown>
          </article>
        </div>
        {/* Right Side - Two Boxes */}
        <div className="flex flex-col gap-10 items-center justify-start w-full lg:w-96">
          {/* Share Box */}
          <div className="w-full h-56 bg-gray-900 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center border border-yellow-900">
            <h3 className="text-xl font-bold text-yellow-200 mb-3 tracking-tight">
              Share this article
            </h3>
            <p className="text-base text-gray-400 mb-6 text-center">
              Help others discover this content
            </p>
            <div className="flex gap-6 mb-2">
              {/* Twitter */}
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-yellow-300 transition"
              >
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.38c-.83.5-1.75.86-2.72 1.06A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.2 1.64 4.16c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.83 1.92 3.61-.71-.02-1.38-.22-1.97-.54v.05c0 2.09 1.49 3.83 3.47 4.23-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.68 2.11 2.9 3.97 2.93A8.6 8.6 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.38-.01-.57A8.72 8.72 0 0 0 24 4.59a8.48 8.48 0 0 1-2.54.7z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-yellow-300 transition"
              >
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.25c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.25h-3v-5.5c0-1.32-.03-3-1.83-3-1.83 0-2.11 1.43-2.11 2.91v5.59h-3v-10h2.88v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-yellow-300 transition"
              >
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.128v-3.622h3.128v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12v9.294h6.116c.733 0 1.325-.593 1.325-1.326v-21.349c0-.734-.592-1.326-1.325-1.326z" />
                </svg>
              </a>
              {/* Copy */}
              <button
                onClick={() =>
                  navigator.clipboard.writeText(window.location.href)
                }
                className="text-gray-400 hover:text-yellow-300 transition"
                title="Copy link"
              >
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 17l4 4 4-4m-4-5v9" />
                </svg>
              </button>
            </div>
          </div>
          {/* Author Box */}
          <div className="w-full h-56 bg-gray-900 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center border border-yellow-900">
            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-tr from-yellow-700 via-red-700 to-gray-800 text-yellow-100 font-extrabold text-4xl shadow mb-4">
              SS
            </div>
            <p className="font-bold text-xl text-yellow-100 mb-1">
              Satyam Singh
            </p>
            <p className="text-base text-gray-400">Author</p>
          </div>
        </div>
      </div>
    </div>
  );
}
