'use client';

import React from 'react';

const About = () => {
  return (
    <section id="about" className="bg-light-gray h-screen py-16 flex items-center">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          About Me
        </h2>
        <p className="text-base text-gray-700 mb-4 max-w-3xl text-justify leading-relaxed">
          I am a Computer Science Engineering graduate with a passion for full-stack development and cloud technologies. 
          I enjoy solving complex problems and building applications that enhance user experiences.
        </p>
        <p className="text-base text-gray-700 mb-6 max-w-3xl text-justify leading-relaxed">
          My journey in tech began with a curiosity for how things work. 
          Over the years, I've honed my skills in various programming languages and frameworks, allowing me to create 
          innovative solutions and lead projects to success.
        </p>
        <a 
          href="#contact" 
          className="bg-green-300 text-gray-800 px-8 py-3 rounded-full shadow-md 
          hover:bg-green-400 transition-transform duration-200 transform hover:scale-105 font-semibold"
        >
          Let's Connect
        </a>
      </div>
    </section>
  );
};

export default About;
