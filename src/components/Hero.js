'use client'

import React, { useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'

const AnimatedSphere = () => {
  const meshRef = useRef()

  // useEffect(() => {
  //   if (meshRef.current) {
  //     const animate = () => {
  //       meshRef.current.rotation.x += 0.01
  //       meshRef.current.rotation.y += 0.01
  //       requestAnimationFrame(animate)
  //     }
  //     animate()
  //   }
  // }, [])

  return (
    <Sphere args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color="#4B0082"
        attach="material"
        distort={0.5}
        speed={2}
        ref={meshRef}
      />
    </Sphere>
  )
}

const Hero = () => {
  const parallaxRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        ref={parallaxRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://source.unsplash.com/random/1920x1080?technology")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold mb-4">Nguyen Thanh Luan</h1>
        <p className="text-2xl mb-8">Frontend Developer</p>
        <a
          href="#contact"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          Get in touch
        </a>
      </div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <AnimatedSphere />
        </Canvas>
      </div>
    </section>
  )
}

export default Hero
