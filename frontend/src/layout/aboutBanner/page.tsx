"use client";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaBriefcase, FaGraduationCap, FaTrophy, FaTools } from "react-icons/fa";

const BOXES = [
  { title: "Overview", key: "overview", icon: <FaUser size={32} className="text-[#8B0000]" /> },
  { title: "Experience", key: "experience", icon: <FaBriefcase size={32} className="text-[#C68642]" /> },
  { title: "Education", key: "education", icon: <FaGraduationCap size={32} className="text-[#DEB887]" /> },
  { title: "Achievements", key: "achievements", icon: <FaTrophy size={32} className="text-[#FFD700]" /> },
  { title: "Skills", key: "skills", icon: <FaTools size={32} className="text-[#4B3F2F]" /> },
];

export default function AboutSummaryPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    const updateShadows = () => {
      const sl = el.scrollLeft;
      const max = el.scrollWidth - el.clientWidth;
      setAtStart(sl <= 2);
      setAtEnd(sl >= max - 2);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", updateShadows, { passive: true });
    updateShadows();

    const onResize = () => updateShadows();
    window.addEventListener("resize", onResize);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", updateShadows);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const nudge = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.8);
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  // Handle box click: navigate to /about#tabkey
  const handleBoxClick = (key: string) => {
    router.push(`/about#${key}`);
  };

  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center py-8 bg-gradient-to-b from-[#FFFDE7] via-white to-[#FFFDE7]">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-extrabold mb-8 bg-gradient-to-r from-[#8B0000] via-[#C68642] to-[#DEB887] text-transparent bg-clip-text">
        About Me Summary
      </h1>

      <div className="relative w-full max-w-6xl group">
        {/* Fade edges */}
        {!atStart && (
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#FFFDE7] to-transparent rounded-l-3xl" />
        )}
        {!atEnd && (
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#FFFDE7] to-transparent rounded-r-3xl" />
        )}

        {/* Arrows */}
        {!atStart && (
          <button
            onClick={() => nudge("left")}
            className="hidden md:flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 shadow-md hover:shadow-lg transition-all group-hover:flex"
          >
            ‹
          </button>
        )}
        {!atEnd && (
          <button
            onClick={() => nudge("right")}
            className="hidden md:flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 shadow-md hover:shadow-lg transition-all group-hover:flex"
          >
            ›
          </button>
        )}

        {/* Scrollable cards */}
        <div
          ref={scrollRef}
          className="no-scrollbar scroll-smooth snap-x snap-mandatory overflow-x-auto px-2 md:px-4 py-1 flex space-x-5 md:space-x-6"
        >
          {BOXES.map((box) => (
            <div
              key={box.title}
              className="snap-start flex-shrink-0 min-w-[240px] md:min-w-[280px] lg:min-w-[320px] cursor-pointer"
              onClick={() => handleBoxClick(box.key)}
              tabIndex={0}
              role="button"
              aria-label={`Go to ${box.title} tab`}
            >
              {/* White border wrapper */}
              <div className="p-[3px] rounded-3xl bg-white shadow-lg">
                <div className="rounded-2xl bg-white/90 backdrop-blur-sm border border-white/80 px-6 py-7 md:px-8 md:py-9 flex flex-col items-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="mb-4 flex items-center justify-center">
                    <span className="bg-white border-4 border-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg text-3xl">
                      {box.icon}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-[#8B5C2A] tracking-wide">
                    {box.title}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}