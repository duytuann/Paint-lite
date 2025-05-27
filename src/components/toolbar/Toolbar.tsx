import {observer} from "mobx-react-lite";
import {TOOLS, MAIN_TOOLS} from "@/constants/tools";
import {useToolStore, useCanvasStore} from "@/store";
import {Download, Upload} from "lucide-react";
import "./Toolbar.css";

const Toolbar = observer(() => {
  const toolStore = useToolStore();
  const canvasStore = useCanvasStore();

  const handleExport = () => {
    const timestamp = new Date().toISOString();
    canvasStore.exportAsImage(`drawing-${timestamp}`);
  };

  const handleImageUpload = () => {
    // Create a hidden input file
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";

    fileInput.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        canvasStore
          .uploadImage(file)
          .then(() => {
            console.log("Image uploaded successfully");
          })
          .catch((error) => {
            console.error("Failed to upload image:", error);
          });
      }
    };

    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
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

        {/* Actions */}
        <div className="toolbar-actions">
          <button
            className="toolbar-button upload-button"
            onClick={handleImageUpload}
            title="Upload Image"
          >
            <Upload className="tool-icon" size={16} />
          </button>
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
