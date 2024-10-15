import { Vector2 } from "three";
import { FreeDraw } from "./FreeDraw";
import { Controls2D } from "./Controls2D";
import { DrawParams2D, StateMode } from "../types";
import { drawGrid } from "./drawFunctions/drawGrid";
import { drawRect } from "./drawFunctions/drawRect";

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
    // this.ctx.translate(startDrawPoint.x, startDrawPoint.y);
    // this.ctx.scale(scale, scale);
    this.ctx.transform(scale, 0, 0, scale,startDrawPoint.x, startDrawPoint.y);

    drawGrid(
      this.ctx,
      scale,
      { width: this.target.width, height: this.target.height },
      gridStep
    );

    // let start = performance.now()
    // let x = 0;
    // let y = 0;
    // for (let index = 0; index < 10000; index++) {
    //   const pos = new Vector2(x, y);
    //   // setTimeout(() => {
    //   this.ctx &&
    //     drawRect(this.ctx, pos, { width: 20, height: 20 }, "red", "#000000");
    //   // });
    //   x += 20;

    //   if (x > 500 * 20) {
    //     x = 0;
    //     y += 20;
    //   }
    //   if (y > 500 * 20) {
    //     y = 0;
    //   }
    // }

    // console.log(performance.now() - start);

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
      this.freeDraw.draw(point as Vector2);
    });

    this.controls.onEvent(StateMode.DRAW_PARAMS_2D_CHANGE, (evt) => {
      this.render(evt.drawParams);
    });
  }

  dispose() {
    this.ctx.con;
    // TODO
  }
}
