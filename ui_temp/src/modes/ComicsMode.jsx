import React, { useState } from "react";

import { useStudioState } from "../context/StudioStateProvider";
import { useOverlay } from "../context/OverlayProvider";
import { useUniverseTheme } from "../context/UniverseThemeProvider";

export default function ComicsMode() {
  const { setPanel, startTransition, endTransition } = useStudioState();
  const { pushNotification } = useOverlay();
  const { currentTheme } = useUniverseTheme();

  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateComicPanel = async () => {
    if (!prompt.trim()) {
      pushNotification("Enter a prompt first.", "error");
      return;
    }

    setLoading(true);
    startTransition();

    try {
      const response = await fetch("/api/generate/comic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setOutput(data.image);
      setPanel("COMIC_PANEL");

      pushNotification("Panel generated.", "success");
    } catch (err) {
      pushNotification("Generation failed.", "error");
    }

    setLoading(false);
    endTransition();
  };

  return (
    <div className="w-full h-full flex flex-col space-y-6">

      <h2 className={`text-3xl font-bold tracking-wide ${currentTheme.primary}`}>
        Comics Mode
      </h2>

      <textarea
        className="w-full h-40 p-4 bg-black/40 border border-white/10 rounded-lg text-white backdrop-blur-md"
        placeholder="Describe your comic panel..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={generateComicPanel}
        disabled={loading}
        className={`px-8 py-4 rounded-lg text-white font-semibold transition-all duration-300 ${
          loading ? "bg-white/20 cursor-not-allowed" : "bg-white/10 hover:bg-white/20"
        }`}
      >
        {loading ? "Generating..." : "Generate Panel"}
      </button>

      {output && (
        <div className="w-full flex justify-center mt-6">
          <img
            src={output}
            alt="Generated Comic Panel"
            className="max-w-full rounded-lg shadow-lg"
          />
        </div>
      )}

    </div>
  );
}