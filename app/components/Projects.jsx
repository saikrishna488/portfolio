'use client';

import React from 'react';

// Function to generate random light gradients
const getRandomLightGradient = () => {
  const colors = [
    '#FFB6C1', // Light Pink
    '#FFD700', // Gold
    '#ADD8E6', // Light Blue
    '#90EE90', // Light Green
    '#FFDEAD', // Navajo White
    '#E6E6FA', // Lavender
    '#FFFACD', // Lemon Chiffon
    '#B0E0E6', // Powder Blue
    '#FAFAD2', // Light Goldenrod
    '#FFE4E1', // Misty Rose
  ];
  
  const color1 = colors[Math.floor(Math.random() * colors.length)];
  const color2 = colors[Math.floor(Math.random() * colors.length)];

  return `linear-gradient(135deg, ${color1}, ${color2})`;
};

const projects = [
  {
    title: "Image Gallery - Pixabay API",
    description: "React app for image searching using Pixabay API. Users can explore and find images based on keywords, and enjoy a responsive design for a seamless experience.",
    liveDemo: "https://image-gallery-steel-chi.vercel.app/",
  },
  {
    title: "Public Party - Trending Shows and Movies",
    description: "Web app showcasing trending shows and movies using the IMDb API. Offers real-time updates and user-friendly navigation to discover new content.",
    liveDemo: "https://public-party.vercel.app/",
  },
  {
    title: "Voice to Text - Speech-to-Text",
    description: "Speech recognition app built with React. Converts spoken language into text in real-time, featuring an intuitive user interface.",
    liveDemo: "https://speech-to-text-ecru-tau.vercel.app/",
  },
  {
    title: "ApnAInterview Cracker - Job Tools",
    description: "Platform for creating personal portfolio websites. Includes templates and tools to help users showcase their skills effectively.",
    liveDemo: "https://nextjs-app-btkri2bn2q-em.a.run.app/",
  },
  {
    title: "wChat – Real-time Chat App",
    description: "Dynamic chat app using React, Node.js, and Socket.IO. Allows users to chat in real-time, with features like group chats and notifications.",
    liveDemo: "https://wchat-frontned-btkri2bn2q-uc.a.run.app/",
  },
  {
    title: "Learning Logs",
    description: "Django app to track learning topics. Users can log their learning progress and set goals, providing insights into their education journey.",
    liveDemo: "https://learning-log-btkri2bn2q-em.a.run.app/",
  },
  {
    title: "Dictionary API – RESTful API",
    description: "RESTful API for dictionary services using Node.js. Provides definitions, synonyms, and antonyms, supporting various queries.",
    liveDemo: "https://dictionary-api-chi.vercel.app/dict/internet",
  },
  {
    title: "JWT Authentication App",
    description: "Secure user authentication system. Utilizes JSON Web Tokens (JWT) for robust security and user management, ideal for modern applications.",
    liveDemo: "https://mern-jwt-authentication-frontned.vercel.app/",
  },
  {
    title: "Alien Invasion (2D Game)",
    description: "Classic 2D arcade-style game with Pygame. Players defend against waves of alien invaders, featuring engaging graphics and sound effects.",
    liveDemo: "https://github.com/saikrishna488/alien_invasion",
  },
  {
    title: "Project Management App",
    description: "Project management app using React and GraphQL. Helps teams collaborate effectively with task tracking, status updates, and reporting.",
    liveDemo: "https://project-management-jade.vercel.app/",
  },
  {
    title: "Python Voice Assistant",
    description: "Voice assistant for various tasks. Supports commands for scheduling, reminders, and information retrieval, showcasing AI capabilities.",
    liveDemo: "https://github.com/saikrishna488/voice-assistant",
  },
  {
    title: "Hackermars",
    description: "Connect with diverse talent or hire top minds. A platform for hosting hackathons, bringing together innovators and employers.",
    liveDemo: "https://hackermars.vercel.app",
  }
];

const Projects = () => {
  return (
    <section id="projects" className="bg-light-gray  py-24">
      <div className="container mx-auto px-6 md:px-12 lg:w-4/5">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
          My Projects
        </h2>
        <div className="flex flex-col gap-8 md:grid md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={index}
              style={{ background: getRandomLightGradient() }} // Apply random gradient background
              className="rounded-lg p-6 shadow-md transition-transform transform hover:scale-105 hover:shadow-xl flex flex-col"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4 h-[200px] overflow-hidden text-sm">
                {project.description}
              </p>
              <div className="mt-auto">
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md shadow hover:bg-gray-300 transition-all duration-300 transform hover:scale-105 font-semibold"
                >
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
