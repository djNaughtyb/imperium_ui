import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Global styles (Tailwind + custom cinematic layers)
import "./index.css";

// Global Providers (Living Studio Brain)
import { StudioStateProvider } from "./context/StudioStateProvider";
import { UniverseThemeProvider } from "./context/UniverseThemeProvider";
import { OverlayProvider } from "./context/OverlayProvider";

// Future: C++ Agent Bridge (WebAssembly or Native Messaging)
// (Not implemented yet — removed from JSX)

// Future: Multi-Agent Orchestration Client (Primus, Zero, VPS Agents)
// (Not implemented yet — removed from JSX)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UniverseThemeProvider>
        <StudioStateProvider>
          <OverlayProvider>
            <App />
          </OverlayProvider>
        </StudioStateProvider>
      </UniverseThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);