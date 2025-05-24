import React, {useRef, useEffect, useState} from "react";
import type {ToolType} from "../../types/tools";
import "./Canvas.css";

interface CanvasProps {
  activeTool: ToolType;
}

const Canvas: React.FC<CanvasProps> = ({activeTool}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    // Set canvas size to match container
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Set up canvas context
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    // Drawing logic will be implemented based on active tool
    console.log(`Starting to draw with ${activeTool}`);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    // Drawing logic will be implemented based on active tool
    console.log(`Drawing with ${activeTool}`);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    console.log("Stopped drawing");
  };

  return (
    <div className="canvas-container" ref={containerRef}>
      <canvas
        ref={canvasRef}
        className="canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
};

export default Canvas;
