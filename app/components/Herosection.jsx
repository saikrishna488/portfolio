'use client';

import React from 'react';

const Hero = () => {
  return (
    <section className="bg-light-gray py-16 md:py-24 h-screen flex items-center">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        {/* Hero Text */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 mb-4">
          Hello, I'm Sai Krishna Reddy
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl">
          Full-stack developer passionate about creating intuitive, modern, and responsive web applications.
          Explore my projects and see how I bring ideas to life through code.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <a 
            href="#projects" 
            className="bg-purple-300 text-gray-800 px-8 py-3 rounded-full shadow-lg 
            hover:bg-purple-400 transition transform hover:scale-105"
          >
            Explore Projects
          </a>
          <a 
            href="#contact" 
            className="bg-blue-200 text-gray-800 border border-blue-300 px-8 py-3 rounded-full shadow-lg 
            hover:bg-blue-300 transition transform hover:scale-105"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
