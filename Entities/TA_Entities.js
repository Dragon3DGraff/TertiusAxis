/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import * as THREE from "../THREEJS/build/three.module.js";
import {CSS2DObject} from '../THREEJS/Add/jsm/renderers/CSS2DRenderer.js';
import { TA_UI } from "../UI/TA_UI.js";


class TA_Entities {

	constructor() {

		let GLOBALSCOPE = this;

		this.createGeometry = function( geometryType, params ){

			let geometry = new THREE[ geometryType ]();

			this.checkParams( params, geometry.parameters );

			let paramsArray = Object.values( params );

			geometry = new THREE[ geometryType ]( ...paramsArray );

			 return geometry;

		}

		this.checkParams = function( paramsToCheck, paramsTemplate ) {

			if ( !(paramsToCheck instanceof Object) ) {
	
				console.error( 'paramsToCheck must be an object. Now params are ' + typeof params );
				return;
	
			}
	
			if ( !(paramsTemplate instanceof Object) ) {
	
				console.error( 'paramsTamplate must be an object. Now params are ' + typeof params );
				return;
	
			}
	
			let data = {};
			Object.assign( data, paramsTemplate );
	
			for (const key in data) {
	
				if ( !paramsToCheck.hasOwnProperty(key) ) {
	
					console.warn( 'Parameter "' + key + '" is missing ' );
	
				}
				else {
	
					if ( paramsToCheck[ key ] === undefined && paramsToCheck[ key ] === '' ) {
	
						console.warn ( '"' + key + '" not set');
	
					}
	
				}
	
			}
	
		}

		this.createBox = function ( x, y, z, width, height, depth, material ) {

			let params = {

				width: width,
				height: height,
				depth: depth,
				widthSegments: 1,
				heightSegments: 1,
				depthSegments: 1
				
			};

			let geometry = this.createGeometry('BoxBufferGeometry', params);

			if ( !geometry ) {

				console.error ( "Invalid geometry. Object not created" );

			}

			var box = new THREE.Mesh(geometry, material);

			box.position.x = x;
			box.position.y = y;
			box.position.z = z;

			return box;

		};
		this.createSphere = function ( x, y, z, radius, segments, material ) {

			let params = {

				radius: radius,	
				widthSegments : segments,
				heightSegments : segments,
				phiStart : 0,
				phiLength : Math.PI * 2,
				thetaStart : 0,
				thetaLength : Math.PI

			};
			let geometry = this.createGeometry( 'SphereBufferGeometry', params );

			if ( !geometry ) {

				console.error ( "Invalid geometry. Object not created" );

			}

			let sphere = new THREE.Mesh( geometry, material );
			sphere.position.x = x;
			sphere.position.y = y;
			sphere.position.z = z;

			return sphere;

		};

		this.createCircle = function ( x, y, z, radius, segments, material ) {

			let params = {

				radius: radius,
				segments : segments,
				thetaStart : 0,
				thetaLength : 2*Math.PI

			};
			let geometry = this.createGeometry( 'CircleBufferGeometry', params );

			if ( !geometry ) {

				console.error ( "Invalid geometry. Object not created" );

			}

			let circle = new THREE.Mesh( geometry, material );
			circle.position.x = x;
			circle.position.y = y;
			circle.position.z = z;

			return circle;

		};

		this.createCone = function ( x, y, z, radius, height, radialSegments, heightSegments, material ) {

			let params = {

				radius: radius,
				height: height,
				radialSegments : radialSegments,
				heightSegments : heightSegments,
				openEnded: false,
				thetaStart : 0,
				thetaLength : 2*Math.PI

			};
			let geometry = this.createGeometry( 'ConeBufferGeometry', params );

			if ( !geometry ) {

				console.error ( "Invalid geometry. Object not created" );

			}

			let cone = new THREE.Mesh( geometry, material );
			cone.position.x = x;
			cone.position.y = y;
			cone.position.z = z;

			return cone;

		};

		this.createCylinder = function ( x, y, z, radiusTop, radiusBottom, height, radialSegments, heightSegments, material ) {

			let params = {

				radiusTop: radiusTop,
				radiusBottom: radiusBottom,
				height: height,
				radialSegments : radialSegments,
				heightSegments : heightSegments,
				openEnded: false,
				thetaStart : 0,
				thetaLength : 2*Math.PI

			};
			let geometry = this.createGeometry( 'CylinderBufferGeometry', params );

			if ( !geometry ) {

				console.error ( "Invalid geometry. Object not created" );

			}

			let cylinder = new THREE.Mesh( geometry, material );
			cylinder.position.x = x;
			cylinder.position.y = y;
			cylinder.position.z = z;

			return cylinder;

		};

		this.createDodecahedron = function ( x, y, z, radius, detail, material ) { 

			let params = {

				radius: radius,
				detail: detail

			};
			let geometry = this.createGeometry( 'DodecahedronBufferGeometry', params );

			if ( !geometry ) {

				console.error ( "Invalid geometry. Object not created" );

			}

			let dodecahedron = new THREE.Mesh( geometry, material );
			dodecahedron.position.x = x;
			dodecahedron.position.y = y;
			dodecahedron.position.z = z;

			return dodecahedron;

		};

		this.createIcosahedron = function ( x, y, z, radius, detail, material ) { 

			let params = {

				radius: radius,
				detail: detail

			};
			let geometry = this.createGeometry( 'IcosahedronBufferGeometry', params );

			if ( !geometry ) {

				console.error ( "Invalid geometry. Object not created" );

			}

			let icosahedron = new THREE.Mesh( geometry, material );
			icosahedron.position.x = x;
			icosahedron.position.y = y;
			icosahedron.position.z = z;

			return icosahedron;

		};

		this.createOctahedron = function ( x, y, z, radius, detail, material ) { 

			let params = {

				radius: radius,
				detail: detail

			};
			let geometry = this.createGeometry( 'OctahedronBufferGeometry', params );

			if ( !geometry ) {

				console.error ( "Invalid geometry. Object not created" );

			}

			let octahedron = new THREE.Mesh( geometry, material );
			octahedron.position.x = x;
			octahedron.position.y = y;
			octahedron.position.z = z;

			return octahedron;

		};

		this.createTorus = function ( x, y, z, radius, tube, radialSegments, tubularSegments , material ) {

			let params = {

				radius: radius,
				tube : tube ,
				radialSegments: radialSegments,
				tubularSegments: tubularSegments ,
				arc : 2*Math.PI

			};

			let geometry = this.createGeometry( 'TorusBufferGeometry', params );

			if ( !geometry ) {

				console.error ( "Invalid geometry. Object not created" );

			}

			let torus = new THREE.Mesh( geometry, material );
			torus.position.x = x;
			torus.position.y = y;
			torus.position.z = z;

			return torus;

		};

		this.createTetrahedron = function ( x, y, z, radius, detail, material ) { 

			let params = {

				radius: radius,
				detail: detail

			};

			let geometry = this.createGeometry( 'TetrahedronBufferGeometry', params );

			if ( !geometry ) {

				console.error ( "Invalid geometry. Object not created" );

			}

			let tetrahedron = new THREE.Mesh( geometry, material );
			tetrahedron.position.x = x;
			tetrahedron.position.y = y;
			tetrahedron.position.z = z;

			return tetrahedron;

		};


		/////////////////////////////

		this.createLine = function (x, y, z, x1, y1, z1, color, dashed) {
			let material;
			switch (dashed) {
				case 'dashed':
					material = new THREE.LineDashedMaterial({
						color: new THREE.Color(color),
						dashSize: 0.9,
						gapSize: 0.5
					});
					break;
				case 'solid':
					material = new THREE.LineBasicMaterial({
						color: new THREE.Color(color),
					});
				default:
					material = new THREE.LineBasicMaterial({
						color: new THREE.Color(color),
					});
					break;
			}
			const geometry = new THREE.Geometry();
			geometry.vertices.push(new THREE.Vector3(x, y, z));
			geometry.vertices.push(new THREE.Vector3(x1, y1, z1));
			const line = new THREE.Line(geometry, material);
			if (dashed === 'dashed') {
				line.computeLineDistances();
			}
			return line;
		};
		this.createLabel = function (x, y, z, text) {
			let labelDiv = document.createElement('div');
			labelDiv.className = 'labelDiv';
			labelDiv.textContent = text;
			labelDiv.style.marginTop = '-1em';
			let labelobject = new CSS2DObject(labelDiv);
			labelobject.position.set(x, y, z);
			return labelobject;
		};
		this.createPlane = function (height, width) {
			let planeGeom = new THREE.PlaneBufferGeometry(width, height);
			let planeMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('lightgrey'), transparent: false, opacity: 1, side: THREE.DoubleSide });
			let plane = new THREE.Mesh(planeGeom, planeMaterial);
			return plane;
		};

		this.selectEntity = function (objectToSelect, currentSelection) {
			// currentSelection.objectOwnColor = objectToSelect.material.color;
			// objectToSelect.material.color = new THREE.Color('tomato');
			currentSelection.object = objectToSelect;
			currentSelection.object.add(this.createWireframe(currentSelection));
			currentSelection.object.add(this.createBoundingBox(currentSelection));
			let taUI = new TA_UI;
			taUI.createParametersMenu(objectToSelect);

			return currentSelection;
		};
		this.createWireframe = function ( currentSelection ) {
			let wireframe = new THREE.EdgesGeometry(currentSelection.object.geometry);
			let wireframeLines = new THREE.LineSegments(wireframe);
			wireframeLines.material.depthTest = true;
			// wireframeLines.material.opacity = 0.25;
			// wireframeLines.material.transparent = true;
			wireframeLines.material.color = new THREE.Color('white');
			wireframeLines.name = 'wireframe';
			wireframeLines.scale.set(1.01, 1.01, 1.01);
			return wireframeLines;
		};
		this.createBoundingBox = function ( currentSelection ) {
			currentSelection.object.geometry.computeBoundingBox();
			let box = new THREE.Box3Helper(currentSelection.object.geometry.boundingBox, new THREE.Color('red'));
			box.name = 'BoundingBox';

			if ( box.box.min.z === 0) {

				box.box.min.z = -0.001;
				box.box.max.z = 0.001;

			}

			return box;

		};

		this.removeSelection = function (currentSelection) {
			let wireframeScene = currentSelection.object.children.filter(item => item.name === "wireframe" || item.name === "BoundingBox");
			wireframeScene.forEach(element => {
				currentSelection.object.remove(element);
			});
			// currentSelection.object.material.color = currentSelection.objectOwnColor;
			currentSelection.object = null;
			currentSelection.objectOwnColor = null;
		};

		this.updateSelectedObject = function( parameterName, parameterValue, entity ) {

			let geom = entity.geometry;
	
					let params = {};
					Object.assign( params, geom.parameters );
					params[ parameterName ] = parameterValue;
	
					let newGeom = this.createGeometry ( entity.geometry.type, params );
	
					entity.geometry.dispose();
					entity.geometry = newGeom;
	
					let wireframe = entity.getObjectByName( 'wireframe' );
					let newWireframeGeometry = new THREE.WireframeGeometry( newGeom );
					wireframe.geometry = newWireframeGeometry;
	
					let boundingBox = entity.getObjectByName( 'BoundingBox' );
					entity.geometry.computeBoundingBox();
					let box3Helper = new THREE.Box3Helper( entity.geometry.boundingBox );

					if ( box3Helper.box.min.z === 0) {

						box3Helper.box.min.z = -0.001;
						box3Helper.box.max.z = 0.001;

					}

					boundingBox.box = box3Helper.box;
	
		}



		this.updateObject = function( parameterName, parameterValue, entity ) {

			let geom = entity.geometry;
	
					let params = {};
					Object.assign( params, geom.parameters );
					params[ parameterName ] = parameterValue;
	
					let newGeom = this.createGeometry ( entity.geometry.type, params );
	
					entity.geometry.dispose();
					entity.geometry = newGeom;

		}

		this.randomColor = function(){

			let randomColor = new THREE.Color( Math.random(), Math.random(), Math.random() );

			return randomColor;

		}

		
		this.CreatingEntity = function () {

			let scope = this;
			this.centerOfObjectWorld = null;
			this.centerOfObjectScreen = null;
			this.currentEntity = null;
			let material;
			
			this.createEntity = function (mode, scene, event, sceneCamera) {
				scope.centerOfObjectScreen = new THREE.Vector2(event.x, event.y);
				let x = this.centerOfObjectWorld.x;
				let y = this.centerOfObjectWorld.y;
				let z = this.centerOfObjectWorld.z;
				let width;
				if (scope.currentEntity) {

					let pos = scope.currentEntity.position.clone().project(sceneCamera.camera);
					scope.centerOfObjectScreen.x = (pos.x * window.innerWidth / 2) + window.innerWidth / 2;
					scope.centerOfObjectScreen.y = -(pos.y * window.innerHeight / 2) + window.innerHeight / 2;
					let worldSizeOfScreen = sceneCamera.getWorldSizeOfScreen(sceneCamera.camera, scope.currentEntity.position);
					let ratio = (1000000000 * window.innerHeight) / (1000000000 * worldSizeOfScreen.height);

					let currentCoordsScreen = new THREE.Vector2(event.x, event.y);
					let distance = currentCoordsScreen.distanceTo(scope.centerOfObjectScreen);
					width = 1.00 * distance / ratio;

				}
				else {

					width = 0.01;
				}

				material = new THREE.MeshPhongMaterial( { color: GLOBALSCOPE.randomColor() } );

				switch (mode.entity) {

					case 'BoxBufferGeometry':

						if (this.currentEntity !== null ) {

							GLOBALSCOPE.updateObject( 'width', width, this.currentEntity);
							GLOBALSCOPE.updateObject( 'height', width, this.currentEntity);
							GLOBALSCOPE.updateObject( 'depth', width, this.currentEntity);

						}
						else{

							this.currentEntity = GLOBALSCOPE.createBox(x, y, z, width, width, width, material );
							this.currentEntity.name = "CUBE";

							scene.add( this.currentEntity );

						}

						break;

						case 'SphereBufferGeometry':

							if (this.currentEntity !== null ) {

								GLOBALSCOPE.updateObject( 'radius', width, this.currentEntity);

							}
							else{

								this.currentEntity = GLOBALSCOPE.createSphere(x, y, z, width, 12, material );

								this.currentEntity.name = "SPHERE";

								scene.add( this.currentEntity );

							}

						break;

						case 'CircleBufferGeometry':

							if (this.currentEntity !== null ) {
	
								GLOBALSCOPE.updateObject( 'radius', width, this.currentEntity);
	
							}
							else{
	
								this.currentEntity = GLOBALSCOPE.createCircle(x, y, z, width, 12, material );
	
								this.currentEntity.name = "Circle";

								scene.add( this.currentEntity );
	
							}
	
						break;

						case 'ConeBufferGeometry':

							if (this.currentEntity !== null ) {
	
								GLOBALSCOPE.updateObject( 'radius', width, this.currentEntity);
								GLOBALSCOPE.updateObject( 'height', width * 2, this.currentEntity);
	
							}
							else{

								this.currentEntity = GLOBALSCOPE.createCone(x, y, z, width, width * 2, 8, 1, material );
	
								this.currentEntity.name = "Cone";

								scene.add( this.currentEntity );
	
							}
	
						break;

						case 'CylinderBufferGeometry':

							if (this.currentEntity !== null ) {
	
								GLOBALSCOPE.updateObject( 'radiusTop', width, this.currentEntity);
								GLOBALSCOPE.updateObject( 'radiusBottom', width, this.currentEntity);
								GLOBALSCOPE.updateObject( 'height', width * 2, this.currentEntity);
	
							}
							else{

								this.currentEntity = GLOBALSCOPE.createCylinder( x, y, z, width, width, width * 2, 8, 1, material );
	
								this.currentEntity.name = "Cylinder";

								scene.add( this.currentEntity );
	
							}
	
						break;

						case 'DodecahedronBufferGeometry':

							if (this.currentEntity !== null ) {
	
								GLOBALSCOPE.updateObject( 'radius', width, this.currentEntity);
	
							}
							else{

								this.currentEntity = GLOBALSCOPE.createDodecahedron( x, y, z, width, 0, material );
	
								this.currentEntity.name = "Dodecahedron";

								scene.add( this.currentEntity );
	
							}
	
						break;

						case 'IcosahedronBufferGeometry':

							if (this.currentEntity !== null ) {
	
								GLOBALSCOPE.updateObject( 'radius', width, this.currentEntity);
	
							}
							else{

								this.currentEntity = GLOBALSCOPE.createIcosahedron( x, y, z, width, 0, material );
	
								this.currentEntity.name = "Icosahedron";

								scene.add( this.currentEntity );
	
							}
	
						break;

						case 'OctahedronBufferGeometry':

							if (this.currentEntity !== null ) {
	
								GLOBALSCOPE.updateObject( 'radius', width, this.currentEntity);
	
							}
							else{

								this.currentEntity = GLOBALSCOPE.createOctahedron( x, y, z, width, 0, material );
	
								this.currentEntity.name = "Octahedron";

								scene.add( this.currentEntity );
	
							}
	
						break;

						case 'TorusBufferGeometry':

							if (this.currentEntity !== null ) {
	
								GLOBALSCOPE.updateObject( 'radius', width, this.currentEntity);
								GLOBALSCOPE.updateObject( 'tube', width/5, this.currentEntity);
	
							}
							else{

								this.currentEntity = GLOBALSCOPE.createTorus( x, y, z, width, width/10, 8, 12, material );
	
								this.currentEntity.name = "Torus";

								scene.add( this.currentEntity );
	
							}
	
						break;

						case 'TetrahedronBufferGeometry':

							if (this.currentEntity !== null ) {
	
								GLOBALSCOPE.updateObject( 'radius', width, this.currentEntity);
	
							}
							else{

								this.currentEntity = GLOBALSCOPE.createTetrahedron( x, y, z, width, 0, material );
	
								this.currentEntity.name = "Tetrahedron";

								scene.add( this.currentEntity );
	
							}
	
						break;

							//TorusBufferGeometry

					default:
						break;

				}
			};
			this.stopCreating = function ( ) {

				this.currentEntity.userData = { createdByUser: true, selectable: true };

				// console.log( this.currentEntity );

				this.centerOfObjectWorld = null;
				this.centerOfObjectScreen = null;
				this.currentEntity = null;

			};

		};

	}

	cloneObject( ta_scene ) {

		let copiedObjectID = ta_scene.currentSelection.object.id;
		this.removeSelection( ta_scene.currentSelection );
		let copiedObject = ta_scene.scene.getObjectById( copiedObjectID );

		let newObject = copiedObject.clone( false );

		ta_scene.selectableObjects.push( newObject );

		ta_scene.scene.add( newObject );

		this.selectEntity( copiedObject, ta_scene.currentSelection );

	}

}

export {TA_Entities};