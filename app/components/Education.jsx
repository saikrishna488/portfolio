import React from 'react';
import { GraduationCap, Building } from 'lucide-react'; // Importing Lucide icons

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
  <section id="education" className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
    <div className="container mx-auto px-6 lg:w-4/5">
      <h3 className="text-3xl font-extrabold mb-10 text-center text-gray-700 animate__animated animate__fadeIn">
        Education
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {educationEntries.map((entry, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:shadow-lg"
          >
            <div className="flex items-center mb-4">
              <Building className="text-blue-400 text-3xl mr-3" /> {/* Lucide Building icon */}
              <h4 className="text-xl font-bold text-gray-800">{entry.institution}</h4>
            </div>
            <div className="flex items-center mb-4">
              <GraduationCap className="text-green-400 text-3xl mr-3" /> {/* Lucide GraduationCap icon */}
              <p className="text-md text-gray-700">
                <strong>{entry.degree}</strong>
              </p>
            </div>
            <p className="text-gray-600 mb-2">
              CGPA: <span className="font-semibold text-gray-700">{entry.cgpa}</span>
            </p>
            <p className="text-gray-600">
              Duration: <span className="font-semibold text-gray-700">{entry.duration}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Education;
