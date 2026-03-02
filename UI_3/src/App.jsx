import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { UniverseThemeProvider } from "./src/context/UniverseThemeProvider";
import { StudioStateProvider } from "./src/context/StudioStateProvider";
import { OverlayProvider } from "./src/context/OverlayProvider";
import { ModeManagerProvider } from "./src/context/ModeManagerProvider"; // ← FIXED

import StudioShell from "./src/studio/StudioShell";

import WallpaperLayer from "./src/Layers/WallpaperLayer";
import ParallaxLayer from "./src/Layers/ParallaxLayer";
import AnimatedOverlay from "./src/Layers/AnimatedOverlay";

import ComicsMode from "./src/modes/ComicsMode";
import CharacterMode from "./src/modes/CharacterMode";

export default function App() {
  return (
    <Router>
      <UniverseThemeProvider>
        <StudioStateProvider>
          <ModeManagerProvider>
            <OverlayProvider>

              <div className="relative w-full h-full overflow-hidden">

                <WallpaperLayer />
                <ParallaxLayer depth={2} />
                <AnimatedOverlay />

                <StudioShell>
                  <Routes>
                    <Route path="/comics" element={<ComicsMode />} />
                    <Route path="/characters" element={<CharacterMode />} />
                  </Routes>
                </StudioShell>

              </div>

            </OverlayProvider>
          </ModeManagerProvider>
        </StudioStateProvider>
      </UniverseThemeProvider>
    </Router>
  );
}