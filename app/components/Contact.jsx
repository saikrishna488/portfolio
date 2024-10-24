import React from 'react';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

const contactDetails = [
  {
    icon: <FaEnvelope className="text-blue-400 text-3xl" />,
    label: "Email",
    link: "mailto:saikrishnapakkir@gmail.com",
    buttonLabel: "Send Email"
  },
  {
    icon: <FaGithub className="text-gray-700 text-3xl" />,
    label: "GitHub",
    link: "https://github.com/saikrishna488",
    buttonLabel: "View GitHub"
  },
  {
    icon: <FaLinkedin className="text-blue-600 text-3xl" />,
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/saikrishna488",
    buttonLabel: "Connect on LinkedIn"
  }
];

const Contact = () => (
  <section id="contact" className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
    <div className="container mx-auto px-6 lg:w-4/5"> {/* Set width to 80% on large screens */}
      <h3 className="text-2xl font-extrabold mb-12 text-center text-gray-700 animate__animated animate__fadeIn">Contact</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contactDetails.map((detail, index) => (
          <a 
            key={index} 
            href={detail.link} 
            className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-lg text-center"
          >
            <div className="flex justify-center mb-4">
              {detail.icon}
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">{detail.label}</h4>
            <button className="bg-blue-100 text-gray-700 py-2 px-5 rounded-full hover:bg-blue-200 transition-colors">
              {detail.buttonLabel}
            </button>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Contact;
