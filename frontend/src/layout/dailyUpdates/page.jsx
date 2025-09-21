"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DailyUpdatesPreview() {
  const [updates, setUpdates] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/dailyupdates/")
      .then((res) => res.json())
      .then(setUpdates);
  }, []);

  const toggleReadMore = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="md:px-8 py-16 rounded-3xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Heading */}
      <h2 className="text-4xl font-extrabold mb-4 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text drop-shadow-lg">
        See My Daily Updates
      </h2>

      {/* Sub description */}
      <p className="text-center max-w-2xl mx-auto text-gray-700 mb-12 text-base md:text-lg leading-relaxed">
        Explore what I’ve been working on over the past few days — from new blog
        posts to behind-the-scenes updates. Stay tuned as I share my growth and
        experiences daily.
      </p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {updates.slice(0, 4).map((update, i) => {
          const isExpanded = expanded[update.id] || false;
          const contentPreview = update.content
            ?.split(" ")
            .slice(0, 50)
            .join(" ");
          const isLong = update.content?.split(" ").length > 50;

          return (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, type: "spring", stiffness: 120 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Gradient Card Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 rounded-2xl"></div>

              {/* Inner content with solid background for readability */}
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl h-full flex flex-col">
                {update.image && (
                  <div className="w-full aspect-[16/9] overflow-hidden rounded-t-2xl">
                    <img
                      src={update.image}
                      alt={update.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-6 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {update.title}
                  </h3>
                  <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                    {update.summary}
                  </p>
                  <span className="text-xs italic text-gray-500 mb-4">
                    {new Date(update.created_at).toLocaleDateString()}
                  </span>

                  <p className="text-gray-800 text-sm leading-relaxed">
                    {isExpanded ? update.content : contentPreview}
                    {isLong && (
                      <button
                        type="button"
                        onClick={() => toggleReadMore(update.id)}
                        className="ml-2 text-blue-600 font-medium hover:underline focus:outline-none"
                      >
                        {isExpanded ? "Read Less" : "Read More"}
                      </button>
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA Button */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
      >
        <Link
          href="/dailyupdates"
          className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-md hover:shadow-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
        >
          See All My Daily Updates
        </Link>
      </motion.div>
    </section>
  );
}
