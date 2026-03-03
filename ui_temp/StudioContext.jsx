import { useEffect, useState } from "react";
import { usePanelContext, useStudioContext, useThemeContext } from "../context/PanelContext.jsx";
import { getThemeClasses } from "../utils/themeUtils.jsx";

export const StudioProvider = ({ children }) => {
  const { currentStage, setCurrentStage } = useStudioContext();
  const { panels } = usePanelContext();
  const { theme } = useThemeContext();
  const { background, accent, border, darkMode } = getThemeClasses(theme);

  // Check if Stage 4 requirements are met
  const isStage4Complete = () => {
    return panels.length > 0 && currentStage === 4;
  };

  // Transition to Stage 5 when requirements are met
  useEffect(() => {
    if (isStage4Complete()) {
      const transitionToStage5 = () => {
        setCurrentStage(5);
        // Trigger Stage 5 transition animation
        // This could be handled by StageTransition.jsx
      };

      // Check every 500ms
      const checkInterval = setInterval(() => {
        if (isStage4Complete()) {
          transitionToStage5();
          clearInterval(checkInterval);
        }
      }, 500);

      return () => clearInterval(checkInterval);
    }
  }, [currentStage, panels]);

  return (
    <div className={"p-4"}>
      {currentStage === 4 && (
        <div className={"text-center py-4"}>
          <div className={"text-2xl font-bold">Stage 4 Complete</div>
          <div className={"text-lg text-gray-500">Transitioning to Stage 5...</div>
        </div>
      )}
      {children}
    </div>
  );
};
