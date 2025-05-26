import {observer} from "mobx-react-lite";
import {useToolStore, useCanvasStore} from "@/store";
import {
  STROKE_COLORS,
  BACKGROUND_COLORS,
  CANVAS_BACKGROUND_COLORS,
  StrokeWidth,
  StrokeStyle,
} from "@/constants";
import ColorPicker from "@/components/color-picker/ColorPicker";
import SolidIcon from "@/assets/icons/solid.svg?react";
import DashedIcon from "@/assets/icons/dashed.svg?react";
import DottedIcon from "@/assets/icons/dotted.svg?react";
import "./Sidebar.css";

const strokeWidthOptions = [
  {width: StrokeWidth.THIN, className: "stroke-thin"},
  {width: StrokeWidth.MEDIUM, className: "stroke-medium"},
  {width: StrokeWidth.THICK, className: "stroke-thick"},
];

const strokeStyleOptions = [
  {style: StrokeStyle.SOLID, name: "Solid", icon: SolidIcon},
  {style: StrokeStyle.DASHED, name: "Dashed", icon: DashedIcon},
  {style: StrokeStyle.DOTTED, name: "Dotted", icon: DottedIcon},
];

const Sidebar = observer(() => {
  const toolStore = useToolStore();
  const canvasStore = useCanvasStore();

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
            {strokeWidthOptions.map(({width, className}) => (
              <div
                key={width}
                className={`stroke-width-option ${
                  toolStore.strokeWidth === width ? "active" : ""
                }`}
                onClick={() => toolStore.setStrokeWidth(width)}
              >
                <div className={`stroke-line ${className}`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Stroke Style Section */}
        <div className="sidebar-section">
          <h3 className="sidebar-title">Stroke style</h3>
          <div className="stroke-style-options">
            {strokeStyleOptions.map(({style, name, icon: IconComponent}) => (
              <div
                key={style}
                className={`stroke-style-option ${
                  toolStore.strokeStyle === style ? "active" : ""
                }`}
                onClick={() => toolStore.setStrokeStyle(style)}
                title={name}
              >
                <div className="stroke-style-icon">
                  <IconComponent />
                </div>
              </div>
            ))}
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
              value={toolStore.opacity}
              onChange={(e) => toolStore.setOpacity(Number(e.target.value))}
              className="slider"
            />
            <div className="opacity-labels">
              <span>0</span>
              <span>100</span>
            </div>
          </div>
        </div>

        {/* Canvas Background Section */}
        <div className="sidebar-section">
          <ColorPicker
            currentColor={canvasStore.canvasBackgroundColor}
            onColorChange={canvasStore.setCanvasBackgroundColor}
            label="Canvas Background"
            colors={CANVAS_BACKGROUND_COLORS}
          />
        </div>
      </div>
    </div>
  );
});

export default Sidebar;
