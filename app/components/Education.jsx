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
  <section id="education" className="py-16 bg-gradient-to-r from-indigo-50 to-green-50">
    <div className="container mx-auto px-6 lg:w-4/5"> {/* Set width to 80% on large screens */}
      <h3 className="text-3xl font-extrabold mb-10 text-center text-gray-800 animate__animated animate__fadeIn">Education</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {educationEntries.map((entry, index) => (
          <div 
            key={index} 
            className="bg-white p-5 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:shadow-lg"
          >
            <div className="flex items-center mb-3">
              <FaUniversity className="text-blue-500 text-3xl mr-2" />
              <h4 className="text-lg font-semibold text-gray-800">{entry.institution}</h4>
            </div>
            <div className="flex items-center mb-3">
              <FaGraduationCap className="text-green-500 text-3xl mr-2" />
              <p className="text-md text-gray-700">
                <strong>{entry.degree}</strong>
              </p>
            </div>
            <p className="text-gray-600 mb-1">CGPA: <span className="font-medium">{entry.cgpa}</span></p>
            <p className="text-gray-600">Duration: <span className="font-medium">{entry.duration}</span></p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Education;
