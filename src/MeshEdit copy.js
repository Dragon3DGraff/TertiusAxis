/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */


import * as THREE from "../node_modules/three/build/three.module.js";
import {
	Group,
	Color,
	Vector2,
	Vector3,
	SphereBufferGeometry,
	Mesh,
	MeshBasicMaterial,
	BoxBufferGeometry
   } from "../node_modules/three/build/three.module.js";
import { TA_Entities } from "./Entities/TA_Entities.js";
import { TA_Scene } from "./TA_Scene.js";

class MeshEdit {
	constructor( mesh ){

		this.mesh = mesh;

	}

	createMeshHelpers(){

		let points = getPoints( this.mesh );
		let vertexes = getVertexes( points );
		let VertexesPointsIndexes = getVertexesPointsIndexes( points, vertexes);


		addSpheresToVertexes( this.mesh, vertexes );



		// vertexes[ 0 ] = new Vector3( 10, 6, 5);

		// let newPoints = vertexesChangePoints ( vertexes, points, VertexesPointsIndexes);
		

		// pointsChangeAttributesPosition( this.mesh, newPoints );


		// console.log( this.mesh.geometry.attributes.position.array )



	}

	removePoints( ) {

		let ta_Entities = new TA_Entities();
		let ta_Scene = new TA_Scene();

		ta_Entities.removeWireframeAndBoundingBox( this.mesh );

		this.mesh.remove( this.mesh.getObjectByName( 'shperesForMeshEdit') );

		ta_Scene.selectableObjects = [];

		ta_Scene.selectableObjects = ta_Scene.selectableObjects.concat( ta_Scene.tempSelectableObjects );
		ta_Scene.tempSelectableObjects = [];

	}




	static changeGeometry( object, vertexNumber, position ){

		object.geometry.parameters = null;

		let ta_Entities = new TA_Entities();
		let points = getPoints( object );
		let vertexes = getVertexes( points );
		let VertexesPointsIndexes = getVertexesPointsIndexes( points, vertexes);

		ta_Entities.removeWireframeAndBoundingBox(object );

		vertexes[ +vertexNumber ] = position;

		let newPoints = vertexesChangePoints ( vertexes, points, VertexesPointsIndexes);
		

		pointsChangeAttributesPosition( object, newPoints );
		object.geometry.attributes.position.needsUpdate = true;
	
		object.updateMatrix();
		// object.add( ta_Entities.createBoundingBox( object ) );
		object.add( ta_Entities.createWireframe( object ) );
		

	}


}
function getPoints( mesh ) {

	let pointsArray = mesh.geometry.attributes.position.array;
	let itemSize = mesh.geometry.attributes.position.itemSize;

	let points = [];

	for (let i = 0; i < pointsArray.length; i += itemSize ) {

		points.push( new Vector3( pointsArray[i], pointsArray[i+1], pointsArray[i+2]));

	}

	return points;

}

function getVertexes( points ) {

	let vertexes = [];

	points.forEach( ( indexPoints ) => {

		let equal = false;

		vertexes.forEach( ( indexVertex ) => {
			
			if (indexPoints.equals( indexVertex) ){

				equal = true;
				return;

			} 

		})

		if ( !equal ) {

			vertexes.push( indexPoints );

		}

	})

	return vertexes;

}

function addSpheresToVertexes( mesh, vertexes ){

	let ta_Scene = new TA_Scene();
	let sphereGeometry = new SphereBufferGeometry( 0.3, 4, 4 );
	
	ta_Scene.tempSelectableObjects = ta_Scene.tempSelectableObjects.concat( ta_Scene.selectableObjects );

	ta_Scene.selectableObjects = [];

	let group = new Group();
	group.name = 'shperesForMeshEdit';

	vertexes.map( (item, index) => {
		let sphere = new Mesh( sphereGeometry, new MeshBasicMaterial( { color: new Color( 'red' ) } ) );
		sphere.name = 'createMeshHelpers'
		sphere.userData.vertexNumer = `${index}` ;
		group.add( sphere );
		sphere.position.set( item.x, item.y, item.z);
		ta_Scene.selectableObjects.push( sphere );

	})

	mesh.add( group );

}

function getVertexesPointsIndexes( points, vertexes){

	let indexesArray = [];
	vertexes.map ( (itemVertex ) => {
		let indexes = [];
		points.forEach( (itemPoints, index) => {
			if( itemPoints.equals( itemVertex ) )
			indexes.push( index );
		})
		indexesArray.push( indexes );
		// map.set( itemVertex, indexes);

	})

	return indexesArray;

}

function vertexesChangePoints ( vertexes, points, VertexesPointsIndexes) {

	// let newPoints = points;
	vertexes.map( ( itemVertex, index ) => {

		let arrayIndexes = VertexesPointsIndexes[ index ];

		arrayIndexes.map( ( item ) => points[ item ] = itemVertex);

	})

	points[0] = vertexes[0];



	return points;

}

function pointsChangeAttributesPosition( mesh, points ) {
	
	let positions = [];

	points.map( (item) => {
		positions.push( item.x);
		positions.push( item.y);
		positions.push( item.z);

	} )

	let arrayAttr = mesh.geometry.attributes.position.array;

	arrayAttr.map( (item, index) => { 

		mesh.geometry.attributes.position.array[index] = positions[index]

	})

}

export { MeshEdit };