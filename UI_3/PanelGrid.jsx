import { useEffect, useState } from "react";
import { usePanelContext, useStudioContext, useThemeContext } from "../context/PanelContext.jsx";
import { getThemeClasses } from "../utils/themeUtils.jsx";

export const PanelGrid = () => {
  const { panels, updatePanel, deletePanel, layout, setLayout, panelSize, setPanelSize } = usePanelContext();
  const { currentStage } = useStudioContext();
  const { theme } = useThemeContext();
  const { background, accent, border, darkMode } = getThemeClasses(theme);
  const layoutPresets = {
    grid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    list: "flex flex-col gap-4",
    "2-col": "grid grid-cols-2 gap-4",
    "3-col": "grid grid-cols-3 gap-4"
  };

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  const handleSizeChange = (newSize) => {
    setPanelSize(newSize);
  };

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <select
          value={layout}
          onChange={(e) => handleLayoutChange(e.target.value)}
          className="px-2 py-1 border rounded"
        >
          <option value="grid">Grid View</option>
          <option value="list">List View</option>
          <option value="2-col">2 Column</option>
          <option value="3-col">3 Column</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4" style={{ gridTemplateColumns: layoutPresets[layout] }}>
        {panels.map(panel => (
          <div
            key={panel.id}
            id={`panel-${panel.id}`}
            className={`${background} ${border} ${darkMode} p-4 rounded-lg shadow-lg cursor-move relative`}
            style={{ width: panelSize.width, height: panelSize.height }}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, panel.id)}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onMouseDown={handleResizeStart}
            onMouseMove={handleResize}
            onMouseUp={handleResizeEnd}
          >
            <div className="absolute top-2 right-2 bg-white bg-opacity-20 p-1 rounded">
              <span className="text-xs">{panel.id}</span>
            </div>
            <div className="text-lg font-bold">Panel {panel.id}</div>
            <div className="text-sm text-gray-500">Theme: {theme}</div>
            <div className="mt-2 p-2 bg-opacity-20 bg-white rounded">
              {panel.content}
            </div>
            <button
              onClick={() => deletePanel(panel.id)}
              className="mt-2 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
            {/* Resizer handle */}
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-white bg-opacity-50 cursor-se-resize" />
          </div>
        ))}
      </div>
    </div>
  );
};
