import React, {useState, useEffect, useLayoutEffect} from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
} from "@floating-ui/react";
import {isValidHex, normalizeHex} from "@/utils/color";
import {TRANSPARENT} from "@/constants/colors";
import transparentBg from "@/assets/images/transparent.png";
import "./ColorPicker.css";

interface ColorPickerProps {
  currentColor: string;
  onColorChange: (color: string) => void;
  label: string;
  colors: string[];
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  currentColor,
  onColorChange,
  label,
  colors,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempColor, setTempColor] = useState(currentColor);
  const [hexInput, setHexInput] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  const {refs, floatingStyles, context} = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(12),
      flip({
        fallbackAxisSideDirection: "start",
      }),
      shift({padding: 8}),
    ],
    placement: "right-start",
    strategy: "absolute",
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const {getReferenceProps, getFloatingProps} = useInteractions([
    click,
    dismiss,
    role,
  ]);

  // Update temp color when currentColor changes
  useEffect(() => {
    setTempColor(currentColor);
    setHexInput(
      currentColor === TRANSPARENT ? "" : currentColor.replace("#", "")
    );
  }, [currentColor]);

  // Handle mounting state for smooth positioning
  useLayoutEffect(() => {
    if (isOpen) {
      setIsMounted(false);
      // Small delay to ensure proper positioning calculation
      const timer = setTimeout(() => setIsMounted(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsMounted(false);
    }
  }, [isOpen]);

  const handlePresetColorClick = (color: string) => {
    onColorChange(color);
    setIsOpen(false);
  };

  const handleCustomColorClick = () => {
    setTempColor(currentColor);
    setHexInput(
      currentColor === TRANSPARENT ? "" : currentColor.replace("#", "")
    );
  };

  const handleNativeColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setTempColor(color);
    setHexInput(color.replace("#", ""));
    onColorChange(color);
  };

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexInput(value);

    if (isValidHex(value)) {
      const normalizedHex = normalizeHex(value);
      setTempColor(normalizedHex);
      onColorChange(normalizedHex);
    }
  };

  // Get the style for custom color picker button
  const getCustomColorPickerStyle = () => {
    if (currentColor === TRANSPARENT) {
      return {
        backgroundImage: `url(${transparentBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      };
    }
    return {
      backgroundColor: currentColor,
    };
  };

  return (
    <div className="color-picker">
      <h3 className="color-picker-title">{label}</h3>

      {/* Preset Colors */}
      <div className="color-palette">
        {colors.map((color, index) => (
          <div
            key={`${label}-${index}`}
            className="color-item"
            style={{
              backgroundColor: color === TRANSPARENT ? TRANSPARENT : color,
              backgroundImage:
                color === TRANSPARENT ? `url(${transparentBg})` : undefined,
              border: color === TRANSPARENT ? "2px solid #e5e7eb" : undefined,
            }}
            onClick={() => handlePresetColorClick(color)}
          />
        ))}

        {/* Custom Color Picker Button */}
        <div
          ref={refs.setReference}
          className={`color-item custom-color-picker ${isOpen ? "active" : ""}`}
          style={getCustomColorPickerStyle()}
          onClick={handleCustomColorClick}
          {...getReferenceProps()}
        ></div>
      </div>

      {/* Color Picker Popper */}
      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            className={`color-picker-popper ${isMounted ? "mounted" : ""}`}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            <div className="color-picker-content">
              <h4 className="color-picker-popper-title">Colors</h4>

              {/* Native Color Input */}
              <div className="native-color-section">
                <input
                  type="color"
                  value={tempColor === TRANSPARENT ? "#000000" : tempColor}
                  onChange={handleNativeColorChange}
                  className="native-color-input"
                />
              </div>

              {/* Hex Input Section */}
              <div className="hex-input-section">
                <label className="hex-input-label">Hex code</label>
                <div className="hex-input-wrapper">
                  <span className="hex-prefix">#</span>
                  <input
                    type="text"
                    value={hexInput}
                    onChange={handleHexInputChange}
                    placeholder="f08c00"
                    className="hex-input"
                    maxLength={6}
                  />
                </div>
              </div>
            </div>
          </div>
        </FloatingPortal>
      )}
    </div>
  );
};

export default ColorPicker;
