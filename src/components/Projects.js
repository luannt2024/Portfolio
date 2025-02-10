"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const projects = [
  {
    title: "E-commerce Platform",
    description: "Built a modern e-commerce platform using Next.js and Stripe",
    image: "https://source.unsplash.com/random/800x600?ecommerce",
    model: "sphere",
  },
  {
    title: "Social Media Dashboard",
    description: "Developed a real-time social media analytics dashboard",
    image: "https://source.unsplash.com/random/800x600?dashboard",
    model: "cube",
  },
  {
    title: "Mobile App",
    description: "Created a cross-platform mobile app using React Native",
    image: "https://source.unsplash.com/random/800x600?mobile",
    model: "torus",
  },
];

const AnimatedShape = ({ shape }) => {
  const meshRef = useRef();

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = 0.5;
      meshRef.current.rotation.y = 0.5;
    }
  }, []);

  return (
    <mesh ref={meshRef}>
      {shape === "sphere" && <sphereGeometry args={[1, 32, 32]} />}
      {shape === "cube" && <boxGeometry args={[1.5, 1.5, 1.5]} />}
      {shape === "torus" && <torusGeometry args={[1, 0.3, 16, 100]} />}
      <meshStandardMaterial color="#ff0080" metalness={0.5} roughness={0.2} />
    </mesh>
  );
};

export default function Projects() {
  const [currentProject, setCurrentProject] = useState(0);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section
      id="projects"
      className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-purple-900 to-black"
    >
      <div className="w-full max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 text-white"
        >
          Featured Projects
        </motion.h2>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-4">
                <motion.h3
                  className="text-3xl font-bold text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {projects[currentProject].title}
                </motion.h3>
                <motion.p
                  className="text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {projects[currentProject].description}
                </motion.p>
              </div>
              <div className="relative h-[400px]">
                <motion.img
                  src={projects[currentProject].image}
                  alt={projects[currentProject].title}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40">
                    <Canvas>
                      <OrbitControls enableZoom={false} autoRotate />
                      <ambientLight intensity={0.5} />
                      <spotLight
                        position={[10, 10, 10]}
                        angle={0.15}
                        penumbra={1}
                      />
                      <AnimatedShape shape={projects[currentProject].model} />
                    </Canvas>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <motion.button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 p-2 rounded-full text-white"
            onClick={prevProject}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronLeft />
          </motion.button>
          <motion.button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 p-2 rounded-full text-white"
            onClick={nextProject}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronRight />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
