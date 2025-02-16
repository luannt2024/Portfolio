"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Physics2DPlugin } from "gsap/all"

gsap.registerPlugin(ScrollTrigger, Physics2DPlugin)

const About = () => {
  const aboutRef = useRef(null)
  const contentRef = useRef(null)
  const skillsRef = useRef(null)
  const avatarRef = useRef(null)

  useEffect(() => {
    if (!aboutRef.current || !contentRef.current || !skillsRef.current || !avatarRef.current) return

    const ctx = gsap.context(() => {
      // Content animation
      gsap.from(contentRef.current.children, {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      })

      // Avatar animation
      gsap.from(avatarRef.current, {
        scale: 0,
        rotation: 360,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: avatarRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })

      // Skills animation
      const skills = skillsRef.current.querySelectorAll(".skill")
      ScrollTrigger.create({
        trigger: skillsRef.current,
        start: "top center",
        onEnter: () => {
          gsap.to(skills, { y: -400, duration: 3, ease: "power2.out" })

          setTimeout(() => {
            gsap.to(skills, {
              y: 0,
              duration: 5,
              ease: "bounce.out",
              stagger: 0.5,
              physics2D: {
                velocity: 300,
                angle: -90,
                gravity: 800,
              },
            })
          }, 0)
        },
        onLeaveBack: () => {
          gsap.to(skills, {
            y: -400,
            duration: 1,
            ease: "power2.in",
          })
        },
      })

      // Physics-based hover interactions for skills
      skills.forEach((skill) => {
        skill.addEventListener("mouseenter", () => {
          gsap.to(skill, {
            scale: 1.2,
            duration: 0.3,
            ease: "power2.out",
            boxShadow: "0 0 20px rgba(123, 31, 162, 0.5)",
          })
        })

        skill.addEventListener("mouseleave", () => {
          gsap.to(skill, {
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)",
            boxShadow: "none",
            physics2D: {
              velocity: gsap.utils.random(50, 100),
              angle: gsap.utils.random(0, 360),
              gravity: 500,
            },
          })
        })
      })

      // Magnetic effect on avatar
      aboutRef.current.addEventListener("mousemove", (e) => {
        const { clientX, clientY } = e
        const { left, top, width, height } = avatarRef.current.getBoundingClientRect()
        const centerX = left + width / 2
        const centerY = top + height / 2
        const deltaX = clientX - centerX
        const deltaY = clientY - centerY
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        const maxDistance = 200

        if (distance < maxDistance) {
          const factor = 1 - distance / maxDistance
          gsap.to(avatarRef.current, {
            x: deltaX * factor * 0.2,
            y: deltaY * factor * 0.2,
            duration: 0.3,
            ease: "power2.out",
          })
        } else {
          gsap.to(avatarRef.current, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          })
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={aboutRef}
      id="about"
      className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 min-h-screen flex items-center"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div ref={contentRef} className="about-content">
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              About Me
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Hello! I'm Luan, a passionate Web3 Developer with a knack for creating engaging and innovative web
                applications. My journey in the world of web development has been an exciting adventure, filled with
                continuous learning and growth in cutting-edge technologies.
              </p>
              <p>
                With expertise in blockchain technologies, smart contracts, and decentralized applications (dApps), I
                bring ideas to life through clean, efficient code and intuitive user interfaces. My goal is to craft
                digital experiences that not only meet but exceed user expectations in the Web3 space.
              </p>
              <p>
                As I continue to evolve in the rapidly changing landscape of Web3, I'm committed to pushing the
                boundaries of what's possible in decentralized web development. I thrive on challenges and am always
                eager to embrace new technologies and methodologies in this exciting field.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-block mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Let's Connect
            </a>
          </div>
          <div className="relative">
            <div
              ref={avatarRef}
              className="w-64 h-64 mx-auto mb-8 overflow-hidden rounded-full shadow-lg border-4 border-purple-500 p-1 bg-gradient-to-br from-purple-400 to-pink-600"
            >
              <img
                src="https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
                alt="Nguyen Thanh Luan"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div ref={skillsRef} className="skills-container relative h-[300px]">
              {["JavaScript", "React", "Vue.js", "Next.js", "CSS", "HTML", "Node.js", "Git"].map((skill, index) => (
                <div
                  key={skill}
                  className="skill absolute bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg px-4 py-2 text-white font-semibold cursor-pointer transition-all duration-300"
                  style={{
                    top: `${Math.floor(index / 4) * 33 + 10}%`,
                    left: `${(index % 4) * 25 + 5}%`,
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

