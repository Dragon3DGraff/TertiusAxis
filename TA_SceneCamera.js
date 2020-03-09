/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */
"use strict" 

let TA_SceneCamera = function(){

	this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 0.01, 10000 );
	this.camera.position.z = 3;
	this.camera.position.y = 3;
	this.camera.position.x = 3;
	this.camera.lookAt( 0, 0, 0 );

}

TA_SceneCamera.prototype =  {

	initCamera: function() {
		
		return this.camera;

	},

	getWorldSizeOfScreen: function( camera, point ) {

		let cameraDirection = new THREE.Vector3();
		camera.getWorldDirection ( cameraDirection );
		let cameraPosition = new THREE.Vector3();
		cameraPosition = camera.position.clone();
		let distance = point.distanceTo( cameraPosition );

		cameraPosition.add(cameraDirection.multiplyScalar(distance) );

		let line3 = new THREE.Line3(camera.position, cameraPosition);

		let pointOnLine = new THREE.Vector3();

		line3.closestPointToPoint( point, true, pointOnLine);

		distance = pointOnLine.distanceTo( camera.position );

		let angle = camera.fov/2;
		let sizeOfViewX = distance * Math.tan( angle * Math.PI / 180 ) * 2;
		let sizeOfViewY = sizeOfViewX * camera.aspect * 2;

		let sizeOfView = {

			height: sizeOfViewX,
			width: sizeOfViewY

		}

		return sizeOfView;

	}

}
