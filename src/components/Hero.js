"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useAnimation } from "./AnimationProvider";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const { prefersReducedMotion } = useAnimation();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Parallax effect for background
      gsap.to(".hero-bg", {
        yPercent: 50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text reveal animation
      gsap.utils.toArray(".reveal-text").forEach((text) => {
        gsap.to(text, {
          backgroundSize: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: text,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          },
        });
      });

      // 3D rotation effect
      const rotate = gsap.to(heroRef.current, {
        rotationY: 10,
        rotationX: -10,
        ease: "none",
        paused: true,
      });

      const handleMouseMove = (e) => {
        const rect = heroRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const percentX = (mouseX - centerX) / centerX;
        const percentY = (mouseY - centerY) / centerY;
        rotate.vars.rotationY = percentX * 10;
        rotate.vars.rotationX = -percentY * 10;
        rotate.invalidate().restart();
      };

      const handleMouseLeave = () => {
        gsap.to(heroRef.current, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.5,
          ease: "power3.out",
        });
      };

      heroRef.current.addEventListener("mousemove", handleMouseMove);
      heroRef.current.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        if (heroRef.current) {
          heroRef.current.removeEventListener("mousemove", handleMouseMove);
          heroRef.current.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={heroRef}
      className="  min-h-screen flex items-center justify-center overflow-hidden perspective-1000 bg-gradient-to-b from-gray-900 to-black py-20"
    >
      {/* className="fixed top-1/2 left-1/2 transform -translate-x-1/2 */}
      {/* -translate-y-1/2 z-50 pointer-events-none" */}
      <div className=" z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Sticky Text */}
        <h1 className="  reveal-text text-7xl md:text-9xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 sticky top-10 z-30">
          {Array.from("Nguyen Thanh Luan").map((char, index) => (
            <motion.span
              key={index}
              className="inline-block cursor-pointer hover:text-purple-500 transition-colors duration-300"
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.2, rotate: Math.random() * 30 - 15 }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {/* Additional Content */}
        <p className="reveal-text text-3xl md:text-4xl mb-6 text-gray-300 font-bold relative overflow-hidden">
          <span className="block">Crafting Digital Experiences</span>
          <span className=" reveal-text inset-0 bg-purple-500 transform translate-y-full transition-transform duration-500 ease-in-out hover:translate-y-0 flex items-center justify-center">
            with Passion and Precision
          </span>
        </p>
        <p className="reveal-text text-xl md:text-2xl mb-8 text-gray-400 relative overflow-hidden">
          <span className="block">
            As a Full Stack Developer, I bring ideas to life through elegant
            code and intuitive design.
          </span>
          <span className=" reveal-text inset-0 bg-pink-500 transform translate-y-full transition-transform duration-500 ease-in-out hover:translate-y-0 flex items-center justify-center p-2">
            With expertise in React, Vue, and Node.js, I create seamless web
            applications that engage and inspire.
          </span>
        </p>
        <motion.a
          href="#contact"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 20px rgba(167, 139, 250, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-8 py-4 rounded-full text-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transition-all duration-300 relative overflow-hidden group"
        >
          <span className="relative z-10">Let's Create Something Amazing</span>
          <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
