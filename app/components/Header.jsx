'use client';

import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white shadow-lg fixed top-0 w-full z-10"> {/* Changed to a light gray */}
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-10">
        {/* Logo */}
        <div className="text-xl font-bold text-blue-600">
          <a href="/">Sai Krishna Reddy</a>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          <a href="#about" className="text-gray-800 hover:text-blue-600 transition">About</a>
          <a href="#projects" className="text-gray-800 hover:text-blue-600 transition">Projects</a>
          <a href="#achievements" className="text-gray-800 hover:text-blue-600 transition">Achievements</a>
          <a href="#skills" className="text-gray-800 hover:text-blue-600 transition">Skills</a>
          <a href="#leadership" className="text-gray-800 hover:text-blue-600 transition">Leadership</a> {/* Added Leadership */}
          <a href="#contact" className="text-gray-800 hover:text-blue-600 transition">Contact</a>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-light-gray shadow-lg"> {/* Same background color */}
          <div className="flex flex-col items-center space-y-4 py-6">
            <a href="#about" onClick={toggleMenu} className="text-gray-800 hover:text-blue-600 transition">About</a>
            <a href="#projects" onClick={toggleMenu} className="text-gray-800 hover:text-blue-600 transition">Projects</a>
            <a href="#achievements" onClick={toggleMenu} className="text-gray-800 hover:text-blue-600 transition">Achievements</a>
            <a href="#skills" onClick={toggleMenu} className="text-gray-800 hover:text-blue-600 transition">Skills</a>
            <a href="#leadership" onClick={toggleMenu} className="text-gray-800 hover:text-blue-600 transition">Leadership</a> {/* Added Leadership */}
            <a href="#contact" onClick={toggleMenu} className="text-gray-800 hover:text-blue-600 transition">Contact</a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
