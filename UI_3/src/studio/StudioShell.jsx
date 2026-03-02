import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function StudioShell({ children }) {
  const location = useLocation();

  const modes = [
    { name: "Comics", path: "/comics" },
    { name: "Manga", path: "/manga" },
    { name: "Anime", path: "/anime" },
    { name: "Storyboard", path: "/storyboard" },
    // Future modes:
    // { name: "VR", path: "/vr" },
    // { name: "Merch", path: "/merch" },
    // { name: "Enterprise", path: "/enterprise" },
  ];

  return (
    <div className="relative w-full h-full flex">

      {/* Sidebar */}
      <aside className="w-20 bg-black/40 backdrop-blur-xl border-r border-white/10 flex flex-col items-center py-6 space-y-6">
        {modes.map((mode) => (
          <Link
            key={mode.path}
            to={mode.path}
            className={`text-xs tracking-wide uppercase transition ${
              location.pathname === mode.path
                ? "text-white font-bold"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            {mode.name}
          </Link>
        ))}
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 relative overflow-hidden">
        {/* Header */}
        <header className="w-full h-16 bg-black/30 backdrop-blur-xl border-b border-white/10 flex items-center px-6 justify-between">
          <h1 className="text-lg font-semibold tracking-wide">EMPIRE Studio</h1>

          {/* Future: Agent Dock */}
          {/* <AgentDock /> */}
        </header>

        {/* Active Mode Content */}
        <div className="w-full h-[calc(100%-4rem)] overflow-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}