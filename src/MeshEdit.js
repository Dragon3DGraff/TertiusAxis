/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

// import * as THREE from "../node_modules/three/build/three.module.js";
import {
  Group,
  Color,
  Vector3,
  BufferGeometry,
  BufferAttribute,
  SphereBufferGeometry,
  Mesh,
  MeshBasicMaterial,
  DoubleSide,
  FaceColors,
} from "../node_modules/three/build/three.module.js";
import { TA_Entities } from "./Entities/TA_Entities.js";
import { TA_Scene } from "./TA_Scene.js";
import { TA_UI } from "./UI/TA_UI.js";
import { findBaryCenter } from "./Calculations.js";

class MeshEdit {
  constructor(mesh) {
    this.mesh = mesh;
    this.vertices;
    this.points;
    this.mode = "Vertices";

    this.ta_UI = new TA_UI();
    this.ta_Entities = new TA_Entities();
    this.ta_Scene = new TA_Scene();
    this.faceHighlighting = true;

    this.materialHighlight = new MeshBasicMaterial({
      color: new Color("yellow"),
      transparent: true,
      opacity: 0.9,
      // side: DoubleSide
      // alphaTest: 0.5,
    });

    this.triangleForHighlighting = createTriangle(
      [new Vector3(0, 0, 0), new Vector3(0, 0, 0), new Vector3(0, 0, 0)],

      this.materialHighlight
    );
  }

  highlightFace(intersectsObjects) {
    if (intersectsObjects.length > 0) {
      let mesh = intersectsObjects[0].object;
      let face = intersectsObjects[0].face;

      let points = getPoints(mesh);

      let vertices = [points[face.a], points[face.b], points[face.c]];

      let arr = [];
      vertices.map((item) => {
        arr.push(item.x);
        arr.push(item.y);
        arr.push(item.z);
      });
      arr.map(
        (item, index) =>
          (this.triangleForHighlighting.geometry.attributes.position.array[
            index
          ] = item)
      );
      this.triangleForHighlighting.geometry.attributes.position.needsUpdate = true;
      this.triangleForHighlighting.name = "FaceHighlight";

      mesh.add(this.triangleForHighlighting);
    }
  }

  createMeshHelpers() {
    this.points = getPoints(this.mesh);
    this.vertices = getVertices(this.points);

    // this.mesh.add( this.ta_Entities.createWireframe( this.mesh ) );

    if (this.mode === "Vertices") {
      this.addSpheresToVertices(this.mesh, this.vertices);
    }
    if (this.mode === "Faces") {
      // this.addTriangles( this.mesh, this.points );
    }
  }

  removeMeshHelpers() {
    this.ta_Entities.removeWireframeAndBoundingBox(this.mesh);

    this.mesh.remove(this.mesh.getObjectByName("shperesForMeshEdit"));
    this.mesh.remove(this.mesh.getObjectByName("FaceHelperGroup"));
  }

  transformMesh(editHelper) {
    if (this.mode === "Vertices") {
      this.moveVertex(
        editHelper.object.userData.vertexNumber,
        editHelper.object.position
      );
    }

    if (this.mode === "Faces") {
      let sphereName = editHelper.object.name;

      let face = editHelper.object.parent.getObjectByName(
        editHelper.object.name.replace("Sphere", "")
      );

      let sphere = editHelper.object;

      let shift = sphere.position.clone();

      shift.subVectors(sphere.position, face.userData.baryCenter);

      face.position.set(shift.x, shift.y, shift.z);

      // console.log (shift)

      let attrArray = face.geometry.attributes.position.array;
      let vertices = [];

      for (let i = 0; i < attrArray.length; i += 3) {
        vertices.push(
          new Vector3(attrArray[i], attrArray[i + 1], attrArray[i + 2])
        );
      }

      let verticesNumbers = face.userData.verticesNumbers;

      for (let i = 0; i < verticesNumbers.length; i++) {
        let pointNumber = verticesNumbers[i];

        let point = vertices[i].clone();

        let pointPosition = point.add(face.position.clone()).clone();

        this.moveVertex(pointNumber, pointPosition);

        // this.removeMeshHelpers();

        let sphere = this.ta_Scene.scene.getObjectByName(sphereName);

        this.ta_Scene.transformControls.attach(sphere);
      }
      this.createMeshHelpers();
    }
  }

  moveVertex(vertexNumber, position) {
    let object = this.mesh;

    object.geometry.parameters = null;

    let VertexesPointsIndexes = getVertexesPointsIndexes(
      this.points,
      this.vertices
    );

    this.ta_Entities.removeWireframeAndBoundingBox(object);

    this.vertices[+vertexNumber] = position;

    let newPoints = vertexesChangePoints(
      this.vertices,
      this.points,
      VertexesPointsIndexes
    );

    pointsChangeAttributesPosition(object, newPoints);
    object.geometry.attributes.position.needsUpdate = true;

    //without this raycaster will not work correct
    object.geometry.computeBoundingSphere();
    object.geometry.computeBoundingBox();

    object.add(this.ta_Entities.createWireframe(object));
  }

  addSpheresToVertices(mesh, vertices) {
    let sphereGeometry = new SphereBufferGeometry(0.3, 3, 2);
    let material = new MeshBasicMaterial({ color: new Color("red") });

    let group = new Group();
    group.name = "shperesForMeshEdit";

    vertices.map((item, index) => {
      let sphere = new Mesh(sphereGeometry, material);
      sphere.name = "createMeshHelpers";
      sphere.userData.vertexNumber = `${index}`;
      group.add(sphere);
      sphere.position.set(item.x, item.y, item.z);
      this.ta_Scene.selectableObjects.push(sphere);
    });

    mesh.add(group);
  }

  addTriangle(intersectsObjects) {
    let group = new Group();
    group.name = "FaceHelperGroup";

    let sphereGeometry = new SphereBufferGeometry(0.2, 3, 2);
    let material = new MeshBasicMaterial({
      color: new Color("lightgrey"),
      transparent: true,
      opacity: 0.9,
      // side: DoubleSide
      // alphaTest: 0.5,
    });

    if (intersectsObjects.length > 0) {
      let mesh = intersectsObjects[0].object;
      let face = intersectsObjects[0].face;

      mesh.remove(mesh.getObjectByName("FaceHelperGroup"));

      let points = getPoints(mesh);

      let vertices = [points[face.a], points[face.b], points[face.c]];

      let triangle = createTriangle(vertices, material);
      triangle.name = "Face_";
      triangle.userData.type = "createMeshHelpers";

      triangle.userData.verticesNumbers = [];

      vertices.map((item) => {
        this.vertices.forEach((itemVert, index) => {
          if (item.equals(itemVert)) {
            triangle.userData.verticesNumbers.push(index);
            return;
          }
        });
      });

      // triangle.add( this.ta_Entities.createWireframe( triangle ) );

      let verticesClones = vertices.map((item) => item.clone());
      let baryCenter = findBaryCenter(verticesClones);

      triangle.userData.baryCenter = baryCenter;

      let sphere = new Mesh(sphereGeometry, material);
      sphere.position.set(baryCenter.x, baryCenter.y, baryCenter.z);
      sphere.name = "SphereFace_";
      sphere.userData.type = "createMeshHelpers";

      group.add(sphere);

      group.add(triangle);
      mesh.add(group);
    }
  }

  addTriangles(mesh, points) {
    let sphereGeometry = new SphereBufferGeometry(0.2, 3, 2);
    let material = new MeshBasicMaterial({ color: new Color("lightgrey") });

    let triangleNumber = 0;

    // this.ta_Scene.tempSelectableObjects = this.ta_Scene.tempSelectableObjects.concat( this.ta_Scene.selectableObjects );

    // this.ta_Scene.selectableObjects = [];

    let group = new Group();
    group.name = "FacesForMeshEdit";

    let indexArray = mesh.geometry.index.array;

    for (let i = 0; i < indexArray.length; i += 3) {
      let vert = [
        points[indexArray[i]],
        points[indexArray[i + 1]],
        points[indexArray[i + 2]],
      ];

      let triangle = createTriangle(vert, material);

      triangle.name = "Face_" + triangleNumber;

      triangle.userData.type = "createMeshHelpers";

      triangle.userData.indexes = [
        indexArray[i],
        indexArray[i + 1],
        indexArray[i + 2],
      ];

      triangle.userData.verticesNumbers = [];

      vert.map((item) => {
        this.vertices.forEach((itemVert, index) => {
          if (item.equals(itemVert)) {
            triangle.userData.verticesNumbers.push(index);
            return;
          }
        });
      });

      triangle.add(this.ta_Entities.createWireframe(triangle));

      let verticesClones = vert.map((item) => item.clone());
      let baryCenter = findBaryCenter(verticesClones);

      triangle.userData.baryCenter = baryCenter;

      let sphere = new Mesh(sphereGeometry, material);
      sphere.position.set(baryCenter.x, baryCenter.y, baryCenter.z);
      sphere.name = "SphereFace_" + triangleNumber;
      sphere.userData.type = "createMeshHelpers";

      group.add(sphere);

      group.add(triangle);
      mesh.add(group);

      this.ta_Scene.selectableObjects.push(triangle);
      triangleNumber++;
    }
  }
}

function getPoints(mesh) {
  let pointsArray = mesh.geometry.attributes.position.array;
  let itemSize = mesh.geometry.attributes.position.itemSize;

  let points = [];

  for (let i = 0; i < pointsArray.length; i += itemSize) {
    points.push(
      new Vector3(pointsArray[i], pointsArray[i + 1], pointsArray[i + 2])
    );
  }

  return points;
}

function getVertices(points) {
  let vertices = [];

  points.forEach((indexPoints) => {
    let equal = false;

    vertices.forEach((indexVertex) => {
      if (indexPoints.equals(indexVertex)) {
        equal = true;
        return;
      }
    });

    if (!equal) {
      vertices.push(indexPoints);
    }
  });

  return vertices;
}

function getVertexesPointsIndexes(points, vertices) {
  let indexesArray = [];
  vertices.map((itemVertex) => {
    let indexes = [];
    points.forEach((itemPoints, index) => {
      if (itemPoints.equals(itemVertex)) indexes.push(index);
    });
    indexesArray.push(indexes);
    // map.set( itemVertex, indexes);
  });

  return indexesArray;
}

function vertexesChangePoints(vertices, points, VertexesPointsIndexes) {
  vertices.map((itemVertex, index) => {
    let arrayIndexes = VertexesPointsIndexes[index];

    arrayIndexes.map((item) => (points[item] = itemVertex));
  });

  points[0] = vertices[0];

  return points;
}

function pointsChangeAttributesPosition(mesh, points) {
  let positions = [];

  points.map((item) => {
    positions.push(item.x);
    positions.push(item.y);
    positions.push(item.z);
  });

  let arrayAttr = mesh.geometry.attributes.position.array;

  arrayAttr.map((item, index) => {
    mesh.geometry.attributes.position.array[index] = positions[index];
  });
}

function createTriangle(vertices, material) {
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

  const mesh = new Mesh(geometry, material);

  return mesh;
}

export { MeshEdit };
