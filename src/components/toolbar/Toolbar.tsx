import {observer} from "mobx-react-lite";
import {TOOLS, MAIN_TOOLS} from "@/constants/tools";
import {useToolStore} from "@/store";
import "./Toolbar.css";

const Toolbar = observer(() => {
  const toolStore = useToolStore();

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
      </div>
    </div>
  );
});

export default Toolbar;
