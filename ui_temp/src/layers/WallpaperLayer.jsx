import React, { useContext, useMemo } from "react";
import { UniverseThemeContext } from "../context/UniverseThemeProvider";
import { StudioStateContext } from "../context/StudioStateProvider";

export default function WallpaperLayer() {
  const { currentTheme } = useContext(UniverseThemeContext);
  const { studioState } = useContext(StudioStateContext);

  // Dynamic wallpaper selection based on theme + mode
  const wallpaper = useMemo(() => {
    const theme = currentTheme || "default";

    const wallpapers = {
      default: "/wallpapers/default.jpg",
      dark: "/wallpapers/dark.jpg",
      neon: "/wallpapers/neon.jpg",
      cosmic: "/wallpapers/cosmic.jpg",
      manga: "/wallpapers/manga.jpg",
      anime: "/wallpapers/anime.jpg",
      storyboard: "/wallpapers/storyboard.jpg",
    };

    // Mode overrides theme when active
    const modeOverrides = {
      COMICS: "/wallpapers/comics.jpg",
      MANGA: "/wallpapers/manga.jpg",
      ANIME: "/wallpapers/anime.jpg",
      STORYBOARD: "/wallpapers/storyboard.jpg",
    };

    return modeOverrides[studioState] || wallpapers[theme] || wallpapers.default;
  }, [currentTheme, studioState]);

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
