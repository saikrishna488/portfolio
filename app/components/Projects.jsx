'use client';

import React, { useState } from 'react';
import { FiGithub, FiExternalLink, FiSearch } from 'react-icons/fi';

const projects = [
  {
    title: "Image Gallery - Pixabay API",
    description: "React app for image searching using Pixabay API. Users can explore and find images based on keywords, and enjoy a responsive design for a seamless experience.",
    liveDemo: "https://image-gallery-steel-chi.vercel.app/",
    category: "web",
    github: "https://github.com/saikrishna488/image-gallery"
  },
  {
    title: "Public Party - Trending Shows and Movies",
    description: "Web app showcasing trending shows and movies using the IMDb API. Offers real-time updates and user-friendly navigation to discover new content. (discontinued)",
    liveDemo: "https://public-party.vercel.app/",
    category: "web",
    github: "https://github.com/saikrishna488/public-party"
  },
  {
    title: "Voice to Text - Speech-to-Text",
    description: "Speech recognition app built with React. Converts spoken language into text in real-time, featuring an intuitive user interface.",
    liveDemo: "https://speech-to-text-ecru-tau.vercel.app/",
    category: "ai",
    github: "https://github.com/saikrishna488/speech-to-text"
  },
  {
    title: "ApnAInterview Cracker - Job Tools",
    description: "Platform for creating personal portfolio websites. Includes templates and tools to help users showcase their skills effectively.",
    liveDemo: "https://nextjs-app-btkri2bn2q-em.a.run.app/",
    category: "web",
    github: "https://github.com/saikrishna488/apnainterview-cracker"
  },
  {
    title: "wChat – Real-time Chat App",
    description: "Dynamic chat app using React, Node.js, and Socket.IO. Allows users to chat in real-time, with features like group chats and notifications.",
    liveDemo: "https://wchat-frontned-btkri2bn2q-uc.a.run.app/",
    category: "web",
    github: "https://github.com/saikrishna488/chat-app"
  },
  {
    title: "Learning Logs",
    description: "Django app to track learning topics. Users can log their learning progress and set goals, providing insights into their education journey.",
    liveDemo: "https://learning-log-btkri2bn2q-em.a.run.app/",
    category: "web",
    github: "https://github.com/saikrishna488/learning-log"
  },
  {
    title: "Dictionary API – RESTful API",
    description: "RESTful API for dictionary services using Node.js. Provides definitions, synonyms, and antonyms, supporting various queries.",
    liveDemo: "https://dictionary-api-chi.vercel.app/dict/internet",
    category: "api",
    github: "https://github.com/saikrishna488/dictionary-api"
  },
  {
    title: "JWT Authentication App",
    description: "Secure user authentication system. Utilizes JSON Web Tokens (JWT) for robust security and user management, ideal for modern applications.",
    liveDemo: "https://mern-jwt-authentication-frontned.vercel.app/",
    category: "web",
    github: "https://github.com/saikrishna488/mern-jwt-authentication"
  },
  {
    title: "Alien Invasion (2D Game)",
    description: "Classic 2D arcade-style game with Pygame. Players defend against waves of alien invaders, featuring engaging graphics and sound effects.",
    liveDemo: "https://github.com/saikrishna488/alien_invasion",
    category: "game",
    github: "https://github.com/saikrishna488/alien_invasion"
  },
  {
    title: "Project Management App",
    description: "Project management app using React and GraphQL. Helps teams collaborate effectively with task tracking, status updates, and reporting.",
    liveDemo: "https://project-management-jade.vercel.app/",
    category: "web",
    github: "https://github.com/saikrishna488/project-management"
  },
  {
    title: "Python Voice Assistant",
    description: "Voice assistant for various tasks. Supports commands for scheduling, reminders, and information retrieval, showcasing AI capabilities.",
    liveDemo: "https://github.com/saikrishna488/voice-assistant",
    category: "ai",
    github: "https://github.com/saikrishna488/voice-assistant"
  },
  {
    title: "Hackermars",
    description: "Connect with diverse talent or hire top minds. A platform for hosting hackathons, bringing together innovators and employers.",
    liveDemo: "https://hackermars.vercel.app",
    category: "web",
    github: "https://github.com/saikrishna488/hackermars"
  }
];

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'web', 'api', 'game', 'ai'];

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || project.category === selectedCategory)
  );

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl"> {/* Reduced max width */}
        {/* Section Header */}
        <div className="text-center mb-12"> {/* Reduced margin */}
          <div className="flex items-center justify-center mb-4">
            <span className="h-1 w-6 bg-blue-600 rounded-full mr-2" />
            <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Projects</h2>
            <span className="h-1 w-6 bg-blue-600 rounded-full ml-2" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"> {/* Reduced margin */}
            Featured{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
  
          {/* Search and Filter */}
          <div className="max-w-xl mx-auto mb-8 space-y-4"> {/* Reduced max width and margin */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 
                  focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                    ${selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
  
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Changed to 2 columns */}
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg 
                transition-all duration-300 flex flex-col"
            >
              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 
                  transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">
                  {project.description}
                </p>
                
                {/* Actions */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 
                      hover:text-blue-700 transition-colors"
                  >
                    <FiExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 
                        hover:text-gray-800 transition-colors"
                    >
                      <FiGithub className="w-4 h-4" />
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;