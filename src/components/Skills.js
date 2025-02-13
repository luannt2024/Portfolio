'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const skills = [
  { name: 'React', level: 90 },
  { name: 'Vue.js', level: 85 },
  { name: 'Next.js', level: 80 },
  { name: 'JavaScript', level: 90 },
  { name: 'HTML/CSS', level: 95 },
  { name: 'Tailwind CSS', level: 90 },
  { name: 'Node.js', level: 70 },
  { name: 'Git', level: 85 },
  { name: 'RESTful APIs', level: 80 },
]

const SkillBar = ({ name, level }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="mb-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium">{name}</span>
        <span className="text-sm font-medium">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <motion.div
          className="bg-purple-600 h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </div>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-2 text-sm text-gray-500 dark:text-gray-400"
        >
          {getSkillDescription(name)}
        </motion.div>
      )}
    </div>
  )
}

const getSkillDescription = (skillName) => {
  const descriptions = {
    'React': 'Building interactive user interfaces with reusable components.',
    'Vue.js': 'Creating dynamic single-page applications with a progressive framework.',
    'Next.js': 'Developing server-side rendered React applications with optimized performance.',
    'JavaScript': 'Implementing complex logic and interactivity in web applications.',
    'HTML/CSS': 'Structuring and styling web content for responsive designs.',
    'Tailwind CSS': 'Rapidly building custom user interfaces with utility-first CSS.',
    'Node.js': 'Creating server-side applications and APIs with JavaScript.',
    'Git': 'Version control and collaboration in software development projects.',
    'RESTful APIs': 'Designing and consuming APIs for seamless data integration.',
  }
  return descriptions[skillName] || 'Skill description not available.'
}

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill) => (
            <SkillBar key={skill.name} name={skill.name} level={skill.level} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
