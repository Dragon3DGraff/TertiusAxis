/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import { TA_UI } from "./TA_UI.js";

function createAddToSceneToolbar ( taScene ) {

	let check = document.getElementById( 'AddToSceneToolbar' );

	if ( check !== null ) {
		console.warn( 'AddToSceneToolbar may be called only once')
		return;
	}

	let ta_UI = new TA_UI();

	let addToSceneContainer = ta_UI.createContainer( 'sectionDiv', mainToolbar );
	addToSceneContainer.id = 'AddToSceneToolbar';
	
	let title = ta_UI.addElement( addToSceneContainer, 'p', 'Add to scene &#9650', '');
	title.className = 'sectionName';

	title.addEventListener ('click',
	function () {
		let addToSceneButtons = document.getElementById( 'addToSceneButtons');

		console.log (title.innerHTML);

		if (addToSceneButtons.style.display === 'block') {
			addToSceneButtons.style.display = 'none';

			this.innerHTML = 'Add to scene &#9660';
		}
		else {
			addToSceneButtons.style.display = 'block';

			this.innerHTML = 'Add to scene &#9650';
		}
		
	},
	false
	);

	let buttonsDiv = ta_UI.addElement( addToSceneContainer, 'div','','');
	buttonsDiv.className = 'buttonsDiv';
	buttonsDiv.id = 'addToSceneButtons';
	buttonsDiv.style.display = 'block';

	let primitivesNamesForButtons = [

		{text:'Box', type: 'BoxBufferGeometry', imgLink: './ico/cubeico.PNG', active: true},
		{text:'Sphere', type: 'SphereBufferGeometry', imgLink: './ico/sphereico.PNG', active: true},
		{text:'Circle', type: 'CircleBufferGeometry', imgLink: '', active: true},
		{text:'Cone', type: 'ConeBufferGeometry', imgLink: '', active: true},
		{text:'Cylinder', type: 'CylinderBufferGeometry', imgLink: '', active: true},
		{text:'Dodecahedron', type: 'DodecahedronBufferGeometry', imgLink: '', active: true},
		{text:'Icosahedron', type: 'IcosahedronBufferGeometry', imgLink: '', active: true},
		{text:'Octahedron', type: 'OctahedronBufferGeometry', imgLink: '', active: true},
		{text:'Plane', type: 'PlaneBufferGeometry', imgLink: '', active: false},
		{text:'Ring', type: 'RingBufferGeometry', imgLink: '', active: false},
		{text:'Shape', type: 'ShapeBufferGeometry', imgLink: ''},
		{text:'Tetrahedron', type: 'TetrahedronBufferGeometry', imgLink: '', active: true},
		{text:'Text', type: 'TextBufferGeometry', imgLink: '', active: false},
		{text:'Torus', type: 'TorusBufferGeometry', imgLink: '', active: true},
		{text:'TorusKnot', type: 'TorusKnotBufferGeometry', imgLink: '', active: false},
		{text:'Tube', type: 'TubeBufferGeometry', imgLink: '', active: false}

	];

	primitivesNamesForButtons.forEach(element => {

		if (element.active){

		ta_UI.addElement(
			buttonsDiv,
			'button',
			element.text,
			element.imgLink,
			function () {
			taScene.mode.action = 'creationEntity';
			taScene.mode.entity = element.type;
			}
	
		);

		}
		
	});


	console.log( 'AddToSceneToolbar created' );

	return addToSceneContainer;

}

export { createAddToSceneToolbar };