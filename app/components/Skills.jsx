'use client';

import React from 'react';
import { FaReact, FaNode, FaPython, FaDatabase, FaGit } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiHtml5, SiCss3, SiDjango, SiPhp, SiC } from 'react-icons/si';

const skillsData = [
  {
    category: 'Languages',
    skills: [
      { name: 'JavaScript', icon: <SiJavascript /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'C', icon: <SiC /> },
      { name: 'C++', icon: <SiC /> }, // Use the same icon for C++ (or a different choice if you find one)
      { name: 'Java', icon: <FaDatabase /> }, // Use a generic icon for Java
      { name: 'Python', icon: <FaPython /> },
      { name: 'PHP', icon: <SiPhp /> },
    ],
  },
  {
    category: 'Frameworks',
    skills: [
      { name: 'React', icon: <FaReact /> },
      { name: 'Node.js', icon: <FaNode /> },
      { name: 'Django', icon: <SiDjango /> },
    ],
  },
  {
    category: 'Databases',
    skills: [
      { name: 'MongoDB', icon: <FaDatabase /> },
      { name: 'MySQL', icon: <FaDatabase /> },
      { name: 'SQL', icon: <FaDatabase /> },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git', icon: <FaGit /> },
      { name: 'Docker', icon: <FaDatabase /> },
    ],
  },
];

const TechnicalSkills = () => {
  return (
    <section id="skills" className="bg-light-gray py-24 ">
      <div className="container mx-auto px-6 md:px-12 lg:w-4/5">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-12">
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((category, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{category.category}</h3>
              <div className="grid grid-cols-2 gap-4">
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center bg-gray-100 p-3 rounded-md shadow">
                    <span className="text-2xl text-green-600 mr-2">{skill.icon}</span>
                    <span className="text-gray-800">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;
