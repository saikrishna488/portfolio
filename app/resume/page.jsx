'use client';

import React from 'react';
import { 
  FaDownload, FaGithub, FaLinkedin, FaEnvelope, 
  FaCode, FaServer, FaDatabase, FaTools 
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const Resume = () => {
  const handleDownload = () => {
    window.open('/resume24.pdf', '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Header with Download Button */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Sai Krishna Reddy</h1>
            <div className="flex items-center gap-4 mt-2">
              <a href="mailto:saikrishnapakkir@gmail.com" className="text-gray-600 hover:text-blue-600 flex items-center gap-2">
                <FaEnvelope /> saikrishnapakkir@gmail.com
              </a>
              <a href="https://github.com/saikrishna488" target="_blank" rel="noopener noreferrer" 
                className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <FaGithub /> github.com/saikrishna488
              </a>
              <a href="https://www.linkedin.com/in/saikrishna488" target="_blank" rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-700 flex items-center gap-2">
                <FaLinkedin /> linkedin.com/in/saikrishna488
              </a>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 
              hover:bg-blue-700 transition-colors"
          >
            <FaDownload /> Download Resume
          </motion.button>
        </div>

        {/* Main Content */}
        <div className="space-y-10">
          {/* Education */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              Education
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                Bachelor's of Technology (BTech) in Computer Science
              </h3>
              <p className="text-gray-600">Vignana Bharathi Institute of Technology, Hyderabad</p>
              <div className="flex justify-between mt-2 text-gray-600">
                <span>CGPA: 7.44</span>
                <span>2020-2024</span>
              </div>
            </div>
          </section>

          {/* Technical Skills */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SkillCategory
                icon={<FaCode />}
                title="Languages"
                skills={["JavaScript", "TypeScript", "Python", "Java", "C++", "PHP"]}
              />
              <SkillCategory
                icon={<FaServer />}
                title="Frameworks"
                skills={["React", "Node.js", "Django", "Express.js"]}
              />
              <SkillCategory
                icon={<FaDatabase />}
                title="Databases"
                skills={["MongoDB", "MySQL", "PostgreSQL"]}
              />
              <SkillCategory
                icon={<FaTools />}
                title="Tools"
                skills={["Git", "Docker", "AWS", "Azure"]}
              />
            </div>
          </section>

          {/* Projects */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {[
                {
                  title: "ApnAInterview Cracker",
                  description: "Platform for creating personal portfolio websites. Includes templates and tools to help users showcase their skills effectively.",
                  link: "https://nextjs-app-btkri2bn2q-em.a.run.app/"
                },
                {
                  title: "Hackermars",
                  description: "Connect with diverse talent or hire top minds. A platform for hosting hackathons, bringing together innovators and employers.",
                  link: "https://hackermars.vercel.app"
                },
                {
                  title: "wChat – Real-time Chat App",
                  description: "Dynamic chat app using React, Node.js, and Socket.IO. Allows users to chat in real-time, with features like group chats and notifications.",
                  link: "https://wchat-frontned-btkri2bn2q-uc.a.run.app/"
                }
              ].map((project, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                  <p className="text-gray-600 mt-2">{project.description}</p>
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 mt-2 inline-block"
                  >
                    View Project →
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Achievements */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              Achievements
            </h2>
            <ul className="list-disc list-inside space-y-3 text-gray-600">
              <li>RedBull Basement National Finalist</li>
              <li>First Prize in Final Year Project Expo</li>
              <li>Winner of Project Saadhna Cycle 2 (Google Cloud Initiative)</li>
              <li>Multiple Hackathon Participations and Achievements</li>
            </ul>
          </section>

          {/* Certifications */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              Certifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "ReactJS", "JavaScript", "REST API", "Node.js",
                "AWS Cloud Foundations", "Azure", "Python", "Docker"
              ].map((cert, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                  {cert}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

const SkillCategory = ({ icon, title, skills }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
    <div className="flex items-center gap-2 mb-4">
      <span className="text-blue-600">{icon}</span>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span 
          key={index}
          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

export default Resume;