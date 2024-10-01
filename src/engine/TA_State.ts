/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import { EventEmitter } from "./EventEmitter";
import { EventType, StateMode } from "./types";

export class TA_State extends EventEmitter {
  state: Record<string, any>;
  appMode: { mode: string; meshEdit: boolean; action: string; entity: null };
  transformMode: { mode: string; transformControlsMode: string };
  constructor() {
    super();
    // // singleton
    // if (TA_State.exist) {
    //   return TA_State.instance;
    // }
    // TA_State.instance = this;
    // TA_State.exist = true;
    // //--

    // this.state.auth = false;
    this.state = {};
    this.appMode = {
      mode: "",
      meshEdit: false,
      action: "select",
      entity: null,
    };

    this.transformMode = {
      mode: "",
      transformControlsMode: "",
    };

    // this.meshEditMode = {};
  }

  changeAppState(mode: StateMode, data: EventType["data"]) {
    this.state[mode] = data;
    this.emitEvent("appStateChanged", { mode, data });
  }

  // private updateState(mode: States, state: string) {

  // }

  // setAppMode ( appMode ) {

  // }

  // setTransformMode(transformMode) {}
}
