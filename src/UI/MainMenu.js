/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import { ObjectLoader } from "../../node_modules/three/build/three.module.js";
import { GLTFExporter } from "../../node_modules/three/examples/jsm/exporters/GLTFExporter.js";
import { TA_Entities } from "../Entities/TA_Entities.js";
import { TA_UI } from "./TA_UI.js";

function createMainMenu(ta_scene) {
  let check = document.getElementById("mainMenu");

  if (check !== null) {
    console.warn("MainMenu may be called only once");
    return;
  }

  let ta_UI = new TA_UI();

  let mainMenu = document.createElement("div");
  mainMenu.className = "mainMenu";
  mainMenu.id = "mainMenu";
  // mainMenu.style.height = '18px';
  document.body.appendChild(mainMenu);

  // let author = ta_UI.addElement( mainMenu, 'p', 'author Dragon3DGraff', '');
  // author.className = 'author';

  let title = ta_UI.addElement(mainMenu, "p", "TertiusAxis", "");
  title.className = "Title";

  // let register = ta_UI.addElement( mainMenu, 'p', 'Register', '');
  // register.className = 'author';

  // menu buttons

  let buttonFile = ta_UI.addElement(mainMenu, "button", "File", "");

  buttonFile.addEventListener("mouseover", () => {
    let heightMainMenu = mainMenu.offsetHeight;
    let positionButtonFile = offsetPosition(buttonFile);

    fileMenu.style.left = positionButtonFile[0] + "px";

    fileMenu.style.top = heightMainMenu - 1 + "px";
    fileMenu.style.visibility = "visible";
  });
  buttonFile.addEventListener("mouseout", (e) => {
    if (!e.relatedTarget || e.relatedTarget.offsetParent.id !== "fileMenu") {
      fileMenu.style.visibility = "hidden";
    }
  });

  let buttonEdit = ta_UI.addElement(mainMenu, "button", "Edit", "");

  buttonEdit.addEventListener("mouseover", () => {
    let heightMainMenu = mainMenu.offsetHeight;

    let positionButtonFile = offsetPosition(buttonEdit);

    editMenu.style.left = positionButtonFile[0] + "px";
    editMenu.style.top = heightMainMenu + "px";

    editMenu.style.visibility = "visible";
  });

  buttonEdit.addEventListener("mouseout", (e) => {
    if (!e.relatedTarget || e.relatedTarget.offsetParent.id !== "editMenu") {
      editMenu.style.visibility = "hidden";
    }
  });

  let buttonSettings = ta_UI.addElement(mainMenu, "button", "Settings", "");
  buttonSettings.addEventListener("mouseover", () => {});

  let buttonHelp = ta_UI.addElement(mainMenu, "button", "Help", "");
  buttonHelp.addEventListener("mouseover", () => {
    let heightMainMenu = mainMenu.offsetHeight;
    let positionButtonFile = offsetPosition(buttonHelp);

    helpMenu.style.left = positionButtonFile[0] + "px";

    helpMenu.style.top = heightMainMenu + "px";
    helpMenu.style.visibility = "visible";
  });

  buttonHelp.addEventListener("mouseout", (e) => {
    if (!e.relatedTarget || e.relatedTarget.offsetParent.id !== "helpMenu") {
      helpMenu.style.visibility = "hidden";
    }
  });

  //subMenus

  let fileMenu = ta_UI.createContainer("fileMenu", mainMenu);
  fileMenu.className = "subMainMenu";

  fileMenu.addEventListener("mouseout", function (e) {
    if (!e.relatedTarget || e.relatedTarget.offsetParent.id !== "fileMenu") {
      this.style.visibility = "hidden";
    }
  });

  ta_UI.addElement(
    fileMenu,
    "label",
    "Clear Scene",
    "",
    clearScene
  );
  ta_UI.addElement(
    fileMenu,
    "label",
    "Save to disk",
    "",
    saveSceneToDisk
  );
  ta_UI.addElement(
    fileMenu,
    "label",
    "Export glTF",
    "",
    exportGLTF
  );

  ta_UI.createFileSelectionButton(
    fileMenu,
    "Load scene from disk",
    loadSceneFromDisk
  );
  ta_UI.createFileSelectionButton(
    fileMenu,
    "Merge with scene from disk",
    mergeScenes
  );

  function loadSceneFromDisk(e) {
    // Loading scene, created in TertiusAxis

    ta_scene.clearScene();

    loadScene(e);
  }

  function mergeScenes(e) {
    // Merge scenes, created in TertiusAxis

    loadScene(e);
  }

  function clearScene() {
    if (confirm("All objects will be deleted. Are you shure?")) {
      ta_scene.clearScene();
    }
  }

  function loadScene(e) {
    let file = e.srcElement.files[0];

    if (!file.name.endsWith(".trxs")) {
      alert("File is not a TertiusAxis Scene");
      return;
    }

    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
      let loader = new ObjectLoader();

      let loadedObjectsJSON = JSON.parse(reader.result);

      loadedObjectsJSON.forEach((element) => {
        let loadedObject = loader.parse(element);

        ta_scene.scene.add(loadedObject);

        if (loadedObject.userData.selectable) {
          ta_scene.selectableObjects.push(loadedObject);
        }
      });
    };

    reader.onerror = function () {
      alert(reader.error);
    };
  }

  function saveSceneToDisk() {
    // Savig scene, created in TertiusAxis

    let ta_entities = new TA_Entities();

    if (ta_scene.currentSelection.object) {
      ta_entities.removeSelection(ta_scene.currentSelection);
    }

    let children = ta_scene.scene.children;
    let elemToExport = [];

    children.forEach((element) => {
      if (element.userData.createdByUser) {
        elemToExport.push(element.toJSON());

        if (element.userData.selectable) {
          ta_scene.selectableObjects.push(element);
        }
      }
    });

    let blob = new Blob([JSON.stringify(elemToExport, null, 2)], {
      type: "text/plain",
    });

    saveFile(blob, "Scene", "trxs");
  }

  function exportGLTF() {
    let gltfExporter = new GLTFExporter();

    gltfExporter.parse(ta_scene.scene, function (result) {
      let gltf = JSON.stringify(result, null, 2);

      let blob = new Blob([gltf], { type: "text/plain" });

      saveFile(blob, "Scene", "gltf");
    });
  }

  function saveFile(blob, name, fileExtention) {
    let fileName = name + "." + fileExtention;

    let link = document.createElement("a");
    link.download = fileName;

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, fileName);
    } else {
      link.href = URL.createObjectURL(blob);

      link.click();

      URL.revokeObjectURL(link.href);
    }
  }

  //---------------

  let editMenu = ta_UI.createContainer("editMenu", mainMenu);
  editMenu.className = "subMainMenu";

  ta_UI.addElement(
    editMenu,
    "label",
    "Clone object",
    "",
    function () {
      let ta_entities = new TA_Entities();
      ta_entities.cloneObject(ta_scene);
    }
  );
  editMenu.addEventListener("mouseout", function (e) {
    if (!e.relatedTarget || e.relatedTarget.offsetParent.id !== "editMenu") {
      this.style.visibility = "hidden";
    }
  });

  //--------------

  let helpMenu = ta_UI.createContainer("helpMenu", mainMenu);
  helpMenu.className = "subMainMenu";

  helpMenu.addEventListener("mouseout", function (e) {
    if (!e.relatedTarget || e.relatedTarget.offsetParent.id !== "fileMenu") {
      this.style.visibility = "hidden";
    }
  });

  ta_UI.addElement(helpMenu, "label", "About", "", aboutOpen);

  function aboutOpen() {
    window.open("https://dragon3dgraff.ru/");
  }

  //===============

  function offsetPosition(element) {
    var offsetLeft = 0,
      offsetTop = 0;

    do {
      offsetLeft += element.offsetLeft;
      offsetTop += element.offsetTop;
    } while ((element = element.offsetParent));

    return [offsetLeft, offsetTop];
  }

  console.log("MainMenu created");

  return mainMenu;
}

export { createMainMenu };
