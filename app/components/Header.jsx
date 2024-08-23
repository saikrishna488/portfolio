"use client";
import { useState } from "react";
import { FaBars, FaTimes, FaProjectDiagram, FaCogs, FaTrophy, FaEnvelope } from "react-icons/fa";

const Header = () => {
    const [menu, setMenu] = useState(false);

    const toggleMenu = () => setMenu(!menu);

    return (
        <header className="fixed w-full z-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white py-4 shadow-lg">
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Desktop Menu */}
                <div className="hidden lg:flex lg:items-center lg:space-x-6">
                    <h1 className="text-2xl font-extrabold">Sai Krishna Reddy</h1>
                    <nav className="flex space-x-6">
                        <a href="#projects" className="flex items-center text-lg font-medium hover:text-gray-300 transition transform hover:scale-105">
                            <FaProjectDiagram className="mr-2" /> Projects
                        </a>
                        <a href="#skills" className="flex items-center text-lg font-medium hover:text-gray-300 transition transform hover:scale-105">
                            <FaCogs className="mr-2" /> Skills
                        </a>
                        <a href="#achievements" className="flex items-center text-lg font-medium hover:text-gray-300 transition transform hover:scale-105">
                            <FaTrophy className="mr-2" /> Achievements
                        </a>
                        <a href="#contact" className="flex items-center text-lg font-medium hover:text-gray-300 transition transform hover:scale-105">
                            <FaEnvelope className="mr-2" /> Contact
                        </a>
                    </nav>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden flex items-center">
                    <button onClick={toggleMenu} className="text-white text-2xl">
                        {menu ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden fixed inset-0 bg-gradient-to-r from-gray-800 to-gray-900 text-white transition-transform transform ${menu ? 'translate-x-0' : 'translate-x-full'} z-30`}>
                <div className="flex flex-col items-center pt-16">
                    <button onClick={toggleMenu} className="text-white text-2xl absolute top-4 right-4">
                        <FaTimes />
                    </button>
                    <nav className="flex flex-col space-y-6 mt-12">
                        <a href="#projects" className="flex items-center text-xl font-medium hover:text-gray-300 transition transform hover:scale-105" onClick={toggleMenu}>
                            <FaProjectDiagram className="mr-2" /> Projects
                        </a>
                        <a href="#skills" className="flex items-center text-xl font-medium hover:text-gray-300 transition transform hover:scale-105" onClick={toggleMenu}>
                            <FaCogs className="mr-2" /> Skills
                        </a>
                        <a href="#achievements" className="flex items-center text-xl font-medium hover:text-gray-300 transition transform hover:scale-105" onClick={toggleMenu}>
                            <FaTrophy className="mr-2" /> Achievements
                        </a>
                        <a href="#contact" className="flex items-center text-xl font-medium hover:text-gray-300 transition transform hover:scale-105" onClick={toggleMenu}>
                            <FaEnvelope className="mr-2" /> Contact
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
