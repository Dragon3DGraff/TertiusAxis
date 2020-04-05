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

		{text:'Box', type: 'BoxBufferGeometry', imgLink: './ico/cubeico.PNG'},
		{text:'Sphere', type: 'SphereBufferGeometry', imgLink: './ico/sphereico.PNG'},
		{text:'Circle', type: 'CircleBufferGeometry', imgLink: ''},
		{text:'Cone', type: 'ConeBufferGeometry', imgLink: ''},
		{text:'Cylinder', type: 'CylinderBufferGeometry', imgLink: ''},
		{text:'Dodecahedron', type: 'DodecahedronBufferGeometry', imgLink: ''},
		{text:'Icosahedron', type: 'IcosahedronBufferGeometry', imgLink: ''},
		{text:'Octahedron', type: 'OctahedronBufferGeometry', imgLink: ''},
		{text:'Plane', type: 'PlaneBufferGeometry', imgLink: ''},
		{text:'Ring', type: 'RingBufferGeometry', imgLink: ''},
		{text:'Shape', type: 'ShapeBufferGeometry', imgLink: ''},
		{text:'Tetrahedron', type: 'TetrahedronBufferGeometry', imgLink: ''},
		{text:'Text', type: 'TextBufferGeometry', imgLink: ''},
		{text:'Torus', type: 'TorusBufferGeometry', imgLink: ''},
		{text:'TorusKnot', type: 'TorusKnotBufferGeometry', imgLink: ''},
		{text:'Tube', type: 'TubeBufferGeometry', imgLink: ''}

	]

	primitivesNamesForButtons.forEach(element => {

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
		
	});


	console.log( 'AddToSceneToolbar created' );

	return addToSceneContainer;

}

export { createAddToSceneToolbar };