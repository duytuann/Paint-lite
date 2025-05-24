import type {LucideIcon} from "lucide-react";

export type ToolType = "rectangle" | "ellipse" | "arrow" | "line" | "draw";

export interface Tool {
  id: ToolType;
  name: string;
  icon: LucideIcon;
  description: string;
}
