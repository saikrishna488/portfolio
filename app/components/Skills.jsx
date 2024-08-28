import { FaHtml5, FaCss3Alt, FaJava, FaJsSquare, FaReact, FaNodeJs, FaPhp, FaPython, FaDocker, FaGitAlt, FaAws, FaGoogle, FaMicrosoft, FaCuttlefish, FaLinux, FaWindows } from 'react-icons/fa';
import { SiRedux, SiPrisma, SiDjango, SiMongodb, SiMysql, SiPostgresql, SiNginx, SiTypescript, SiNextdotjs, SiExpress } from 'react-icons/si';

const skills = {
  languages: ["C", "C++", "Java", "HTML", "CSS", "PHP", "JavaScript", "TypeScript", "Python"],
  frameworks: ["React", "Redux", "Next.js", "Node.js", "Express", "Prisma", "Django"],
  tools: ["Git", "RESTful APIs", "Nginx", "Docker", "Linux", "Windows"],
  databases: ["MongoDB", "MySQL", "PostgreSQL"],
  cloudPlatforms: ["Microsoft Azure", "Google Cloud", "AWS"]
};

// Map each skill to its corresponding icon
const skillIcons = {
  "C": <FaCuttlefish />,
  "C++": <FaCuttlefish />,
  "Java": <FaJava />,
  "HTML": <FaHtml5 />,
  "CSS": <FaCss3Alt />,
  "PHP": <FaPhp />,
  "JavaScript": <FaJsSquare />,
  "TypeScript": <SiTypescript />,
  "Python": <FaPython />,
  "React": <FaReact />,
  "Redux": <SiRedux />,
  "Next.js": <SiNextdotjs />,
  "Node.js": <FaNodeJs />,
  "Express": <SiExpress />,
  "Prisma": <SiPrisma />,
  "Django": <SiDjango />,
  "MongoDB": <SiMongodb />,
  "MySQL": <SiMysql />,
  "PostgreSQL": <SiPostgresql />,
  "Git": <FaGitAlt />,
  "RESTful APIs": <FaNodeJs />,
  "Nginx": <SiNginx />,
  "Docker": <FaDocker />,
  "Linux": <FaLinux />,
  "Windows": <FaWindows />,
  "Microsoft Azure": <FaMicrosoft />,
  "Google Cloud": <FaGoogle />,
  "AWS": <FaAws />
};

// Enhanced Skill Card component
const SkillCard = ({ skill, icon }) => (
  <div className="p-4 rounded-lg shadow-lg flex flex-col items-center justify-center bg-gradient-to-r from-gray-700 to-gray-900 transform hover:scale-105 transition-transform">
    <div className="text-4xl text-white mb-4">{icon}</div>
    <span className="text-white font-semibold text-center">{skill}</span>
  </div>
);

// Main Skills component
const Skills = () => (
  <section id="skills" className="py-16 bg-gray-100">
    <div className="container mx-auto px-6 text-center">
      <h3 className="text-4xl font-bold mb-12 text-blue-600 animate__animated animate__fadeIn">Technical Skills</h3>
      <div className="space-y-12">
        {Object.entries(skills).map(([category, skillList], index) => (
          <div key={index} className="mb-12 bg-white p-8 rounded-lg shadow-md">
            <h4 className="text-2xl font-semibold mb-6 text-blue-600">{category.replace(/([A-Z])/g, ' $1').trim()}</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {skillList.map(skill => (
                <SkillCard
                  key={skill}
                  skill={skill}
                  icon={skillIcons[skill] || <FaCuttlefish />}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;