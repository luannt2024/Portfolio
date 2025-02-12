import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { useAnimation } from "../components/AnimationProvider";
import { SplitText } from "gsap-trial/SplitText";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, SplitText);

const projects = [
  {
    title: "E-commerce Platform",
    description:
      "A modern e-commerce platform built with Next.js and Stripe integration.",
    time: "6 months",
    client: "XYZ E-Commerce Inc.",
    images: [
      "https://i.pinimg.com/474x/ce/da/cb/cedacb5cfcb003c677d3e1c0ac04147e.jpg",
      "https://i.pinimg.com/474x/ce/da/cb/cedacb5cfcb003c677d3e1c0ac04147e.jpg",
      "https://i.pinimg.com/474x/ce/da/cb/cedacb5cfcb003c677d3e1c0ac04147e.jpg",
    ],
    technologies: ["Next.js", "Stripe", "Tailwind CSS", "PostgreSQL"],
    liveLink: "https://example-ecommerce.com",
    githubLink: "https://github.com/yourusername/ecommerce-platform",
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates.",
    time: "4 months",
    client: "TaskMaster Corp.",
    images: [
      "https://source.unsplash.com/random/800x600?task-management",
      "https://source.unsplash.com/random/800x600?productivity",
      "https://source.unsplash.com/random/800x600?organization",
    ],
    technologies: ["React", "Firebase", "Material-UI", "Redux"],
    liveLink: "https://example-taskmanager.com",
    githubLink: "https://github.com/yourusername/task-manager",
  },
  {
    title: "Weather Forecast Dashboard",
    description:
      "An interactive weather forecast dashboard with data visualization.",
    time: "3 months",
    client: "WeatherTech Ltd.",
    images: [
      "https://source.unsplash.com/random/800x600?weather",
      "https://source.unsplash.com/random/800x600?forecast",
      "https://source.unsplash.com/random/800x600?meteorology",
    ],
    technologies: ["Vue.js", "D3.js", "OpenWeatherMap API", "Vuetify"],
    liveLink: "https://example-weatherdashboard.com",
    githubLink: "https://github.com/yourusername/weather-dashboard",
  },
];

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 50,
      scale: 1.2, // Tăng kích thước card
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top bottom-=100",
        end: "top center",
        scrub: 1,
      },
    });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="bg-gray-800/30 backdrop-blur-md rounded-xl overflow-hidden shadow-xl flex-shrink-0 w-[40vw] h-[80vh] mx-4" // Tăng kích thước card
    >
      <div className="relative aspect-video overflow-x-auto flex snap-x snap-mandatory">
        {project.images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0 snap-center">
            <img
              src={image || "/placeholder.svg"}
              alt={`${project.title} - Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-purple-500/20 text-purple-300 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mb-4 text-gray-400">
          <p className="text-sm">
            <strong>Time:</strong> {project.time}
          </p>
          <p className="text-sm">
            <strong>Client:</strong> {project.client}
          </p>
        </div>
        <div className="flex space-x-4">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-white bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-full transition-colors duration-300"
          >
            <FaExternalLinkAlt className="mr-2" /> Live Demo
          </a>
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full transition-colors duration-300"
          >
            <FaGithub className="mr-2" /> GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const projectsRef = useRef(null);
  const { prefersReducedMotion } = useAnimation();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const splitTitle = new SplitText(".projects-title", {
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
          trigger: ".projects-section",
          start: "top 80%",
        },
      });

      // Tạo hiệu ứng cuộn ngang với hiệu ứng pinning
      gsap.to(".projects-container", {
        xPercent: -100 * (projects.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".projects-section",
          start: "top top",
          end: () => `+=${projectsRef.current.offsetWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Tạo hiệu ứng xuất hiện cho mỗi project card
      gsap.from(".projects-container .project-card", {
        opacity: 0,
        scale: 1.2,
        stagger: 0.3,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-container",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, projectsRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={projectsRef}
      id="projects"
      className="projects-section h-screen relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full py-10 z-10">
        <h2 className="projects-title text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Featured Projects
        </h2>
      </div>
      <div className="projects-container flex items-start h-full pt-20">
        {projects.map((project, index) => (
          <motion.div key={index} className="project-card">
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
