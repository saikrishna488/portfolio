'use client';

import React from 'react';
import { FaExternalLinkAlt, FaLightbulb, FaCode, FaRocket } from 'react-icons/fa';
import { motion } from 'framer-motion';

const leadershipEntries = [
  {
    title: "Co-Founder and Web Developer",
    organization: "ApnAInterview Cracker",
    description: "Led the launch and growth of a startup focused on providing job seekers with tools and resources. Contributed to all aspects from concept to execution, including coding, design, and strategic planning.",
    achievements: [
      "Developed full-stack web application",
      "Led team of 4 developers",
      "Implemented agile methodologies",
      "Increased user engagement by 150%"
    ],
    link: "https://nextjs-app-btkri2bn2q-em.a.run.app/",
    icon: <FaRocket />,
    period: "2022 - Present"
  },
  {
    title: "Founder and Developer",
    organization: "Hackermars",
    description: "Created and launched a platform connecting tech talent with opportunities through hackathons and coding challenges. Built a community-driven space for innovation and collaboration.",
    achievements: [
      "Developed end-to-end platform",
      "Integrated real-time features",
      "Built user authentication system",
      "Implemented responsive design"
    ],
    link: "https://hackermars.vercel.app",
    icon: <FaCode />,
    period: "2024 - Present"
  }
];

const LeadershipCard = ({ entry, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-blue-200 
        transition-all duration-300 hover:shadow-lg"
    >
      <div className="p-5"> {/* Reduced padding */}
        {/* Header */}
        <div className="flex items-center justify-between mb-3"> {/* Reduced margin */}
          <div className="flex items-center gap-2"> {/* Reduced gap */}
            <span className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 
              transition-colors duration-200">
              {entry.icon}
            </span>
            <div>
              <h3 className="text-base font-semibold text-gray-900">{entry.title}</h3> {/* Reduced font size */}
              <p className="text-xs text-gray-600">{entry.organization}</p> {/* Reduced font size */}
            </div>
          </div>
          <span className="text-xs text-gray-500">{entry.period}</span> {/* Reduced font size */}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3"> {/* Reduced margin */}
          {entry.description}
        </p>

        {/* Achievements */}
        <div className="space-y-1.5 mb-3"> {/* Reduced spacing */}
          {entry.achievements.map((achievement, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-gray-600"> {/* Reduced font size */}
              <span className="w-1 h-1 bg-blue-500 rounded-full" /> {/* Reduced dot size */}
              {achievement}
            </div>
          ))}
        </div>

        {/* Link */}
        <div className="pt-3 border-t border-gray-100"> {/* Reduced padding */}
          <a
            href={entry.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 
              hover:text-blue-700 transition-colors group-hover:gap-2"
          >
            View Initiative
            <FaExternalLinkAlt className="w-3 h-3 transition-all duration-300" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Leadership = () => {
  return (
    <section id="leadership" className="py-16 bg-gradient-to-b from-gray-50 to-white pt-20"> {/* Reduced padding */}
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl"> {/* Added max-width */}
        {/* Section Header */}
        <div className="text-center mb-12"> {/* Reduced margin */}
          <div className="flex items-center justify-center mb-4">
            <span className="h-1 w-6 bg-blue-600 rounded-full mr-2" />
            <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Leadership</h2>
            <span className="h-1 w-6 bg-blue-600 rounded-full ml-2" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"> {/* Reduced margin */}
            Leadership &{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Initiatives
            </span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-sm"> {/* Reduced max-width and font size */}
            Showcasing leadership experiences and initiatives that demonstrate my ability to drive innovation
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Changed to 2 columns */}
          {leadershipEntries.map((entry, index) => (
            <LeadershipCard key={index} entry={entry} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leadership;