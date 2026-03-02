import React, { createContext, useContext, useState, useMemo } from "react";

export const OverlayContext = createContext();

export function OverlayProvider({ children }) {
  const [overlay, setOverlay] = useState(null);
  const [overlayProps, setOverlayProps] = useState({});
  const [notifications, setNotifications] = useState([]);

  const openOverlay = (type, props = {}) => {
    setOverlay(type);
    setOverlayProps(props);
  };

  const closeOverlay = () => {
    setOverlay(null);
    setOverlayProps({});
  };

  const pushNotification = (message, variant = "info") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, variant }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  const value = useMemo(
    () => ({
      overlay,
      overlayProps,
      notifications,
      openOverlay,
      closeOverlay,
      pushNotification,

      // Future expansion ports:
      // openAgentPopup: (agentName, payload) => {},
      // openVRHUD: (hudData) => {},
      // openMerchPreview: (item) => {},
    }),
    [overlay, overlayProps, notifications]
  );

  return (
    <OverlayContext.Provider value={value}>
      {children}
    </OverlayContext.Provider>
  );
}

export const useOverlay = () => useContext(OverlayContext);