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
  <section id="leadership" className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
    <div className="container mx-auto px-6 lg:w-4/5"> {/* Set width to 80% on large screens */}
      <h3 className="text-2xl font-bold mb-10 text-center text-gray-800">Leadership and Initiatives</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {leadershipEntries.map((entry, index) => (
          <div key={index} className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between h-full">
            <div className="mb-4">
              <h4 className="text-xl font-semibold text-gray-900">{entry.title}</h4>
            </div>
            <p className="text-base text-gray-700 mb-4 flex-grow">{entry.description}</p>
            <a
              href={entry.link}
              className="inline-block bg-teal-400 py-1 px-4 rounded-full text-base text-white font-semibold hover:bg-teal-500 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More <FaExternalLinkAlt className="inline-block ml-1" />
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Leadership;
