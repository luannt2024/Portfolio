"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Text, OrbitControls } from "@react-three/drei";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const socialLinks = [
  { icon: FaGithub, url: "#", label: "GitHub" },
  { icon: FaLinkedin, url: "#", label: "LinkedIn" },
  { icon: FaTwitter, url: "#", label: "Twitter" },
  { icon: FaEnvelope, url: "mailto:your.email@example.com", label: "Email" },
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add your form submission logic here
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-purple-500 transition-colors"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-purple-500 transition-colors"
            required
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Message
        </label>
        <textarea
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          rows={6}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-purple-500 transition-colors"
          required
        />
      </motion.div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className={`
          w-full md:w-auto px-8 py-4 rounded-lg
          bg-gradient-to-r from-purple-600 to-pink-600
          text-white font-medium
          transform transition-all duration-300
          hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </motion.button>
    </form>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="min-h-screen py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-90"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
        >
          Get In Touch
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
              <ContactForm />
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">
                Connect With Me
              </h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="text-xl" />
                    <span>{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <div className="h-[600px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl backdrop-blur-sm"></div>
            <Canvas>
              <OrbitControls enableZoom={false} autoRotate />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Text
                color="white"
                fontSize={1.5}
                maxWidth={200}
                lineHeight={1}
                letterSpacing={0.02}
                textAlign="center"
                font="/fonts/Inter-Bold.ttf"
                anchorX="center"
                anchorY="middle"
              >
                Let's work together!
              </Text>
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
