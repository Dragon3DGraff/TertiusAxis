import { Vector2 } from "three";

export enum EditorMode {
  "3D" = "3D",
  "2D" = "2D",
}

export enum StateMode {
  ADD_PRIMITIVE = "add_primitive",
  MANIPULATION_MODE = "manipulation_mode",
  EDIT_GOEMETRY_MODE = "edit_geometry_mode",
  DRAW_PARAMS_2D_CHANGE = "draw_params_2d_change",
  SCALE_2D_UPDATE = "scale_2D_update",
  DRAWING_2D_ON = "drawing_2d_on",
  DRAWING_2D_OFF = "drawing_2D_off",
  CANVAS_2D_CLICK = "canvas_2D_click",
  CANVAS_2D_MOVE = "canvas_2D_move",
  DRAWING_2D = "drawing_2D",
}

export type AddPrimitiveEvent = {
  mode: StateMode.ADD_PRIMITIVE;
};
export type EventType = {
  mode: StateMode;
  data: Record<string, any>;
};

export type DrawParams2D = {
  startDrawPoint: Vector2;
  scale: number;
  drawingOpacity: number;
  gridStep: number;
};
