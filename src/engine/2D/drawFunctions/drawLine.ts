import { Vector2 } from "three";

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  start: Vector2 | { x: number; y: number },
  end: Vector2 | { x: number; y: number },
  strokeStyle: string,
  lineWidth: number
) => {
  if (strokeStyle) {
    ctx.strokeStyle = strokeStyle;
  }
  if (lineWidth) {
    ctx.lineWidth = lineWidth;
  }
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
};
