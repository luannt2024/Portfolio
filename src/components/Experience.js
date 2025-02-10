"use client";
import { motion } from "framer-motion";

const experiences = [
  {
    year: "2024",
    title: "DEV FullStack",
    company: "Công ty TNHH An Hòa",
    period: "03/2024 - Present",
    description:
      "Responsible for full-stack development of human resource management software using Vue 3, Vueify, and Ruby on Rails.",
    color: "from-blue-600 to-violet-600",
  },
  {
    year: "2023",
    title: "Frontend Developer",
    company: "Apphatch",
    period: "08/2023 - 02/2024",
    description:
      "Participated in outsource projects, focusing on user interface development for web applications using Next.js.",
    color: "from-purple-600 to-pink-600",
  },
  {
    year: "2023",
    title: "Internship",
    company: "AFFINATE",
    period: "12/2023 - 02/2024",
    description:
      "Built components and screens based on designs provided by the design team.",
    color: "from-pink-600 to-rose-600",
  },
  {
    year: "2023",
    title: "Internship",
    company: "Amazing Tech",
    period: "08/2023 - 12/2023",
    description:
      "Worked on exercises related to React JS, React Native, Java Spring Boot, and Redux.",
    color: "from-rose-600 to-orange-600",
  },
  {
    year: "2023",
    title: "Developer",
    company: "Freelancer",
    period: "02/2023 - 06/2023",
    description:
      "Analyzed requirements and developed high-quality Android applications with optimized features and user-friendly interfaces.",
    color: "from-orange-600 to-yellow-600",
  },
];

const Experience = () => {
  return (
    <section
      id="experience"
      className="py-20 relative min-h-screen flex items-center"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-90"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-20 text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
        >
          Work Experience
        </motion.h2>

        <div className="relative max-w-5xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5">
            <div className="h-full bg-gradient-to-b from-purple-500 via-pink-500 to-rose-500 opacity-30"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500 via-pink-500 to-rose-500 animate-pulse"></div>
          </div>

          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`flex items-center justify-between mb-16 ${
                index % 2 === 0 ? "flex-row-reverse" : ""
              }`}
            >
              {/* Content Card */}
              <motion.div
                className={`w-5/12 ${
                  index % 2 === 0 ? "text-right" : "text-left"
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div
                  className={`
                  relative overflow-hidden rounded-xl
                  bg-gradient-to-r ${experience.color}
                  p-0.5 shadow-xl transition-all duration-300
                  hover:shadow-2xl hover:shadow-purple-500/20
                `}
                >
                  <div className="relative bg-gray-900 p-6 rounded-[10px]">
                    {/* Year Badge */}
                    <div
                      className={`
                      absolute ${index % 2 === 0 ? "-left-3" : "-right-3"} top-4
                      bg-gradient-to-r ${experience.color}
                      px-4 py-1 rounded-full text-white font-bold
                      shadow-lg transform -rotate-2
                    `}
                    >
                      {experience.year}
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white mt-4">
                        {experience.title}
                      </h3>
                      <p className="text-purple-300 font-medium">
                        {experience.company}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {experience.period}
                      </p>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {experience.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Center Point */}
              <div className="z-20">
                <motion.div
                  className={`
                    w-5 h-5 rounded-full border-2 border-white
                    bg-gradient-to-r ${experience.color}
                    shadow-lg shadow-purple-500/50
                  `}
                  whileHover={{ scale: 1.5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>

              <div className="w-5/12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
