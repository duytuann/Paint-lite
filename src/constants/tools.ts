import type {Tool, ToolType} from "../types/tools";
import {Square, Circle, MoveRight, Minus, Pencil} from "lucide-react";

export const TOOLS: Record<ToolType, Tool> = {
  rectangle: {
    id: "rectangle",
    name: "Rectangle",
    icon: Square,
    description: "Draw rectangles",
  },
  ellipse: {
    id: "ellipse",
    name: "Ellipse",
    icon: Circle,
    description: "Draw ellipses and circles",
  },
  arrow: {
    id: "arrow",
    name: "Arrow",
    icon: MoveRight,
    description: "Draw arrows",
  },
  line: {
    id: "line",
    name: "Line",
    icon: Minus,
    description: "Draw straight lines",
  },
  draw: {
    id: "draw",
    name: "Draw",
    icon: Pencil,
    description: "Draw with pencil",
  },
};

export const DEFAULT_TOOL: ToolType = "rectangle";
