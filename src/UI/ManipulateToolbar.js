/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import { TA_UI } from "./TA_UI.js";
import { TA_Entities } from "../Entities/TA_Entities.js";
import * as Actions from "../Actions.js";

function createManipulateToolbar(taScene) {
  let check = document.getElementById("ManipulateToolbar");

  if (check !== null) {
    console.warn("ManipulateToolbar may be called only once");
    return;
  }

  let ta_UI = new TA_UI();

  let manipulatingContainer = ta_UI.createContainer(
    "ManipulateToolbar",
    mainContainer
  );

  ta_UI.elements.selectButton = ta_UI.createSwitchButton(
    {
      parent: manipulatingContainer,
      text: "Select",
      id: "Select",
      name: "manupulateRadio",
      value: "Select",
      tooltip: "Select",
      imgLink: "",
    },
    switchMode
  );
  // ta_UI.elements.selectButton.checked = true;
  // ta_UI.elements.selectButton.checked = false;

  ta_UI.elements.moveButton = ta_UI.createSwitchButton(
    {
      parent: manipulatingContainer,
      text: "Move",
      id: "Move",
      name: "manupulateRadio",
      value: "Move",
      tooltip: "Move(m)",
      imgLink: "",
    },
    switchMode
  );

  ta_UI.elements.rotateButton = ta_UI.createSwitchButton(
    {
      parent: manipulatingContainer,
      text: "Rotate",
      id: "Rotate",
      name: "manupulateRadio",
      value: "Rotate",
      tooltip: "Rotate(r)",
      imgLink: "",
    },
    switchMode
  );

  ta_UI.elements.scaleButton = ta_UI.createSwitchButton(
    {
      parent: manipulatingContainer,
      text: "Scale",
      id: "Scale",
      name: "manupulateRadio",
      value: "Scale",
      tooltip: "Scale(s)",
      imgLink: "",
    },
    switchMode
  );

  ta_UI.elements.dragButton = ta_UI.createStayPressedButton(
    {
      parent: manipulatingContainer,
      text: "Drag",
      id: "dragCheck",
      name: "dragCheck",
      value: "dragCheck",
      tooltip: "(d)",
      imgLink: "",
    },
    switchDrag
  );

  function switchMode(selectedRadio) {
    let selectedButton = selectedRadio.target.id;

    switch (selectedButton) {
      case "Select":
        Actions.switchOnSelectMode(taScene);

        break;

      case "Move":
        Actions.switchOnMoveMode(taScene);

        break;

      case "Rotate":
        Actions.switchOnRotationMode(taScene);

        break;

      case "Scale":
        Actions.switchOnScaleMode(taScene);

        break;

      default:
        break;
    }
  }

  function switchDrag() {
    Actions.switchDragMode(this.checked, taScene);
  }

  console.log("ManipulateToolbar created");
}

export { createManipulateToolbar };
