'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { FiUser, FiCode, FiGlobe, FiCoffee } from 'react-icons/fi';

const About = () => {

  const router = useRouter();
  const highlights = [
    {
      icon: FiCode,
      title: 'Full Stack Developer',
      description: 'Experienced in building end-to-end web applications with modern technologies'
    },
    {
      icon: FiGlobe,
      title: 'Cloud Technologies',
      description: 'Proficient in cloud platforms and deploying scalable solutions'
    },
    {
      icon: FiCoffee,
      title: 'Problem Solver',
      description: 'Passionate about solving complex technical challenges'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <span className="h-1 w-6 bg-blue-600 rounded-full mr-2" />
              <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">About Me</h2>
              <span className="h-1 w-6 bg-blue-600 rounded-full ml-2" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Turning Ideas into{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Digital Reality
              </span>
            </h1>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                I am a Computer Science Engineering graduate with a passion for full-stack development 
                and cloud technologies. My journey in tech began with a curiosity for how things work, 
                and that curiosity has evolved into expertise.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Over the years, I've honed my skills in various programming languages and frameworks, 
                allowing me to create innovative solutions and lead projects to success. I believe in 
                writing clean, maintainable code and building user-centric applications.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-6">
                <a 
                  href="#contact" 
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white 
                    font-medium hover:bg-blue-700 transition-all duration-200 shadow-lg 
                    shadow-blue-500/20"
                >
                  Let's Connect
                </a>
                <button 
                  onClick={() => router.push('/resume25.pdf')}
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-50 text-gray-700 
                    font-medium border border-gray-200 hover:bg-gray-100 hover:border-gray-300 
                    transition-all duration-200"
                >
                  View Resume
                </button>
              </div>
            </div>

            {/* Right Column - Highlights */}
            <div className="grid gap-6">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={index}
                    className="group p-6 bg-white rounded-xl border border-gray-100 hover:border-blue-100 
                      shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start gap-4">
                      <span className="p-3 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 
                        transition-colors duration-200">
                        <Icon className="w-6 h-6" />
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;