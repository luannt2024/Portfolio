"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Text, OrbitControls } from "@react-three/drei";

const skillCategories = [
  {
    title: "Frontend Development",
    skills: [
      { name: "React", level: 90, color: "#61DAFB" },
      { name: "Vue.js", level: 85, color: "#4FC08D" },
      { name: "Next.js", level: 80, color: "#000000" },
      { name: "HTML/CSS", level: 95, color: "#E34F26" },
      { name: "Tailwind", level: 90, color: "#38B2AC" },
    ],
  },
  {
    title: "Backend Development",
    skills: [
      { name: "Node.js", level: 75, color: "#339933" },
      { name: "Express", level: 80, color: "#000000" },
      { name: "Ruby on Rails", level: 70, color: "#CC0000" },
      { name: "RESTful APIs", level: 85, color: "#FF6C37" },
    ],
  },
  {
    title: "Mobile Development",
    skills: [
      { name: "React Native", level: 85, color: "#61DAFB" },
      { name: "Android", level: 75, color: "#3DDC84" },
      { name: "iOS", level: 70, color: "#000000" },
      { name: "Flutter", level: 65, color: "#02569B" },
    ],
  },
];

const SkillBar = ({ skill, index, isVisible }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-4"
    >
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-white">{skill.name}</span>
        <span className="text-sm font-medium text-purple-300">
          {skill.level}%
        </span>
      </div>
      <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{ backgroundColor: skill.color }}
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: index * 0.1 }}
        />
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section id="skills" className="min-h-screen py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-90"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
        >
          Technical Skills
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* 3D Visualization */}
          <div className="h-[400px] lg:h-[600px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl backdrop-blur-sm"></div>
            <Canvas>
              <OrbitControls enableZoom={false} autoRotate={!isHovering} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <group>
                {skillCategories[activeCategory].skills.map((skill, index) => (
                  <group
                    key={skill.name}
                    position={[
                      Math.cos(
                        (index /
                          skillCategories[activeCategory].skills.length) *
                          Math.PI *
                          2
                      ) * 3,
                      Math.sin(
                        (index /
                          skillCategories[activeCategory].skills.length) *
                          Math.PI *
                          2
                      ) * 3,
                      0,
                    ]}
                  >
                    <Text
                      color={skill.color}
                      fontSize={0.5}
                      maxWidth={2}
                      lineHeight={1}
                      letterSpacing={0.02}
                      textAlign="center"
                      font="/fonts/Inter-Bold.ttf"
                      anchorX="center"
                      anchorY="middle"
                    >
                      {skill.name}
                    </Text>
                  </group>
                ))}
              </group>
            </Canvas>
          </div>

          {/* Skills List */}
          <div className="space-y-8">
            <div className="flex flex-wrap gap-2 mb-8">
              {skillCategories.map((category, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveCategory(index)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium
                    transition-all duration-300
                    ${
                      activeCategory === index
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "bg-gray-800 text-gray-400 hover:text-white"
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.title}
                </motion.button>
              ))}
            </div>

            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <h3 className="text-xl font-bold text-white mb-6">
                {skillCategories[activeCategory].title}
              </h3>
              <div className="space-y-4">
                {skillCategories[activeCategory].skills.map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    index={index}
                    isVisible={true}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
