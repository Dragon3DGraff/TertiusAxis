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
	
	let title = taUI.addElement( addToSceneContainer, 'p', 'Add to scene &#9650', '');
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

	let buttonsDiv = taUI.addElement( addToSceneContainer, 'div','','');
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

	//Parameters Menu

	let paramContainer = taUI.createContainer( 'paramContainer' );
	paramContainer.className = 'paramContainer';
	
	 title = taUI.addElement( paramContainer,'p', 'Object parameters &#9650', '');
	title.className = 'sectionName';

	title.addEventListener ('click',
	function () {
		let addToSceneButtons = document.getElementById( 'paramsDiv');

		if (addToSceneButtons.style.display === 'block') {
			addToSceneButtons.style.display = 'none';
			this.innerHTML = 'Object parameters &#9660';
		}
		else {
			addToSceneButtons.style.display = 'block';

			this.innerHTML = 'Object parameters &#9650';
			
		}
		
	},
	false
	);

	let paramsDiv = taUI.addElement( paramContainer, 'div','','');
	paramsDiv.id = 'paramsDiv';
	paramsDiv.style.display = 'block';

	let tabsButtons = taUI.addElement( paramsDiv, 'div', '','');
	tabsButtons.className = 'tabsButtons';

	let tabGeometry = taUI.addElement( tabsButtons, 'button', 'Geometry', '',
	function () {

		// this.style.backgroundColor = 'darkslategrey';

		let divGeometry = document.getElementById( 'GeometryParameters');
		divGeometry.style.display = 'block';
		tabGeometry.style.backgroundColor = 'darkslategrey';
		let divMaterial = document.getElementById( 'MaterialParameters');
		divMaterial.style.display = 'none';
		tabMaterial.style.backgroundColor = 'rgb(51, 51, 51)';
		let divGeneral = document.getElementById( 'GeneralParameters');
		divGeneral.style.display = 'none';
		tabGeneral.style.backgroundColor = 'rgb(51, 51, 51)';

	}
	)
	let tabMaterial = taUI.addElement( tabsButtons, 'button', 'Material', '',
	function(){

		// this.style.backgroundColor = 'darkslategrey';

		let divGeometry = document.getElementById( 'GeometryParameters');
		divGeometry.style.display = 'none';
		tabGeometry.style.backgroundColor = 'rgb(51, 51, 51)';
		let divMaterial = document.getElementById( 'MaterialParameters');
		divMaterial.style.display = 'block';
		tabMaterial.style.backgroundColor = 'darkslategrey';
		let divGeneral = document.getElementById( 'GeneralParameters');
		divGeneral.style.display = 'none';
		tabGeneral.style.backgroundColor = 'rgb(51, 51, 51)';

	}
	)
	let tabGeneral = taUI.addElement( tabsButtons, 'button', 'General', '',
	function(){

		let divGeometry = document.getElementById( 'GeometryParameters');
		divGeometry.style.display = 'none';
		tabGeometry.style.backgroundColor = 'rgb(51, 51, 51)';
		let divMaterial = document.getElementById( 'MaterialParameters');
		divMaterial.style.display = 'none';
		tabMaterial.style.backgroundColor = 'rgb(51, 51, 51)';
		let divGeneral = document.getElementById( 'GeneralParameters');
		divGeneral.style.display = 'block';
		tabGeneral.style.backgroundColor = 'darkslategrey';

	}
	);

	let tabs = taUI.addElement( paramsDiv, 'div', '', '');
	tabs.className = 'tabs';
	tabs.id = 'tabs';

	let geometryParameters = taUI.addElement( tabs, 'div','','');
	geometryParameters.className = 'GeometryParameters';
	geometryParameters.id = 'GeometryParameters';

	let materialParameters = taUI.addElement( tabs, 'div','','');
	materialParameters.className = 'MaterialParameters';
	materialParameters.id = 'MaterialParameters';

	let generalParameters = taUI.addElement( tabs, 'div','','');
	generalParameters.className = 'GeneralParameters';
	generalParameters.id = 'GeneralParameters';

	
	

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
