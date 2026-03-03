// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Core Providers
import { UniverseThemeProvider } from "./context/UniverseThemeProvider";
import { StudioStateProvider } from "./context/StudioStateProvider";
import { OverlayProvider } from "./context/OverlayProvider";
import { ModeManagerProvider } from "./state/ModeManagerProvider";

// Cinematic Layers
import WallpaperLayer from "./layers/WallpaperLayer";
import ParallaxLayer from "./layers/ParallaxLayer";
import AnimatedOverlay from "./layers/AnimatedOverlay";

// Studio Shell + Modes
import StudioShell from "./studio/StudioShell";
import ComicsMode from "./modes/ComicsMode";

// Crash‑proof wrapper
function Safe({ children }) {
  try {
    return children;
  } catch (err) {
    console.error("Component crashed:", err);
    return (
      <div style={{ color: "red", padding: 20 }}>
        Component failed to load. Check console.
      </div>
    );
  }
}

export default function App() {
  return (
    <UniverseThemeProvider>
      <StudioStateProvider>
        <OverlayProvider>
          <ModeManagerProvider>
            <Router>
              <div className="relative w-full h-full overflow-hidden bg-black text-white">

                {/* Cinematic Layers */}
                <Safe><WallpaperLayer /></Safe>
                <Safe><ParallaxLayer depth={2} /></Safe>
                <Safe><AnimatedOverlay /></Safe>

                {/* Main Studio Frame */}
                <Safe>
                  <StudioShell>
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <div style={{ padding: 40, fontSize: 24 }}>
                            Studio Online
                          </div>
                        }
                      />
                      <Route path="/comics" element={<ComicsMode />} />
                    </Routes>
                  </StudioShell>
                </Safe>

              </div>
            </Router>
          </ModeManagerProvider>
        </OverlayProvider>
      </StudioStateProvider>
    </UniverseThemeProvider>
  );
}