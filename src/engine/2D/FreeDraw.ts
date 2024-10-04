import { Vector2 } from "three";
import { drawLine } from "./drawFunctions/drawLine";

export class FreeDraw {
  ctx: CanvasRenderingContext2D;
  currentPoint: Vector2 | { x: number; y: number } | null;
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;

    this.currentPoint = null;
  }

  startDraw(point: Vector2 | { x: number; y: number }) {
    this.currentPoint = point;
  }

  stopDraw() {
    this.currentPoint = null;
  }

  draw(point: Vector2 | { x: number; y: number }) {
    if (!this.currentPoint) {
      return;
    }
    drawLine(this.ctx, this.currentPoint, point, "green", 1);
    this.currentPoint = point;
  }
}
