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
	 Vector2
	} from "../node_modules/three/build/three.module.js";

import { CSS2DRenderer } from "../node_modules/three/examples/jsm/renderers/CSS2DRenderer.js";
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js";
import { TransformControls } from '../node_modules/three/examples/jsm/controls/TransformControls.js';
import { DragControls } from '../node_modules/three/examples/jsm/controls/DragControls.js';

import {TA_Entities} from "./Entities/TA_Entities.js";
import {TA_SceneLights} from "./TA_SceneLights.js";
import {TA_Helpers} from "./TA_Helpers.js";
import {TA_SceneCamera} from "./TA_SceneCamera.js";
import * as Actions from "./Actions.js";

class TA_Scene {
	constructor( taUI ) {

		this.taUI = taUI;
		this.scene;
	}

	get getScene() {

		return this.scene;

	}

	createScene(){
		let scene = new Scene();
		let renderer = new WebGLRenderer({ antialias: true });
		let renderer2 = new WebGLRenderer();
		const raycaster = new Raycaster();

		let sceneCamera = new TA_SceneCamera();
		let sceneCamera2 = new TA_SceneCamera();
		
		let labelRenderer = new CSS2DRenderer();
		let taEntities = new TA_Entities();
		let creatingEntity = new taEntities.CreatingEntity();
		
		const sceneLights = new TA_SceneLights();
		let camera = sceneCamera.initCamera();
		let camera2 = sceneCamera2.initCamera();
		camera2 = new PerspectiveCamera(50, document.getElementById('secondCanvas').clientWidth / document.getElementById('secondCanvas').clientHeight, 0.01, 10000);
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

		this.currentSelection = {
			object: null,
			objectOwnColor: null,
			multiselection: new Group()
		};
		scene.add( this.currentSelection.multiselection );

		this.transformControlsMode = '';
		// let objectOwnColor;
		scene.background = new Color('white');
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer2.setSize(document.getElementById('secondCanvas').clientWidth, document.getElementById('secondCanvas').clientHeight);
		labelRenderer.setSize(window.innerWidth, window.innerHeight);
		labelRenderer.domElement.style.position = 'absolute';
		labelRenderer.domElement.style.top = 0;
		labelRenderer.domElement.id = 'labelRenderer';

		sceneLights.initAll(scene);
		sceneGrid.initBigGrid(scene);
		// sceneGrid.initSmallGrid(scene);

		document.body.appendChild(renderer.domElement);
		document.getElementById('secondCanvas').appendChild(renderer2.domElement);
		document.body.appendChild(labelRenderer.domElement);
		this.controls = new OrbitControls(camera, labelRenderer.domElement);
		this.transformControls = new TransformControls( camera, labelRenderer.domElement );
		scene.add( this.transformControls );
		this.transformControls.addEventListener( 'change', render );

		this.transformControls.addEventListener( 'objectChange', function( event ) {

			// console.log(event.target.worldPositionStart)
			// console.log(event.target.worldPosition)
			if (event.target.object.type === 'Group') {

				return;

			}

			// СДЕЛАТЬ ОБНОВЛЕНИЕ ПОЛЕЙ ПАРАМЕТРОВ

			if( event.target.mode === 'translate' ){

				if (event.target.worldPositionStart.x !== event.target.worldPosition.x ){

					// document.getElementById('position_x').value = event.target.object.position.x;

				}

				if (event.target.worldPositionStart.y !== event.target.worldPosition.y ){

					// document.getElementById('position_y').value = event.target.object.position.y;

				}

				if (event.target.worldPositionStart.z !== event.target.worldPosition.z ){

					// document.getElementById('position_z').value = event.target.object.position.z;

				}

			}

		})

		this.transformControls.addEventListener( 'dragging-changed', function ( event ) {

			scope.controls.enabled = !event.value;

		} );

		this.dragControls = new DragControls( this.selectableObjects, camera, labelRenderer.domElement );
		this.dragControls.deactivate();
		// this.dragControls.addEventListener( 'drag', render );

		this.dragControls.addEventListener( 'drag', function ( event ) {

			// scope.taUI.createParametersMenu( event.object );
			// scope.transformControls.detach( scope.currentSelection.multiselection );

			scope.controls.enableRotate = false;
		
		} );
		this.dragControls.addEventListener( 'dragend', function ( event ) {

			scope.controls.enableRotate = true;
		
		} );

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

		// ----------TEST-----------------

		// let testCylinder = taEntities.createCylinder(0,0,0,0.2,0.2,30,10,1);
		// testCylinder.material.color = new Color('red');
		// testCylinder.name = 'testCylinder';
		// scene.add( testCylinder );


		// //-------------------------------

		function onDocumentMouseClick( event ) {

			if (event.target.parentElement.id === "secondCanvas") {

				resizeSecondCanvas();

				return;

			}

			if ( event.target.className === "labelDiv" ) {

				let screenPoint = getScreenPoint(event);

				raycaster.setFromCamera(screenPoint, camera);
	
				let intersects = raycaster.intersectObjects( sceneGrid.mainPlanesArray );

				if ( scope.mode.action === 'creationEntity' ) {

					scope.returnObjectsToScene();
					scope.resetMultyselection();

					if ( creatingEntity.centerOfObjectWorld ) {

						taEntities.selectEntity(creatingEntity.currentEntity, scope.currentSelection);

						if ( creatingEntity.currentEntity ) {

							scope.selectableObjects.push( creatingEntity.currentEntity );

						}

						creatingEntity.stopCreating();

						if ( scope.transformControlsMode !== '' ) {

							scope.transformControls.setMode( scope.transformControlsMode );
							scope.transformControls.attach( scope.currentSelection.object );
	
						}

						return;

					}
					if ( scope.currentSelection.object ) {

						taEntities.removeSelection(scope.currentSelection);
						scope.currentSelection.object = null;
						scope.currentSelection.objectOwnColor = null;

					}

					creatingEntity.centerOfObjectWorld = intersects[0].point;
					creatingEntity.createEntity(scope.mode, scene, event, sceneCamera);
					scope.taUI.createParametersMenu(creatingEntity.currentEntity);

				}

				if ( scope.mode.action === 'select' ) {

					selectByMouse ( event );

				}

			}

		}

		function selectByMouse ( event ) {

			let screenPoint = getScreenPoint(event);

			raycaster.setFromCamera(screenPoint, camera);

			let intersects = raycaster.intersectObjects( scope.selectableObjects );

			if ( intersects.length > 0 ) {

				let objectToSelect = intersects[0].object;

				if ( event.ctrlKey ){

					if ( scope.currentSelection.object ) {

						taEntities.removeWireframeAndBoundingBox( scope.currentSelection.object );
						scope.currentSelection.multiselection.attach( scope.currentSelection.object );
						scope.currentSelection.object = null;

					}

					let arrayObjectsInSelection = [];

					arrayObjectsInSelection = arrayObjectsInSelection.concat( scope.currentSelection.multiselection.children );

					if ( arrayObjectsInSelection.includes( objectToSelect )) {

						taEntities.removeWireframeAndBoundingBox( objectToSelect );

						arrayObjectsInSelection.splice( arrayObjectsInSelection.indexOf( objectToSelect), 1 );

					}
					else {

						arrayObjectsInSelection.push( objectToSelect );

					}

					scope.returnObjectsToScene();

					let centerPoints = [];

					arrayObjectsInSelection.forEach( element => {

							centerPoints.push( element.position.clone() )

						}

					)

					let baryCenter = findBaryCenter( centerPoints ).clone();

					scope.currentSelection.multiselection.position.set( baryCenter.x, baryCenter.y, baryCenter.z);

					for (let i = arrayObjectsInSelection.length - 1; i >= 0; i--) {

						scope.currentSelection.multiselection.attach( arrayObjectsInSelection[i] );


						arrayObjectsInSelection[i].add( taEntities.createBoundingBox( arrayObjectsInSelection[i] ) );
		
					}

					if ( scope.transformControlsMode !== '' ) {

						scope.transformControls.setMode( scope.transformControlsMode );
						scope.transformControls.attach( scope.currentSelection.multiselection );

					}

				}
				else{

					scope.returnObjectsToScene();
					scope.resetMultyselection();

				if ( scope.currentSelection.object ) {

					taEntities.removeSelection( scope.currentSelection );

				}
				
				scope.currentSelection = taEntities.selectEntity( objectToSelect, scope.currentSelection );
			
				if ( scope.transformControlsMode !== '' ) {

					scope.transformControls.setMode( scope.transformControlsMode );
					scope.transformControls.attach( scope.currentSelection.object );

				}
			}
			}
			else {

				scope.returnObjectsToScene();
				scope.resetMultyselection();

				if ( scope.currentSelection.object ) {

					scope.transformControls.detach(scope.currentSelection.object);
					taEntities.removeSelection(scope.currentSelection);

				}
			}

			if (scope.currentSelection.object) {
				scope.taUI.createParametersMenu(scope.currentSelection.object);
			}
			else {
				scope.taUI.deleteParametersMenu();
			}

		}

		this.returnObjectsToScene = function(){
			if (scope.currentSelection.multiselection.children.length > 0 ){

				let lengthArray = scope.currentSelection.multiselection.children.length;

				for (let i = lengthArray - 1; i >= 0; i--) {

					taEntities.removeWireframeAndBoundingBox( scope.currentSelection.multiselection.children[i] );

					scene.attach( scope.currentSelection.multiselection.children[i] )

				}

			}
			scope.transformControls.detach( scope.currentSelection.multiselection )
		}
		this.resetMultyselection = function() {

			scope.currentSelection.multiselection.children = [];
			scope.currentSelection.multiselection.position.set( 0, 0, 0);
			scope.currentSelection.multiselection.scale.set( 1, 1, 1);
			scope.currentSelection.multiselection.rotation.set( 0, 0, 0);

		}

		function findBaryCenter( points) {

			if ( !Array.isArray( points) ) return null;

			let pointsCount = points.length;

			let resultVector = points.reduce( (sum, current) => sum.add(current) );
			let baryCenter = resultVector.divideScalar( pointsCount );

			return baryCenter;

		}

		function onTouchStart(event) {
			// console.log( event.changedTouches);
			// let screenPoint = getScreenPoint( event.touches[0] ); 
			// raycaster.setFromCamera( screenPoint, camera );
			// let intersects = raycaster.intersectObjects( sceneGrid.mainPlanesArray );
			// if ( event.target.id == "labelRenderer") {
			// coordsHelpers.removeCoordsHelpers( scene );
			// coordsHelpers.createCoordsHelpers( intersects, scene );
			// scope.transformControls.enableRotate = false;
		}
		function onTouchEnd(event) {
			// this.controls.enableRotate = true;
		}
		function onTouchMove(event) {
			// event.preventDefault();
			// this.controls.enableRotate = false;
			// console.log(event);
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
			const screenPoint = new Vector2();
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
			console.log( event.keyCode );
			switch (event.keyCode) {
				
				case 27: // Esc

					if (creatingEntity.currentEntity) {
						scope.selectableObjects.push(creatingEntity.currentEntity);
						creatingEntity.stopCreating(scope.selectableObjects);
					}
					scope.mode = {
						action: 'select',
						entity: null
					};
					
				break;

				case 46: //Delete

					if( scope.currentSelection.object ){

						scope.transformControlsMode = '';
						scope.transformControls.detach( scope.currentSelection.object );

						scene.remove( scope.currentSelection.object );
						scope.currentSelection.object = null;

					}

					if (scope.currentSelection.multiselection.children.length > 0 ) {

						scope.transformControls.detach( scope.currentSelection.multiselection )

							let lengthArray = scope.currentSelection.multiselection.children.length;
			
							for (let i = lengthArray - 1; i >= 0; i--) {
			
								scope.currentSelection.multiselection.remove( scope.currentSelection.multiselection.children[i] )
			
							}

						scope.resetMultyselection();
						
					}

				break;

				case 67:  //'c' copy object

					taEntities.cloneObject( scope );

				break;

				case 77: //'m' move object or group

				Actions.switchOnMoveMode( scope );
				 let moveButton = document.getElementById( 'MoveRadio' );
				 moveButton.checked = true;

				break;

				case 82: //'r' rotate object or group

				Actions.switchOnRotationMode ( scope );
				 let rotateButton = document.getElementById( 'RotateRadio' );
				 rotateButton.checked = true;

				break;

				case 83: //'s' scale object or group

				Actions.switchOnScaleMode ( scope );
				 let scaleButton = document.getElementById( 'ScaleRadio' );
				 scaleButton.checked = true;

				break;

				case 68: //'d' drag object or group

				 let dragButton = document.getElementById( 'DragCheck' );
				 dragButton.checked = dragButton.checked ? false: true;
				 Actions.switchOnDragMode ( dragButton.checked, scope );

				break;

			}
		}
		let animate = function () {

			requestAnimationFrame(animate);
			scene.updateMatrixWorld();
			render();
			
		};

		function render(){

			renderer.render(scene, camera);
			renderer2.render(scene, camera2);
			labelRenderer.render(scene, camera);

		}
		this.camera = camera;
		this.scene = scene;
		this.animate = animate;
		animate();
	}

	clearScene(){

		let taEntities = new TA_Entities();

		if (this.currentSelection.object) {

			this.transformControls.detach(this.currentSelection.object);
			taEntities.removeSelection(this.currentSelection);

		}
		this.returnObjectsToScene();
		this.resetMultyselection();

		let children = this.scene.children;

		let elementsToRemove = [];

		children.forEach( element => {

			if ( element.userData.createdByUser ) {

					elementsToRemove.push( element );

					this.selectableObjects.splice( this.selectableObjects.indexOf( element ));

			}

		});

		this.scene.remove( ...elementsToRemove );

	}

	// setUI( taUI ) {

	// 	this.taUI = taUI;

	// }
	
}

export {TA_Scene};
