'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

const Navbar = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <nav className="fixed w-full z-50 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg dark:bg-gray-900 dark:bg-opacity-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="text-xl font-bold">Nguyen Thanh Luan</a>
          </div>
          <div className="flex items-center">
            <a href="#about" className="px-3 py-2 rounded-md text-sm font-medium">About</a>
            <a href="#skills" className="px-3 py-2 rounded-md text-sm font-medium">Skills</a>
            <a href="#projects" className="px-3 py-2 rounded-md text-sm font-medium">Projects</a>
            <a href="#experience" className="px-3 py-2 rounded-md text-sm font-medium">Experience</a>
            <a href="#contact" className="px-3 py-2 rounded-md text-sm font-medium">Contact</a>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
