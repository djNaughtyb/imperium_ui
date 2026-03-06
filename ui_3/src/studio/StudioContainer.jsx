// src/layers/StudioContainer.jsx
import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StudioContext } from "../context/StudioContext";
import { ThemeContext } from "../context/ThemeContext";

import WallpaperLayer from "./WallpaperLayer";
import ParallaxLayer from "./ParallaxLayer";
import AnimatedOverlay from "./AnimatedOverlay";

export default function StudioContainer({ children }) {
  const { currentStage } = useContext(StudioContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">

      {/* Background Layers */}
      <WallpaperLayer />

      <ParallaxLayer depth={1}>
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <AnimatedOverlay />
        </div>
      </ParallaxLayer>

      {/* Main Workspace */}
      <main className="relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage}
            initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="w-full h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Optional Stage‑Based Lighting */}
      <div
        className={`absolute inset-0 pointer-events-none transition-colors duration-1000 ${
          currentStage === 4 ? "bg-cyan-500/5" : "bg-transparent"
        }`}
      />
    </div>
  );
}
