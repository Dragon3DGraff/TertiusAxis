/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
*/

import * as THREE from "./build/three.module.js";
import {TA_SceneCamera} from "./TA_SceneCamera.js";
import {CSS2DRenderer} from "./jsm/renderers/CSS2DRenderer.js";
import {OrbitControls} from "./jsm/controls/OrbitControls.js";
import {TA_Entities} from "./Entities/TA_Entities.js";
import {TA_SceneLights} from "./TA_SceneLights.js";
import {TA_Helpers} from "./TA_Helpers.js";

class TA_Scene {
	constructor( taUI ) {
		this.taUI = taUI;
		this.scene;
	}

	get getScene() {

		return this.scene;

	}

	createScene(){
		let scene = new THREE.Scene();
		let sceneCamera = new TA_SceneCamera();
		let sceneCamera2 = new TA_SceneCamera();
		let renderer = new THREE.WebGLRenderer({ antialias: true });
		let renderer2 = new THREE.WebGLRenderer();
		let labelRenderer = new CSS2DRenderer();
		let taEntities = new TA_Entities();
		let creatingEntity = new taEntities.CreatingEntity();
		const raycaster = new THREE.Raycaster();
		const sceneLights = new TA_SceneLights();
		let camera = sceneCamera.initCamera();
		let camera2 = sceneCamera2.initCamera();
		camera2 = new THREE.PerspectiveCamera(50, document.getElementById('secondCanvas').clientWidth / document.getElementById('secondCanvas').clientHeight, 0.01, 10000);
		camera2.position.z = 0;
		camera2.position.y = 4.6;
		camera2.position.x = 0;
		camera2.lookAt(0, 0, 0);
		const ta_sHelpers = new TA_Helpers();
		const coordsHelpers = new ta_sHelpers.coordsHelpers();
		const sceneGrid = new ta_sHelpers.SceneGrids(scene);
		this.mode = {
			action: 'select',
			entity: null
		};
		this.selectableObjects = [];
		this.selectedObject = {
			object: null,
			objectOwnColor: null
		};
		// let objectOwnColor;
		scene.background = new THREE.Color('white');
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer2.setSize(document.getElementById('secondCanvas').clientWidth, document.getElementById('secondCanvas').clientHeight);
		labelRenderer.setSize(window.innerWidth, window.innerHeight);
		labelRenderer.domElement.style.position = 'absolute';
		labelRenderer.domElement.style.top = 0;
		labelRenderer.domElement.id = 'labelRenderer';
		sceneLights.initAll(scene);
		sceneGrid.initBigGrid(scene);
		document.body.appendChild(renderer.domElement);
		document.getElementById('secondCanvas').appendChild(renderer2.domElement);
		document.body.appendChild(labelRenderer.domElement);
		const controls = new OrbitControls(camera, labelRenderer.domElement);
		//===============TESTING============
		// let testCube = taEntities.createBox( 0, 0, 0, 0.5, 0.5, 0.5 );
		// testCube.name = 'testCube'
		// scene.add(testCube);
		//=============================
		const infoDiv = document.getElementById("infoParagraph");
		window.addEventListener('resize', onWindowResize, false);
		document.addEventListener('click', onDocumentMouseClick, false);
		document.addEventListener('mousemove', onDocumentMouseMove, false);
		document.addEventListener('mousedown', onDocumentMouseDown, false);
		document.addEventListener('mouseup', onDocumentMouseUp, false);
		document.addEventListener('keydown', onKeyDown, false);
		document.addEventListener('touchstart', onTouchStart, false);
		document.addEventListener('touchend', onTouchEnd, false);
		document.addEventListener('touchmove', onTouchMove, false);
		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			camera2.aspect = document.getElementById('secondCanvas').clientWidth / document.getElementById('secondCanvas').clientHeight;
			camera2.updateProjectionMatrix();
			renderer2.setSize(document.getElementById('secondCanvas').clientWidth, document.getElementById('secondCanvas').clientHeight);
			renderer.setSize(window.innerWidth, window.innerHeight);
			labelRenderer.setSize(window.innerWidth, window.innerHeight);
		}
		let scope = this;
		function updateSmallWindow() {
			let secondCanvasWidth = document.getElementById('secondCanvas').clientWidth;
			let secondCanvasHeight = document.getElementById('secondCanvas').clientHeight;
			camera2.aspect = secondCanvasWidth / secondCanvasHeight;
			camera2.updateProjectionMatrix();
			renderer2.setSize(secondCanvasWidth, secondCanvasHeight);
		}
		function resizeSecondCanvas() {
			let secondCanvas = document.getElementById('secondCanvas');
			if (secondCanvas.style.width === '200px') {
				let width = window.innerWidth + 'px';
				let height = window.innerHeight + 'px';
				secondCanvas.style.width = width;
				secondCanvas.style.height = height;
				secondCanvas.style.left = '0px';
				secondCanvas.style.top = '0px';
				secondCanvas.style.width = width;
				secondCanvas.style.height = height;
				updateSmallWindow();
			}
			else {
				let size = '200px';
				secondCanvas.style.left = '';
				secondCanvas.style.right = '30px';
				secondCanvas.style.top = '30px';
				secondCanvas.style.width = size;
				secondCanvas.style.height = size;
				secondCanvas.style.width = size;
				secondCanvas.style.height = size;
				updateSmallWindow();
			}
		}
		function onDocumentMouseClick(event) {
			if (event.target.parentElement.id === "secondCanvas") {
				resizeSecondCanvas();
				return;
			}
			let screenPoint = getScreenPoint(event);
			raycaster.setFromCamera(screenPoint, camera);
			let intersects = raycaster.intersectObjects(sceneGrid.mainPlanesArray);
			if (event.target.className === "labelDiv") {
				if (scope.mode.action === 'creationEntity') {
					if (creatingEntity.centerOfObjectWorld) {
						taEntities.selectEntity(creatingEntity.currentEntity, scope.selectedObject);
						if (creatingEntity.currentEntity) {
							scope.selectableObjects.push(creatingEntity.currentEntity);
						}
						creatingEntity.stopCreating();
						return;
					}
					if (scope.selectedObject.object) {
						taEntities.removeSelection(scope.selectedObject);
					}
					creatingEntity.centerOfObjectWorld = intersects[0].point;
					creatingEntity.createEntity(scope.mode, scene, event, sceneCamera);
					scope.taUI.createParametersMenu(creatingEntity.currentEntity);
				}
				if (scope.mode.action === 'select') {
					let intersects = raycaster.intersectObjects(scope.selectableObjects);
					if (intersects.length > 0) {
						if (scope.selectedObject.object) {
							taEntities.removeSelection(scope.selectedObject);
						}
						let objectToSelect = intersects[0].object;
						scope.selectedObject = taEntities.selectEntity(objectToSelect, scope.selectedObject);
					}
					else {
						if (scope.selectedObject.object) {
							taEntities.removeSelection(scope.selectedObject);
						}
					}
					if (scope.selectedObject.object) {
						scope.taUI.createParametersMenu(scope.selectedObject.object);
					}
					else {
						scope.taUI.deleteParametersMenu();
					}
					// let intersects = raycaster.intersectObjects( scope.selectableObjects );
					// selectedObject = taEntities.selectEntity( intersects, selectedObject );
					// console.log (selectedObject);
				}
			}
		}
		function onTouchStart(event) {
			// console.log( event.changedTouches);
			// let screenPoint = getScreenPoint( event.touches[0] ); 
			// raycaster.setFromCamera( screenPoint, camera );
			// let intersects = raycaster.intersectObjects( sceneGrid.mainPlanesArray );
			// if ( event.target.id == "labelRenderer") {
			// coordsHelpers.removeCoordsHelpers( scene );
			// coordsHelpers.createCoordsHelpers( intersects, scene );
			controls.enableRotate = false;
		}
		function onTouchEnd(event) {
			// controls.enableRotate = true;
		}
		function onTouchMove(event) {
			// event.preventDefault();
			controls.enableRotate = false;
			console.log(event);
			// 
			// let screenPoint = getScreenPoint( event.touches[0] ); 
			// raycaster.setFromCamera( screenPoint, camera );
			// let intersects = raycaster.intersectObjects( sceneGrid.mainPlanesArray );
			// if ( event.target.id == "labelRenderer") {
			// coordsHelpers.removeCoordsHelpers( scene );
			// coordsHelpers.createCoordsHelpers( intersects, scene );
			// intersectionsInfo( intersects );
			// if (creatingEntity.currentEntity) {
			// 	creatingEntity.createEntity( scope.mode, scene, event, sceneCamera );
			// 	this.taUI.updateParametersMenu( creatingEntity.currentEntity );
			// }
			// }
		}
		function onDocumentMouseMove(event) {
			let screenPoint = getScreenPoint(event);
			raycaster.setFromCamera(screenPoint, camera);
			let intersects = raycaster.intersectObjects(sceneGrid.mainPlanesArray);
			// if ( event.target.id == "labelRenderer") {
			coordsHelpers.removeCoordsHelpers(scene);
			coordsHelpers.createCoordsHelpers(intersects, scene);
			intersectionsInfo(intersects);
			if (creatingEntity.currentEntity) {
				creatingEntity.createEntity(scope.mode, scene, event, sceneCamera);
				scope.taUI.updateParametersMenu(creatingEntity.currentEntity);
			}
			// }
		}
		function getScreenPoint(event) {
			// event.preventDefault();
			const screenPoint = new THREE.Vector2();
			return screenPoint.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
		}
		function intersectionsInfo(intersects) {
			if (intersects.length > 0) {
				let objectName = intersects[0].object.name;
				let x = intersects[0].point.x;
				let y = intersects[0].point.y;
				let z = intersects[0].point.z;
				infoDiv.innerHTML = objectName +
					":<br> x=" + Math.round(x * 100) / 100 +
					"; y=" + Math.round(y * 100) / 100 +
					"; z=" + Math.round(z * 100) / 100;
			}
			else {
				infoDiv.innerHTML = "";
			}
		}
		function onDocumentMouseDown() {
			let screenPoint = getScreenPoint(event);
		}
		function onDocumentMouseUp() {
			let screenPoint = getScreenPoint(event);
		}
		function onKeyDown(event) {
			switch (event.key) {
				case 'Escape': // Esc

					if (creatingEntity.currentEntity) {
						scope.selectableObjects.push(creatingEntity.currentEntity);
						creatingEntity.stopCreating(scope.selectableObjects);
					}
					scope.mode = {
						action: 'select',
						entity: null
					};
					
					break;
			}
		}
		let animate = function () {

			requestAnimationFrame(animate);
			scene.updateMatrixWorld();
			renderer.render(scene, camera);
			renderer2.render(scene, camera2);
			labelRenderer.render(scene, camera);
		};
		this.camera = camera;
		this.scene = scene;
		this.animate = animate;
		animate();
	}

	// setUI( taUI ) {

	// 	this.taUI = taUI;

	// }
	
}

export {TA_Scene};
