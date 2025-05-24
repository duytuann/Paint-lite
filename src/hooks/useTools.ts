import {useState, useCallback} from "react";
import type {ToolType} from "../types/tools";
import {DEFAULT_TOOL} from "../constants/tools";

export const useTools = () => {
  const [activeTool, setActiveTool] = useState<ToolType>(DEFAULT_TOOL);
  const [isDrawing, setIsDrawing] = useState(false);

  const selectTool = useCallback((tool: ToolType) => {
    setActiveTool(tool);
    // Stop any current drawing when switching tools
    setIsDrawing(false);
  }, []);

  const startDrawing = useCallback(() => {
    setIsDrawing(true);
  }, []);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  return {
    activeTool,
    isDrawing,
    selectTool,
    startDrawing,
    stopDrawing,
  };
};
