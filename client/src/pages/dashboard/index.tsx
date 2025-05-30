import React from "react";

const features = [
  {
    icon: (
      <svg width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="36" rx="8" fill="#6D28D9" />
        <path d="M14 12h8v12h-8z" fill="#fff"/>
      </svg>
    ),
    title: "Doctrine Comparison",
    description: "Compare theological positions between different denominations and traditions.",
    link: "/theological-comparison",
  },
  {
    icon: (
      <svg width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="36" rx="8" fill="#6D28D9" />
        <path d="M18 12v12M12 18h12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Sermon Builder",
    description: "Create sermon outlines, find illustrations, and develop content for your preaching.",
    link: "/sermon-assistant",
  },
  {
    icon: (
      <svg width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="36" rx="8" fill="#6D28D9" />
        <path d="M12 18a6 6 0 1112 0 6 6 0 01-12 0z" stroke="#fff" strokeWidth="2"/>
      </svg>
    ),
    title: "Counseling",
    description: "Access resources and guidance for pastoral counseling sessions across various topics.",
    link: "/biblical-counseling",
  },
  {
    icon: (
      <svg width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="36" rx="8" fill="#6D28D9" />
        <path d="M14 14h8v8h-8z" fill="#fff" />
      </svg>
    ),
    title: "Resource Library",
    description: "Discover books, articles, and other materials to deepen your theological knowledge.",
    link: "/resources",
  },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 bg-gradient-to-b from-slate-900 to-slate-800">
      <h1 className="text-4xl font-bold mt-12 mb-4 text-white text-center">
        Welcome to eAI Ministry Tool
      </h1>
      <p className="mb-8 text-lg text-slate-200 text-center max-w-2xl">
        A comprehensive AI-powered tool for ministry leaders to assist with doctrine comparison, sermon building, pastoral counseling, and theological resources.
      </p>
      <a
        href="/dashboard"
        className="mb-12 px-6 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition"
      >
        Go to Dashboard
      </a>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col items-center bg-slate-800 rounded-xl p-8 shadow-lg"
          >
            <div className="mb-4">{feature.icon}</div>
            <h2 className="text-xl font-semibold mb-2 text-white text-center">{feature.title}</h2>
            <p className="text-slate-300 text-center mb-4">{feature.description}</p>
            <a
              href={feature.link}
              className="mt-auto px-4 py-1 bg-violet-700 text-white rounded hover:bg-violet-800 transition"
            >
              Explore
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
