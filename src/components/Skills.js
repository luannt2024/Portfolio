"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useAnimation } from "../components/AnimationProvider";
import { SplitText } from "gsap-trial/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const skillCategories = [
  {
    title: "Frontend Development",
    skills: [
      { name: "React", level: 90 },
      { name: "Vue.js", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "HTML/CSS", level: 95 },
      { name: "Tailwind", level: 90 },
    ],
  },
  {
    title: "Backend Development",
    skills: [
      { name: "Node.js", level: 80 },
      { name: "Python", level: 75 },
      { name: "Java", level: 70 },
      { name: "PHP", level: 65 },
      { name: "Go", level: 60 },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "MySQL", level: 75 },
      { name: "Firebase", level: 70 },
      { name: "Redis", level: 65 },
    ],
  },
  {
    title: "Other Skills",
    skills: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 80 },
      { name: "AWS", level: 75 },
      { name: "Agile", level: 85 },
      { name: "Problem Solving", level: 95 },
    ],
  },
];

const SkillBar = ({ skill, index }) => {
  const barRef = useRef(null);

  useEffect(() => {
    gsap.from(barRef.current, {
      width: 0,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: barRef.current,
        start: "top 90%",
      },
    });
  }, []);

  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-white">{skill.name}</span>
        <span className="text-sm font-medium text-purple-300">
          {skill.level}%
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div
          ref={barRef}
          className="h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const skillsRef = useRef(null);
  const { prefersReducedMotion } = useAnimation();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const splitTitle = new SplitText(".skills-title", {
        type: "chars, words",
      });

      gsap.from(splitTitle.chars, {
        opacity: 0,
        y: 20,
        rotateX: -90,
        stagger: 0.02,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".skills-section",
          start: "top 80%",
        },
      });

      gsap.from(".skills-category", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".skills-section",
          start: "top 60%",
        },
      });
    }, skillsRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={skillsRef}
      id="skills"
      className="skills-section py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <h2 className="skills-title text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="skills-category bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-xl font-bold text-white mb-6">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar key={skillIndex} skill={skill} index={skillIndex} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
