import { FaTrophy, FaBriefcase, FaHackerrank, FaUserTie, FaCloud } from 'react-icons/fa';

const achievements = [
  {
    title: "First Prize in Final Year Project Expo",
    description: "Awarded for the most impactful project during the final year project expo.",
    icon: <FaTrophy className="text-yellow-500 text-4xl" />
  },
  {
    title: "Job Offer from Buzzler Technologies",
    description: "Received a job offer during an off-campus recruitment drive held at T-Hub.",
    icon: <FaBriefcase className="text-green-500 text-4xl" />
  },
  {
    title: "Hackathon Participation",
    description: "Participated in various hackathons showcasing problem-solving skills and innovation.",
    icon: <FaHackerrank className="text-blue-600 text-4xl" />
  },
  {
    title: "Organizing Committee Member and Team Lead",
    description: "Led and organized various tech events and activities, demonstrating leadership and teamwork.",
    icon: <FaUserTie className="text-red-600 text-4xl" />
  },
  {
    title: "Winner of Project Saadhna Cycle 2 (Google Cloud Initiative)",
    description: "Won with $100 Google Cloud Credit Coupons for the innovative project idea.",
    icon: <FaCloud className="text-purple-500 text-4xl" />
  }
];

const AchievementCard = ({ title, description, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 border border-gray-200">
    <div className="flex items-center mb-4">
      {icon}
      <h4 className="text-xl font-semibold ml-4 text-gray-800">{title}</h4>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Achievements = () => (
  <section id="achievements" className="py-24 bg-gradient-to-r from-blue-50 to-green-50">
    <div className="container mx-auto px-6 lg:w-4/5"> {/* Set width to 80% on large screens */}
      <h3 className="text-2xl text-center font-bold mb-12 text-black animate__animated animate__fadeIn">Achievements</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {achievements.map((ach, index) => (
          <AchievementCard
            key={index}
            title={ach.title}
            description={ach.description}
            icon={ach.icon}
          />
        ))}
      </div>
    </div>
  </section>
);

export default Achievements;
