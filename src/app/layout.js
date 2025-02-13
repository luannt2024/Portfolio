import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Nguyen Thanh Luan | Portfolio',
  description: 'Portfolio of Nguyen Thanh Luan, a Frontend Developer specializing in Next.js, Vue.js, and more.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
