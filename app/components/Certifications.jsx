'use client';

import React from 'react';
import { FaReact, FaJs, FaNodeJs, FaAws, FaPython, FaDocker, FaMicrosoft, FaServer, FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const certifications = [
  {
    title: "ReactJS",
    description: "Certification in ReactJS, showcasing skills in building dynamic and interactive UIs using React.",
    link: "https://www.coursera.org/account/accomplishments/verify/3TCLDAGLHTUW",
    icon: <FaReact className="text-blue-500" />,
    platform: "Coursera",
    issueDate: "2023"
  },
  {
    title: "JavaScript",
    description: "Certification in JavaScript, covering essential programming concepts and language features.",
    link: "https://www.hackerrank.com/certificates/64cc3d6392ff",
    icon: <FaJs className="text-yellow-500" />,
    platform: "HackerRank",
    issueDate: "2023"
  },
  {
    title: "REST API",
    description: "Certification in REST API development, focusing on creating robust and scalable web services.",
    link: "https://www.hackerrank.com/certificates/34a1c84f7167",
    icon: <FaServer className="text-green-600" />,
    platform: "HackerRank",
    issueDate: "2023"
  },
  {
    title: "Node.js",
    description: "Certification in Node.js, demonstrating proficiency in server-side JavaScript development.",
    link: "https://www.credly.com/badges/8d8d92d6-ace6-4c1e-b0e4-b997a70fab45/public_url",
    icon: <FaNodeJs className="text-green-500" />,
    platform: "Credly",
    issueDate: "2023"
  },
  {
    title: "AWS Cloud Foundations",
    description: "Certification in AWS Cloud Foundations, covering cloud computing basics and AWS services.",
    link: "https://www.credly.com/badges/fc15180b-31c7-4741-bdbd-4e2630132d73",
    icon: <FaAws className="text-orange-500" />,
    platform: "AWS",
    issueDate: "2023"
  },
  {
    title: "Azure",
    description: "Certification in Microsoft Azure, showcasing skills in cloud solutions and services provided by Azure.",
    link: "https://www.coursera.org/account/accomplishments/verify/AN6ZVTUGBQY6",
    icon: <FaMicrosoft className="text-blue-700" />,
    platform: "Microsoft",
    issueDate: "2023"
  },
  {
    title: "Python",
    description: "Certification in Python, demonstrating proficiency in Python programming and application development.",
    link: "https://www.coursera.org/account/accomplishments/verify/W6HHJPE4AE38",
    icon: <FaPython className="text-yellow-400" />,
    platform: "Coursera",
    issueDate: "2023"
  },
  {
    title: "Docker",
    description: "Certification in Docker, focusing on containerization and building scalable applications.",
    link: "https://www.credly.com/badges/19f9f4d5-a1fe-41a7-b5fe-030456f695b0/public_url",
    icon: <FaDocker className="text-blue-600" />,
    platform: "Docker",
    issueDate: "2023"
  }
];

const CertificationCard = ({ title, description, link, icon, platform, issueDate, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-blue-200 
        transition-all duration-300 hover:shadow-lg"
    >
      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-indigo-600" />
      <div className="p-6 pl-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{icon}</span>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <span className="text-sm text-gray-500">{issueDate}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-500">{platform}</span>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 
              hover:text-blue-700 transition-colors group-hover:gap-3"
          >
            View Certificate
            <FaExternalLinkAlt className="w-3 h-3 transition-all duration-300" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Certifications = () => {
  return (
    <section id="certifications" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <span className="h-1 w-6 bg-blue-600 rounded-full mr-2" />
            <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Certifications</h2>
            <span className="h-1 w-6 bg-blue-600 rounded-full ml-2" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Professional{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Certifications
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A collection of professional certifications that validate my expertise in various technologies
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <CertificationCard key={index} {...cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;