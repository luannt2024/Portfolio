import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </main>
  )
}
