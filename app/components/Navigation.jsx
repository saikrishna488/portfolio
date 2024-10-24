import React from 'react';

const Navigation = () => {
  const pages = [
    { title: 'Projects', link: '/projects' },
    { title: 'Skills', link: '/skills' },
    { title: 'Achievements', link: '/achievements' },
    { title: 'Contact', link: '/contact' },
    { title: 'Leadership', link: '/leadership' },
    { title: 'Certifications', link: '/certifications' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page) => (
          <div
            key={page.title}
            className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4">{page.title}</h2>
            <a
              href={page.link}
              className="inline-block bg-blue-300 text-gray-800 py-2 px-4 rounded hover:bg-blue-400 transition-colors"
            >
              Go to {page.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
