/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import { TA_State } from "../engine/TA_State.js";
import { TA_UI } from "./TA_UI.js";

function fillGeneralParametersTab(entity) {
  let ta_UI = new TA_UI();
  let ta_State = new TA_State();

  let divGeneral = document.getElementById("GeneralParameters");
  let elemGeneral = document.createElement("div");
  elemGeneral.id = "ParametersGeneralRows";
  divGeneral.appendChild(elemGeneral);

  let rowUUID = ta_UI.addParametersRow("ID", "string", entity.id);
  elemGeneral.appendChild(rowUUID);

  // this.addElement( elemGeneral, 'p', 'Name', '');
  let rowDiv = ta_UI.addParametersRow("Name", "string", entity.name);
  elemGeneral.appendChild(rowDiv);
  let input = ta_UI.getInput(rowDiv);
  input.addEventListener(
    "input",
    () => {
      entity.name = input.value;
    },
    false
  );

  let inputId = ta_UI.addParametersRow("id", "string", entity.id);
  inputId.disabled = true;

  ta_UI.addElement(elemGeneral, "p", "Position", "");

  let parametersGeneral = Object.entries(entity.position);

  for (let i = 0; i < parametersGeneral.length; i++) {
    let nameOfParameter = parametersGeneral[i][0];
    let valueOfParameter = Math.round(parametersGeneral[i][1] * 1000) / 1000;

    let rowDiv = ta_UI.addParametersRow(
      "position_" + nameOfParameter,
      "number",
      valueOfParameter
    );
    elemGeneral.appendChild(rowDiv);
    let input = ta_UI.getInput(rowDiv);
    input.step = 0.1;

    input.addEventListener(
      "input",
      () => {
        entity.position[nameOfParameter] = input.value;
        ta_State.changeAppState("GeneralParameters-" + input.id, input.value);
      },
      false
    );
  }

  ta_UI.addElement(elemGeneral, "p", "Rotation", "");

  parametersGeneral = Object.entries({
    x: entity.rotation.x,
    y: entity.rotation.y,
    z: entity.rotation.z,
  });

  for (let i = 0; i < parametersGeneral.length; i++) {
    let nameOfParameter = parametersGeneral[i][0];
    let valueOfParameter = Math.round(parametersGeneral[i][1] * 1000) / 1000;

    let rowDiv = ta_UI.addParametersRow(
      "rotation_" + nameOfParameter,
      "number",
      valueOfParameter
    );
    elemGeneral.appendChild(rowDiv);
    let input = ta_UI.getInput(rowDiv);

    input.step = 0.1;
    input.addEventListener(
      "input",
      () => {
        entity.rotation[nameOfParameter] = input.value;
        ta_State.changeAppState("GeneralParameters-" + input.id, input.value);
      },
      false
    );
  }

  ta_UI.addElement(elemGeneral, "p", "Scale", "");

  parametersGeneral = Object.entries(entity.scale);

  for (let i = 0; i < parametersGeneral.length; i++) {
    let nameOfParameter = parametersGeneral[i][0].replace("_", "");
    let valueOfParameter = Math.round(parametersGeneral[i][1] * 1000) / 1000;

    let rowDiv = ta_UI.addParametersRow(
      "scale_" + nameOfParameter,
      "number",
      valueOfParameter
    );
    elemGeneral.appendChild(rowDiv);
    let input = ta_UI.getInput(rowDiv);

    input.step = 0.1;
    input.addEventListener(
      "input",
      () => {
        entity.scale[nameOfParameter] = input.value;
        ta_State.changeAppState("GeneralParameters-" + input.id, input.value);
      },
      false
    );
  }
}
export { fillGeneralParametersTab };
