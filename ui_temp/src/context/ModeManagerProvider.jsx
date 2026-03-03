// src/state/ModeManagerProvider.jsx
import React, { createContext, useContext } from "react";
import { useModeManager } from "../State/useModeManager";

const ModeManagerContext = createContext(null);

export function ModeManagerProvider({ children }) {
  const modeManager = useModeManager();

  return (
    <ModeManagerContext.Provider value={modeManager}>
      {children}
    </ModeManagerContext.Provider>
  );
}

export function useModeManagerContext() {
  const context = useContext(ModeManagerContext);
  if (!context) {
    throw new Error(
      "useModeManagerContext must be used inside a ModeManagerProvider"
    );
  }
  return context;
}