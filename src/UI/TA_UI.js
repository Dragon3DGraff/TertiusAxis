/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import { createMainMenu } from "./MainMenu.js";
import { createMainToolbar } from "./MainToolbar.js";
import { createManipulateToolbar } from "./ManipulateToolbar.js";
import { createAddToSceneToolbar } from "./AddToSceneToolbar.js";
import { createParametersToolbar } from "./ParametersToolbar.js";
import { fillGeometryParametersTab } from "./GeometryParametersTab.js";
import { fillMaterialParametersTab } from "./MaterialParametersTab.js";
import { fillGeneralParametersTab } from "./GeneralParametersTab.js";
import { createMeshEditToobar } from "./MeshEditToolbar.js";

class TA_UI {
  constructor() {
    // singleton
    if (TA_UI.exist) {
      return TA_UI.instance;
    }
    TA_UI.instance = this;
    TA_UI.exist = true;

    this.elements = {};
  }

  init(taScene) {
    createMainMenu(taScene);
    createMainToolbar();
    return true;
  }

  fillMainToolbar(taScene) {
    createManipulateToolbar(taScene);
    createAddToSceneToolbar(taScene);
    createParametersToolbar();
    createMeshEditToobar(taScene);

    return true;
  }

  addElement(parent, elementName, text, imgLink, func) {
    let dom = document.createElement(elementName);
    parent.appendChild(dom);

    dom.innerHTML = text;

    if (imgLink !== "") {
      let img = document.createElement("img");
      img.src = imgLink;
      dom.appendChild(img);
    }

    if (typeof func === "function") {
      dom.addEventListener("click", func, false);
    }

    return dom;
  }

  createFileSelectionButton(parent, text = "Choose File", func) {
    let label = document.createElement("label");
    parent.appendChild(label);
    label.innerHTML = text;

    let fileBrowser = document.createElement("input");
    fileBrowser.type = "file";
    fileBrowser.className = "selectFile";
    label.appendChild(fileBrowser);

    if (typeof func === "function") {
      label.addEventListener("change", func, false);
    }

    return label;
  }
  /**
   * creates radio button with label
   * @param params - { Object } {
   * 	parent:  {domElement},
   *	text: {string},
   *	id: {string},
   *	name: {string},
   *	value: {string},
   *	tooltip: {string},
   *	imgLink: 'path'
   * }
   * @param function function, which will be assign on Click
   */
  createSwitchButton(params, func) {
    if (typeof func !== "function") {
      console.error(func + " is not a function");
      return;
    }

    let radio = document.createElement("input");
    radio.type = "radio";
    radio.name = params.name;
    radio.id = params.id;
    radio.value = params.value;
    radio.addEventListener("click", func);
    params.parent.appendChild(radio);

    let label = document.createElement("label");
    label.innerHTML = params.text;
    label.htmlFor = radio.id;
    label.title = params.tooltip;
    params.parent.appendChild(label);

    if (params.imgLink && params.imgLink !== "") {
      let img = document.createElement("img");
      img.src = params.imgLink;
      label.appendChild(img);
    }

    return radio;
  }

  /**
   * creates radio button with label
   * @param params - { Object } {
   *		parent:  {domElement},
   *		text: {string},
   *		id: '{string},
   *		name: {string},
   *		value: {string},
   *		tooltip: {string},
   *		imgLink: 'path'
   *	},
   * @param function function, which will be assign on Click
   */
  createStayPressedButton(params, func) {
    if (typeof func !== "function") {
      console.error(func + " is not a function");
      return;
    }

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = params.name;
    checkbox.id = params.id;
    checkbox.value = params.value;
    checkbox.addEventListener("click", func);
    params.parent.appendChild(checkbox);

    let label = document.createElement("label");
    label.innerHTML = params.text;
    label.htmlFor = checkbox.id;
    label.title = params.tooltip;
    params.parent.appendChild(label);

    if (params.imgLink && params.imgLink !== "") {
      let img = document.createElement("img");
      img.src = params.imgLink;
      label.appendChild(img);
    }

    return checkbox;
  }

  createContainer(containerName, parentElement) {
    let dom = document.createElement("div");
    dom.className = containerName;
    dom.id = containerName;
    parentElement.appendChild(dom);
    return dom;
  }

  createParametersMenu(entity) {
    // if ( !entity.geometry.parameters) {

    // 	console.warn( "No Params" );

    // 	return;

    // }

    this.deleteParametersMenu();

    let tabsButtons = document.getElementById("tabsButtons");
    tabsButtons.style.display = "flex";

    if (entity.geometry.parameters) {
      fillGeometryParametersTab(entity);
    }

    fillMaterialParametersTab(entity);
    fillGeneralParametersTab(entity);
  }

  addParametersRow(nameOfParameter, inputType, valueOfParameter) {
    let rowDiv = document.createElement("div");

    rowDiv.className = "ParametersRow";

    let text = document.createElement("p");
    rowDiv.appendChild(text);
    text.innerHTML = nameOfParameter;

    let input = document.createElement("input");
    input.id = nameOfParameter;
    input.type = inputType;

    rowDiv.appendChild(input);

    input.value = valueOfParameter;

    return rowDiv;
  }

  getInput(rowDiv) {
    let input = rowDiv.getElementsByTagName("input");
    return input[0];
  }

  updateParametersMenu(entity) {
    if (!entity.geometry.parameters) {
      console.warn("No Params");

      return;
    }

    let parametersArray = Object.entries(entity.geometry.parameters);

    for (let i = 0; i < parametersArray.length; i++) {
      let dom = document.getElementById(parametersArray[i][0]);

      if (dom.type === "number") {
        dom.value = Math.round(parametersArray[i][1] * 1000) / 1000;
      }
    }
  }

  deleteGeometryParametersTab() {
    let rows = document.getElementById("ParametersGoemetryRows");
    if (rows) rows.remove();
  }

  deleteParametersMenu() {
    this.deleteGeometryParametersTab();

    let rows = document.getElementById("ParametersMaterialRows");
    if (rows) rows.remove();
    rows = document.getElementById("ParametersGeneralRows");
    if (rows) rows.remove();

    tabsButtons.style.display = "none";
  }
}

export { TA_UI };
