import {makeAutoObservable} from "mobx";

export interface DrawingObject {
  id: string;
  type: "rectangle" | "ellipse" | "arrow" | "line" | "draw";
  x: number;
  y: number;
  width?: number;
  height?: number;
  endX?: number;
  endY?: number;
  points?: Array<{x: number; y: number}>;
}

export class CanvasStore {
  // Canvas dimensions
  width = 0;
  height = 0;

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
  }

  // Actions
  setCanvasDimensions = (width: number, height: number) => {
    this.width = width;
    this.height = height;
  };

  addObject = (object: DrawingObject) => {
    this.objects.push(object);
  };

  removeObject = (id: string) => {
    this.objects = this.objects.filter((obj) => obj.id !== id);
  };

  updateObject = (id: string, updates: Partial<DrawingObject>) => {
    const index = this.objects.findIndex((obj) => obj.id === id);
    if (index !== -1) {
      this.objects[index] = {...this.objects[index], ...updates};
    }
  };

  clearCanvas = () => {
    this.objects = [];
  };

  setCurrentObject = (object: Partial<DrawingObject> | null) => {
    this.currentObject = object;
  };
}
