import {makeAutoObservable} from "mobx";
import {
  DEFAULT_CANVAS_BACKGROUND_COLOR,
  STORAGE_KEY,
  StrokeStyle,
  StrokeWidth,
} from "@/constants";
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
  strokeWidth?: StrokeWidth;
  strokeStyle?: StrokeStyle;
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

  // Canvas reference for export
  canvasRef: HTMLCanvasElement | null = null;

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

  setCanvasRef = (ref: HTMLCanvasElement | null) => {
    this.canvasRef = ref;
  };

  addObject = (object: DrawingObject) => {
    this.objects.push(object);
    this.saveToStorage();
  };

  clearCanvas = () => {
    this.objects = [];
    this.saveToStorage();
  };

  setCurrentObject = (object: Partial<DrawingObject> | null) => {
    this.currentObject = object;
  };

  // Computed values
  get objectCount() {
    return this.objects.length;
  }

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

  // Export canvas as image
  exportAsImage = (filename = "drawing") => {
    if (!this.canvasRef) {
      console.error("Canvas reference not available for export");
      return;
    }

    try {
      // Create a temporary link element
      const link = document.createElement("a");

      // Convert canvas to blob
      this.canvasRef.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          console.log(url);
          link.href = url;
          link.download = `${filename}.png`;

          // Trigger download
          document.body.appendChild(link);
          link.click();

          // Cleanup
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }, "image/png");
    } catch (error) {
      console.error("Failed to export canvas:", error);
    }
  };
}
