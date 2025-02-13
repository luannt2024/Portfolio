"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/gsap-core"; // MotionPathPlugin is free
import { useAnimation } from "./FlowerProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

const SVGConnector = () => {
  const svgRef = useRef();
  const { prefersReducedMotion } = useAnimation();

  useEffect(() => {
    if (prefersReducedMotion || !svgRef.current) return;

    const svg = svgRef.current;
    const path = svg.querySelector("path");
    const flowers = svg.querySelectorAll(".flower");

    // Set up a stroke dasharray and dashoffset to create the drawing effect
    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.9,
      },
    });

    flowers.forEach((flower, index) => {
      gsap.to(flower, {
        motionPath: {
          path: path,
          align: path,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          start: index / (flowers.length - 1),
          end: (index + 1) / (flowers.length - 3),
        },
        scale: 0,
        duration: 6,
        scrollTrigger: {
          trigger: svg,
          start: "top 80%",
          end: "bottom 0%",
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress;
            const scale = 0.12 + progress * 0.88; // Tăng kích thước hoa
            const angle = progress * 360; // Quay hoa

            // Hiệu ứng nở hoa
            gsap.set(flower, {
              scale: scale,
              rotation: angle,
              opacity: progress < 0.5 ? progress * 2 : 1, // Nở ra từ 0 đến 1
            });
          },
        },
      });
    });
  }, [prefersReducedMotion]);

  return (
    <svg
      ref={svgRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[-50] will-change-transform"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1800 800"
    >
      <path
        d="M100,100 Q300,50 500,200 T900,300 T1300,500 T1700,700"
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="2"
      />

      {[...Array(10)].map(
        (
          _,
          i // Tăng số lượng hoa
        ) => (
          <g key={i} className="flower">
            <FlowerSVG />
          </g>
        )
      )}

      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6EE7B7" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const FlowerSVG = () => (
  <g>
    <circle r="10" fill="#FF6F61" />
    {[...Array(12)].map((_, i) => (
      <path
        key={i}
        d="M0,-30 C15,-20 15,-10 0,0 C-15,-10 -15,-20 0,-30"
        fill="url(#petalGradient)"
        transform={`rotate(${i * 30})`}
      />
    ))}
    <defs>
      <linearGradient id="petalGradient" x1="0%" y1="0%" x2="80%" y2="80%">
        <stop offset="0%" stopColor="#FFB6C1" />
        <stop offset="100%" stopColor="#FF69B4" />
      </linearGradient>
    </defs>
  </g>
);

export default SVGConnector;
