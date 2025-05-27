import type {LucideIcon} from "lucide-react";

export type ToolType =
  | "selection"
  | "rectangle"
  | "ellipse"
  | "arrow"
  | "line"
  | "draw";

export interface Tool {
  id: ToolType;
  name: string;
  icon: LucideIcon;
  description: string;
}
