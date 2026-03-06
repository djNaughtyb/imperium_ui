// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";
import { StudioProvider } from "./context/StudioContext";
import { PanelProvider } from "./context/PanelContext";
import { OverlayProvider } from "./context/OverlayProvider";

import StudioContainer from "./layers/StudioContainer";
import ProjectShell from "./layout/ProjectShell";

import ComicStudio from "./screens/studio/ComicStudio";
import CharacterList from "./screens/characters/CharacterList";
import PanelList from "./screens/panels/PanelList";

export default function App() {
  return (
    <ThemeProvider>
      <StudioProvider>
        <PanelProvider>
          <OverlayProvider>

            <StudioContainer>
              <Routes>

                <Route
                  path="/"
                  element={<div className="p-10 text-3xl">Studio Online</div>}
                />

                <Route
                  path="/studio/project/:projectId"
                  element={
                    <ProjectShell>
                      <ComicStudio />
                    </ProjectShell>
                  }
                />

                <Route
                  path="/studio/project/:projectId/characters"
                  element={
                    <ProjectShell>
                      <CharacterList />
                    </ProjectShell>
                  }
                />

                <Route
                  path="/studio/project/:projectId/panels"
                  element={
                    <ProjectShell>
                      <PanelList />
                    </ProjectShell>
                  }
                />

              </Routes>
            </StudioContainer>

          </OverlayProvider>
        </PanelProvider>
      </StudioProvider>
    </ThemeProvider>
  );
}
