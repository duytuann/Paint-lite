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
  type: ToolType | null;
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
  isImageType?: boolean;
  imageData?: string;
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

  // Canvas reference for export
  canvasRef: HTMLCanvasElement | null = null;

  // Image counter (use for re-render Canvas component after uploaded)
  imageCount: number = 0;

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

  setImageCount = () => {
    this.imageCount++;
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

  // Upload and draw image
  uploadImage = (file: File): Promise<DrawingObject | null> => {
    if (!this.canvasRef) {
      console.error("Canvas reference not available for image upload");
      return Promise.resolve(null);
    }

    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();

        img.onload = () => {
          // Calculate image size and position
          const canvas = this.canvasRef!;
          const canvasWidth = canvas.width;
          const canvasHeight = canvas.height;
          const scale = Math.min(
            (canvasWidth * 0.8) / img.width,
            (canvasHeight * 0.8) / img.height
          );

          const width = img.width * scale;
          const height = img.height * scale;

          // Center the image on the canvas
          const x = (canvasWidth - width) / 2;
          const y = (canvasHeight - height) / 2;

          // Create new image object
          const imageObject: DrawingObject = {
            id: Date.now().toString(),
            type: null,
            x,
            y,
            width,
            height,
            imageData: e.target?.result as string,
            opacity: 100,
            isImageType: true,
          };

          this.addObject(imageObject);
          this.setImageCount();

          resolve(imageObject);
        };

        img.src = e.target?.result as string;
      };

      reader.readAsDataURL(file);
    });
  };
}
