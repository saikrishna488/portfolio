'use client';

import React from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const contactDetails = [
  {
    icon: <FaEnvelope className="w-6 h-6" />,
    label: "Email",
    value: "saikrishnapakkir@gmail.com",
    link: "mailto:saikrishnapakkir@gmail.com",
    buttonLabel: "Send Email",
    color: "from-blue-500 to-indigo-500",
    hoverColor: "group-hover:from-blue-600 group-hover:to-indigo-600"
  },
  {
    icon: <FaGithub className="w-6 h-6" />,
    label: "GitHub",
    value: "github.com/saikrishna488",
    link: "https://github.com/saikrishna488",
    buttonLabel: "View Profile",
    color: "from-gray-700 to-gray-900",
    hoverColor: "group-hover:from-gray-800 group-hover:to-black"
  },
  {
    icon: <FaLinkedin className="w-6 h-6" />,
    label: "LinkedIn",
    value: "linkedin.com/in/saikrishna488",
    link: "https://www.linkedin.com/in/saikrishna488",
    buttonLabel: "Connect",
    color: "from-blue-600 to-blue-800",
    hoverColor: "group-hover:from-blue-700 group-hover:to-blue-900"
  }
];

const ContactCard = ({ detail, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${detail.color} rounded-xl opacity-5 
        blur-xl group-hover:opacity-10 transition-all duration-300`} />
      
      <div className="relative bg-white rounded-xl border border-gray-200 hover:border-gray-300 
        transition-all duration-300 hover:shadow-lg overflow-hidden">
        <div className="p-6">
          {/* Icon and Label */}
          <div className="flex items-start gap-4 mb-4"> {/* Changed to items-start */}
            <span className={`p-3 bg-gradient-to-r ${detail.color} ${detail.hoverColor} 
              rounded-lg text-white transition-all duration-300 shrink-0`}> {/* Added shrink-0 */}
              {detail.icon}
            </span>
            <div className="min-w-0"> {/* Added min-w-0 for text truncation */}
              <h3 className="text-lg font-semibold text-gray-900 truncate">{detail.label}</h3>
              <p className="text-sm text-gray-600 truncate">{detail.value}</p>
            </div>
          </div>

          {/* Action Button */}
          <a
            href={detail.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-4 group/button flex items-center justify-between w-full px-4 py-2.5 
              rounded-lg bg-gradient-to-r ${detail.color} ${detail.hoverColor} text-white 
              transition-all duration-300`}
          >
            <span className="font-medium truncate mr-2">{detail.buttonLabel}</span> {/* Added truncate and mr-2 */}
            <FaArrowRight className="w-4 h-4 transition-transform duration-300 
              group-hover/button:translate-x-1 shrink-0" /> {/* Added shrink-0 */}
          </a>
        </div>
      </div>
    </motion.div>
  );
};
const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <span className="h-1 w-6 bg-blue-600 rounded-full mr-2" />
            <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Contact</h2>
            <span className="h-1 w-6 bg-blue-600 rounded-full ml-2" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get in{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Feel free to reach out for collaborations or just a friendly hello
          </p>
        </div>

        {/* Contact Cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactDetails.map((detail, index) => (
            <ContactCard key={index} detail={detail} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;