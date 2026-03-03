import React, { useEffect, useRef } from "react";

export default function ParallaxLayer({ depth = 1, children }) {
  const layerRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / innerWidth;
      const y = (e.clientY - innerHeight / 2) / innerHeight;

      const translateX = x * depth * -20; 
      const translateY = y * depth * -20;

      layer.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [depth]);

  return (
    <div
      ref={layerRef}
      className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-out"
      style={{
        zIndex: depth,
      }}
    >
      {children}
    </div>
  );
}
