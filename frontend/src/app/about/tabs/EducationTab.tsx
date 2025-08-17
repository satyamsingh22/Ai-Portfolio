"use client";

export default function EducationTab() {
  const education = [
    {
      logo: "/college.webp",
      year: "Expected 2025",
      title: "B.Tech in Computer Science & Engineering",
      place: "Rajkiya Engineering College, Sonbhadra",
    },
    {
      logo: "/school2.jpeg",
      year: "2020",
      title: "Class 12",
      place: "Shri Hari Inter College, Ballia",
    },
    {
      logo: "/school.jpeg",
      year: "2017",
      title: "Class 10",
      place: "LFCS Mau",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      {education.map((item, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center text-center bg-white rounded-2xl border border-gray-200 shadow-md p-6
                     transition-transform transform hover:-translate-y-2 hover:shadow-xl duration-300"
        >
          {/* Logo */}
          <div className="mb-4 flex items-center justify-center w-20 h-20 rounded-full bg-yellow-50 border border-yellow-200">
            <img
              src={item.logo}
              alt={item.title}
              className="w-12 h-12 object-contain"
            />
          </div>

          {/* Year */}
          <div className="text-sm font-semibold text-yellow-600 mb-2">
            {item.year}
          </div>

          {/* Title */}
          <div className="text-lg font-bold text-gray-800 mb-1 leading-snug">
            {item.title}
          </div>

          {/* College/School */}
          <div className="text-gray-500 text-sm">{item.place}</div>
        </div>
      ))}
    </div>
  );
}
