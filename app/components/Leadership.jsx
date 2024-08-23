import { FaExternalLinkAlt } from 'react-icons/fa';

const leadershipEntries = [
  {
    title: "Co-Founder and Web Developer",
    description: "At ApnAInterview Cracker, I led the launch and growth of a startup focused on providing job seekers with tools and resources. I contributed to all aspects from concept to execution, including coding, design, and strategic planning.",
    link: "https://nextjs-app-btkri2bn2q-em.a.run.app/",
  },
  // Add more entries here
];

const Leadership = () => (
  <section id="leadership" className="py-16">
    <div className="container mx-auto px-6">
      <h3 className="text-4xl font-bold mb-12 text-center text-gray-800">Leadership and Initiatives</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {leadershipEntries.map((entry, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between h-full">
            <div className="mb-6">
              <h4 className="text-2xl font-semibold text-gray-900">{entry.title}</h4>
            </div>
            <p className="text-lg text-gray-700 mb-6 flex-grow">{entry.description}</p>
            <a href={entry.link} className="inline-block bg-teal-500 py-2 px-6 rounded-full text-lg text-white font-semibold hover:bg-teal-600 transition-colors" target="_blank" rel="noopener noreferrer">
              Learn More <FaExternalLinkAlt className="inline-block ml-2" />
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Leadership;
