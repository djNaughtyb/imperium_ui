import { useEffect, useState } from react;
import { usePanelContext, useStudioContext, useThemeContext } from ../context/PanelContext.jsx;
import { getThemeClasses } from ../utils/themeUtils.jsx;

export const PanelEditor = () => {
  const { addPanel } = usePanelContext();
  const { currentStage } = useStudioContext();
  const { theme } = useThemeContext();
  const { background, accent, border, darkMode } = getThemeClasses(theme);
  const [newPanelContent, setNewPanelContent] = useState();
  const [layout, setLayout] = useState("grid");

  const handleAddPanel = () => {
    if (newPanelContent.trim() !== ) {
      const newPanel = {
        id: Date.now(),
        content: newPanelContent,
        theme: theme,
        layout: layout
      };
      addPanel(newPanel);
      setNewPanelContent();
    }
  };

  return (
    <div className="p-4 border rounded">
      <div className="text-lg font-bold">Panel Editor</div>
      <div className="mt-2">
        <textarea
          value={newPanelContent}
          onChange={(e) => setNewPanelContent(e.target.value)}
          placeholder="Enter panel content here..."
          className="w-full p-2 border rounded mb-2"
        />
        <div>
          <button
            onClick={handleAddPanel}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 mr-2"
          >
            Add Panel
          </button>
          <select
            value={layout}
            onChange={(e) => setLayout(e.target.value)}
            className="px-2 py-1 border rounded"
          >
            <option value="grid">Grid View</option>
            <option value="list">List View</option>
            <option value="2-col">2 Column</option>
            <option value="3-col">3 Column</option>
          </select>
        </div>
      </div>
    </div>
  );
};
