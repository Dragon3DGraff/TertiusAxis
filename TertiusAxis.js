/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */
"use strict"

let TertiusAxis = function () {

	let taUI = new TA_UI();
	
	taUI.init();

	let manipulatingContainer = taUI.createContainer( 'manipulating' );

	let buttonSelect = taUI.addElement(
		manipulatingContainer,
		'button',
		'Select ',
		"./ico/Arrow.PNG",
		function () {
			taScene.mode.action = 'select';
		}

	);
	taUI.addElement(
		manipulatingContainer,
		'button',
		'Move',
		"",
		function () {
			taScene.mode.action = 'move';
		}

	);
	taUI.addElement(
		manipulatingContainer,
		'button',
		'Rotate',
		"",
		function () {
			taScene.mode.action = 'rotate';
		}

	);
	taUI.addElement(
		manipulatingContainer,
		'button',
		'Scale',
		"",
		function () {
			taScene.mode.action = 'scale';
		}

	);

	let addToSceneContainer = taUI.createContainer( 'sectionDiv' );
	addToSceneContainer.id = 'AddToScene';
	let title = taUI.addElement( addToSceneContainer, 'p', 'Add to scene', '');
	title.className = 'sectionName';

	let buttonsDiv = taUI.addElement( addToSceneContainer, 'div','','');
	buttonsDiv.className = 'buttonsDiv';

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

		taUI.addElement(
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

	let paramContainer = taUI.createContainer( 'sectionDiv' );
	
	
	 title =  taUI.addElement( paramContainer,'p', 'Object parameters', '');
	title.className = 'sectionName';

	buttonsDiv = taUI.addElement( paramContainer, 'div','','');
	buttonsDiv.className = 'buttonsDiv';
	buttonsDiv.id = 'Parameters';

	
	

	let infoDiv = taUI.createContainer( 'info' );
	let paragraph = taUI.addElement( infoDiv, 'p', '', '');
	paragraph.id = "infoParagraph"

	let taScene = new TA_Scene( taUI );	
	taUI.setScene( taScene );

	// taUI.taScene = taScene;

	// let cubeButton = document.getElementById( 'createCube' );

	// cubeButton.addEventListener( 'click', function () {
	
	// 	taScene.mode.creationEntity = true;
	// 	taScene.mode.entity = 'box';

	// }, false );

	// let sphereButton = document.getElementById( 'createSphere' );

	// sphereButton.addEventListener( 'click', function () {

	// 	taScene.mode.creationEntity = true;
	// 	taScene.mode.entity = 'sphere';

	// }, false );


	// Object.call(addToScene).addElement('button', 'Cube', 'box');
	// let uicontainer = document.getElementById( 'Properties' );
	// 	let dom = document.createElement( 'div' );
	// 	dom.innerHTML = 'text';

	// 	uicontainer.appendChild(dom);
		
}
// echo "# TertiusAxis" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git remote add origin https://github.com/Dragon3DGraff/TertiusAxis.git
// git push -u origin master
