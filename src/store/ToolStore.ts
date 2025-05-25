import {makeAutoObservable} from "mobx";
import type {ToolType} from "@/types";
import {DEFAULT_TOOL} from "@/constants";
import {
  DEFAULT_STROKE_COLOR,
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_STROKE_WIDTH,
  DEFAULT_OPACITY,
} from "@/constants/colors";
import {hexToRgba} from "@/utils/color";

export class ToolStore {
  activeTool: ToolType = DEFAULT_TOOL;
  isDrawing = false;

  // Drawing properties
  strokeColor = DEFAULT_STROKE_COLOR;
  backgroundColor = DEFAULT_BACKGROUND_COLOR;
  strokeWidth = DEFAULT_STROKE_WIDTH;
  opacity = DEFAULT_OPACITY;

  constructor() {
    makeAutoObservable(this);
  }

  // Actions
  setActiveTool = (tool: ToolType) => {
    this.activeTool = tool;
    this.stopDrawing(); // Stop drawing when switching tools
  };

  startDrawing = () => {
    this.isDrawing = true;
  };

  stopDrawing = () => {
    this.isDrawing = false;
  };

  setStrokeColor = (color: string) => {
    this.strokeColor = color;
  };

  setBackgroundColor = (color: string) => {
    this.backgroundColor = color;
  };

  setStrokeWidth = (width: number) => {
    this.strokeWidth = width;
  };

  setOpacity = (opacity: number) => {
    this.opacity = opacity;
  };

  // Computed values
  get currentStrokeStyle() {
    return hexToRgba(this.strokeColor, this.opacity);
  }

  get currentBackgroundStyle() {
    return hexToRgba(this.backgroundColor, this.opacity);
  }
}
