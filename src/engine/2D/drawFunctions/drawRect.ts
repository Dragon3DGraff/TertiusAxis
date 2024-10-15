import { Vector2 } from "three";

export const drawRect = (
  ctx: CanvasRenderingContext2D,
  pos: Vector2,
  size: { width: number; height: number },
  strokeStyle: string,
  fillStyle?: string,
  lineWidth = 1
) => {
  ctx.save();
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fillRect(pos.x, pos.y, size.width, size.height);
  }
  ctx.strokeRect(pos.x, pos.y, size.width, size.height);

  ctx.restore();
};
