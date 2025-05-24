import React from "react";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        {/* Stroke Section */}
        <div className="sidebar-section">
          <h3 className="sidebar-title">Stroke</h3>
          <div className="color-palette">
            <div className="color-item color-black active"></div>
            <div className="color-item color-red"></div>
            <div className="color-item color-green"></div>
            <div className="color-item color-blue"></div>
            <div className="color-item color-orange"></div>
            <div className="color-item color-custom-red"></div>
          </div>
        </div>

        {/* Background Section */}
        <div className="sidebar-section">
          <h3 className="sidebar-title">Background</h3>
          <div className="color-palette">
            <div className="color-item color-transparent active"></div>
            <div className="color-item color-light-pink"></div>
            <div className="color-item color-light-green"></div>
            <div className="color-item color-light-blue"></div>
            <div className="color-item color-light-yellow"></div>
            <div className="color-item color-light-red"></div>
          </div>
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
};

export default Sidebar;
