// src/layers/WallpaperLayer.jsx
import React, { useContext, useMemo } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { StudioContext } from "../context/StudioContext";

export default function WallpaperLayer() {
  const { theme } = useContext(ThemeContext);
  const { currentStage } = useContext(StudioContext);

  const wallpaper = useMemo(() => {
    const stageWallpapers = {
      1: "/wallpapers/stage1.jpg",
      2: "/wallpapers/stage2.jpg",
      3: "/wallpapers/stage3.jpg",
      4: "/wallpapers/stage4.jpg",
    };

    const themeWallpapers = {
      light: "/wallpapers/light.jpg",
      dark: "/wallpapers/dark.jpg",
      neon: "/wallpapers/neon.jpg",
    };

    return (
      stageWallpapers[currentStage] ||
      themeWallpapers[theme] ||
      "/wallpapers/default.jpg"
    );
  }, [theme, currentStage]);

  return (
    <div
      className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-60 transition-all duration-1000"
      style={{
        backgroundImage: `url(${wallpaper})`,
        filter: "brightness(0.85) saturate(1.2)",
      }}
    />
  );
}
