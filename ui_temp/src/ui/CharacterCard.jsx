import React from "react";
import { useModeManagerContext } from "../context/ModeManagerProvider";
import { UniverseThemeContext } from "../context/UniverseThemeProvider";

export default function CharacterCard({ character, onSelect }) {
  const { mode } = useModeManagerContext();
  const { currentTheme } = React.useContext(UniverseThemeContext);

  const themeStyles = {
    default: "bg-gray-800/80 border-gray-700 text-gray-100",
    dark: "bg-black/70 border-gray-800 text-gray-200",
    neon: "bg-purple-700/40 border-purple-500 text-white shadow-[0_0_12px_rgba(255,0,255,0.4)]",
    cosmic: "bg-indigo-900/40 border-indigo-500 text-indigo-100 shadow-[0_0_14px_rgba(99,102,241,0.5)]",
    manga: "bg-white border-black text-black shadow-[4px_4px_0px_#000]",
    anime: "bg-pink-200/70 border-pink-400 text-pink-900",
    storyboard: "bg-gray-200 border-gray-400 text-gray-900",
  };

  const modeAccent = {
    COMICS: "ring-2 ring-yellow-400",
    MANGA: "ring-2 ring-black",
    ANIME: "ring-2 ring-pink-400",
    STORYBOARD: "ring-2 ring-blue-400",
  };

  const cardTheme = themeStyles[currentTheme] || themeStyles.default;
  const cardMode = modeAccent[mode] || "";

  return (
    <div
      onClick={() => onSelect?.(character)}
      className={`
        ${cardTheme} ${cardMode}
        border rounded-xl p-4 cursor-pointer transition-all duration-300
        hover:scale-[1.03] hover:shadow-xl hover:opacity-95
        flex flex-col gap-2
      `}
    >
      {character.image && (
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-40 object-cover rounded-lg"
        />
      )}

      <h3 className="font-bold text-lg">{character.name}</h3>

      {character.role && (
        <p className="text-sm opacity-70">{character.role}</p>
      )}

      {character.description && (
        <p className="text-xs opacity-80">
          {character.description.slice(0, 120)}…
        </p>
      )}
    </div>
  );
}