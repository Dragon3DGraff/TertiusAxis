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
	DoubleSide
   } from "../node_modules/three/build/three.module.js";
import { TA_Entities } from "./Entities/TA_Entities.js";
import { TA_Scene } from "./TA_Scene.js";
import { TA_UI } from "./UI/TA_UI.js";
import { findBaryCenter } from "./Calculations.js"

class MeshEdit {
	constructor( mesh ){

		this.mesh = mesh;
		this.vertices;
		this.points;
		this.mode = 'Vertices';
		this.ta_UI = new TA_UI();
		this.ta_Entities = new TA_Entities();
		this.ta_Scene = new TA_Scene();

	}

	createMeshHelpers(){

		this.points = getPoints( this.mesh );
		this.vertices = getVertices( this.points );

		if ( this.mode === 'Vertices' ){

			this.addSpheresToVertexes( this.mesh, this.vertices );

		}
		if ( this.mode === 'Faces' ){

			this.addTriangles( this.mesh, this.points );

		}

	}

	removeMeshHelpers() {

		this.ta_Entities.removeWireframeAndBoundingBox( this.mesh );

		this.mesh.remove( this.mesh.getObjectByName( 'shperesForMeshEdit') );
		this.mesh.remove( this.mesh.getObjectByName( 'FacesForMeshEdit') );
		

		this.ta_Scene.selectableObjects = [];

		this.ta_Scene.selectableObjects = this.ta_Scene.selectableObjects.concat( this.ta_Scene.tempSelectableObjects );
		this.ta_Scene.tempSelectableObjects = [];

	}

	transformMesh( editHelper ) {

		if( this.mode === 'Vertices'){

			// console.log( editHelper.userData.vertexNumber )

			this.moveVertex( editHelper.object.userData.vertexNumber, editHelper.object.position );

		}

		if( this.mode === "Faces" ){

			let sphereName = editHelper.object.name;

			let face = editHelper.object.parent.getObjectByName( editHelper.object.name.replace('Sphere','') );
			let sphere = editHelper.object;

			let shift = sphere.position;

			shift.subVectors( sphere.position, face.userData.baryCenter )

			face.position.set( shift.x, shift.y, shift.z );

			let attrArray = face.geometry.attributes.position.array;
			let vertices = [];

			for (let i = 0; i < attrArray.length; i += 3 ) {

				vertices.push( new Vector3( attrArray[i], attrArray[i+1], attrArray[i+2]));
		
			}

			let verticesNumbers = face.userData.verticesNumbers;

			for (let i = 0; i < verticesNumbers.length; i ++ ) {

				let pointNumber = verticesNumbers[ i ];

				let point = vertices[ i ].clone();

				let pointPosition = point.add( face.position.clone() ).clone();

				this.moveVertex( pointNumber, pointPosition );

				this.removeMeshHelpers();
				this.createMeshHelpers();

				let sphere = this.ta_Scene.scene.getObjectByName( sphereName );

				this.ta_Scene.transformControls.attach( sphere );

			}


		}

	}

	moveVertex( vertexNumber, position ){

		let object = this.mesh;

		object.geometry.parameters = null;
		this.ta_UI.deleteGeometryParametersTab();

		let VertexesPointsIndexes = getVertexesPointsIndexes( this.points, this.vertices);

		this.ta_Entities.removeWireframeAndBoundingBox(object );

		this.vertices[ +vertexNumber ] = position;

		let newPoints = vertexesChangePoints ( this.vertices, this.points, VertexesPointsIndexes);
		

		pointsChangeAttributesPosition( object, newPoints );
		object.geometry.attributes.position.needsUpdate = true;
	
		object.updateMatrix();
		// object.add( ta_Entities.createBoundingBox( object ) );
		object.add( this.ta_Entities.createWireframe( object ) );

	}

	addSpheresToVertexes( mesh, vertices ){

		let sphereGeometry = new SphereBufferGeometry( 0.3, 4, 4 );
		let material = new MeshBasicMaterial( { color: new Color( 'red' ) } )
		
		this.ta_Scene.tempSelectableObjects = this.ta_Scene.tempSelectableObjects.concat( this.ta_Scene.selectableObjects );
	
		this.ta_Scene.selectableObjects = [];
	
		let group = new Group();
		group.name = 'shperesForMeshEdit';
	
		vertices.map( (item, index) => {
			let sphere = new Mesh( sphereGeometry, material );
			sphere.name = 'createMeshHelpers'
			sphere.userData.vertexNumber = `${index}` ;
			group.add( sphere );
			sphere.position.set( item.x, item.y, item.z);
			this.ta_Scene.selectableObjects.push( sphere );
	
		})
	
		mesh.add( group );
	
	}
	
	addTriangles( mesh, points ){

		let sphereGeometry = new SphereBufferGeometry( 0.5, 4, 4 );
		let material = new MeshBasicMaterial( { color: new Color( 'lightgrey' ) } )

		let triangleNumber = 0;

		this.ta_Scene.tempSelectableObjects = this.ta_Scene.tempSelectableObjects.concat( this.ta_Scene.selectableObjects );
	
		this.ta_Scene.selectableObjects = [];

		let group = new Group();
		group.name = 'FacesForMeshEdit';

		
		let indexArray = mesh.geometry.index.array;

		for (let i = 0; i < indexArray.length; i += 3 ) {

			let vert = [
				points[ indexArray[ i ] ],
				points[ indexArray[ i + 1 ] ],
				points[ indexArray[ i + 2 ] ]
			]

			let triangle = createTriangle( vert );
			triangle.name = 'Face_' + triangleNumber;

			triangle.userData.type = 'createMeshHelpers';

			triangle.userData.indexes = [
				 indexArray[ i ],
				 indexArray[ i + 1 ],
				 indexArray[ i + 2 ]
			];


			triangle.userData.verticesNumbers = [];	

			vert.map( ( item ) => {
				this.vertices.forEach( ( itemVert, index ) => {
					if (item.equals( itemVert )){
						triangle.userData.verticesNumbers.push( index );
						return;
					}

				})
				

			})
			
			triangle.add( this.ta_Entities.createWireframe( triangle ) );

			let verticesClones = vert.map( ( item ) => item.clone() );
			let baryCenter = findBaryCenter( verticesClones );

			triangle.userData.baryCenter = baryCenter;

			let sphere = new Mesh( sphereGeometry, material );
			sphere.position.set( baryCenter.x, baryCenter.y, baryCenter.z );
			sphere.name = 'SphereFace_' + triangleNumber;
			sphere.userData.type = 'createMeshHelpers';
			

			group.add( sphere );

			

			group.add( triangle );
			mesh.add( group );

			this.ta_Scene.selectableObjects.push( triangle );
			triangleNumber++;
		}
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

function getVertices( points ) {

	let vertices = [];

	points.forEach( ( indexPoints ) => {

		let equal = false;

		vertices.forEach( ( indexVertex ) => {
			
			if (indexPoints.equals( indexVertex) ){

				equal = true;
				return;

			}

		})

		if ( !equal ) {

			vertices.push( indexPoints );

		}

	})

	return vertices;

}

function getVertexesPointsIndexes( points, vertices){

	let indexesArray = [];
	vertices.map ( (itemVertex ) => {
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

function vertexesChangePoints ( vertices, points, VertexesPointsIndexes) {

	vertices.map( ( itemVertex, index ) => {

		let arrayIndexes = VertexesPointsIndexes[ index ];

		arrayIndexes.map( ( item ) => points[ item ] = itemVertex);

	})

	points[0] = vertices[0];

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

function createTriangle( vertices ){

	let faceMaterial = new MeshBasicMaterial({
		color: new Color( "lightgrey"),
		transparent: true,
		opacity: 0.5,
		side: DoubleSide
		// alphaTest: 0.5, 
	} )

	if( vertices.length != 3 ){

		console.error( 'Vertices must be an array of 3 Vectors');
		return;

	}

	vertices.forEach( item => {
		if (!item.isVector3){
			console.error( 'Vertices must be an array of 3 Vectors');
			return;
		}
	})

	let positions = [];

	vertices.map( item => {
		positions.push(item.x);
		positions.push(item.y);
		positions.push(item.z);
	})

	const geometry = new BufferGeometry();

	geometry.setAttribute( 'position', new BufferAttribute( new Float32Array( positions ), 3));

	geometry.setIndex( [ 0, 1, 2 ]);

	const mesh = new Mesh( geometry, faceMaterial);

	return mesh;

 }

export { MeshEdit };