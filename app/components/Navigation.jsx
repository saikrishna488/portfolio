import React from 'react';
import { 
  Code, // Projects
  Cpu, // Skills
  Award, // Achievements
  Mail, // Contact
  Users, // Leadership
  Certificate // Certifications
} from 'lucide-react';

const Navigation = () => {
  const pages = [
    { 
      title: 'Projects',
      link: '/projects',
      icon: Code,
      description: 'Explore my portfolio of projects and applications',
      color: 'from-blue-500 to-indigo-500'
    },
    { 
      title: 'Skills',
      link: '/skills',
      icon: Cpu,
      description: 'Technical skills and expertise overview',
      color: 'from-emerald-500 to-teal-500'
    },
    { 
      title: 'Achievements',
      link: '/achievements',
      icon: Award,
      description: 'Awards, honors and notable accomplishments',
      color: 'from-amber-500 to-orange-500'
    },
    { 
      title: 'Contact',
      link: '/contact',
      icon: Mail,
      description: 'Get in touch with me',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      title: 'Leadership',
      link: '/leadership',
      icon: Users,
      description: 'Leadership roles and experiences',
      color: 'from-red-500 to-rose-500'
    },
    { 
      title: 'Certifications',
      link: '/certifications',
      icon: Certificate,
      description: 'Professional certifications and credentials',
      color: 'from-cyan-500 to-blue-500'
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Portfolio Navigation</h1>
        <p className="text-gray-500 mb-8">Explore different sections of my professional portfolio</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => {
            const Icon = page.icon;
            
            return (
              <a
                key={page.title}
                href={page.link}
                className="group relative bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${page.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${page.color} bg-opacity-10`}>
                      <Icon className={`h-6 w-6 text-gray-700 group-hover:text-gray-900 transition-colors`} />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                      {page.title}
                    </h2>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {page.description}
                  </p>
                  
                  <div className="flex items-center text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                    View Section
                    <svg 
                      className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navigation;