const Summary = () => (
  <section id="summary" className="h-screen py-16 bg-gradient-to-r from-gray-100 to-white flex flex-col justify-center">
    <div className="container mx-auto px-6 text-center">
      <h3 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800">
        About Me
      </h3>
      <p className="text-left md:text-justify text-lg md:text-xl leading-relaxed mb-8 max-w-4xl mx-auto text-gray-600">
        I'm a passionate Computer Science graduate with expertise in full-stack development. My skill set includes a wide range of programming languages and frameworks, allowing me to build and deploy impactful web applications. I thrive in collaborative settings and am dedicated to continuous learning. My experience includes contributions to open-source projects, hackathon successes, and leadership roles in project development. I am eager to stay at the forefront of technology, with a particular interest in data-driven solutions and cloud technologies.
      </p>
      <a href="#projects" className="bg-yellow-500 hover:bg-yellow-600 py-3 px-6 rounded-full text-lg font-semibold text-black shadow-lg transition-transform transform hover:scale-105">
        View My Work
      </a>
    </div>
  </section>
);

export default Summary;
