import React, {useRef, useEffect, useCallback} from "react";
import {observer} from "mobx-react-lite";
import {useToolStore, useCanvasStore} from "@/store";
import {StrokeStyle, ToolTypes, TRANSPARENT} from "@/constants";
import type {DrawingObject} from "@/store/CanvasStore";
import {generateUUIDv4} from "@/utils";

import "./Canvas.css";

const Canvas = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const toolStore = useToolStore();
  const canvasStore = useCanvasStore();

  const getMousePos = (e: MouseEvent | React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return {x: 0, y: 0};

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // Don't start drawing if selection tool is active
    if (toolStore.activeTool === ToolTypes.Selection) return;

    toolStore.startDrawing();
    const pos = getMousePos(e);

    const newObject: Partial<DrawingObject> = {
      id: generateUUIDv4(),
      type: toolStore.activeTool as DrawingObject["type"],
      x: pos.x,
      y: pos.y,
      points: toolStore.activeTool === ToolTypes.Draw ? [pos] : undefined,
      strokeColor: toolStore.strokeColor,
      strokeWidth: toolStore.strokeWidth,
      strokeStyle: toolStore.strokeStyle,
      backgroundColor: toolStore.backgroundColor,
      opacity: toolStore.opacity,
    };

    canvasStore.setCurrentObject(newObject);
  };

  const draw = useCallback(
    (e: MouseEvent) => {
      if (!toolStore.isDrawing || !canvasStore.currentObject) return;
      if (toolStore.activeTool === ToolTypes.Selection) return;

      const pos = getMousePos(e);
      const current = canvasStore.currentObject;

      if (toolStore.activeTool == ToolTypes.Draw) {
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
    },
    [toolStore.isDrawing, toolStore.activeTool, canvasStore]
  );

  const stopDrawing = useCallback(() => {
    if (!toolStore.isDrawing || !canvasStore.currentObject) return;
    if (toolStore.activeTool === ToolTypes.Selection) return;

    canvasStore.addObject(canvasStore.currentObject as DrawingObject);
    canvasStore.setCurrentObject(null);
    toolStore.stopDrawing();
  }, [canvasStore, toolStore]);

  // Add document-level event listeners for mouse move and mouse up
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      draw(e);
    };

    const handleMouseUp = () => {
      stopDrawing();
    };

    if (toolStore.isDrawing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [toolStore.isDrawing, draw, stopDrawing]);

  const drawObject = useCallback(
    (ctx: CanvasRenderingContext2D, obj: Partial<DrawingObject>) => {
      // Save canvas state to restore later
      ctx.save();

      // Apply drawing styles (color, width, opacity)
      ctx.strokeStyle = obj.strokeColor || toolStore.currentStrokeStyle;
      ctx.fillStyle = obj.backgroundColor || toolStore.currentBackgroundStyle;
      ctx.lineWidth = obj.strokeWidth || toolStore.strokeWidth;
      ctx.globalAlpha = (obj.opacity || toolStore.opacity) / 100;

      // Apply stroke style (dash pattern)
      const strokeStyle = obj.strokeStyle || toolStore.strokeStyle;
      switch (strokeStyle) {
        case StrokeStyle.DASHED:
          ctx.setLineDash([10, 5]);
          break;
        case StrokeStyle.DOTTED:
          ctx.setLineDash([2, 3]);
          break;
        case StrokeStyle.SOLID:
          ctx.setLineDash([]);
          break;
        default:
          ctx.setLineDash([]); // Solid
      }

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

        case ToolTypes.Line:
          ctx.beginPath();
          ctx.moveTo(obj.x!, obj.y!); // Start point
          ctx.lineTo(obj.endX || obj.x!, obj.endY || obj.y!); // End point
          ctx.stroke();
          break;

        case ToolTypes.Arrow:
          // Draw arrow shaft
          ctx.beginPath();
          ctx.moveTo(obj.x!, obj.y!);
          ctx.lineTo(obj.endX || obj.x!, obj.endY || obj.y!);
          ctx.stroke();

          // Draw arrowhead (two angled lines)
          if (obj.endX && obj.endY) {
            const angle = Math.atan2(obj.endY - obj.y!, obj.endX - obj.x!);
            const headLength = 8;

            ctx.beginPath();
            // First arrowhead line (30 degree counter-clockwise)
            ctx.moveTo(obj.endX, obj.endY);
            ctx.lineTo(
              obj.endX - headLength * Math.cos(angle - Math.PI / 6),
              obj.endY - headLength * Math.sin(angle - Math.PI / 6)
            );
            // Second arrowhead line (30 degree clockwise)
            ctx.moveTo(obj.endX, obj.endY);
            ctx.lineTo(
              obj.endX - headLength * Math.cos(angle + Math.PI / 6),
              obj.endY - headLength * Math.sin(angle + Math.PI / 6)
            );
            ctx.stroke();
          }
          break;

        case ToolTypes.Rectangle:
          if (obj.width && obj.height) {
            if (obj.backgroundColor !== TRANSPARENT) {
              ctx.fillRect(obj.x!, obj.y!, obj.width, obj.height);
            }
            ctx.strokeRect(obj.x!, obj.y!, obj.width, obj.height);
          }
          break;

        case ToolTypes.Ellipse:
          if (obj.width && obj.height) {
            ctx.beginPath();

            // Convert rectangle bounds to ellipse center and radii
            ctx.ellipse(
              obj.x! + obj.width / 2, // center X
              obj.y! + obj.height / 2, // center Y
              Math.abs(obj.width) / 2, // radius X
              Math.abs(obj.height) / 2, // radius Y
              0, // rotation
              0, // start
              2 * Math.PI // end angle
            );
            if (obj.backgroundColor !== TRANSPARENT) {
              ctx.fill();
            }

            ctx.stroke();
          }
          break;
      }

      if (obj.isImageType) {
        if (
          obj.imageData &&
          typeof obj.width === "number" &&
          typeof obj.height === "number"
        ) {
          const img = new Image();
          img.src = obj.imageData;
          const x = typeof obj.x === "number" ? obj.x : 0;
          const y = typeof obj.y === "number" ? obj.y : 0;
          const width = obj.width;
          const height = obj.height;

          if (img.complete) {
            ctx.drawImage(img, x, y, width, height);
          } else {
            img.onload = () => {
              ctx.drawImage(img, x, y, width, height);
            };
          }
        }
      }

      // Restore canvas state (cleanup)
      ctx.restore();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Separate effect for canvas redrawing - optimized dependencies
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply canvas background color
    if (canvasStore.canvasBackgroundColor !== TRANSPARENT) {
      ctx.fillStyle = canvasStore.canvasBackgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Draw all saved objects
    canvasStore.objects.forEach((obj) => {
      drawObject(ctx, obj);
    });

    // Draw current preview object only when actively drawing
    if (canvasStore.currentObject && toolStore.isDrawing) {
      drawObject(ctx, canvasStore.currentObject);
    }
  }, [
    canvasStore.objects,
    canvasStore.canvasBackgroundColor,
    canvasStore.currentObject,
    canvasStore.imageCount,
    toolStore.isDrawing,
    drawObject,
  ]);

  // Setup effect - runs only once on mount
  useEffect(() => {
    const handleSetup = () => {
      canvasStore.loadFromStorage();

      const canvas = canvasRef.current;
      const container = containerRef.current;

      if (!canvas || !container) return;

      // Set canvas ref in store for export functionality
      canvasStore.setCanvasRef(canvas);

      const resizeCanvas = () => {
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      };

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      return () => {
        window.removeEventListener("resize", resizeCanvas);
        canvasStore.setCanvasRef(null);
      };
    };

    return handleSetup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="canvas-container" ref={containerRef}>
      <canvas
        ref={canvasRef}
        className="canvas"
        data-tool={toolStore.activeTool}
        onMouseDown={startDrawing}
      />
    </div>
  );
});

export default Canvas;
