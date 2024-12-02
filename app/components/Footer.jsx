'use client';

import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const socialLinks = [
  {
    name: 'Email',
    icon: <FaEnvelope className="w-5 h-5" />,
    href: 'mailto:saikrishnapakkir@gmail.com',
    color: 'hover:text-blue-400'
  },
  {
    name: 'GitHub',
    icon: <FaGithub className="w-5 h-5" />,
    href: 'https://github.com/saikrishna488',
    color: 'hover:text-gray-400'
  },
  {
    name: 'LinkedIn',
    icon: <FaLinkedin className="w-5 h-5" />,
    href: 'https://www.linkedin.com/in/saikrishna488',
    color: 'hover:text-blue-500'
  }
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/0 to-gray-900/10" />

      {/* Main Footer Content */}
      <div className="relative bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Border Gradient */}
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

          <div className="py-12">
            {/* Navigation Links */}
            <nav className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  About
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a href="#skills" className="text-gray-300 hover:text-white transition-colors">
                      Skills
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Work
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#projects" className="text-gray-300 hover:text-white transition-colors">
                      Projects
                    </a>
                  </li>
                  <li>
                    <a href="#achievements" className="text-gray-300 hover:text-white transition-colors">
                      Achievements
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Experience
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#leadership" className="text-gray-300 hover:text-white transition-colors">
                      Leadership
                    </a>
                  </li>
                  <li>
                    <a href="#education" className="text-gray-300 hover:text-white transition-colors">
                      Education
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Connect
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="/resume24.pdf" target='_blank' className="text-gray-300 hover:text-white transition-colors">
                      Resume
                    </a>
                  </li>
                </ul>
              </div>
            </nav>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 mb-8">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${link.color} transition-colors duration-300`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">{link.name}</span>
                  {link.icon}
                </motion.a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Made with <FaHeart className="inline-block text-red-500 mx-1 animate-pulse" /> by{' '}
                <span className="font-medium text-gray-300">Sai Krishna Reddy</span>
              </p>
              <p className="text-gray-500 text-sm mt-2">
                &copy; {currentYear} All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;