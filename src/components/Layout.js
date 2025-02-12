"use client";

import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

const Layout = ({ children }) => {
  const { theme } = useTheme();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={theme.name}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`min-h-screen ${theme.colors.background}`}
      >
        <div className="relative">
          {theme.name === "splitContrast" && (
            <div className="fixed inset-0 grid grid-cols-2 pointer-events-none">
              <div className="bg-[#f8f8f8]" />
              <div className="bg-[#1a1a1a]" />
            </div>
          )}
          <div className="relative">{children}</div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Layout;
