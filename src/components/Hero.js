"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useAnimation } from "../components/AnimationProvider";
import anime from "animejs";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const { prefersReducedMotion } = useAnimation();
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Parallax effect
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

      // 3D rotation effect
      const rotate = gsap.to(heroRef.current, {
        rotationY: 10,
        rotationX: -10,
        ease: "none",
        paused: true,
      });

      heroRef.current.addEventListener("mousemove", (e) => {
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
      });

      heroRef.current.addEventListener("mouseleave", () => {
        gsap.to(heroRef.current, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.5,
          ease: "power3.out",
        });
      });

      // Matrix-like water ripple effect
      const title = titleRef.current;
      const letterElements = Array.from(title.children);
      setLetters(letterElements);

      const animation = anime({
        targets: letterElements,
        scale: [
          { value: 0.5, duration: 500, easing: "easeOutQuad" },
          { value: 1, duration: 500, easing: "easeInQuad" },
        ],
        color: [
          { value: "#00ff00", duration: 500, easing: "easeOutQuad" },
          { value: "#ffffff", duration: 500, easing: "easeInQuad" },
        ],
        textShadow: [
          { value: "0 0 5px #00ff00", duration: 500, easing: "easeOutQuad" },
          { value: "none", duration: 500, easing: "easeInQuad" },
        ],
        translateY: [
          { value: -10, duration: 500, easing: "easeOutQuad" },
          { value: 0, duration: 500, easing: "easeInQuad" },
        ],
        delay: anime.stagger(100, {
          grid: [letterElements.length, 1],
          from: "center",
        }),
        loop: true,
        autoplay: false,
      });

      title.animation = animation;
    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleLetterHover = (index) => {
    if (titleRef.current && titleRef.current.animation) {
      titleRef.current.animation.seek(index * 100);
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden perspective-1000"
    >
      <div className="hero-bg absolute inset-0 bg-gradient-to-b from-black to-green-900 z-0"></div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1
          ref={titleRef}
          className="hero-title text-5xl md:text-7xl font-bold mb-6 text-white"
        >
          {Array.from("Nguyen Thanh Luan").map((char, index) => (
            <span
              key={index}
              className="inline-block cursor-pointer transition-all duration-300 hover:text-green-400"
              onMouseEnter={() => handleLetterHover(index)}
            >
              {char}
            </span>
          ))}
        </h1>
        <p className="hero-subtitle text-xl md:text-2xl mb-4 text-gray-300">
          Crafting Digital Experiences with Passion and Precision
        </p>
        <p className="hero-description text-lg md:text-xl mb-8 text-gray-400">
          As a Full Stack Developer, I bring ideas to life through elegant code
          and intuitive design. With expertise in React, Vue, and Node.js, I
          create seamless web applications that engage and inspire.
        </p>
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hero-cta inline-block px-8 py-3 rounded-full bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Let's Create Something Amazing
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
