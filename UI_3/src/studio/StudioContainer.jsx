import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StudioStateContext } from '../../context/StudioStateProvider';
import { UniverseThemeContext } from '../../context/UniverseThemeProvider';
import WallpaperLayer from './WallpaperLayer';
import ParallaxLayer from './ParallaxLayer';
import AnimatedOverlay from './AnimatedOverlay';

const StudioContainer = ({ children }) => {
  const { studioState } = useContext(StudioStateContext);
  const { currentTheme } = useContext(UniverseThemeContext);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* Background Layers - The "Living" part */}
      <WallpaperLayer state={studioState} theme={currentTheme} />
      
      <ParallaxLayer depth={1} state={studioState}>
        <div className="absolute inset-0 pointer-events-none opacity-30">
          {/* Floating comic dust/particles */}
          <AnimatedOverlay type="particles" />
        </div>
      </ParallaxLayer>

      {/* Main Workspace UI */}
      <main className="relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={studioState}
            initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="w-full h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Dynamic Lighting Overlay */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-colors duration-1000 ${
          studioState === 'MARKETING_LAB' ? 'bg-cyan-500/5' : 'bg-transparent'
        }`} 
      />
    </div>
  );
};

export default StudioContainer;