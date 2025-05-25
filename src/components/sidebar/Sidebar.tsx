import {observer} from "mobx-react-lite";
import {useToolStore} from "@/store";
import {STROKE_COLORS, BACKGROUND_COLORS} from "@/constants/colors";
import "./Sidebar.css";
import ColorPicker from "@/components/color-picker/ColorPicker";

const Sidebar = observer(() => {
  const toolStore = useToolStore();

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        {/* Stroke Section */}
        <div className="sidebar-section">
          <ColorPicker
            currentColor={toolStore.strokeColor}
            onColorChange={toolStore.setStrokeColor}
            label="Stroke"
            colors={STROKE_COLORS}
          />
        </div>

        {/* Background Section */}
        <div className="sidebar-section">
          <ColorPicker
            currentColor={toolStore.backgroundColor}
            onColorChange={toolStore.setBackgroundColor}
            label="Background"
            colors={BACKGROUND_COLORS}
          />
        </div>

        {/* Stroke Width Section */}
        <div className="sidebar-section">
          <h3 className="sidebar-title">Stroke width</h3>
          <div className="stroke-width-options">
            <div className="stroke-width-option">
              <div className="stroke-line stroke-thin"></div>
            </div>
            <div className="stroke-width-option">
              <div className="stroke-line stroke-medium"></div>
            </div>
            <div className="stroke-width-option active">
              <div className="stroke-line stroke-thick"></div>
            </div>
          </div>
        </div>

        {/* Opacity Section */}
        <div className="sidebar-section">
          <h3 className="sidebar-title">Opacity</h3>
          <div className="opacity-slider">
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="100"
              className="slider"
            />
            <div className="opacity-labels">
              <span>0</span>
              <span>100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Sidebar;
