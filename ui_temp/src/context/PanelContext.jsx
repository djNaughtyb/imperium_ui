import { useEffect, useState } from "react";

export const PanelContext = createContext();

export const PanelProvider = ({ children }) => {
  const [panels, setPanels] = useState(() => {
    const saved = localStorage.getItem("panels");
    return saved ? JSON.parse(saved) : [];
  });
  const [layout, setLayout] = useState(() => {
    const savedLayout = localStorage.getItem("panelLayout");
    return savedLayout ? JSON.parse(savedLayout) : "grid";
  });
  const [panelSize, setPanelSize] = useState(() => {
    const savedSize = localStorage.getItem("panelSize");
    return savedSize ? JSON.parse(savedSize) : { width: "100%", height: "auto" };
  });

  // Save panels to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("panels", JSON.stringify(panels));
    } catch (e) {
      console.error("Failed to save panels to localStorage:", e);
    }
  }, [panels]);

  // Save layout and panel size to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("panelLayout", JSON.stringify(layout));
      localStorage.setItem("panelSize", JSON.stringify(panelSize));
    } catch (e) {
      console.error("Failed to save layout/size to localStorage:", e);
    }
  }, [layout, panelSize]);

  const addPanel = (newPanel) => {
    setPanels([...panels, newPanel]);
  };

  const updatePanel = (updatedPanel) => {
    setPanels(panels.map(panel => 
      panel.id === updatedPanel.id ? updatedPanel : panel
    ));
  };

  const deletePanel = (panelId) => {
    setPanels(panels.filter(panel => panel.id !== panelId));
  };

  return (
    <PanelContext.Provider value={{ panels, addPanel, updatePanel, deletePanel, layout, setLayout, panelSize, setPanelSize }}>
      {children}
    </PanelContext.Provider>
  );
};
