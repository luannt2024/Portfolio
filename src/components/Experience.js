"use client";
import { motion } from "framer-motion";

const experiences = [
  {
    title: "DEV FullStack",
    company: "Công ty TNHH An Hòa",
    period: "03/2024 - Present (11 months)",
    description:
      "Responsible for full-stack development of human resource management software using Vue 3, Vueify, and Ruby on Rails.",
  },
  {
    title: "Frontend Developer (Part-time)",
    company: "Apphatch",
    period: "08/2024 - 02/2025 (6 months)",
    description:
      "Participated in outsource projects, focusing on user interface development for web applications using Next.js.",
  },
  {
    title: "Internship",
    company: "AFFINATE",
    period: "12/2023 - 02/2024 (2 months)",
    description: "Built components and screens based on designs provided by the design team.",
  },
  {
    title: "Internship",
    company: "Amazing Tech",
    period: "08/2023 - 12/2023 (4 months)",
    description: "Worked on exercises related to React JS, React Native, Java Spring Boot, and Redux.",
  },
  {
    title: "Developer",
    company: "Freelancer",
    period: "02/2023 - 06/2023 (4 months)",
    description:
      "Analyzed requirements and developed high-quality Android applications with optimized features and user-friendly interfaces.",
  },
];

const ExperienceCard = ({ experience }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-bold mb-2">{experience.title}</h3>
      <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">{experience.company}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{experience.period}</p>
      <p className="text-gray-700 dark:text-gray-200">{experience.description}</p>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="relative py-20 bg-gray-100 dark:bg-gray-800 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/path/to/your/background-image.jpg')] bg-cover bg-center bg-fixed opacity-30"></div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">Work Experience</h2>
        {experiences.map((experience, index) => (
          <ExperienceCard key={index} experience={experience} />
        ))}
      </div>
    </section>
  );
};

export default Experience;