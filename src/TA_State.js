/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import EventEmitter from "./EventEmitter";

class TA_State {
  constructor() {
    // singleton
    if (TA_State.exist) {
      return TA_State.instance;
    }
    TA_State.instance = this;
    TA_State.exist = true;
    //--

    // this.state.auth = false;
    this.eventEmitter = new EventEmitter();
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

    this.meshEditMode = {};
  }

  changeAppState(mode, state) {
    this._updateState(mode, state);
    this.eventEmitter.emitEvent(mode, state);
  }

  _updateState(mode, state) {
    this.state[mode] = state;
    this.eventEmitter.emitEvent("appStateChanged", mode + " " + state);
  }

  // setAppMode ( appMode ) {

  // }

  // setTransformMode(transformMode) {}
}

export { TA_State };
