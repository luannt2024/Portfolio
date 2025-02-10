"use client";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-violet-900">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform origin-left z-50"
        style={{ scaleX }}
      />
      <Navbar />
      <Hero />
      <div className="relative z-10">
        <div className="glass-container">
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </div>
      </div>
    </main>
  );
}
