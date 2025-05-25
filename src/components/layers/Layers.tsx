import {observer} from "mobx-react-lite";
import {useCanvasStore} from "@/store";
import {Undo, Redo, Trash2} from "lucide-react";
import "./Layers.css";

const Layers = observer(() => {
  const canvasStore = useCanvasStore();

  return (
    <div className="layers">
      <div className="layers-content">
        <div className="layers-section">
          <h3 className="layers-title">Layers</h3>
          <div className="layer-controls">
            <button className="layer-button" title="Undo">
              <Undo size={20} />
            </button>
            <button className="layer-button" title="Redo">
              <Redo size={20} />
            </button>
            <button
              className="layer-button"
              onClick={canvasStore.clearCanvas}
              title="Clear canvas"
            >
              <Trash2 size={20} />
            </button>
            <span className="object-count">
              {canvasStore.objectCount} objects
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Layers; 