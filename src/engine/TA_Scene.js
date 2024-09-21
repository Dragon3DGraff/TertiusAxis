/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import {
  Scene,
  WebGLRenderer,
  Raycaster,
  PerspectiveCamera,
  Group,
  Color,
  Vector2,
  // Vector3,
  SphereGeometry,
  // LineCurve3,
  // Line,
  // BufferGeometry,
  // LineBasicMaterial,
  MeshMatcapMaterial,
  Mesh,
  // MeshBasicMaterial,
  MeshPhongMaterial,
  // BoxBufferGeometry,
  // DoubleSide,
  // BufferAttribute,
  // Material,
  // Texture,
  TextureLoader,
  // sRGBEncoding,
} from "three";

import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";

//if you want to use this see bug fix in Action.js (function switchDragMode)
// import { DragControls } from '../node_modules/three/examples/jsm/controls/DragControls.js';
import { DragControls } from "./DragControls.js";

import { TA_Entities } from "./Entities/TA_Entities.js";
import { TA_SceneLights } from "./TA_SceneLights.js";
import { TA_Helpers } from "./TA_Helpers.js";
import { TA_SceneCamera } from "./TA_SceneCamera.js";
import * as Actions from "../Actions.js";
// import { MeshEdit } from "./MeshEdit.js";
import { findBaryCenter } from "./Calculations.js";
import { TA_State } from "./TA_State.js";

// import * as CustomGeometry from "./Entities/CustomGeometry.js";
import EventEmitter from "./EventEmitter.js";

class TA_Scene {
  constructor(ta_UI) {
    // singleton
    if (TA_Scene.exist) {
      return TA_Scene.instance;
    }
    TA_Scene.instance = this;
    TA_Scene.exist = true;

    this.ta_UI = ta_UI;
    this.scene;
    this.mousePosition = { x: null, y: null };

    this.mode = {
      action: "select",
      entity: null,
    };

    this.ta_State = new TA_State();
    this.events = new EventEmitter();

    this.meshEditObject = {};

    this.selectableObjects = [];
    this.tempSelectableObjects = [];

    this.currentSelection = {
      object: null,
      objectOwnColor: null,
      multiselection: new Group(),
    };

    this.transformControlsMode = "";
    // let objectOwnColor;
    this.transformControlsChanged = false;
    this.orbitControlsChanged = false;
  }

  get getScene() {
    return this.scene;
  }

  createScene() {
    let scope = this;

    let scene = new Scene();
    let renderer = new WebGLRenderer({ antialias: true });
    let renderer2 = new WebGLRenderer();
    const raycaster = new Raycaster();

    let sceneCamera = new TA_SceneCamera();
    let sceneCamera2 = new TA_SceneCamera();

    let labelRenderer = new CSS2DRenderer();
    let ta_Entities = new TA_Entities();
    let creatingEntity = new ta_Entities.CreatingEntity();

    const sceneLights = new TA_SceneLights();
    let camera = sceneCamera.initCamera();
    let camera2 = sceneCamera2.initCamera();
    camera2 = new PerspectiveCamera(
      50,
      document.getElementById("secondCanvas").clientWidth /
        document.getElementById("secondCanvas").clientHeight,
      0.01,
      10000
    );
    camera2.position.z = 0;
    camera2.position.y = 4.6;
    camera2.position.x = 0;
    camera2.lookAt(0, 0, 0);
    const ta_sHelpers = new TA_Helpers();
    // const coordsHelpers = new ta_sHelpers.coordsHelpers();
    const sceneGrid = new ta_sHelpers.SceneGrids(scene);

    scene.add(this.currentSelection.multiselection);

    scene.background = new Color("white");
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer2.setSize(
      document.getElementById("secondCanvas").clientWidth,
      document.getElementById("secondCanvas").clientHeight
    );
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = "absolute";
    labelRenderer.domElement.style.top = 0;
    labelRenderer.domElement.id = "labelRenderer";

    sceneLights.initAll(scene);
    sceneGrid.initBigGrid(scene);
    // sceneGrid.initSmallGrid(scene);

    document.body.appendChild(renderer.domElement);

    document.getElementById("secondCanvas").appendChild(renderer2.domElement);
    document.body.appendChild(labelRenderer.domElement);

    this.orbitControls = new OrbitControls(camera, labelRenderer.domElement);
    this.transformControls = new TransformControls(
      camera,
      labelRenderer.domElement
    );
    scene.add(this.transformControls);
    this.transformControls.addEventListener("change", render);
    this.transformControls.addEventListener("change", function () {
      scope.transformControlsChanged = true;
    });

    this.orbitControls.addEventListener("start", function () {
      // document.removeEventListener('mousedown', onDocumentMouseDown, false);
      // console.log('orbitControls start');
      //
    });

    this.orbitControls.addEventListener("change", function () {
      scope.orbitControlsChanged = true;
      // document.removeEventListener('mousedown', onDocumentMouseDown, false);
    });

    // this.orbitControls.addEventListener("end", function () {
    //   document.addEventListener("mousedown", onDocumentMouseDown, false);
    // });

    this.transformControls.addEventListener("mouseDown", function () {
      document.removeEventListener("click", onDocMouseUp, false);
      scope.transformControlsChanged = true;

      if (scope.ta_State.appMode.meshEdit) {
        scope.meshEditObject.mesh.remove(
          scope.meshEditObject.mesh.getObjectByName("FaceHighlight")
        );

        scope.meshEditObject.faceHighlighting = false;
      }
    });

    this.transformControls.addEventListener("mouseUp", function () {
      // console.log('transformControls mouseUp');

      document.addEventListener("click", onDocMouseUp, false);
      scope.transformControlsChanged = true;

      if (scope.ta_State.appMode.meshEdit) {
        scope.meshEditObject.faceHighlighting = true;
      }
    });

    this.transformControls.addEventListener("objectChange", function (event) {
      document.removeEventListener("click", onDocMouseUp, false);
      scope.transformControlsChanged = true;

      if (event.target.mode === "translate") {
        if (scope.ta_State.appMode.meshEdit) {
          let editHelper = event.target;

          scope.meshEditObject.transformMesh(editHelper);

          // scope.ta_UI.deleteGeometryParametersTab();
        }

        //TODO СДЕЛАТЬ ОБНОВЛЕНИЕ ПОЛЕЙ ПАРАМЕТРОВ

        if (event.target.object.type === "Group") {
          return;
        }

        if (
          event.target.worldPositionStart.x !== event.target.worldPosition.x
        ) {
          // document.getElementById('position_x').value = event.target.object.position.x;
        }

        if (
          event.target.worldPositionStart.y !== event.target.worldPosition.y
        ) {
          // document.getElementById('position_y').value = event.target.object.position.y;
        }

        if (
          event.target.worldPositionStart.z !== event.target.worldPosition.z
        ) {
          // document.getElementById('position_z').value = event.target.object.position.z;
        }
      }
    });

    this.transformControls.addEventListener(
      "dragging-changed",
      function (event) {
        scope.orbitControls.enabled = !event.value;
      }
    );

    this.dragControls = new DragControls(
      this.selectableObjects,
      camera,
      labelRenderer.domElement
    );
    this.dragControls.deactivate();
    // this.dragControls.addEventListener( 'drag', render );

    this.dragControls.addEventListener("drag", function () {
      // scope.ta_UI.createParametersMenu( event.object );
      // scope.transformControls.detach( scope.currentSelection.multiselection );

      scope.orbitControls.enableRotate = false;
      scope.transformControls.enabled = false;
    });
    this.dragControls.addEventListener("dragend", function () {
      scope.orbitControls.enableRotate = true;
      scope.transformControls.enabled = true;
    });

    const infoDiv = document.getElementById("infoParagraph");

    window.addEventListener("resize", onWindowResize, false);
    document.addEventListener("click", onDocMouseClick, false);
    document.addEventListener("mousemove", onDocumentMouseMove, false);
    // document.addEventListener("mousedown", onDocumentMouseDown, false);
    document.addEventListener("mouseup", onDocMouseUp, false);
    document.addEventListener("keydown", onKeyDown, false);
    document.addEventListener("touchstart", onTouchStart, false);
    document.addEventListener("touchend", onTouchEnd, false);
    document.addEventListener("touchmove", onTouchMove, false);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      camera2.aspect =
        document.getElementById("secondCanvas").clientWidth /
        document.getElementById("secondCanvas").clientHeight;
      camera2.updateProjectionMatrix();
      renderer2.setSize(
        document.getElementById("secondCanvas").clientWidth,
        document.getElementById("secondCanvas").clientHeight
      );
      renderer.setSize(window.innerWidth, window.innerHeight);
      labelRenderer.setSize(window.innerWidth, window.innerHeight);
    }

    function updateSmallWindow() {
      let secondCanvasWidth = document.getElementById("secondCanvas")
        .clientWidth;
      let secondCanvasHeight = document.getElementById("secondCanvas")
        .clientHeight;
      camera2.aspect = secondCanvasWidth / secondCanvasHeight;
      camera2.updateProjectionMatrix();
      renderer2.setSize(secondCanvasWidth, secondCanvasHeight);
    }
    function resizeSecondCanvas() {
      let secondCanvas = document.getElementById("secondCanvas");
      if (secondCanvas.style.width === "200px") {
        let width = window.innerWidth + "px";
        let height = window.innerHeight + "px";
        secondCanvas.style.width = width;
        secondCanvas.style.height = height;
        secondCanvas.style.left = "0px";
        secondCanvas.style.top = "0px";
        secondCanvas.style.width = width;
        secondCanvas.style.height = height;
        updateSmallWindow();
      } else {
        let size = "200px";
        secondCanvas.style.left = "";
        secondCanvas.style.right = "30px";
        secondCanvas.style.top = "30px";
        secondCanvas.style.width = size;
        secondCanvas.style.height = size;
        secondCanvas.style.width = size;
        secondCanvas.style.height = size;
        updateSmallWindow();
      }
    }

    // ----------TEST-----------------

    // let testCylinder = ta_Entities.createCylinder(0,0,0,0.2,0.2,30,10,1);
    // testCylinder.material.color = new Color('red');
    // testCylinder.name = 'testCylinder';
    // scene.add( testCylinder );

    ////////////////////////////////
    // let testBuffer = CustomGeometry.createCustomGeometry();
    // scene.add( testBuffer );
    // this.selectableObjects.push( testBuffer );

    // let sphereGeometry = new SphereGeometry(0.5, 4, 4);
    let material = new MeshPhongMaterial({
      color: new Color("green"),
      transparent: true,
      opacity: 1,
    });
    // let texture = new TextureLoader().load( "_Resources/Matcabs/Test/FBB82D_FBEDBF_FBDE7D_FB7E05-64px.png" );
    // texture.encoding = sRGBEncoding;
    // let material =  new MeshMatcapMaterial( { matcap: texture });

    // let sphere = new Mesh( sphereGeometry, material);
    // scene.add( sphere );

    let sphereGeometry = new SphereGeometry(20, 30, 30);
    let testSphere = new Mesh(sphereGeometry, material);
    // scene.add(testSphere);
    this.selectableObjects.push(testSphere);
    testSphere.position.set(25, 0, 0);

    // let cubeGeometry = new BoxBufferGeometry(10, 10, 10);
    // let mesh = new Mesh(cubeGeometry, material);
    // scene.add(mesh);
    // mesh.position.set(0, 0, 7);
    // mesh.name = "TestCube";
    // this.selectableObjects.push(mesh);

    // let lineMaterial = new LineBasicMaterial( { color: 'red' } );

    // let vec0 = new Vector3( 0, 0, 0 );

    // let vec1 = new Vector3( 0, 0, 10 );
    // let vec2 = new Vector3( 0, 0, 10 );
    // let vec3 = new Vector3( 0, 10, 0 );

    // let points1 = [ vec0, vec2 ];
    // let points2 = [ vec0, vec1 ];
    // let points3 = [ vec0, vec3 ];

    // let lineGeometry1 = new BufferGeometry().setFromPoints( points1 );
    // let lineGeometry2 = new BufferGeometry().setFromPoints( points2 );
    // let lineGeometry3 = new BufferGeometry().setFromPoints( points3 );

    // let line1 = new Line( lineGeometry1, lineMaterial );
    // let line2 = new Line( lineGeometry2, lineMaterial );
    // let line3 = new Line( lineGeometry3, lineMaterial );

    // scene.add( line1 );
    // scene.add( line2 );
    // scene.add( line3 );

    // let cross = vec3.cross( vec2 );
    // console.log( cross );

    // let pointsCross = [ vec0, cross ];
    // let lineGeometryCross = new BufferGeometry().setFromPoints( pointsCross );
    // let lineCross = new Line( lineGeometryCross, lineMaterial );
    // scene.add( lineCross );

    // let dot = vec1.dot( cross );

    // console.log( `dot = ${dot}` )
    // console.log( `volume = ${dot/6.0}` )

    //////////////////-------------------------------

    function onDocMouseUp(event) {
      // console.log(scope.orbitControlsChanged);
      // event.stopPropagation();
      // event.preventDefault();

      if (scope.orbitControlsChanged) {
        scope.orbitControlsChanged = false;

        return;
      }

      // if (scope.transformControlsChanged) {
      //   scope.transformControlsChanged = false;
      //   return;
      // }

      if (
        event.target.parentElement &&
        event.target.parentElement.id === "secondCanvas"
      ) {
        resizeSecondCanvas();

        return;
      }

      if (event.target.id === "labelRenderer") {
        let screenPoint = getScreenPoint(event);

        raycaster.setFromCamera(screenPoint, camera);

        let intersects = raycaster.intersectObjects(sceneGrid.mainPlanesArray);

        console.log(scope.mode.action);

        if (scope.mode.action === "creationEntity") {
          scope.returnObjectsToScene();
          scope.resetMultyselection();

          if (creatingEntity.centerOfObjectWorld) {
            ta_Entities.selectEntity(
              creatingEntity.currentEntity,
              scope.currentSelection
            );
            scope.ta_UI.elements.meshEditContainer.style.display = "block";

            if (creatingEntity.currentEntity) {
              scope.selectableObjects.push(creatingEntity.currentEntity);
            }

            creatingEntity.stopCreating();

            if (scope.transformControlsMode !== "") {
              scope.transformControls.setMode(scope.transformControlsMode);
              scope.transformControls.attach(scope.currentSelection.object);
            }

            return;
          }
          if (scope.currentSelection.object) {
            ta_Entities.removeSelection(scope.currentSelection);
            scope.currentSelection.object = null;
            scope.currentSelection.objectOwnColor = null;
          }

          creatingEntity.centerOfObjectWorld = intersects[0].point;
          creatingEntity.createEntity(scope.mode, scene, event, sceneCamera);
          scope.ta_UI.createParametersMenu(creatingEntity.currentEntity);
        }

        if (scope.ta_State.appMode.meshEdit) {
          let screenPoint = getScreenPoint(event);

          raycaster.setFromCamera(screenPoint, camera);

          if (scope.meshEditObject.mode === "Faces") {
            scope.meshEditObject.mesh.remove(
              scope.meshEditObject.mesh.getObjectByName("FaceHighlight")
            );

            let intersects = raycaster.intersectObject(
              scope.meshEditObject.mesh
            );

            if (intersects.length > 0) {
              let objectToSelect = intersects[0].object;

              objectToSelect.remove(
                intersects[0].object.getObjectByName("FaceHighlight")
              );

              scope.meshEditObject.addTriangle(intersects);

              let sphere = scope.meshEditObject.mesh.getObjectByName(
                "SphereFace_"
              );

              scope.transformControlsMode = "translate";

              scope.transformControls.attach(sphere);
            }
          }

          if (scope.meshEditObject.mode === "Vertices") {
            let intersects = raycaster.intersectObjects(
              scope.selectableObjects
            );

            if (intersects.length > 0) {
              let objectToSelect = intersects[0].object;

              scope.transformControlsMode = "translate";

              scope.transformControls.attach(objectToSelect);
            }
          }
        }
      }

      // if ( scope.transformControlsChanged ) {

      scope.transformControlsChanged = false;
      // return

      // } else {

      // 	scope.returnObjectsToScene();
      // 	scope.resetMultyselection();
      // }
    }

    function selectByMouse(event) {
      let screenPoint = getScreenPoint(event);

      raycaster.setFromCamera(screenPoint, camera);

      let intersects = raycaster.intersectObjects(scope.selectableObjects);

      if (intersects.length > 0) {
        let objectToSelect = intersects[0].object;

        if (event.ctrlKey) {
          if (scope.currentSelection.object) {
            ta_Entities.removeWireframeAndBoundingBox(
              scope.currentSelection.object
            );
            scope.currentSelection.multiselection.attach(
              scope.currentSelection.object
            );
            scope.currentSelection.object = null;
          }

          let arrayObjectsInSelection = [];

          arrayObjectsInSelection = arrayObjectsInSelection.concat(
            scope.currentSelection.multiselection.children
          );

          if (arrayObjectsInSelection.includes(objectToSelect)) {
            ta_Entities.removeWireframeAndBoundingBox(objectToSelect);

            arrayObjectsInSelection.splice(
              arrayObjectsInSelection.indexOf(objectToSelect),
              1
            );
          } else {
            arrayObjectsInSelection.push(objectToSelect);
          }

          scope.returnObjectsToScene();

          let centerPoints = [];

          arrayObjectsInSelection.forEach((element) => {
            centerPoints.push(element.position.clone());
          });

          let baryCenter = findBaryCenter(centerPoints).clone();

          scope.currentSelection.multiselection.position.set(
            baryCenter.x,
            baryCenter.y,
            baryCenter.z
          );

          for (let i = arrayObjectsInSelection.length - 1; i >= 0; i--) {
            scope.currentSelection.multiselection.attach(
              arrayObjectsInSelection[i]
            );

            arrayObjectsInSelection[i].add(
              ta_Entities.createBoundingBox(arrayObjectsInSelection[i])
            );
          }

          if (scope.transformControlsMode !== "") {
            scope.transformControls.setMode(scope.transformControlsMode);
            scope.transformControls.attach(
              scope.currentSelection.multiselection
            );
          }
        } else {
          scope.returnObjectsToScene();
          scope.resetMultyselection();

          if (scope.currentSelection.object) {
            ta_Entities.removeSelection(scope.currentSelection);
          }

          // if ( objectToSelect.name !== 'createMeshHelpers' ) {

          scope.currentSelection = ta_Entities.selectEntity(
            objectToSelect,
            scope.currentSelection
          );

          // }
          // else {

          // }

          if (scope.transformControlsMode !== "") {
            scope.transformControls.setMode(scope.transformControlsMode);

            // if ( objectToSelect.name !== 'createMeshHelpers' ) {
            scope.transformControls.attach(scope.currentSelection.object);
            // }
            // else{
            // scope.transformControls.attach( objectToSelect );
            // }
          }
        }
      } else {
        //при перемещении трансформконтролс тоже срабатывает. Обработать!
        //обработать так же если курсор надо объектом
        // console.log( "scope.transformControlsChanged = ", scope.transformControlsChanged);

        if (!scope.transformControlsChanged) {
          // console.log( "click emptiness");

          scope.returnObjectsToScene();
          scope.resetMultyselection();

          // ИЩИ ТУТ!!!
          if (!scope.ta_State.meshEditMode || scope.currentSelection.object) {
            // console.log(  scope.currentSelection.object )

            scope.transformControls.detach(scope.currentSelection.object);
            ta_Entities.removeSelection(scope.currentSelection);
            scope.ta_UI.elements.meshEditContainer.style.display = "none";
          }
        }
      }

      if (scope.currentSelection.object) {
        scope.ta_UI.createParametersMenu(scope.currentSelection.object);
        scope.ta_UI.elements.meshEditContainer.style.display = "inline";
      } else {
        scope.ta_UI.deleteParametersMenu();
      }

      if (scope.transformControlsChanged) {
        scope.transformControlsChanged = false;
      }
    }

    this.returnObjectsToScene = function () {
      if (scope.currentSelection.multiselection.children.length > 0) {
        let lengthArray = scope.currentSelection.multiselection.children.length;

        for (let i = lengthArray - 1; i >= 0; i--) {
          ta_Entities.removeWireframeAndBoundingBox(
            scope.currentSelection.multiselection.children[i]
          );

          scene.attach(scope.currentSelection.multiselection.children[i]);
        }

        scope.transformControls.detach(scope.currentSelection.multiselection);
      }
    };
    this.resetMultyselection = function () {
      scope.currentSelection.multiselection.children = [];
      scope.currentSelection.multiselection.position.set(0, 0, 0);
      scope.currentSelection.multiselection.scale.set(1, 1, 1);
      scope.currentSelection.multiselection.rotation.set(0, 0, 0);
    };

    function onTouchStart() {
      // console.log( event.changedTouches);
      // let screenPoint = getScreenPoint( event.touches[0] );
      // raycaster.setFromCamera( screenPoint, camera );
      // let intersects = raycaster.intersectObjects( sceneGrid.mainPlanesArray );
      // if ( event.target.id == "labelRenderer") {
      // coordsHelpers.removeCoordsHelpers( scene );
      // coordsHelpers.createCoordsHelpers( intersects, scene );
      // scope.transformControls.enableRotate = false;
    }
    function onTouchEnd() {
      // this.orbitControls.enableRotate = true;
    }
    function onTouchMove() {
      // event.preventDefault();
      // this.orbitControls.enableRotate = false;
      // console.log(event);
      //
      // let screenPoint = getScreenPoint( event.touches[0] );
      // raycaster.setFromCamera( screenPoint, camera );
      let intersects = raycaster.intersectObjects(sceneGrid.mainPlanesArray);
      // if ( event.target.id == "labelRenderer") {
      // coordsHelpers.removeCoordsHelpers( scene );
      // coordsHelpers.createCoordsHelpers( intersects, scene );
      intersectionsInfo(intersects);
      // if (creatingEntity.currentEntity) {
      // 	creatingEntity.createEntity( scope.mode, scene, event, sceneCamera );
      // 	this.ta_UI.updateParametersMenu( creatingEntity.currentEntity );
      // }
      // }
    }
    function onDocumentMouseMove(event) {
      event.stopPropagation();
      // event.preventDefault();

      let screenPoint = getScreenPoint(event);

      scope.mousePosition.x = screenPoint.x;
      scope.mousePosition.y = screenPoint.y;

      raycaster.setFromCamera(screenPoint, camera);
      let intersects = raycaster.intersectObjects(sceneGrid.mainPlanesArray);
      // if ( event.target.id == "labelRenderer") {
      // coordsHelpers.removeCoordsHelpers(scene);
      // coordsHelpers.createCoordsHelpers(intersects, scene);
      intersectionsInfo(intersects);

      if (creatingEntity.currentEntity) {
        creatingEntity.createEntity(scope.mode, scene, event, sceneCamera);
        scope.ta_UI.updateParametersMenu(creatingEntity.currentEntity);
      }

      if (
        scope.ta_State.appMode?.meshEdit &&
        scope.meshEditObject.mode === "Faces"
      ) {
        if (scope.meshEditObject.faceHighlighting) {
          let intersectsObjects = raycaster.intersectObjects([
            scope.meshEditObject.mesh,
          ]);

          scope.meshEditObject.highlightFace(intersectsObjects);
        }
      }
    }

    function getScreenPoint(event) {
      //
      const screenPoint = new Vector2();
      return screenPoint.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
    }

    function intersectionsInfo(intersects) {
      if (intersects.length > 0) {
        let objectName = intersects[0].object.name;
        let x = intersects[0].point.x;
        let y = intersects[0].point.y;
        let z = intersects[0].point.z;
        infoDiv.innerHTML =
          objectName +
          ":<br> x=" +
          Math.round(x * 100) / 100 +
          "; y=" +
          Math.round(y * 100) / 100 +
          "; z=" +
          Math.round(z * 100) / 100;
      } else {
        infoDiv.innerHTML = "";
      }
    }
    // function onDocumentMouseDown() {}
    function onDocMouseClick(event) {
      // console.log('onDocumentMouseUp');

      if (event.target.id !== "labelRenderer") return;
      if (scope.ta_State.appMode.meshEdit) return;

      // event.stopPropagation();

      if (scope.orbitControlsChanged) {
        scope.orbitControlsChanged = false;

        return;
      }

      if (scope.mode.action === "select") {
        if (!scope.transformControlsChanged) {
          selectByMouse(event);
        }
      }
      scope.transformControlsChanged = false;

      // let screenPoint = getScreenPoint(event);
    }
    function onKeyDown(event) {
      // console.log( event.keyCode );
      switch (event.keyCode) {
        case 27: {
          // Esc
          if (creatingEntity.currentEntity) {
            scope.selectableObjects.push(creatingEntity.currentEntity);
            creatingEntity.stopCreating(scope.selectableObjects);
          }

          let addToSceneForm = document.getElementById("addToSceneButtons");
          addToSceneForm.reset();
          let finishButton = document.getElementById("Finish");
          finishButton.style.display = "none";
          scope.mode = {
            action: "select",
            entity: null,
          };

          break;
        }
        case 46: {
          //Delete
          if (scope.currentSelection.object) {
            scope.transformControlsMode = "";
            scope.transformControls.detach(scope.currentSelection.object);

            scene.remove(scope.currentSelection.object);
            scope.currentSelection.object = null;
          }

          if (scope.currentSelection.multiselection.children.length > 0) {
            scope.transformControls.detach(
              scope.currentSelection.multiselection
            );

            let lengthArray =
              scope.currentSelection.multiselection.children.length;

            for (let i = lengthArray - 1; i >= 0; i--) {
              scope.currentSelection.multiselection.remove(
                scope.currentSelection.multiselection.children[i]
              );
            }

            scope.resetMultyselection();
          }

          break;
        }

        case 67: //'c' copy object
          ta_Entities.cloneObject(scope);

          break;

        case 77: {
          //'m' move object or group
          Actions.switchOnMoveMode(scope);
          let moveButton = document.getElementById("Move");
          moveButton.checked = true;

          break;
        }

        case 82: {
          //'r' rotate object or group
          Actions.switchOnRotationMode(scope);
          let rotateButton = document.getElementById("Rotate");
          rotateButton.checked = true;

          break;
        }

        case 83: {
          //'s' scale object or group
          Actions.switchOnScaleMode(scope);
          let scaleButton = document.getElementById("Scale");
          scaleButton.checked = true;

          break;
        }

        case 68: {
          //'d' drag object or group
          let dragButton = document.getElementById("dragCheck");
          dragButton.checked = dragButton.checked ? false : true;

          if (creatingEntity.currentEntity) {
            scope.selectableObjects.push(creatingEntity.currentEntity);
            creatingEntity.stopCreating(scope.selectableObjects);
          }

          Actions.switchDragMode(dragButton.checked, scope);

          break;
        }
      }
    }

    this.events.onEvent("matcapChanged", matcapChanging);

    function matcapChanging(img) {
      if (!scope.currentSelection.object) return;
      // console.log(img);

      // let material = scope.currentSelection.object.material;
      scope.currentSelection.object.material.dispose();
      scope.currentSelection.object.material = new MeshMatcapMaterial();
      let texture = new TextureLoader().load(
        "_Resources/Matcabs/Test/" + img,
        // + img[0].replace("-64px","-256px"),
        function () {
          // console.log('loaded');
        }
      );

      // texture.encoding = sRGBEncoding;
      scope.currentSelection.object.material.matcap = texture;
      // scope.currentSelection.object.material.matcap.needsUpdate = true;
      // scope.currentSelection.object.material.needsUpdate = true;

      // material.matcap.encoding = THREE.sRGBEncoding; // assume it is sRGB
      // material.needsUpdate = true;
      //  console.log(scope.currentSelection.object.material)
    }

    let animate = function () {
      requestAnimationFrame(animate);
      scene.updateMatrixWorld();
      render();
    };

    function render() {
      renderer.render(scene, camera);
      renderer2.render(scene, camera2);
      labelRenderer.render(scene, camera);
    }
    this.camera = camera;
    this.scene = scene;
    this.animate = animate;
    animate();
  }

  clearScene() {
    let ta_Entities = new TA_Entities();

    if (this.currentSelection.object) {
      this.transformControls.detach(this.currentSelection.object);
      ta_Entities.removeSelection(this.currentSelection);
    }
    this.returnObjectsToScene();
    this.resetMultyselection();

    let children = this.scene.children;

    let elementsToRemove = [];

    children.forEach((element) => {
      if (element.userData.createdByUser) {
        elementsToRemove.push(element);

        this.selectableObjects.splice(this.selectableObjects.indexOf(element));
      }
    });

    this.scene.remove(...elementsToRemove);
  }

  // setUI( ta_UI ) {

  // 	this.ta_UI = ta_UI;

  // }
}

export { TA_Scene };
