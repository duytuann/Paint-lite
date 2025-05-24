import {makeAutoObservable} from "mobx";
import type {ToolType} from "../types";
import {DEFAULT_TOOL} from "../constants";

export class ToolStore {
  activeTool: ToolType = DEFAULT_TOOL;
  isDrawing = false;

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
}
