"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const HeroSection = () => {

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white h-screen flex flex-col justify-center">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 opacity-70"></div>
      <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center relative z-10">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Sai Krishna Reddy
        </h2>
        <p
          className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          Passionate Full-Stack Developer | Cloud Enthusiast
        </p>
        <a
          href="#summary"
          className="bg-yellow-400 hover:bg-yellow-500 py-2 px-4 sm:py-3 sm:px-6 rounded-full text-base sm:text-lg font-semibold text-black shadow-lg transition-transform transform hover:scale-105"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          Explore My Work
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
