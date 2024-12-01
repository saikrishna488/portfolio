'use client';

import React from 'react';
import { GraduationCap, Building, Calendar, Award, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const educationEntries = [
  {
    institution: "Vignana Bharathi Institute of Technology",
    location: "Hyderabad, India",
    degree: "Bachelor's of Technology (BTech)",
    major: "Computer Science Engineering",
    cgpa: "7.44",
    duration: "2020-2024",
    achievements: [
      "Member of Technical Club",
      "Participated in various hackathons",
      "Organized technical workshops"
    ]
  }
];

const EducationCard = ({ entry, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-xl 
        blur-xl group-hover:blur-2xl transition-all duration-300" />
      
      <div className="relative bg-white rounded-xl border border-gray-200 hover:border-blue-100 
        transition-all duration-300 hover:shadow-lg overflow-hidden">
        {/* Decorative Top Bar */}
        <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500" />
        
        <div className="p-6">
          {/* Institution */}
          <div className="flex items-start gap-4 mb-6">
            <span className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <Building className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {entry.institution}
              </h3>
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                {entry.location}
              </div>
            </div>
          </div>

          {/* Degree Info */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-medium text-gray-900">{entry.degree}</div>
                <div className="text-sm text-gray-600">{entry.major}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div className="text-gray-600">{entry.duration}</div>
            </div>

            <div className="flex items-center gap-3">
              <Award className="h-5 w-5 text-blue-600" />
              <div className="text-gray-900 font-medium">CGPA: {entry.cgpa}</div>
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900">Key Highlights</h4>
            {entry.achievements.map((achievement, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                {achievement}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Education = () => {
  return (
    <section id="education" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <span className="h-1 w-6 bg-blue-600 rounded-full mr-2" />
            <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Education</h2>
            <span className="h-1 w-6 bg-blue-600 rounded-full ml-2" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Academic{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Background
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            My educational journey and academic achievements that have shaped my technical foundation
          </p>
        </div>

        {/* Education Cards */}
        <div className="max-w-3xl mx-auto">
          {educationEntries.map((entry, index) => (
            <EducationCard key={index} entry={entry} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;