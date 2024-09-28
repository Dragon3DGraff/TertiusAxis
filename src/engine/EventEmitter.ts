export class EventEmitter {
  private _events: Record<string, Array<(evt: any) => void>>;
  constructor() {
    // singleton
    // if (EventEmitter.exist) {
    //   return EventEmitter.instance;
    // }
    // EventEmitter.instance = this;
    // EventEmitter.exist = true;
    // //---

    this._events = {};
  }

  onEvent(name: string | number, listener: (evt: any) => void) {
    if (!this._events[name]) {
      this._events[name] = [];
    }

    this._events[name].push(listener);
  }

  removelistener(name: string | number, listenerToRemove: (evt: any) => void) {
    if (!this._events[name]) {
      console.warn(`Can't remove a listener. Event "${name} doesn't exist`);
    }

    this._events[name] = this._events[name].filter(
      (listener: any) => listener != listenerToRemove
    );
  }

  emitEvent(name: string, data: any) {
    if (!this._events[name]) {
      console.warn(`No any listeners on event ${name}`);
      // throw new Error(`Can't emit an event. Event ${name} doesn't exist`);
    } else {
      this._events[name].forEach((callback: (evt: any) => void) =>
        callback(data)
      );
    }
  }
}
