/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */
"use strict"

let TertiusAxis = function () {

	let taUI = new TA_UI();
	taUI.init();
	let addToScene = taUI.createContainer( 'sectionDiv' );
	addToScene.id = 'AddToScene';
	let title =  taUI.addElement( addToScene,'p', 'Add to scene', '');
	title.className = 'sectionName';
	taUI.addElement( addToScene, 'button', 'Cube', 'cube');
	taUI.addElement( addToScene, 'button', 'Sphere', 'sphere');

	let paramContainer = taUI.createContainer( 'sectionDiv' );
	paramContainer.id = 'Parameters';
	 title =  taUI.addElement( paramContainer,'p', 'Parameters', '');
	title.className = 'sectionName';
	

	let infoDiv = taUI.createContainer( 'info' );

	let taScene = new TA_Scene( taUI );
	taUI.setScene( taScene );

	// taUI.taScene = taScene;

	// let cubeButton = document.getElementById( 'createCube' );

	// cubeButton.addEventListener( 'click', function () {
	
	// 	taScene.mode.creationEntity = true;
	// 	taScene.mode.entity = 'cube';

	// }, false );

	// let sphereButton = document.getElementById( 'createSphere' );

	// sphereButton.addEventListener( 'click', function () {

	// 	taScene.mode.creationEntity = true;
	// 	taScene.mode.entity = 'sphere';

	// }, false );


	// Object.call(addToScene).addElement('button', 'Cube', 'cube');
	// let uicontainer = document.getElementById( 'Properties' );
	// 	let dom = document.createElement( 'div' );
	// 	dom.innerHTML = 'text';

	// 	uicontainer.appendChild(dom);
		
}
