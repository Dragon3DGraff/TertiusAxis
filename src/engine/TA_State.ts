/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import { EventEmitter } from "./EventEmitter";

export class TA_State extends EventEmitter {
  state: Record<string, any>;
  appMode: { mode: string; meshEdit: boolean; action: string; entity: null; };
  transformMode: { mode: string; transformControlsMode: string; };
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

  changeAppState(mode: string, state: any) {
    this._updateState(mode, state);
    this.emitEvent(mode, state);
  }

  _updateState(mode: string, state: string) {
    this.state[mode] = state;
    this.emitEvent("appStateChanged", mode + " " + state);
  }

  // setAppMode ( appMode ) {

  // }

  // setTransformMode(transformMode) {}
}
