import { Vector2 } from "three";
import { FreeDraw } from "./FreeDraw";
import { Controls2D } from "./Controls2D";
import { DrawParams2D, StateMode } from "../types";
import { drawGrid } from "./drawGrid";

export class TA_Scene2D {
  ctx: CanvasRenderingContext2D | null;
  target: HTMLCanvasElement;
  freeDraw: FreeDraw;
  leftButton: boolean = false;
  controls: Controls2D;

  constructor(target: HTMLCanvasElement) {
    this.target = target;
    this.target.width = this.target.clientWidth;
    this.target.height = this.target.clientHeight;
    this.ctx = target.getContext("2d");
    if (!this.ctx) {
      throw new Error("Can't get 2d context");
    }

    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, target.width, target.height);

    this.freeDraw = new FreeDraw(this.ctx);

    this.controls = new Controls2D(target, true);

    this.render(this.controls.drawParams);

    this.addListeners();
  }

  render(drawParams: DrawParams2D) {
    if (!this.ctx) {
      throw new Error("Can't get 2d context");
    }

    const { startDrawPoint, scale, drawingOpacity, gridStep } = drawParams;

    this.clearCanvas();
    this.ctx.save();
    this.ctx.globalAlpha = drawingOpacity;
    this.ctx.translate(startDrawPoint.x, startDrawPoint.y);
    this.ctx.scale(scale, scale);

    drawGrid(
      this.ctx,
      scale,
      { width: this.target.width, height: this.target.height },
      gridStep
    );

    this.ctx.restore();
  }

  clearCanvas() {
    if (!this.ctx) {
      throw new Error("Can't get 2d context");
    }
    this.ctx.resetTransform();
    this.ctx.save();
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.target.width, this.target.height);
    this.ctx.restore();
  }

  private addListeners() {
    this.controls.onEvent(StateMode.CANVAS_2D_CLICK, (point) => {
      this.freeDraw.startDraw(point.pagePoint);
    });
    this.controls.onEvent(StateMode.DRAWING_2D_OFF, () => {
      this.freeDraw.stopDraw();
    });
    this.controls.onEvent(StateMode.DRAWING_2D, (point) => {
      this.freeDraw.draw(point);
    });

    this.controls.onEvent(StateMode.DRAW_PARAMS_2D_CHANGE, (evt) => {
      this.render(evt.drawParams);
    });
  }

  dispose() {}
}
