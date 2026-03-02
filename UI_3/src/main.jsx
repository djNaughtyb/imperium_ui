import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Global styles (Tailwind + custom cinematic layers)
import "./index.css";

// Global Providers (Living Studio Brain)
import { StudioStateProvider } from "./providers/StudioStateProvider";
import { UniverseThemeProvider } from "./providers/UniverseThemeProvider";
import { OverlayProvider } from "./providers/OverlayProvider";

// Future: C++ Agent Bridge (WebAssembly or Native Messaging)
import { CPPAgentProvider } from "./providers/CPPAgentProvider";

// Future: Multi-Agent Orchestration Client (Primus, Zero, VPS Agents)
import { AgentOrchestratorProvider } from "./providers/AgentOrchestratorProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UniverseThemeProvider>
        <StudioStateProvider>
          <OverlayProvider>
            {/* 
              Future-proof: C++ engine layer for physics, animation curves,
              real-time rendering, or WASM-based motion engine.
            */}
            <CPPAgentProvider>
              {/* 
                Future-proof: Primus + Zero + 22 VPS agents.
                This provider exposes a unified API client for all agents.
              */}
              <AgentOrchestratorProvider>
                <App />
              </AgentOrchestratorProvider>
            </CPPAgentProvider>
          </OverlayProvider>
        </StudioStateProvider>
      </UniverseThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);