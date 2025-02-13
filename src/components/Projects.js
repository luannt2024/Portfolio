"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

const projects = [
  {
    title: "Human Resource Management Software",
    description: "Developed full-stack HR management software using Vue 3 and Ruby on Rails.",
    link: "https://ppm.arthomeapps.link/",
    image: "https://source.unsplash.com/random/800x600?software",
  },
  {
    title: "Binh Tay Factory Website",
    description: "Created a responsive website for Binh Tay Factory using Next.js.",
    link: "https://binhtayfactory.com",
    image: "https://source.unsplash.com/random/800x600?factory",
  },
  {
    title: "Android Application",
    description: "Developed a high-quality Android application with optimized features and user-friendly interface.",
    link: "https://play.google.com/store/apps/details?id=com.thanhtung15052001.appui",
    image: "https://source.unsplash.com/random/800x600?android",
  },
]

const AnimatedSphere = () => {
  const meshRef = useRef()
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.5
    meshRef.current.rotation.y += delta * 0.5
  })
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="lightblue" />
    </mesh>
  )
}

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      whileHover={{ scale: 1.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48">
        <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-lg font-bold hover:underline"
            >
              View Project
            </a>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
      </div>
      <div className="h-48">
        <Canvas>
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <AnimatedSphere />
        </Canvas>
      </div>
    </motion.div>
  )
}

const Projects = () => {
  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

