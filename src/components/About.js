import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Avatar from "./Avatar"; // Giữ lại Avatar component
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);
  const avatarRef = useRef(null);

  useEffect(() => {
    if (!aboutRef.current || !avatarRef.current) return;

    // Animation for About Title
    gsap.fromTo(
      ".about-title",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 80%",
          end: "top 60%",
          scrub: true,
        },
      }
    );

    // Animation for About Text (fading in paragraphs)
    gsap.utils.toArray(".about-text p").forEach((text) => {
      gsap.fromTo(
        text,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-section",
            start: "top 75%",
            end: "top 50%",
            scrub: true,
          },
        }
      );
    });

    // Animation for Avatar (fade in + zoom effect)
    gsap.fromTo(
      avatarRef.current,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1.2,
        duration: 3.5,
        ease: "back.out(2.8)",
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 60%",
          end: "top 40%",
          scrub: true,
        },
      }
    );
  }, []);

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
            <div
              ref={avatarRef}
              className="rounded-full overflow-hidden border-4 border-purple-500 w-64 h-64 mx-auto"
            >
              <Avatar className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
