import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { UniverseThemeProvider } from "./src/Providers/UniverseThemeProvider";
import { StudioStateProvider } from "./src/Providers/StudioStateProvider";
import { OverlayProvider } from "./src/Providers/OverlayProvider";

import StudioShell from "./src/studio/StudioShell";

import WallpaperLayer from "./src/Layers/WallpaperLayer";
import ParallaxLayer from "./src/Layers/ParallaxLayer";
import AnimatedOverlay from "./src/Layers/AnimatedOverlay";

import ComicsMode from "./src/modes/ComicsMode";

export default function App() {
  return (
    <UniverseThemeProvider>
      <StudioStateProvider>
        <OverlayProvider>
          <Router>
            <div className="relative w-full h-full overflow-hidden">

              {/* Cinematic Layers */}
              <WallpaperLayer />
              <ParallaxLayer depth={2} />
              <AnimatedOverlay />

              {/* Main Studio Frame */}
              <StudioShell>
                <Routes>
                  <Route path="/comics" element={<ComicsMode />} />
                  {/* Future modes:
                  <Route path="/manga" element={<MangaMode />} />
                  <Route path="/anime" element={<AnimeMode />} />
                  <Route path="/storyboard" element={<StoryboardMode />} />
                  */}
                </Routes>
              </StudioShell>

            </div>
          </Router>
        </OverlayProvider>
      </StudioStateProvider>
    </UniverseThemeProvider>
  );
}