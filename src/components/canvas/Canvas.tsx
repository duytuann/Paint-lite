import React, {useRef, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {useToolStore, useCanvasStore} from "@/store";
import type {ToolType} from "@/types/tools";
import {ToolTypes} from "@/constants";
import type {DrawingObject} from "@/store/CanvasStore";

import "./Canvas.css";

interface CanvasProps {
  activeTool: ToolType;
}

const Canvas = observer(({activeTool}: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const toolStore = useToolStore();
  const canvasStore = useCanvasStore();

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return {x: 0, y: 0};

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    toolStore.startDrawing();
    const pos = getMousePos(e);

    const newObject: Partial<DrawingObject> = {
      id: "temp",
      type: activeTool as DrawingObject["type"],
      x: pos.x,
      y: pos.y,
      points: activeTool === ToolTypes.Draw ? [pos] : undefined,
    };

    canvasStore.setCurrentObject(newObject);
    // Drawing logic will be implemented based on active tool
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!toolStore.isDrawing || !canvasStore.currentObject) return;

    const pos = getMousePos(e);
    const current = canvasStore.currentObject;

    if (activeTool == ToolTypes.Draw) {
      const points = current.points || [];
      points.push(pos);
      canvasStore.setCurrentObject({...current, points});
    } else {
      canvasStore.setCurrentObject({
        ...current,
        width: pos.x - current.x!,
        height: pos.y - current.y!,
        endX: pos.x,
        endY: pos.y,
      });
    }
  };

  const stopDrawing = () => {
    if (!toolStore.isDrawing || !canvasStore.currentObject) return;

    canvasStore.addObject(canvasStore.currentObject as DrawingObject);
    canvasStore.setCurrentObject(null);
    toolStore.stopDrawing();
  };

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw all saved objects
    canvasStore.objects.forEach((obj) => {
      drawObject(ctx, obj);
    });

    // Draw current preview object
    if (canvasStore.currentObject && toolStore.isDrawing) {
      drawObject(ctx, canvasStore.currentObject);
    }
  };

  const drawObject = (
    ctx: CanvasRenderingContext2D,
    obj: Partial<DrawingObject>
  ) => {
    ctx.save();

    switch (obj.type) {
      case ToolTypes.Draw:
        if (obj.points && obj.points.length > 1) {
          ctx.beginPath();
          ctx.moveTo(obj.points[0].x, obj.points[0].y);
          for (let i = 1; i < obj.points.length; i++) {
            ctx.lineTo(obj.points[i].x, obj.points[i].y);
          }
          ctx.stroke();
        }
        break;
    }

    ctx.restore();
  };

  useEffect(() => {
    redrawCanvas();
  }, [canvasStore.objects, canvasStore.currentObject, toolStore.isDrawing]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [canvasStore]);

  return (
    <div className="canvas-container" ref={containerRef}>
      <canvas
        ref={canvasRef}
        className="canvas"
        data-tool={activeTool}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
});

export default Canvas;
