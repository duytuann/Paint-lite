import type {Tool, ToolType} from "../types/tools";

export const TOOLS: Record<ToolType, Tool> = {
  rectangle: {
    id: "rectangle",
    name: "Rectangle",
    icon: "1",
    description: "Draw rectangles",
  },
  ellipse: {
    id: "ellipse",
    name: "Ellipse",
    icon: "2",
    description: "Draw ellipses and circles",
  },
  arrow: {
    id: "arrow",
    name: "Arrow",
    icon: "3",
    description: "Draw arrows",
  },
  line: {
    id: "line",
    name: "Line",
    icon: "4",
    description: "Draw straight lines",
  },
  draw: {
    id: "draw",
    name: "Draw",
    icon: "5",
    description: "Draw with pencil",
  },
};

export const DEFAULT_TOOL: ToolType = "rectangle";
