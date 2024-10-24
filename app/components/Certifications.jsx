import { FaReact, FaJs, FaNodeJs, FaAws, FaPython, FaDocker, FaMicrosoft, FaServer } from 'react-icons/fa';

const certifications = [
  {
    title: "ReactJS",
    description: "Certification in ReactJS, showcasing skills in building dynamic and interactive UIs using React.",
    link: "https://www.coursera.org/account/accomplishments/verify/3TCLDAGLHTUW?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
    icon: <FaReact className="text-blue-500 text-5xl" />
  },
  {
    title: "JavaScript",
    description: "Certification in JavaScript, covering essential programming concepts and language features.",
    link: "https://www.hackerrank.com/certificates/64cc3d6392ff",
    icon: <FaJs className="text-yellow-500 text-5xl" />
  },
  {
    title: "REST API",
    description: "Certification in REST API development, focusing on creating robust and scalable web services.",
    link: "https://www.hackerrank.com/certificates/34a1c84f7167",
    icon: <FaServer className="text-green-600 text-5xl" />
  },
  {
    title: "Node.js",
    description: "Certification in Node.js, demonstrating proficiency in server-side JavaScript development.",
    link: "https://www.credly.com/badges/8d8d92d6-ace6-4c1e-b0e4-b997a70fab45/public_url",
    icon: <FaNodeJs className="text-green-500 text-5xl" />
  },
  {
    title: "AWS Cloud Foundations",
    description: "Certification in AWS Cloud Foundations, covering cloud computing basics and AWS services.",
    link: "https://www.credly.com/badges/fc15180b-31c7-4741-bdbd-4e2630132d73",
    icon: <FaAws className="text-orange-500 text-5xl" />
  },
  {
    title: "Azure",
    description: "Certification in Microsoft Azure, showcasing skills in cloud solutions and services provided by Azure.",
    link: "https://www.coursera.org/account/accomplishments/verify/AN6ZVTUGBQY6?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
    icon: <FaMicrosoft className="text-blue-700 text-5xl" />
  },
  {
    title: "Python",
    description: "Certification in Python, demonstrating proficiency in Python programming and application development.",
    link: "https://www.coursera.org/account/accomplishments/verify/W6HHJPE4AE38?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
    icon: <FaPython className="text-yellow-400 text-5xl" />
  },
  {
    title: "Docker",
    description: "Certification in Docker, focusing on containerization and building scalable applications.",
    link: "https://www.credly.com/badges/19f9f4d5-a1fe-41a7-b5fe-030456f695b0/public_url",
    icon: <FaDocker className="text-blue-600 text-5xl" />
  }
];

const CertificationCard = ({ title, description, link, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
    <div className="flex items-center mb-4">
      {icon}
      <h4 className="text-xl font-semibold ml-4 text-gray-800">{title}</h4>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <a href={link} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">View Certification</a>
  </div>
);

const Certifications = () => (
  <section id="certifications" className="py-16 bg-blue-50">
    <div className="container mx-auto px-6 lg:w-4/5"> {/* Set width to 80% on large screens */}
      <h3 className="text-2xl text-center font-bold mb-12 text-gray-900 animate__animated animate__fadeIn">Certifications</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {certifications.map((cert, index) => (
          <CertificationCard
            key={index}
            title={cert.title}
            description={cert.description}
            link={cert.link}
            icon={cert.icon}
          />
        ))}
      </div>
    </div>
  </section>
);

export default Certifications;
