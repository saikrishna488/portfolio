'use client';

import React from 'react';
import { FiArrowDown, FiMail, FiCode } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const Hero = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FaGithub className="w-5 h-5" />,
      url: 'https://github.com/saikrishna488',
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedinIn className="w-5 h-5" />,
      url: 'https://www.linkedin.com/in/saikrishna488',
    },
    {
      name: 'Twitter',
      icon: <FaTwitter className="w-5 h-5" />,
      url: 'https://twitter.com/krishnaverseX',
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-b from-white to-gray-50/50">
      <div className="container mx-auto px-6 relative pt-20 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting Badge */}
          <div className="inline-block mb-8">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-600 border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-blue-600 mr-2" />
              Welcome to my portfolio
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Hello, I'm{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Sai Krishna Reddy
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed mx-auto max-w-2xl">
            Full-stack developer crafting modern web experiences with a passion for 
            clean code and intuitive design. Building digital solutions that make a difference.
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 mb-10">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-3 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 
                  transition-all duration-200 group"
                aria-label={social.name}
              >
                {social.icon}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-gray-500 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {social.name}
                </span>
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a 
              href="#projects" 
              className="group flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white font-medium 
                hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-500/20"
            >
              <FiCode className="w-5 h-5" />
              View Projects
              <FiArrowDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-1" />
            </a>
            <a 
              href="#contact" 
              className="group flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-gray-700 font-medium 
                border-2 border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200"
            >
              <FiMail className="w-5 h-5" />
              Get in Touch
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <span className="text-sm font-medium">Scroll to explore</span>
            <FiArrowDown className="w-5 h-5 animate-bounce" />
          </div>
        </div>

        {/* Optional: Decorative Background Elements */}
        <div className="absolute top-20 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
        <div className="absolute top-20 right-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
      </div>
    </section>
  );
};

export default Hero;