/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */
"use strict" 

class TA_Entities {

	constructor() {

		let GLOBALSCOPE = this;

		this.createGeometry = function ( geometryType, params ) {

			let geometry = null;
			let paramsArray;

			if ( !(params instanceof Object) ) {

				console.error( 'params must be an object. Now params are ' + typeof params );
				return;

			}

			switch ( geometryType ) {

				case 'BoxBufferGeometry':

					geometry = new THREE.BoxBufferGeometry();

					this.checkParams( params, geometry.parameters );

					paramsArray = Object.values( params );

					geometry = new THREE.BoxBufferGeometry( ...paramsArray );

					break;

				case 'SphereBufferGeometry':

					geometry = new THREE.SphereBufferGeometry();

					this.checkParams( params, geometry.parameters );

					paramsArray = Object.values( params );

					geometry = new THREE.SphereBufferGeometry( ...paramsArray );

					break;

				case 'CircleBufferGeometry':

					geometry = new THREE.CircleBufferGeometry();

					this.checkParams( params, geometry.parameters );

					paramsArray = Object.values( params );

					geometry = new THREE.CircleBufferGeometry( ...paramsArray );

					break;
					
// CircleBufferGeometry

// ConeBufferGeometry

// CylinderBufferGeometry

// DodecahedronBufferGeometry

// IcosahedronBufferGeometry

// OctahedronBufferGeometry

// PlaneBufferGeometry

// RingBufferGeometry

// ShapeBufferGeometry

// TetrahedronBufferGeometry

// TextBufferGeometry

// TorusBufferGeometry

// TorusKnotBufferGeometry

// TubeBufferGeometry


				default:

						console.error( 'Incorrect type of geometry' );

					break;

			}

			return geometry;

		};

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
			// const geometry = new THREE.SphereGeometry(radius, segments, segments, 0, Math.PI * 2, 0, Math.PI);
			// const material = new THREE.MeshPhongMaterial({color: new THREE.Color('grey'),  wireframe: true, transparent: true, opacity: 0.5});
			// const material = new THREE.MeshBasicMaterial();
			let circle = new THREE.Mesh( geometry, material );
			circle.position.x = x;
			circle.position.y = y;
			circle.position.z = z;
			return circle;

		};

		this.createLine = function (x, y, z, x1, y1, z1, color, dashed) {
			let material;
			switch (dashed) {
				case 'dashed':
					material = new THREE.LineDashedMaterial({
						color: new THREE.Color(color),
						dashSize: 0.1,
						gapSize: 0.05
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

		this.selectEntity = function (objectToSelect, selectedObject) {
			selectedObject.objectOwnColor = objectToSelect.material.color;
			objectToSelect.material.color = new THREE.Color('tomato');
			selectedObject.object = objectToSelect;
			selectedObject.object.add(this.createWireframe(selectedObject));
			selectedObject.object.add(this.createBoundingBox(selectedObject));
			let taUI = new TA_UI;
			taUI.createParametersMenu(objectToSelect);

			return selectedObject;
		};
		this.createWireframe = function ( selectedObject ) {
			let wireframe = new THREE.EdgesGeometry(selectedObject.object.geometry);
			let wireframeLines = new THREE.LineSegments(wireframe);
			wireframeLines.material.depthTest = true;
			// wireframeLines.material.opacity = 0.25;
			// wireframeLines.material.transparent = true;
			wireframeLines.material.color = new THREE.Color('white');
			wireframeLines.name = 'wireframe';
			wireframeLines.scale.set(1.001, 1.001, 1.001);
			return wireframeLines;
		};
		this.createBoundingBox = function ( selectedObject ) {
			selectedObject.object.geometry.computeBoundingBox();
			let box = new THREE.Box3Helper(selectedObject.object.geometry.boundingBox, new THREE.Color('red'));
			box.name = 'BoundingBox';

			if ( box.box.min.z === 0) {

			box.box.min.z = -0.001;
			box.box.max.z = 0.001;

			}

			return box;
		};
		this.removeSelection = function (selectedObject) {
			let wireframeScene = selectedObject.object.children.filter(item => item.name === "wireframe" || item.name === "BoundingBox");
			wireframeScene.forEach(element => {
				selectedObject.object.remove(element);
			});
			selectedObject.object.material.color = selectedObject.objectOwnColor;
			selectedObject.object = null;
			selectedObject.objectOwnColor = null;
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
					let box = new THREE.Box3Helper( entity.geometry.boundingBox );

					if ( box.box.min.z === 0) {

						box.box.min.z = -0.001;
						box.box.max.z = 0.001;

					}

					boundingBox.box = box.box;
	
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
				switch (mode.entity) {
					case 'BoxBufferGeometry':

						if (this.currentEntity !== null ) {

							GLOBALSCOPE.updateObject( 'width', width, this.currentEntity);
							GLOBALSCOPE.updateObject( 'height', width, this.currentEntity);
							GLOBALSCOPE.updateObject( 'depth', width, this.currentEntity);

						}
						else{

							material = new THREE.MeshPhongMaterial( { color: new THREE.Color('yellow') } );

							this.currentEntity = GLOBALSCOPE.createBox(x, y, z, width, width, width, material );
							this.currentEntity.name = "CUBE";

							scene.add(this.currentEntity);

						}

						break;

					case 'SphereBufferGeometry':

						if (this.currentEntity !== null ) {

							GLOBALSCOPE.updateObject( 'radius', width, this.currentEntity);

						}
						else{

							material = new THREE.MeshPhongMaterial( { color: new THREE.Color('yellow') } );

							this.currentEntity = GLOBALSCOPE.createSphere(x, y, z, width, 12, material );

							this.currentEntity.name = "SPHERE";

							scene.add(this.currentEntity);

						}

						break;

						case 'CircleBufferGeometry':

							if (this.currentEntity !== null ) {
	
								GLOBALSCOPE.updateObject( 'radius', width, this.currentEntity);
	
							}
							else{

								material = new THREE.MeshPhongMaterial( { color: new THREE.Color('yellow') } );
	
								this.currentEntity = GLOBALSCOPE.createCircle(x, y, z, width, 12, material );
	
								this.currentEntity.name = "Circle";

								scene.add(this.currentEntity);
	
							}
	
							break;
					default:
						break;

				}
			};
			this.stopCreating = function ( ) {

				this.centerOfObjectWorld = null;
				this.centerOfObjectScreen = null;
				this.currentEntity = null;

			};
		};
	}

	

}
