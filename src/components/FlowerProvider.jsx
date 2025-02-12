"use client";

import { createContext, useContext, useState, useEffect } from "react";

const FlowerContext = createContext(undefined);

export const useAnimation = () => {
  const context = useContext(FlowerContext);
  if (context === undefined) {
    throw new Error("useAnimation must be used within a FlowerProvider");
  }
  return context;
};

export const FlowerProvider = ({ children }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <FlowerContext.Provider value={{ prefersReducedMotion, scrollPosition }}>
      {children}
    </FlowerContext.Provider>
  );
};
