"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap-trial/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap-trial/MotionPathPlugin";
import { useAnimation } from "./FlowerProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);
}

const SVGConnector = () => {
  const svgRef = useRef();
  const { prefersReducedMotion } = useAnimation();

  useEffect(() => {
    if (prefersReducedMotion || !svgRef.current) return;

    const svg = svgRef.current;
    const path = svg.querySelector("path");
    const flowers = svg.querySelectorAll(".flower");

    gsap.fromTo(
      path,
      { drawSVG: "0%" },
      {
        drawSVG: "90%",
        ease: "power2.out",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.9,
        },
      }
    );

    flowers.forEach((flower, index) => {
      const angleStep = (Math.PI * 2) / flowers.length;

      gsap.to(flower, {
        motionPath: {
          path: path,
          align: path,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          start: index / (flowers.length - 1),
          end: (index + 1) / (flowers.length - 3),
        },
        scale: 0.5, // Để hoa không quá lớn
        duration: 3, // Tăng thời gian để chuyển động mượt mà hơn
        scrollTrigger: {
          trigger: svg,
          start: "top 80%",
          end: "bottom 0%",
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress;
            const scale = 0.12 + progress * 0.88; // Làm hoa lớn dần một cách nhẹ nhàng
            const angle = progress * 360; // Một vòng quay

            gsap.set(flower, {
              scale: scale,
              rotation: angle,
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
    >
      <path
        d="M100,100 Q300,50 500,200 T900,300 T1300,500 T1700,700"
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="2"
      />

      {[...Array(6)].map((_, i) => (
        <g key={i} className="flower">
          <FlowerSVG />
        </g>
      ))}

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
    <circle r="4" fill="#3333" /> {/* Trung tâm hoa màu hồng nhạt */}
    {[...Array(12)].map((_, i) => (
      <path
        key={i}
        d="M0,-28 C12,-16 12,-8 0,0 C-12,-8 -12,-16 0,-28" // Đường cong mềm mại hơn
        fill="#D1D5DB" // Cánh hoa màu xám nhạt, nhẹ nhàng
        transform={`rotate(${i * 30})`} // Sắp xếp cánh hoa đều
      />
    ))}
  </g>
);

export default SVGConnector;
