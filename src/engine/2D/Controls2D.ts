import { Vector2 } from "three";
import { EventEmitter } from "../EventEmitter";
import { DrawParams2D, StateMode } from "../types";
import { LocalStorageService } from "../LocalStorageService";
import debounce from "lodash.debounce";

export class Controls2D extends EventEmitter {
  target: HTMLCanvasElement;
  drawParams: DrawParams2D;

  //   drawFunc: () => void;

  saveState: boolean;

  shift: boolean;
  ctrl: boolean;
  isFieldsShown: boolean;
  leftButton: boolean;
  rightButton: boolean;
  clickPoint: Vector2 | { x: number; y: number } | null = null;
  //   debouncedDraw;

  currentMousePosition: Vector2 | { x: number; y: number } | null = null;

  coordsLabel: HTMLDivElement;
  coordsLabelParams: {
    gap: { x: number; y: number };
    width: number;
    height: number;
  };

  constructor(
    target: HTMLCanvasElement,
    // drawFunc: () => void,
    saveState: boolean
  ) {
    super();
    this.target = target;
    // this.drawFunc = drawFunc;

    this.saveState = saveState;

    this.drawParams = {
      drawingOpacity: 1,
      gridStep: 100,
      scale: 1,
      startDrawPoint: new Vector2(0, 0),
    };

    const savedDrawParams = LocalStorageService.getSavedParam("drawParams");

    if (savedDrawParams) {
      this.drawParams.scale = savedDrawParams.scale;
      this.drawParams.startDrawPoint = new Vector2(
        savedDrawParams.startDrawPoint.x,
        savedDrawParams.startDrawPoint.y
      );

      this.drawParams.drawingOpacity = savedDrawParams.drawingOpacity;
    }

    this.shift = false;
    this.ctrl = false;
    this.isFieldsShown = false;
    this.leftButton = false;
    this.rightButton = false;
    this.clickPoint = null;
    // this.debouncedDraw = debounce(
    //   () => {
    //     this.drawFunc?.({
    //       ...this.drawParams,
    //     });
    //   },
    //   0,
    //   { leading: true }
    // );

    const coordsLabel = document.createElement("div");
    coordsLabel.className = "coordsLabel";
    document.body.appendChild(coordsLabel);
    this.coordsLabel = coordsLabel;
    this.currentMousePosition = { x: 0, y: 0 };

    this.coordsLabelParams = { gap: { x: 10, y: 20 }, width: 50, height: 16 };
    this.coordsLabel.style.width = `${this.coordsLabelParams.width}px`;
    this.coordsLabel.style.height = `${this.coordsLabelParams.height}px`;

    this.init();
  }

  onScaleUpdate() {
    this.emitEvent(StateMode.SCALE_2D_UPDATE, { scale: this.drawParams.scale });
  }

  update() {
    // this.debouncedDraw();
    // this.drawFunc?.({
    //   ...this.drawParams,
    // });
    this.emitEvent(StateMode.DRAW_PARAMS_2D_CHANGE, {
      drawParams: this.drawParams,
    });
  }

  init() {
    this.update();

    document.addEventListener("keydown", (evt) => {
      if (evt.code === "ControlLeft") {
        this.ctrl = true;
      }
    });
    document.addEventListener("keyup", () => {
      this.ctrl = false;
      this.shift = false;
    });

    document.addEventListener("pointerup", (evt) => {
      evt.preventDefault();
      this.leftButton = false;
      this.rightButton = false;
      this.clickPoint = null;
      this.emitEvent(StateMode.DRAWING_2D_OFF, {});
      // this.update();
    });
    this.target.oncontextmenu = (evt) => {
      evt.preventDefault();
    };

    this.target.onpointerdown = (evt) => {
      if (evt.button === 0) {
        this.leftButton = true;
      }
      if (evt.button === 2) {
        evt.preventDefault();
        this.rightButton = true;
        this.clickPoint = new Vector2(evt.pageX, evt.pageY);
      }

      if (this.leftButton) {
        this.emitEvent(StateMode.CANVAS_2D_CLICK, {
          pagePoint: {
            x: evt.pageX,
            y: evt.pageY,
          },
          canvasPosition: this.getCanvasPosition(evt),
        });
      }
    };

    this.target.onwheel = (evt) => {
      if (!this.ctrl) return;
      evt.stopPropagation();
      evt.preventDefault();
      let delta = -evt.deltaY / 1000;

      console.log(
        "\x1B[92;40;22mthis.drawParams.scale\x1B[m",
        this.drawParams.scale
      ); // FIXME Удалить!
      console.log("\x1B[92;40;22mdelta\x1B[m", delta); // FIXME Удалить!
      if (this.drawParams.scale + delta <= 0) {
        delta /= 1000;
        // return;
      }
      this.drawParams.scale = Math.abs(this.drawParams.scale + delta);

      const canvasPosition = this.getCanvasPosition(evt);
      this.drawParams.startDrawPoint.x -=
        canvasPosition.x * (1 + delta) - canvasPosition.x;
      this.drawParams.startDrawPoint.x -=
        canvasPosition.y * (1 + delta) - canvasPosition.y;

      this.onScaleUpdate();
      if (this.saveState) {
        LocalStorageService.saveParam("drawParams", this.drawParams);
      }

      this.update();
      this.updateLabelCoords(evt);
    };

    this.target.addEventListener("pointermove", (evt) => {
      if (this.currentMousePosition) {
        this.currentMousePosition.x = evt.pageX;
        this.currentMousePosition.y = evt.pageY;
      }
      this.updateLabelCoords(evt);

      if (this.leftButton) {
        this.emitEvent(StateMode.DRAWING_2D, { x: evt.pageX, y: evt.pageY });
        return;
      }
      this.emitEvent(StateMode.CANVAS_2D_MOVE, {
        x: evt.pageX,
        y: evt.pageY,
        canvasPosition: this.getCanvasPosition(evt),
      });

      if (this.rightButton && this.clickPoint) {
        this.drawParams.startDrawPoint.x += evt.pageX - this.clickPoint.x;
        this.drawParams.startDrawPoint.y += evt.pageY - this.clickPoint.y;

        if (this.saveState) {
          LocalStorageService.saveParam("drawParams", this.drawParams);
        }
        this.clickPoint = {
          x: evt.pageX,
          y: evt.pageY,
        };
        // this.debouncedDraw();
        this.update();
        // console.log(evt);
      }
    });
  }

  getCanvasPosition(evt: PointerEvent | WheelEvent) {
    return {
      x: (evt.pageX - this.drawParams.startDrawPoint.x) / this.drawParams.scale,
      y: (evt.pageY - this.drawParams.startDrawPoint.y) / this.drawParams.scale,
    };
  }

  updateLabelCoords(evt: PointerEvent | WheelEvent) {
    const canvasPosition = this.getCanvasPosition(evt);
    this.coordsLabel.innerHTML = `${Math.floor(canvasPosition.x)}, ${Math.floor(
      canvasPosition.y
    )}`;

    if (!evt.target) return;

    const target = evt.target as HTMLCanvasElement;

    if (
      evt.pageX <
      target.clientWidth -
        this.coordsLabelParams.gap.x -
        this.coordsLabelParams.width
    ) {
      this.coordsLabel.style.left = `${
        evt.pageX + this.coordsLabelParams.gap.x
      }px`;
    }

    if (
      evt.pageY <
      target.clientHeight -
        this.coordsLabelParams.gap.y -
        this.coordsLabelParams.height
    ) {
      this.coordsLabel.style.top = `${
        evt.pageY + this.coordsLabelParams.gap.y
      }px`;
    }
  }

  dispose() {
    // TODO
  }
}
