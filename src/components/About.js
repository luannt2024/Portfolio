"use client";

import { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaStackOverflow,
  FaCodepen,
  FaTwitter,
  FaEnvelope,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const About = () => {
  const [showMore, setShowMore] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const toggleBio = () => {
    setShowMore(!showMore);
  };

  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: animate ? 1 : 0, y: animate ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="glass-card"
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-8 md:mb-0">
              <motion.div
                className="rounded-full overflow-hidden border-4 border-purple-500 w-48 h-48 mx-auto"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Nguyen Thanh Luan"
                  width={200}
                  height={200}
                />
              </motion.div>
            </div>
            <div className="md:w-2/3 md:pl-8">
              <h1 className="text-4xl font-bold mb-4 text-white">
                Nguyen Thanh Luan
              </h1>
              <h2 className="text-2xl mb-4 text-purple-300">
                <TypeAnimation
                  sequence={[
                    "Frontend Developer",
                    2000,
                    "Next.js Enthusiast",
                    2000,
                    "Vue.js Expert",
                    2000,
                    "React Native Developer",
                    2000,
                  ]}
                  wrapper="span"
                  repeat={Infinity}
                />
              </h2>
              <p className="text-gray-300 mb-4">
                Hi! I'm Luan, a Frontend Developer passionate about building
                fast, responsive, and user-friendly web applications.
              </p>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: showMore ? "auto" : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-gray-300 mb-4">
                  With 1 year of experience, I specialize in Next.js, Vue.js,
                  and React Native. My goal is to become a full-stack developer
                  who can bring significant value to any company I work with.
                </p>
                <p className="text-gray-300 mb-4">
                  I am committed to successfully completing tasks assigned to me
                  and continuously enhancing my knowledge of other technologies.
                  I thrive in collaborative environments and enjoy tackling
                  complex problems with innovative solutions.
                </p>
              </motion.div>
              <button
                onClick={toggleBio}
                className="flex items-center text-purple-300 hover:text-purple-400 transition-colors duration-300"
              >
                {showMore ? "Show Less" : "Show More"}
                {showMore ? (
                  <FaChevronUp className="ml-2" />
                ) : (
                  <FaChevronDown className="ml-2" />
                )}
              </button>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Connect with me
            </h3>
            <div className="flex justify-center space-x-4">
              {[FaStackOverflow, FaCodepen, FaTwitter, FaEnvelope].map(
                (Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-purple-300 hover:text-purple-400 transition-colors duration-300"
                  >
                    <Icon size={24} />
                  </motion.a>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
