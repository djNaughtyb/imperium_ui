import { useEffect, useState } from react;
import { usePanelContext, useStudioContext, useThemeContext } from ../context/PanelContext.jsx;
import { getThemeClasses } from ../utils/themeUtils.jsx;

export const Panel = ({ panel }) => {
  const { theme } = useThemeContext();
  const { background, accent, border, darkMode } = getThemeClasses(theme);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(panel.content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updatePanel({ ...panel, content: editedContent });
    setIsEditing(false);
  };

  return (
    <div className="p-4 border rounded">
      {!isEditing ? (
        <div>
          <div className="text-lg font-bold">Panel Content</div>
          <div className="mt-2 p-2 bg-opacity-20 bg-white rounded">
            {panel.content}
          </div>
          <button
            onClick={handleEdit}
            className="mt-2 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit
          </button>
        </div>
      ) : (
        <div>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <div className="mt-2">
            <button
              onClick={handleSave}
              className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
