/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */
"use strict" 
let TA_Entities = function () {

	let GLOBALSCOPE = this;

	this.createCube = function (x, y, z, height, material){
		

			const geometry = new THREE.BoxGeometry(height, height, height, 1, 1, 1 );
			//material = new THREE.MeshPhongMaterial({ color: new THREE.Color('grey') });
			// material = new THREE.MeshPhongMaterial({color: new THREE.Color('grey'),  wireframe: true, transparent: true, opacity: 0.5});
			material = new THREE.MeshPhongMaterial({ color: new THREE.Color( 'lightgrey' ) });

			var cube = new THREE.Mesh(geometry, material);
			cube.position.x = x;
			cube.position.y = y;
			cube.position.z = z;
			

		return cube;
	}

	this.createSphere = function ( x, y, z, radius, segments ) {

		const geometry = new THREE.SphereGeometry( radius, segments, segments,  0, Math.PI*2, 0, Math.PI );
		
		// const material = new THREE.MeshPhongMaterial({color: new THREE.Color('grey'),  wireframe: true, transparent: true, opacity: 0.5});
		const material = new THREE.MeshPhongMaterial({ color: new THREE.Color('yellow')});

		let sphere = new THREE.Mesh( geometry, material );
		sphere.position.x = x;
		sphere.position.y = y;
		sphere.position.z = z;
		

		return sphere;
	}

	this.createLine = function ( x, y, z, x1, y1, z1, color, dashed ) {
		let material;
		
		switch (dashed) {
			case 'dashed':
				material = new THREE.LineDashedMaterial( {
					color: new THREE.Color( color ),
					dashSize: 0.1,
					gapSize: 0.05
				} );
			break;

			case 'solid':
					material = new THREE.LineBasicMaterial( {
						color: new THREE.Color( color ),
					} );
		
			default:
				material = new THREE.LineBasicMaterial( {
					color: new THREE.Color( color ),
				} );
				break;
		}
		
		const geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3( x, y, z));
		geometry.vertices.push(new THREE.Vector3( x1, y1, z1));
		
		const line = new THREE.Line( geometry, material );
		if( dashed === 'dashed' ){
			line.computeLineDistances();
		}
		return line;

	}

	this.createLabel = function ( x, y, z, text ) {

		let labelDiv = document.createElement( 'div' );
		labelDiv.className = 'labelDiv';
		labelDiv.textContent = text;
		labelDiv.style.marginTop = '-1em';

		let labelobject = new CSS2DObject( labelDiv );
		labelobject.position.set( x, y, z );
			
		return labelobject;

	}

	this.createPlane = function ( height, width ) {

		let planeGeom = new THREE.PlaneBufferGeometry( width, height );
		let planeMaterial = new THREE.MeshBasicMaterial( { color: new THREE.Color('lightgrey'), transparent: false, opacity: 1, side: THREE.DoubleSide } );
	
		let plane = new THREE.Mesh( planeGeom, planeMaterial );

		return plane;

	}

	this.CreatingEntity = function () {

		let scope = this;

		this.centerOfObjectWorld;
		this.centerOfObjectScreen;
		this.currentEntity;

		this.createEntity = function ( mode, scene, event, sceneCamera) {

			scope.centerOfObjectScreen = new THREE.Vector2 ( event.x, event.y );

			let x = this.centerOfObjectWorld.x;
			let y = this.centerOfObjectWorld.y;
			let z = this.centerOfObjectWorld.z;
			let width;

			if (scope.currentEntity) {	

			let pos = scope.currentEntity.position.clone().project( sceneCamera.camera );
			pos.x = ( pos.x * window.innerWidth/2 ) + window.innerWidth/2;
			pos.y = - ( pos.y * window.innerHeight/2 ) + window.innerHeight/2;
			scope.centerOfObjectScreen.x = pos.x;
			scope.centerOfObjectScreen.y = pos.y;

			let worldSizeOfScreen =  sceneCamera.getWorldSizeOfScreen( sceneCamera.camera, scope.currentEntity.position )

			let ratio = ( 1000000000 * window.innerHeight)/(1000000000 * worldSizeOfScreen.height );

			scene.remove( scope.currentEntity );

			let currentCoordsScreen = new THREE.Vector2 ( event.x, event.y);
			let distance = currentCoordsScreen.distanceTo( scope.centerOfObjectScreen );

			width = 1.00 * distance / ratio;

			}
			else {
				width = 0.01;
			}

			switch (mode.entity) {

					case 'cube' :

						this.currentEntity = GLOBALSCOPE.createCube(x, y, z, width, 'material');
						scene.add( this.currentEntity );

						//ТУТ ОБНОВЛЯТЬ ПАРАМЕТРЫ

						
						
						break;

						case 'sphere' :
						this.currentEntity = GLOBALSCOPE.createSphere( x, y, z, width, 32) ;
						scene.add( this.currentEntity );
						break;

					default:
						break;

				}
			}

			this.stopCreating = function () {

				// ТУТ УДАЛИТЬ ПАРАМЕТРЫ

						let dom = document.getElementById( 'Parameters');
						let elem = document.createElement( 'div' );
						elem.id = 'ParametersRows';
						dom.appendChild( elem );

						let parametersArray = Object.entries(this.currentEntity.geometry.parameters);

						for (let i = 0; i < parametersArray.length; i++) {

							let rowDiv = document.createElement( 'div' );
							elem.appendChild( rowDiv );
							rowDiv.className = 'ParametersRow';

							let text = document.createElement( 'p' );
							rowDiv.appendChild( text );
							text.innerHTML = parametersArray[i][0];

							let input = document.createElement( 'input' );
							input.type = 'number';
							input.step = 0.001;
							// input.readOnly = false;
							// input.disabled = false;
							rowDiv.appendChild (input);
							input.value = Math.round( parametersArray[i][1] * 1000 )/1000;

						}


				this.centerOfObjectWorld = null;
				this.centerOfObjectScreen = null;
				this.currentEntity = null;

			}


	}

}