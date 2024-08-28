import { FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  {
    title: "Image Gallery - Pixabay API",
    description: "Developed a React-based application that leverages the Pixabay API for seamless image searching.",
    liveDemo: "https://image-gallery-steel-chi.vercel.app/",
    imgSrc: "image-gallery.png" 
  },
  {
    title: "Public Party - Trending Shows and Movies",
    description: "Created a web application that showcases trending shows and movies by utilizing the IMDb API (discontinued).",
    liveDemo: "https://public-party.vercel.app/",
    imgSrc: "public-party.png"
  },
  {
    title: "Voice to Text - Speech-to-Text Conversion",
    description: "Engineered a speech recognition app using React and the Speech Recognition library.",
    liveDemo: "https://speech-to-text-ecru-tau.vercel.app/",
    imgSrc: "speech-to-text.png"
  },
  {
    title: "ApnAInterview Cracker - Job-Ready Tools",
    description: "Developed a comprehensive platform for creating personal portfolio websites and more.",
    liveDemo: "https://nextjs-app-btkri2bn2q-em.a.run.app/",
    imgSrc: "apnainterview.png"
  },
  {
    title: "wChat – Real-time Chat Application",
    description: "Built a dynamic real-time chat application using React, Node.js, Express, and Socket.IO.",
    liveDemo: "https://wchat-frontned-btkri2bn2q-uc.a.run.app/",
    imgSrc: "wchat.png"
  },
  {
    title: "Dictionary API – RESTful API",
    description: "Designed a RESTful API with Node.js and Express.js providing dictionary services.",
    liveDemo: "https://dictionary-api-chi.vercel.app/dict/internet",
    imgSrc: "api.png"
  },
  {
    title: "JWT Authentication App",
    description: "Created a secure user authentication system with JWT-based authentication.",
    liveDemo: "https://mern-jwt-authentication-frontned.vercel.app/",
    imgSrc: "jwt-auth.png"
  },
  {
    title: "Alien Invasion (2D Game)",
    description: "Developed a classic 2D arcade-style game using the Pygame library.",
    liveDemo: "https://github.com/saikrishna488/alien_invasion",
    imgSrc: "alien-invasion.png"
  },
  {
    title: "Project Management App",
    description: "Built a project management app using React, GraphQL, and MongoDB.",
    liveDemo: "https://project-management-jade.vercel.app/",
    imgSrc: "proj-management.png"
  },
  {
    title: "Python Voice Assistant",
    description: "Developed a Python voice assistant for tasks like telling time and Google searches.",
    liveDemo: "https://github.com/saikrishna488/voice-assistant",
    imgSrc: "voice-assistant.png"
  }
];
const ProjectCard = ({ project }) => (
  <div className="group relative bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105">
    <img src={project.imgSrc} alt={project.title} className="w-full h-48 object-cover rounded-xl mb-4 opacity-90 group-hover:opacity-100 transition-opacity" />
    <div className="absolute inset-0 bg-gray-800 bg-opacity-60 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
      <a href={project.liveDemo} className="text-white text-lg font-bold flex items-center gap-2" target="_blank" rel="noopener noreferrer">
        <span>Live Demo</span> <FaExternalLinkAlt />
      </a>
    </div>
    <h4 className="text-2xl font-semibold text-gray-800 mb-2">{project.title}</h4>
    <p className="text-gray-600">{project.description}</p>
  </div>
);

// Main Projects component
const Projects = () => (
  <section id="projects" className="py-20 bg-gray-100">
    <div className="container mx-auto px-6 text-center">
      <h3 className="text-4xl font-bold mb-12 text-gray-800 animate__animated animate__fadeIn">Projects</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
