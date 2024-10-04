/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import { EventEmitter } from "./EventEmitter.js";
import { TA_Scene } from "./TA_Scene.js";
import { TA_Scene2D } from "./2D/TA_Scene2D.js";
// import "./style.css";

// import { TA_UI } from "../UI/TA_UI.js";
import { TA_State } from "./TA_State.js";

// import React from "react";
// import ReactDOM from "react-dom";
// import ReactPanel from "../UI/ReactPanel.js";
// import Authentication from "../UI/Authentication/Authentication.js";
// import AuthInMainMenu from "../UI/Authentication/AuthInMainMenu.js";
// import { Router } from "react-router-dom";
// import { createBrowserHistory } from "history";
// import MatcapImages from "../UI/MatcapImages.js";
// import { Http } from "../Http.js";
// import { ta_State } from "../State/State.js";
// import { loader } from "../loader.js";

import { EditorMode } from "./types";

// const http = new Http(ta_State);
// let matcapImages = new MatcapImages();
// const history = createBrowserHistory();

// export const events = new EventEmitter();
// events.onEvent("isLoading", () => {
//   if (ta_State.state["isLoading"]) {
//     loader.show();
//   } else {
//     loader.hide();
//   }
// });

// const checkAuth = async () => {
//   await http.checkAuth();
// };
// checkAuth();

// ReactDOM.render(
//   <React.StrictMode>
//     <Router history={history}>
//       <Authentication></Authentication>
//       <AuthInMainMenu></AuthInMainMenu>
//     </Router>
//     <ReactPanel matcapImages={matcapImages}></ReactPanel>
//   </React.StrictMode>,
//   document.getElementById("MatCab")
// );

export class TertiusAxis extends EventEmitter {
  state: TA_State;
  target: HTMLCanvasElement | null = null;
  taScene: TA_Scene | TA_Scene2D;
  mode: EditorMode;
  constructor(
    target: string | HTMLDivElement | HTMLCanvasElement,
    mode: EditorMode = EditorMode["3D"]
  ) {
    super();
    this.setTarget(target);
    if (!this.target) {
      throw new Error("Impossible to create editor: No target canvas");
    }

    this.state = new TA_State();

    this.mode = mode;

    if (mode === EditorMode["3D"]) {
      this.taScene = new TA_Scene(this.target);
    } else {
      this.taScene = new TA_Scene2D(this.target);
    }
  }

  private setTarget(target: string | HTMLDivElement | HTMLCanvasElement) {
    let container:
      | string
      | HTMLDivElement
      | HTMLCanvasElement
      | HTMLElement = target;

    if (typeof target === "string") {
      container = document.getElementById(target) as HTMLElement;
      if (!container) {
        throw new Error("TA: element not found");
      }
    }

    if (container instanceof HTMLCanvasElement) {
      this.target = container;
      return;
    }

    if (container instanceof HTMLDivElement) {
      const canvas = document.createElement("canvas");
      canvas.id = "TertiusAxisEditor_Canvas";
      container.appendChild(canvas);
      this.target = canvas;

      return;
    }
  }
}
