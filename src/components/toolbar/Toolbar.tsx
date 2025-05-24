import React from "react";
import {TOOLS} from "../../constants/tools";
import type {ToolType} from "../../types/tools";
import "./Toolbar.css";

interface ToolbarProps {
  activeTool: ToolType;
  onToolChange: (tool: ToolType) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({activeTool, onToolChange}) => {
  // Main tools to display in toolbar
  const mainTools: ToolType[] = [
    "rectangle",
    "ellipse",
    "arrow",
    "line",
    "draw",
  ];

  return (
    <div className="toolbar">
      <div className="toolbar-content">
        {/* Tools */}
        <div className="toolbar-tools">
          {mainTools.map((toolId) => {
            const tool = TOOLS[toolId];
            const IconComponent = tool.icon;
            return (
              <button
                key={tool.id}
                className={`toolbar-button tool-button ${
                  activeTool === tool.id ? "active" : ""
                }`}
                onClick={() => onToolChange(tool.id)}
                title={tool.description}
              >
                <IconComponent className="tool-icon" size={16} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
