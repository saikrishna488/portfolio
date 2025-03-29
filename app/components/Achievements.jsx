'use client';

import React from 'react';
import { FaTrophy, FaBriefcase, FaHackerrank, FaUserTie, FaCloud, FaMedal } from 'react-icons/fa';
import { motion } from 'framer-motion';

const achievements = [
  {
    title: "Reached RedBull Basement Nationals",
    description: "Got Selected as one of the team for Nationals in RedBull Basement event, a global innovation competition for university students. Presented innovative solution among top teams nationwide.",
    icon: <FaTrophy />,
    category: "International Recognition",
    date: "2024"
  },
  {
    title: "First Prize in Final Year Project Expo",
    description: "Awarded for the most impactful project during the final year project expo, demonstrating innovation and technical excellence.",
    icon: <FaMedal />,
    category: "Academic Excellence",
    date: "2024"
  },
  {
    title: "Job Offer from Buzzler Technologies",
    description: "Received a job offer during an off-campus recruitment drive held at T-Hub, recognizing strong technical and problem-solving abilities.",
    icon: <FaBriefcase />,
    category: "Career Achievement",
    date: "2024"
  },
  {
    title: "Hackathon Success",
    description: "Participated in various hackathons showcasing problem-solving skills and innovation, consistently ranking among top performers.",
    icon: <FaHackerrank />,
    category: "Technical Competition",
    date: "2022"
  },
  {
    title: "Leadership Excellence",
    description: "Led and organized various tech events and activities as Committee Member and Team Lead, impacting over 500+ students.",
    icon: <FaUserTie />,
    category: "Leadership",
    date: "2023"
  },
  {
    title: "Google Cloud Initiative Winner",
    description: "Winner of Project Saadhna Cycle 2, awarded $100 Google Cloud Credit Coupons for innovative cloud solution implementation.",
    icon: <FaCloud />,
    category: "Cloud Computing",
    date: "2024"
  }
];

const AchievementCard = ({ title, description, icon, category, date, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl opacity-50 
        blur-xl group-hover:opacity-70 transition-opacity duration-300" />
      
      <div className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="p-5"> {/* Reduced padding */}
          {/* Category Badge */}
          <div className="flex justify-between items-center mb-3"> {/* Reduced margin */}
            <span className="px-2.5 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
              {category}
            </span>
            <span className="text-xs text-gray-500">{date}</span>
          </div>

          {/* Icon and Title */}
          <div className="flex items-center gap-3 mb-3"> {/* Reduced gap and margin */}
            <span className="p-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-white">
              {icon}
            </span>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 
              transition-colors duration-200">
              {title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Achievements = () => {
  return (
    <section id="achievements" className="py-16 bg-gradient-to-b from-gray-50 to-white pt-20"> {/* Reduced padding */}
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl"> {/* Added max-width */}
        {/* Section Header */}
        <div className="text-center mb-12"> {/* Reduced margin */}
          <div className="flex items-center justify-center mb-4">
            <span className="h-1 w-6 bg-blue-600 rounded-full mr-2" />
            <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Achievements</h2>
            <span className="h-1 w-6 bg-blue-600 rounded-full ml-2" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"> {/* Reduced margin */}
            Notable{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Achievements
            </span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-sm"> {/* Reduced max-width and font size */}
            Highlighting key milestones and recognition received throughout my academic and professional journey
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Changed to 2 columns and reduced gap */}
          {achievements.map((achievement, index) => (
            <AchievementCard key={index} {...achievement} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;