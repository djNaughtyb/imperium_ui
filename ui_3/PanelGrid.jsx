import { useState } from "react";
import { api } from "../api/client";
import { useAuth } from "../state/auth";
import { useProject } from "../state/project";

export const PanelGrid = () => {
  const { token } = useAuth();
  const { panels, removePanel, layout, setLayout } = useProject();

  const layoutPresets = {
    grid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4",
    list: "flex flex-col gap-4",
    "2-col": "grid grid-cols-2 gap-4",
    "3-col": "grid grid-cols-3 gap-4"
  };

  const handleDelete = async (panelId) => {
    try {
      await api(`/panels/${panelId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      removePanel(panelId);
    } catch (err) {
      console.error("Failed to delete panel:", err);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <select
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
          className="px-2 py-1 border rounded bg-zinc-800 text-white"
        >
          <option value="grid">Grid View</option>
          <option value="list">List View</option>
          <option value="2-col">2 Column</option>
          <option value="3-col">3 Column</option>
        </select>
      </div>

      <div className={layoutPresets[layout]}>
        {panels.map((panel) => (
          <div
            key={panel.id}
            className="bg-zinc-900 border border-zinc-700 p-4 rounded-lg shadow-lg relative"
          >
            <div className="absolute top-2 right-2 bg-white bg-opacity-20 p-1 rounded">
              <span className="text-xs">{panel.id}</span>
            </div>

            <div className="text-lg font-bold mb-1">
              Panel {panel.order_index ?? ""}
            </div>

            <div className="text-sm text-gray-400 mb-2">
              Layout: {panel.layout}
            </div>

            <div className="p-2 bg-zinc-800 rounded text-gray-200 whitespace-pre-wrap">
              {panel.text}
            </div>

            <button
              onClick={() => handleDelete(panel.id)}
              className="mt-3 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
