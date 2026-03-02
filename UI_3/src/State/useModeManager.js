// /src/state/useModeManager.js
import { useState, useEffect } from "react";

// ---------------------------------------------------------
// MODE REGISTRY — The Living Studio's Departments
// ---------------------------------------------------------

export const MODE_REGISTRY = {
  comics: {
    id: "comics",
    label: "Comics Department",
    icon: "📘",
    motionEngine: "stylized", // anime/comic motion
    compositing: "mixed", // supports hybrid scenes
    wallpapers: [
      "/wallpapers/comics/sky_parallax_1.mp4",
      "/wallpapers/comics/energy_field_2.webm",
      "/wallpapers/comics/panels_floating_3.mp4"
    ],
    motionLayers: [
      { type: "parallax", depth: 0.3 },
      { type: "particles", style: "ink-sparks" },
      { type: "ambient", style: "comic-halftone" }
    ],
    reactiveEvents: {
      onIdle: "charactersWander",
      onToneDark: "shadowsDeepen",
      onToneFunny: "colorsBounce",
      onToneAction: "motionIntensifies",
      onStoryEvent: "environmentShift"
    },
    agentHooks: {
      orchestrator: "Primus",
      creative: "ComicAgent",
      tone: "ToneAgent"
    },
    environmentState: {
      mood: "neutral",
      energy: 1,
      darkness: 0.1,
      humor: 0.1
    }
  },

  film: {
    id: "film",
    label: "Cinematic Department",
    icon: "🎬",
    motionEngine: "realistic",
    compositing: "mixed",
    wallpapers: [
      "/wallpapers/film/city_rain_real.mp4",
      "/wallpapers/film/studio_spotlights.mp4"
    ],
    motionLayers: [
      { type: "lighting", style: "cinematic" },
      { type: "particles", style: "dust" }
    ],
    reactiveEvents: {
      onIdle: "lightsShift",
      onToneDark: "rainIntensifies",
      onToneAction: "cameraShake",
      onStoryEvent: "dramaticLighting"
    },
    agentHooks: {
      orchestrator: "Primus",
      creative: "FilmAgent",
      tone: "ToneAgent"
    },
    environmentState: {
      mood: "dramatic",
      energy: 1,
      darkness: 0.3,
      humor: 0
    }
  },

  anime: {
    id: "anime",
    label: "Anime Department",
    icon: "✨",
    motionEngine: "stylized",
    compositing: "mixed",
    wallpapers: [
      "/wallpapers/anime/sky_energy_1.mp4",
      "/wallpapers/anime/sakura_fall_2.mp4"
    ],
    motionLayers: [
      { type: "particles", style: "sakura" },
      { type: "energy", style: "aura" }
    ],
    reactiveEvents: {
      onIdle: "petalsDrift",
      onToneAction: "speedLines",
      onToneEmotional: "softGlow",
      onStoryEvent: "energyPulse"
    },
    agentHooks: {
      orchestrator: "Primus",
      creative: "AnimeAgent",
      tone: "ToneAgent"
    },
    environmentState: {
      mood: "energetic",
      energy: 2,
      darkness: 0,
      humor: 0.2
    }
  }
};

// ---------------------------------------------------------
// MODE MANAGER — The Brain of the Living Studio
// ---------------------------------------------------------

export function useModeManager() {
  const [currentMode, setCurrentMode] = useState(
    localStorage.getItem("imperium_mode") || "comics"
  );

  const [environment, setEnvironment] = useState(
    MODE_REGISTRY[currentMode].environmentState
  );

  // Persist mode
  useEffect(() => {
    localStorage.setItem("imperium_mode", currentMode);
    setEnvironment(MODE_REGISTRY[currentMode].environmentState);
  }, [currentMode]);

  // Change mode
  function changeMode(modeId) {
    if (MODE_REGISTRY[modeId]) {
      setCurrentMode(modeId);
    }
  }

  // Reactive environment updates
  function updateEnvironment(eventType, payload) {
    const mode = MODE_REGISTRY[currentMode];
    const reaction = mode.reactiveEvents[eventType];

    if (!reaction) return;

    setEnvironment(prev => ({
      ...prev,
      ...handleReaction(reaction, prev, payload)
    }));
  }

  // Reaction logic
  function handleReaction(reaction, state, payload) {
    switch (reaction) {
      case "shadowsDeepen":
        return { darkness: Math.min(state.darkness + 0.1, 1) };
      case "colorsBounce":
        return { humor: Math.min(state.humor + 0.1, 1) };
      case "motionIntensifies":
        return { energy: Math.min(state.energy + 0.2, 3) };
      case "environmentShift":
        return { mood: payload?.mood || state.mood };
      default:
        return {};
    }
  }

  return {
    currentMode,
    modeData: MODE_REGISTRY[currentMode],
    environment,
    changeMode,
    updateEnvironment
  };
}