/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import {
  GridHelper,
  Color,
  PlaneGeometry,
  MeshBasicMaterial,
  DoubleSide,
  Mesh,
  CameraHelper,
  Scene,
  Camera,
} from "three";
import { TA_Entities } from "./Entities/TA_Entities.js";

export class TA_Helpers {
  gridHelperSmall: GridHelper | null = null;
  gridHelperBig: GridHelper | null = null;
  mainPlanesArray: any[] | null = null;
  scene: Scene;
  constructor(scene: Scene) {
    this.scene = scene;
  }
  // coordsHelpers () {
  //   createCoordsHelpers  (intersects, scene) {
  //     if (intersects.length > 0) {
  //       let x = intersects[0].point.x;
  //       let y = intersects[0].point.y;
  //       let z = intersects[0].point.z;

  //       let lineX, lineY, lineZ;
  //       let labelX, labelY, labelZ;

  //       let taEntities = new TA_Entities();

  //       let labelAtPoint = taEntities.createLabel(x, y, z, "");
  //       labelAtPoint.name = "CoordsHelper";
  //       scene.add(labelAtPoint);

  //       switch (intersects[0].object.name) {
  //         case "mainPlaneZY":
  //           labelAtPoint.element.innerHTML =
  //             "z = " +
  //             Math.round(z * 100) / 100 +
  //             "<br>y = " +
  //             Math.round(y * 100) / 100;

  //           labelZ = taEntities.createLabel(0, 0, z, "");
  //           labelZ.name = "CoordsHelper";
  //           labelZ.element.innerHTML = "z = " + Math.round(z * 100) / 100;
  //           scene.add(labelZ);

  //           labelY = taEntities.createLabel(0, y, 0, "");
  //           labelY.name = "CoordsHelper";
  //           labelY.element.innerHTML = "y = " + Math.round(y * 100) / 100;
  //           scene.add(labelY);

  //           lineZ = taEntities.createLine(x, y, z, x, 0, z, "red", "dashed");
  //           lineZ.name = "CoordsHelper";
  //           scene.add(lineZ);

  //           lineY = taEntities.createLine(x, y, z, x, y, 0, "red", "dashed");
  //           lineY.name = "CoordsHelper";
  //           scene.add(lineY);

  //           break;

  //         case "mainPlaneXY":
  //           labelAtPoint.element.innerHTML =
  //             " x = " +
  //             Math.round(x * 100) / 100 +
  //             "<br>y = " +
  //             Math.round(y * 100) / 100;

  //           labelX = taEntities.createLabel(x, 0, 0, "");
  //           labelX.name = "CoordsHelper";
  //           labelX.element.innerHTML = "x = " + Math.round(x * 100) / 100;
  //           scene.add(labelX);

  //           labelY = taEntities.createLabel(0, y, 0, "");
  //           labelY.name = "CoordsHelper";
  //           labelY.element.innerHTML = "y = " + Math.round(y * 100) / 100;
  //           scene.add(labelY);

  //           lineX = taEntities.createLine(x, y, z, x, 0, z, "red", "dashed");
  //           lineX.name = "CoordsHelper";
  //           scene.add(lineX);

  //           lineY = taEntities.createLine(x, y, z, 0, y, z, "red", "dashed");
  //           lineY.name = "CoordsHelper";
  //           scene.add(lineY);

  //           break;

  //         case "mainPlaneXZ":
  //           labelAtPoint.element.innerHTML =
  //             "x = " +
  //             Math.round(x * 100) / 100 +
  //             "<br>z = " +
  //             Math.round(z * 100) / 100;

  //           labelX = taEntities.createLabel(x, 0, 0, "");
  //           labelX.name = "CoordsHelper";
  //           labelX.element.innerHTML = "x = " + Math.round(x * 100) / 100;
  //           scene.add(labelX);

  //           labelZ = taEntities.createLabel(0, 0, z, "");
  //           labelZ.name = "CoordsHelper";
  //           labelZ.element.innerHTML = "z = " + Math.round(z * 100) / 100;
  //           scene.add(labelZ);

  //           lineX = taEntities.createLine(x, y, z, x, y, 0, "red", "dashed");
  //           lineX.name = "CoordsHelper";
  //           scene.add(lineX);

  //           lineZ = taEntities.createLine(x, y, z, 0, y, z, "red", "dashed");
  //           lineZ.name = "CoordsHelper";
  //           scene.add(lineZ);

  //           break;

  //         default:
  //           break;
  //       }
  //     }
  //   };

  //   this.removeCoordsHelpers = function (scene) {
  //     let linesinScene = scene.children.filter(
  //       (item) => item.name === "CoordsHelper"
  //     );
  //     linesinScene.forEach((element) => {
  //       scene.remove(element);
  //     });
  //   };
  // };

  createSceneGrids() {
    //Small grid
    this.gridHelperSmall = new GridHelper(
      100,
      100,
      new Color("grey"),
      new Color("lightgrey")
    );
    this.gridHelperSmall.position.y = 0;
    this.gridHelperSmall.position.x = 0;

    //Big grid
    this.gridHelperBig = new GridHelper(100, 20, 0x0000ff, new Color("grey"));
    this.gridHelperBig.position.y = 0;
    this.gridHelperBig.position.x = 0;

    //planes on axises
    this.mainPlanesArray = [];

    let mainPlaneGeom = new PlaneGeometry(200, 200);
    let mainPlaneMaterial = new MeshBasicMaterial({
      color: new Color("lightgrey"),
      transparent: true,
      opacity: 0.0,
      alphaTest: 0.1,
      side: DoubleSide,
    });

    let mainPlaneZY = new Mesh(mainPlaneGeom, mainPlaneMaterial);

    mainPlaneZY.name = "mainPlaneXY";
    this.scene.add(mainPlaneZY);
    this.mainPlanesArray.push(mainPlaneZY);

    let mainPlaneXY = new Mesh(mainPlaneGeom, mainPlaneMaterial);
    mainPlaneXY.rotation.y = (90 * Math.PI) / 180;
    mainPlaneXY.name = "mainPlaneZY";
    this.scene.add(mainPlaneXY);
    this.mainPlanesArray.push(mainPlaneXY);

    let mainPlaneXZ = new Mesh(mainPlaneGeom, mainPlaneMaterial);
    mainPlaneXZ.rotation.x = (90 * Math.PI) / 180;
    mainPlaneXZ.name = "mainPlaneXZ";
    this.scene.add(mainPlaneXZ);
    this.mainPlanesArray.push(mainPlaneXZ);

    let taEntities = new TA_Entities();
    let lineAxixY = taEntities.createLine(
      0,
      -100,
      0,
      0,
      100,
      0,
      "blue",
      "solid"
    );
    lineAxixY.name = "AxisY";
    this.scene.add(lineAxixY);
  }

  initAll() {
    this.gridHelperSmall && this.scene.add(this.gridHelperSmall);
    this.gridHelperBig && this.scene.add(this.gridHelperBig);
  }

  initSmallGrid() {
    this.gridHelperSmall && this.scene.add(this.gridHelperSmall);
  }

  initBigGrid() {
    this.gridHelperBig && this.scene.add(this.gridHelperBig);
  }

  removeAll() {
    this.gridHelperSmall && this.scene.remove(this.gridHelperSmall);
    this.gridHelperBig && this.scene.remove(this.gridHelperBig);
  }

  static addCameraHelper(scene: Scene, camera: Camera) {
    scene.add(new CameraHelper(camera));
  }
}
