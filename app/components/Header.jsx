'use client';

import React, { useState, useEffect } from 'react';
import { FiUser, FiCode, FiAward, FiCpu, FiUsers, FiMail, FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: 'About', href: '#about', icon: FiUser },
    { name: 'Projects', href: '#projects', icon: FiCode },
    { name: 'Achievements', href: '#achievements', icon: FiAward },
    { name: 'Skills', href: '#skills', icon: FiCpu },
    { name: 'Leadership', href: '#leadership', icon: FiUsers },
    { name: 'Contact', href: '#contact', icon: FiMail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Optional: Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 
          ${scrolled 
            ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100' 
            : 'bg-white'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16"> {/* Reduced height here */}
            {/* Logo */}
            <a 
              href="/" 
              className="relative group flex items-center"
            >
              <span className="text-lg font-bold"> {/* Reduced text size */}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Sai
                </span>
                <span className="text-gray-700">Krishna</span>
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300" />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center space-x-1.5 
                      transition-all duration-200 group
                      ${isActive 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'stroke-2' : 'stroke-1.5'}`} />
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen 
                ? <FiX className="w-5 h-5 text-gray-600" /> 
                : <FiMenu className="w-5 h-5 text-gray-600" />
              }
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-14 z-40 md:hidden" // Adjusted top position
          >
            <div className="bg-white border-b border-gray-100 shadow-lg">
              <nav className="max-w-7xl mx-auto px-4 py-2"> {/* Reduced padding */}
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg mb-1 
                        transition-all duration-200
                        ${isActive 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                        }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'stroke-2' : 'stroke-1.5'}`} />
                      <span className="font-medium">{item.name}</span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;