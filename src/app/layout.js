import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import { ThemeProvider } from "../components/ThemeProvider";
import { AnimationProvider } from "../components/AnimationProvider";
import Script from "next/script";
import SVGConnector from "../components/SVGConnector";
import { FlowerProvider } from "../components/FlowerProvider";
import Hero from "../components/Hero";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nguyen Thanh Luan | Portfolio",
  description:
    "Portfolio of Nguyen Thanh Luan, a Frontend Developer specializing in Next.js, Vue.js, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/DrawSVGPlugin.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/MotionPathPlugin.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/InertiaPlugin.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        <FlowerProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <AnimationProvider>
              <SVGConnector />
              <Hero></Hero>
              <Navbar />
              {children}
            </AnimationProvider>
          </ThemeProvider>
        </FlowerProvider>
      </body>
    </html>
  );
}
