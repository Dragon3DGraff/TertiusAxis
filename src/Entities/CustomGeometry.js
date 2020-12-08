/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import {
  BufferGeometry,
  BufferAttribute,
  Mesh,
  MeshBasicMaterial,
  Color,
} from "../../node_modules/three/build/three.module.js";

export function createCustomGeometry(scene) {
  console.log("Creating Custom Geometry");

  let positions = [10, 10, 10, 10, 10, 0, 10, 0, 10, 10, 0, 0];

  let normals = [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0];

  const geometry = new BufferGeometry();

  geometry.setAttribute(
    "position",
    new BufferAttribute(new Float32Array(positions), 3)
  );
  geometry.setAttribute(
    "normal",
    new BufferAttribute(new Float32Array(normals), 3)
  );
  geometry.setIndex([0, 2, 3, 0, 3, 1]);

  const mesh = new Mesh(
    geometry,
    new MeshBasicMaterial({ color: new Color("yellow") })
  );

  // console.log( geometry)

  return mesh;
}

export function createTriangle(vertices) {
  if (vertices.length != 3) {
    console.error("Vertices must be an array of 3 Vectors");
    return;
  }

  vertices.forEach((item) => {
    if (!item.isVector3) {
      console.error("Vertices must be an array of 3 Vectors");
      return;
    }
  });

  let positions = [];

  vertices.map((item) => {
    positions.push(item.x);
    positions.push(item.y);
    positions.push(item.z);
  });

  const geometry = new BufferGeometry();

  geometry.setAttribute(
    "position",
    new BufferAttribute(new Float32Array(positions), 3)
  );

  geometry.setIndex([0, 1, 2]);

  // const mesh = new Mesh( geometry, new MeshBasicMaterial({ color: new Color( "red"), transparent: true, opacity: 0.5 } ));
  const mesh = new Mesh(
    geometry,
    new MeshBasicMaterial({ color: new Color("red") })
  );

  return mesh;
}
