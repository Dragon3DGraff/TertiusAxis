import { EventType, StateMode } from "./types";

export class EventEmitter {
  private _events: Record<string, Array<(evt: EventType["data"]) => void>>;
  constructor() {
    this._events = {};
  }

  onEvent(name: StateMode, listener: (evt: EventType["data"]) => void) {
    if (!this._events[name]) {
      this._events[name] = [];
    }

    this._events[name].push(listener);
  }

  removelistener(
    name: StateMode,
    listenerToRemove: (evt: EventType["data"]) => void
  ) {
    if (!this._events[name]) {
      console.warn(`Can't remove a listener. Event "${name} doesn't exist`);
    }

    this._events[name] = this._events[name].filter(
      (listener: any) => listener != listenerToRemove
    );
  }

  emitEvent(name: StateMode, data: EventType["data"]) {
    if (!this._events[name]) {
      // console.warn(`No any listeners on event ${name}`);
      // throw new Error(`Can't emit an event. Event ${name} doesn't exist`);
    } else {
      this._events[name].forEach((callback: (evt: EventType["data"]) => void) =>
        callback(data)
      );
    }
  }
}
