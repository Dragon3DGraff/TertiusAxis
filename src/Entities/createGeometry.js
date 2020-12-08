/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

// import * as THREE from "../build/three.module.js";
// import { TA_Entities } from "./TA_Entities.js";

// function createGeometry ( geometryType, params ) {

// 	let ta_Entities = new TA_Entities();

// 	let geometry = null;
// 	let paramsArray;

// 	if ( !(params instanceof Object) ) {

// 		console.error( 'params must be an object. Now params are ' + typeof params );
// 		return;

// 	}

// 	switch ( geometryType ) {

// 		case 'BoxBufferGeometry':

// 			geometry = new THREE[ geometryType ]();

// 			ta_Entities.checkParams( params, geometry.parameters );

// 			paramsArray = Object.values( params );

// 			geometry = new THREE[ geometryType ]( ...paramsArray );

// 			// geometry = new THREE.BoxBufferGeometry( ...paramsArray );

// 			break;

// 		case 'SphereBufferGeometry':

// 			geometry = new THREE.SphereBufferGeometry();

// 			ta_Entities.checkParams( params, geometry.parameters );

// 			paramsArray = Object.values( params );

// 			geometry = new THREE.SphereBufferGeometry( ...paramsArray );

// 			break;

// 		case 'CircleBufferGeometry':

// 			geometry = new THREE.CircleBufferGeometry();

// 			ta_Entities.checkParams( params, geometry.parameters );

// 			paramsArray = Object.values( params );

// 			geometry = new THREE.CircleBufferGeometry( ...paramsArray );

// 		break;

// 		case 'ConeBufferGeometry':

// 			geometry = new THREE.ConeBufferGeometry();

// 			ta_Entities.checkParams( params, geometry.parameters );

// 			paramsArray = Object.values( params );

// 			geometry = new THREE.ConeBufferGeometry( ...paramsArray );

// 		break;

// 		case 'CylinderBufferGeometry':

// 			geometry = new THREE.CylinderBufferGeometry();

// 			ta_Entities.checkParams( params, geometry.parameters );

// 			paramsArray = Object.values( params );

// 			geometry = new THREE.CylinderBufferGeometry( ...paramsArray );

// 		break;

// 		case 'DodecahedronBufferGeometry':

// 			geometry = new THREE.DodecahedronBufferGeometry();

// 			ta_Entities.checkParams( params, geometry.parameters );

// 			paramsArray = Object.values( params );

// 			geometry = new THREE.DodecahedronBufferGeometry( ...paramsArray );

// 		break;

// 		case 'IcosahedronBufferGeometry':

// 			geometry = new THREE.IcosahedronBufferGeometry();

// 			ta_Entities.checkParams( params, geometry.parameters );

// 			paramsArray = Object.values( params );

// 			geometry = new THREE.IcosahedronBufferGeometry( ...paramsArray );

// 		break;

// 		case 'OctahedronBufferGeometry':

// 			geometry = new THREE.OctahedronBufferGeometry();

// 			ta_Entities.checkParams( params, geometry.parameters );

// 			paramsArray = Object.values( params );

// 			geometry = new THREE.OctahedronBufferGeometry( ...paramsArray );

// 		break;

// 		case 'PlaneBufferGeometry':

// 			geometry = new THREE.PlaneBufferGeometry();

// 			ta_Entities.checkParams( params, geometry.parameters );

// 			paramsArray = Object.values( params );

// 			geometry = new THREE.PlaneBufferGeometry( ...paramsArray );

// 		break;

// 		case 'RingBufferGeometry':

// 			geometry = new THREE.RingBufferGeometry();

// 			ta_Entities.checkParams( params, geometry.parameters );

// 			paramsArray = Object.values( params );

// 			geometry = new THREE.RingBufferGeometry( ...paramsArray );

// 		break;

// 		case 'ShapeBufferGeometry':

// 			geometry = new THREE.ShapeBufferGeometry();

// 			ta_Entities.checkParams( params, geometry.parameters );

// 			paramsArray = Object.values( params );

// 			geometry = new THREE.ShapeBufferGeometry( ...paramsArray );

// 		break;

// 		case 'TetrahedronBufferGeometry':

// 			geometry = new THREE.TetrahedronBufferGeometry();

// 			ta_Entities.checkParams( params, geometry.parameters );

// 			paramsArray = Object.values( params );

// 			geometry = new THREE.TetrahedronBufferGeometry( ...paramsArray );

// 		break;

// 		case 'TorusBufferGeometry':

// 			geometry = new THREE.TorusBufferGeometry();

// 			ta_Entities.checkParams( params, geometry.parameters );

// 			paramsArray = Object.values( params );

// 			geometry = new THREE.TorusBufferGeometry( ...paramsArray );

// 		break;

// //

// // TextBufferGeometry

// //

// // TorusKnotBufferGeometry

// // TubeBufferGeometry

// 		default:

// 				console.error( 'Incorrect type of geometry' );

// 			break;

// 	}

// 	return geometry;

// };

// export { createGeometry };
