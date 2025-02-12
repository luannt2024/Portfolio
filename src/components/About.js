"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";
import { useAnimation } from "../components/AnimationProvider";
import { SplitText } from "gsap-trial/SplitText";
// Import SplitText

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);
  const { prefersReducedMotion } = useAnimation();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Split text animation
      const splitTitle = new SplitText(".about-title", {
        type: "chars, words",
      });
      const splitText = new SplitText(".about-text p", { type: "lines" });

      gsap.from(splitTitle.chars, {
        opacity: 0,
        y: 20,
        rotateX: -90,
        stagger: 0.02,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 80%",
        },
      });

      gsap.from(splitText.lines, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 60%",
        },
      });

      gsap.from(".about-image", {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 60%",
        },
      });
    }, aboutRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={aboutRef}
      id="about"
      className="about-section py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="about-content">
            <h2 className="about-title text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              About Me
            </h2>
            <div className="about-text text-gray-300 space-y-4">
              <p>
                Hi! I'm Luan, a Frontend Developer passionate about building
                fast, responsive, and user-friendly web applications. With 1
                year of experience, I specialize in Next.js, Vue.js, and React
                Native.
              </p>
              <p>
                My goal is to become a full-stack developer who can bring
                significant value to any company I work with. I am committed to
                successfully completing tasks assigned to me and continuously
                enhancing my knowledge of other technologies.
              </p>
            </div>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Let's Connect
            </motion.a>
          </div>
          <div className="about-image">
            <motion.div
              className="rounded-full overflow-hidden border-4 border-purple-500 w-64 h-64 mx-auto"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Image
                src="/placeholder.svg?height=256&width=256"
                alt="Nguyen Thanh Luan"
                width={256}
                height={256}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
