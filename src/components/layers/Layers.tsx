import {observer} from "mobx-react-lite";
import {useCanvasStore} from "@/store";
import {Undo, Redo, Trash2, Square} from "lucide-react";
import {TOOLS} from "@/constants/tools";
import "./Layers.css";

const Layers = observer(() => {
  const canvasStore = useCanvasStore();

  const getToolIcon = (toolType: string) => {
    const tool = TOOLS[toolType as keyof typeof TOOLS];
    return tool ? tool.icon : Square;
  };

  return (
    <div className="layers">
      <div className="layers-content">
        {/* Header with controls */}
        <div className="layers-header">
          <h3 className="layers-title">Layers</h3>
          <div className="layer-controls">
            <button className="layer-button" title="Undo">
              <Undo size={16} />
            </button>
            <button className="layer-button" title="Redo">
              <Redo size={16} />
            </button>
            <button
              className="layer-button"
              onClick={canvasStore.clearCanvas}
              title="Clear canvas"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Objects list */}
        <div className="layers-list">
          {canvasStore.objects.length === 0 ? (
            <div className="no-objects">No layers</div>
          ) : (
            canvasStore.objects.map((object, index) => {
              const IconComponent = getToolIcon(object.type);
              return (
                <div key={object.id} className="layer-item">
                  <div className="layer-icon">
                    <IconComponent size={14} />
                  </div>
                  <div className="layer-info">
                    <span className="layer-name">Layer {index + 1}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer with object count */}
        <div className="layers-footer">
          <span className="object-count">{canvasStore.objectCount} layers</span>
        </div>
      </div>
    </div>
  );
});

export default Layers;
