import { Briefcase, ShieldCheck } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      role: "Full-Stack Web Development Intern",
      company: "EY & AICTE",
      duration: "March – April 2025",
      description: [
        "Developed web applications using React.js, Node.js, and MongoDB.",
        "Implemented API integrations and optimized backend functionalities."
      ],
      icon: <Briefcase className="w-8 h-8 text-blue-500" />
    },
    {
      role: "Cybersecurity Intern",
      company: "Palo Alto Networks",
      duration: "October – December 2021",
      description: [
        "Gained hands-on experience in threat detection and incident response.",
        "Conducted vulnerability assessments and implemented security measures."
      ],
      icon: <ShieldCheck className="w-8 h-8 text-green-500" />
    }
  ];

  return (
    <div className="w-full py-12 bg-gray-100">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Experience</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md flex flex-col items-start border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">{exp.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900">{exp.role}</h3>
              <p className="text-gray-600 text-sm mb-2">{exp.company} | {exp.duration}</p>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                {exp.description.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
