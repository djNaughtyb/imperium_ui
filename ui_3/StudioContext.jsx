// src/context/StudioContext.jsx

import { createContext, useContext, useState, useCallback } from "react";

const StudioContext = createContext(null);

export const StudioProvider = ({ children }) => {
  const [currentStage, setCurrentStage] = useState(1);

  const goToStage = useCallback((stageNumber) => {
    setCurrentStage(stageNumber);
  }, []);

  const value = {
    currentStage,
    goToStage,
  };

  return (
    <StudioContext.Provider value={value}>
      {children}
    </StudioContext.Provider>
  );
};

export const useStudioContext = () => {
  const ctx = useContext(StudioContext);
  if (!ctx) {
    throw new Error("useStudioContext must be used inside <StudioProvider>");
  }
  return ctx;
};
