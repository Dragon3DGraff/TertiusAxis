/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */
"use strict" 
// let TA_UI = function ( taScene ) {

	

// 	let cubeButton = document.getElementById( 'createCube' );

// 	cubeButton.addEventListener( 'click', function () {
	
// 		taScene.mode.creationEntity = true;
// 		taScene.mode.entity = 'cube';

// 	}, false );

// 	let sphereButton = document.getElementById( 'createSphere' );

// 	sphereButton.addEventListener( 'click', function () {

// 		taScene.mode.creationEntity = true;
// 		taScene.mode.entity = 'sphere';

// 	}, false );

// }

class TA_UI {

	constructor( ) {

		
		this.main;

	}

	setScene(  taScene ){

		this.taScene = taScene;
	
	}

	init() {

		let dom = document.createElement( 'div' );
		dom.className = 'mainToolbar';
		dom.id = 'mainToolbar';
		document.body.appendChild( dom );
		return this.main = dom;

	}
	
	addElement( container, elementName, text, commandName ) {

		let dom = document.createElement( elementName );
		container.appendChild( dom );
		dom.innerHTML = text;
		dom.addEventListener( 'click', () => {
	
			this.taScene.mode.creationEntity = true;
			this.taScene.mode.entity = commandName;

	// 		let paramContainer = this.createContainer( 'ParametersDiv' );
	// paramContainer.id = 'Parameters';
	//  title =  this.addElement( paramContainer,'p', 'Parameters', '');
	// title.className = 'sectionName';
	
		}, false );

		return dom;
	}

	createContainer( containername ) {

		let dom = document.createElement( 'div' );
		dom.className = containername;
		dom.id = containername;
		this.main.appendChild( dom );
		return dom;

	}

}

class Toolbar extends TA_UI {

	constructor(containerName) {

		
	}

}