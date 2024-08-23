import React from 'react';
import { FaUniversity, FaGraduationCap } from 'react-icons/fa';

const educationEntries = [
  {
    institution: "Vignana Bharathi Institute of Technology, Hyderabad",
    degree: "Bachelor’s of Technology (BTech) in Computer Science",
    cgpa: "7.44",
    duration: "2020-2024",
  },
  // Add more entries here
];

const Education = () => (
  <section id="education" className="py-16 ">
    <div className="container mx-auto px-6">
      <h3 className="text-4xl font-extrabold mb-12 text-center text-gray-800 animate__animated animate__fadeIn">Education</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {educationEntries.map((entry, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl"
          >
            <div className="flex items-center mb-4">
              <FaUniversity className="text-blue-500 text-3xl mr-3" />
              <h4 className="text-xl font-semibold text-gray-800">{entry.institution}</h4>
            </div>
            <div className="flex items-center mb-4">
              <FaGraduationCap className="text-green-500 text-3xl mr-3" />
              <p className="text-lg text-gray-700">
                <strong>{entry.degree}</strong>
              </p>
            </div>
            <p className="text-gray-600 mb-2">CGPA: <span className="font-medium">{entry.cgpa}</span></p>
            <p className="text-gray-600">Duration: <span className="font-medium">{entry.duration}</span></p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Education;
