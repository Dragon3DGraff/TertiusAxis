/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */
import {
  PerspectiveCamera,
  Vector3,
  Line3,
} from "../node_modules/three/build/three.module.js";

class TA_SceneCamera {
  constructor() {
    this.camera = new PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.01,
      10000
    );
    this.camera.position.z = 50;
    this.camera.position.y = 50;
    this.camera.position.x = 50;
    this.camera.lookAt(0, 0, 0);
  }

  initCamera() {
    return this.camera;
  }

  getWorldSizeOfScreen(camera, point) {
    let cameraDirection = new Vector3();
    camera.getWorldDirection(cameraDirection);
    let cameraPosition = new Vector3();
    cameraPosition = camera.position.clone();
    let distance = point.distanceTo(cameraPosition);

    cameraPosition.add(cameraDirection.multiplyScalar(distance));

    let line3 = new Line3(camera.position, cameraPosition);

    let pointOnLine = new Vector3();

    line3.closestPointToPoint(point, true, pointOnLine);

    distance = pointOnLine.distanceTo(camera.position);

    let angle = camera.fov / 2;
    let sizeOfViewX = distance * Math.tan((angle * Math.PI) / 180) * 2;
    let sizeOfViewY = sizeOfViewX * camera.aspect * 2;

    let sizeOfView = {
      height: sizeOfViewX,
      width: sizeOfViewY,
    };

    return sizeOfView;
  }
}

export { TA_SceneCamera };
