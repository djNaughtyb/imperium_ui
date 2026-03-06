// src/context/PanelContext.jsx

import { createContext, useContext, useState, useCallback } from "react";

const PanelContext = createContext(null);

export const PanelProvider = ({ children }) => {
  const [panels, setPanels] = useState([]);

  const loadPanels = useCallback(async (projectId, token) => {
    const res = await fetch(`/studio/projects/${projectId}/panels`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setPanels(data);
  }, []);

  const addPanel = useCallback(async (payload, token) => {
    const res = await fetch(`/studio/panels/manual`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    const newPanel = await res.json();
    setPanels(prev => [...prev, newPanel]);
  }, []);

  const updatePanel = useCallback(async (panelId, payload, token) => {
    const res = await fetch(`/studio/panels/${panelId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    const updated = await res.json();
    setPanels(prev => prev.map(p => p.id === updated.id ? updated : p));
  }, []);

  const deletePanel = useCallback(async (panelId, token) => {
    await fetch(`/studio/panels/${panelId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    setPanels(prev => prev.filter(p => p.id !== panelId));
  }, []);

  return (
    <PanelContext.Provider
      value={{ panels, loadPanels, addPanel, updatePanel, deletePanel }}
    >
      {children}
    </PanelContext.Provider>
  );
};

export const usePanelContext = () => {
  const ctx = useContext(PanelContext);
  if (!ctx) throw new Error("usePanelContext must be used inside <PanelProvider>");
  return ctx;
};
