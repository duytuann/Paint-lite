import {makeAutoObservable} from "mobx";
import {DEFAULT_CANVAS_BACKGROUND_COLOR, STORAGE_KEY} from "@/constants";
import type {ToolType} from "@/types";

export interface DrawingObject {
  id: string;
  type: ToolType;
  x: number;
  y: number;
  width?: number;
  height?: number;
  endX?: number;
  endY?: number;
  points?: Array<{x: number; y: number}>;
  strokeColor?: string;
  strokeWidth?: number;
  backgroundColor?: string;
  opacity?: number;
}

export class CanvasStore {
  // Canvas dimensions
  width = 0;
  height = 0;

  // Canvas background
  canvasBackgroundColor = DEFAULT_CANVAS_BACKGROUND_COLOR;

  // Drawing objects
  objects: DrawingObject[] = [];

  currentObject: Partial<DrawingObject> | null = null;

  // Canvas settings
  zoom = 1;
  panX = 0;
  panY = 0;
  showGrid = true;

  constructor() {
    makeAutoObservable(this);
    this.loadFromStorage();
  }

  // Actions
  setCanvasDimensions = (width: number, height: number) => {
    this.width = width;
    this.height = height;
  };

  setCanvasBackgroundColor = (color: string) => {
    this.canvasBackgroundColor = color;
    this.saveToStorage();
  };

  addObject = (object: DrawingObject) => {
    this.objects.push(object);
    this.saveToStorage();
  };

  removeObject = (id: string) => {
    this.objects = this.objects.filter((obj) => obj.id !== id);
    this.saveToStorage();
  };

  clearCanvas = () => {
    this.objects = [];
    this.saveToStorage();
  };

  setCurrentObject = (object: Partial<DrawingObject> | null) => {
    this.currentObject = object;
  };

  // Storage methods
  saveToStorage = () => {
    try {
      const data = {
        objects: this.objects,
        canvasBackgroundColor: this.canvasBackgroundColor,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.warn("Failed to save canvas to localStorage:", error);
    }
  };

  loadFromStorage = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const data = JSON.parse(saved);
        this.objects = data.objects || [];
        this.canvasBackgroundColor =
          data.canvasBackgroundColor || DEFAULT_CANVAS_BACKGROUND_COLOR;
      }
    } catch (error) {
      console.warn("Failed to load canvas from localStorage:", error);
    }
  };
}
