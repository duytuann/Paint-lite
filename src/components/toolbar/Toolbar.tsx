import {observer} from "mobx-react-lite";
import {TOOLS, MAIN_TOOLS} from "@/constants/tools";
import {useToolStore, useCanvasStore} from "@/store";
import {Download} from "lucide-react";
import "./Toolbar.css";

const Toolbar = observer(() => {
  const toolStore = useToolStore();
  const canvasStore = useCanvasStore();

  const handleExport = () => {
    const timestamp = new Date().toISOString();
    canvasStore.exportAsImage(`drawing-${timestamp}`);
  };

  return (
    <div className="toolbar">
      <div className="toolbar-content">
        {/* Tools */}
        <div className="toolbar-tools">
          {MAIN_TOOLS.map((toolId) => {
            const tool = TOOLS[toolId];
            const IconComponent = tool.icon;
            return (
              <button
                key={tool.id}
                className={`toolbar-button tool-button ${
                  toolStore.activeTool === tool.id ? "active" : ""
                }`}
                onClick={() => toolStore.setActiveTool(tool.id)}
                title={tool.description}
              >
                <IconComponent className="tool-icon" size={16} />
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="toolbar-divider"></div>

        {/* Export Button */}
        <div className="toolbar-actions">
          <button
            className="toolbar-button export-button"
            onClick={handleExport}
            title="Export as PNG"
          >
            <Download className="tool-icon" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
});

export default Toolbar;
