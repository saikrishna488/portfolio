'use client';

import React from 'react';
import { FaReact, FaNode, FaPython, FaDatabase, FaGit, FaJava, FaDocker } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiHtml5, SiCss3, SiDjango, SiPhp, SiCplusplus, SiC, SiMongodb, SiMysql, SiPostgresql } from 'react-icons/si';

const skillsData = [
  {
    category: 'Languages',
    description: 'Programming languages I work with',
    skills: [
      { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400" />, level: 90 },
      { name: 'TypeScript', icon: <SiTypescript className="text-blue-500" />, level: 85 },
      { name: 'Python', icon: <FaPython className="text-blue-500" />, level: 88 },
      { name: 'Java', icon: <FaJava className="text-red-500" />, level: 82 },
      { name: 'C++', icon: <SiCplusplus className="text-blue-600" />, level: 80 },
      { name: 'PHP', icon: <SiPhp className="text-purple-500" />, level: 75 },
    ]
  },
  {
    category: 'Frontend & Backend',
    description: 'Technologies and frameworks I use',
    skills: [
      { name: 'React', icon: <FaReact className="text-blue-400" />, level: 92 },
      { name: 'Node.js', icon: <FaNode className="text-green-500" />, level: 88 },
      { name: 'Django', icon: <SiDjango className="text-green-600" />, level: 85 },
      { name: 'HTML5', icon: <SiHtml5 className="text-orange-500" />, level: 95 },
      { name: 'CSS3', icon: <SiCss3 className="text-blue-500" />, level: 90 },
    ]
  },
  {
    category: 'Database & Tools',
    description: 'Databases and development tools',
    skills: [
      { name: 'MongoDB', icon: <SiMongodb className="text-green-500" />, level: 85 },
      { name: 'MySQL', icon: <SiMysql className="text-blue-500" />, level: 88 },
      { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-400" />, level: 82 },
      { name: 'Git', icon: <FaGit className="text-orange-500" />, level: 90 },
      { name: 'Docker', icon: <FaDocker className="text-blue-500" />, level: 80 },
    ]
  }
];

const SkillCard = ({ category, description, skills }) => (
  <div className="bg-white rounded-xl border border-gray-200 hover:border-blue-100 
    transition-all duration-300 hover:shadow-lg p-5">
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{category}</h3>
    <p className="text-gray-600 text-xs mb-4">{description}</p>
    
    <div className="space-y-4">
      {skills.map((skill, idx) => (
        <div key={idx} className="space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">{skill.icon}</span>
              <span className="text-gray-700 text-sm font-medium">{skill.name}</span>
            </div>
            <span className="text-xs text-gray-500">{skill.level}%</span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full 
                transition-all duration-500 ease-out"
              style={{ width: `${skill.level}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TechnicalSkills = () => {
  return (
    <section id="skills" className="py-16 bg-gradient-to-b from-gray-50 to-white pt-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <span className="h-1 w-6 bg-blue-600 rounded-full mr-2" />
            <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Skills</h2>
            <span className="h-1 w-6 bg-blue-600 rounded-full ml-2" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Technical{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Expertise
            </span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-sm">
            A comprehensive overview of my technical skills and proficiency levels
          </p>
        </div>

        {/* First Two Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkillCard {...skillsData[0]} />
          <SkillCard {...skillsData[1]} />
        </div>

        {/* Third Category */}
        <div className="mt-6">
          <SkillCard {...skillsData[2]} />
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;