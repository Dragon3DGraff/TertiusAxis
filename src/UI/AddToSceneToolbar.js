/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import { TA_UI } from "./TA_UI.js";
// import cubeIco from "../ico/cubeico.png";
// import sphereIco from "../ico/sphereico.png";
import { TA_State } from "../TA_State.js";

function createAddToSceneToolbar(taScene) {
  let check = document.getElementById("AddToSceneToolbar");

  if (check !== null) {
    console.warn("AddToSceneToolbar may be called only once");
    return;
  }

  let ta_UI = new TA_UI();
  let ta_State = new TA_State();

  let addToSceneContainer = ta_UI.createContainer("sectionDiv", mainContainer);
  addToSceneContainer.id = "AddToSceneToolbar";

  let title = ta_UI.addElement(
    addToSceneContainer,
    "p",
    "Add to scene &#9650",
    ""
  );
  title.className = "sectionName";

  title.addEventListener(
    "click",
    function () {
      let addToSceneButtons = document.getElementById("addToSceneButtons");

      if (addToSceneButtons.style.display === "grid") {
        addToSceneButtons.style.display = "none";

        this.innerHTML = "Add to scene &#9660";
      } else {
        addToSceneButtons.style.display = "grid";

        this.innerHTML = "Add to scene &#9650";
      }
    },
    false
  );

  let buttonsDiv = ta_UI.addElement(addToSceneContainer, "form", "", "");
  buttonsDiv.className = "buttonsDiv";
  buttonsDiv.id = "addToSceneButtons";
  buttonsDiv.style.display = "grid";

  let primitivesNamesForButtons = [
    { text: "Cube", type: "BoxBufferGeometry", imgLink: "", active: true },
    {
      text: "Sphere",
      type: "SphereBufferGeometry",
      imgLink: "",
      active: true,
    },
    { text: "Circle", type: "CircleBufferGeometry", imgLink: "", active: true },
    { text: "Cone", type: "ConeBufferGeometry", imgLink: "", active: true },
    {
      text: "Cylinder",
      type: "CylinderBufferGeometry",
      imgLink: "",
      active: true,
    },
    { text: "Torus", type: "TorusBufferGeometry", imgLink: "", active: true },
    {
      text: "4-hedron",
      type: "TetrahedronBufferGeometry",
      imgLink: "",
      active: true,
    },
    {
      text: "8-hedron",
      type: "OctahedronBufferGeometry",
      imgLink: "",
      active: true,
    },
    {
      text: "12-hedron",
      type: "DodecahedronBufferGeometry",
      imgLink: "",
      active: true,
    },
    {
      text: "20-hedron",
      type: "IcosahedronBufferGeometry",
      imgLink: "",
      active: true,
    },
    { text: "Plane", type: "PlaneBufferGeometry", imgLink: "", active: false },
    { text: "Ring", type: "RingBufferGeometry", imgLink: "", active: false },
    { text: "Shape", type: "ShapeBufferGeometry", imgLink: "" },
    { text: "Text", type: "TextBufferGeometry", imgLink: "", active: false },
    {
      text: "TorusKnot",
      type: "TorusKnotBufferGeometry",
      imgLink: "",
      active: false,
    },
    { text: "Tube", type: "TubeBufferGeometry", imgLink: "", active: false },
  ];

  primitivesNamesForButtons.forEach((element) => {
    if (element.active) {
      ta_UI.elements[element.type] = ta_UI.createSwitchButton(
        {
          parent: buttonsDiv,
          text: element.text,
          id: element.type,
          name: "addToScene",
          value: element.type,
          tooltip: element.type,
          imgLink: element.imgLink,
        },
        function (selectedRadio) {
          let selectedButton = selectedRadio.target;

          if (ta_State.appMode.meshEdit) {
            selectedButton.form.reset();
            return;
          }

          if (selectedButton.id === taScene.mode.entity) {
            selectedButton.form.reset();
            ta_UI.elements.finishButton.style.display = "none";
            taScene.mode.action = "select";
            taScene.mode.entity = null;
          } else {
            taScene.mode.action = "creationEntity";
            taScene.mode.entity = selectedButton.id;
            ta_UI.elements.finishButton.style.display = "block";
          }
        }
      );
    }
  });

  ta_UI.elements.finishButton = ta_UI.addElement(
    buttonsDiv,
    "button",
    "Finish",
    "",
    function () {
      this.style.display = "none";
      taScene.mode.action = "select";
      taScene.mode.entity = null;
    }
  );
  ta_UI.elements.finishButton.id = "Finish";
  ta_UI.elements.finishButton.className = "finishButton";
  ta_UI.elements.finishButton.type = "reset";
  ta_UI.elements.finishButton.style.display = "none";

  console.log("AddToSceneToolbar created");

  return addToSceneContainer;
}

export { createAddToSceneToolbar };
