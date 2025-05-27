import type {Tool, ToolType} from "@/types/tools";
import {
  Square,
  Circle,
  MoveRight,
  Minus,
  Pencil,
  MousePointer,
} from "lucide-react";

export const TOOLS: Record<ToolType, Tool> = {
  selection: {
    id: "selection",
    name: "Selection",
    icon: MousePointer,
    description: "Select object",
  },
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

export enum ToolTypes {
  Selection = "selection",
  Rectangle = "rectangle",
  Ellipse = "ellipse",
  Arrow = "arrow",
  Line = "line",
  Draw = "draw",
}

// Main tools to display in toolbar (in order)
export const MAIN_TOOLS: ToolType[] = [
  ToolTypes.Selection,
  ToolTypes.Rectangle,
  ToolTypes.Ellipse,
  ToolTypes.Arrow,
  ToolTypes.Line,
  ToolTypes.Draw,
];

export const DEFAULT_TOOL: ToolType = ToolTypes.Selection;
