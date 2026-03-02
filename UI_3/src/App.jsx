import React from "react";
import { Routes, Route } from "react-router-dom";

import { UniverseThemeProvider } from "./context/UniverseThemeProvider";
import { StudioStateProvider } from "./context/StudioStateProvider";
import { OverlayProvider } from "./context/OverlayProvider";
import { ModeManagerProvider } from "./context/ModeManagerProvider";

import StudioShell from "./studio/StudioShell";

import WallpaperLayer from "./Layers/WallpaperLayer";
import ParallaxLayer from "./Layers/ParallaxLayer";
import AnimatedOverlay from "./Layers/AnimatedOverlay";

import ComicsMode from "./modes/ComicsMode";
import CharacterMode from "./modes/CharacterMode";

export default function App() {
  return (
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
  );
}