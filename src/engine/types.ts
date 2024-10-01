export enum EditorMode {
  "3D" = "3D",
  "2D" = "2D",
}

export enum StateMode {
  ADD_PRIMITIVE = "add_primitive",
}

export type EventType = {
  mode: StateMode;
  data: string | number//Record<string, string | number>;
};
