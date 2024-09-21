/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import "./style.css";

import { TA_UI } from "../UI/TA_UI.js";
import { TA_Scene } from "./TA_Scene.js";

// import React from "react";
// import ReactDOM from "react-dom";
// import ReactPanel from "../UI/ReactPanel.js";
// import Authentication from "../UI/Authentication/Authentication.js";
// import AuthInMainMenu from "../UI/Authentication/AuthInMainMenu.js";
// import { Router } from "react-router-dom";
// import { createBrowserHistory } from "history";
// import MatcapImages from "../UI/MatcapImages.js";
import { Http } from "../Http.js";
import { ta_State } from "../State/State.js";
import EventEmitter from "./EventEmitter.js";
import { loader } from "../loader.js";
import { TA_State } from "./TA_State.js";

const http = new Http(ta_State);
// let matcapImages = new MatcapImages();
// const history = createBrowserHistory();

export const events = new EventEmitter();
events.onEvent("isLoading", () => {
  if (ta_State.state["isLoading"]) {
    loader.show();
  } else {
    loader.hide();
  }
});

const checkAuth = async () => {
  await http.checkAuth();
};
checkAuth();

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

export class TertiusAxis {
  constructor() {
    this.state = new TA_State();
  }

  init() {
    let ta_UI = new TA_UI();
    let taScene = new TA_Scene(ta_UI);
    this.taScene = taScene;

    ta_UI.init(taScene);

    taScene.createScene();

    if (ta_UI.fillMainToolbar(taScene)) {
      console.log("TertiusAxis loaded");
    }
  }
}
