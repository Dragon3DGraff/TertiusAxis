/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */
"use strict" 

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
	
	addElement( container, elementName, text, imgLink, func ) {

		let dom = document.createElement( elementName );
		container.appendChild( dom );
		let img = document.createElement( 'img' );
		img.src = ( imgLink );

		// let textElement = document.createElement( 'p' );
		dom.innerHTML = text;
		// dom.appendChild( textElement );
		dom.appendChild( img );
		
		if (typeof( func ) === 'function') {
			dom.addEventListener( 'click', func, false );
		}

		return dom;
	}

	createContainer( containername ) {

		let dom = document.createElement( 'div' );
		dom.className = containername;
		dom.id = containername;
		this.main.appendChild( dom );
		return dom;

	}

	createParametersMenu( entity ) {

		if ( !entity.geometry.parameters) {

			console.warn( "No Params" );

			return;

		}

		this.deleteParametersMenu();

		let dom = document.getElementById( 'Parameters');
		let elem = document.createElement( 'div' );
		elem.id = 'ParametersRows';
		dom.appendChild( elem );

		let typeOfObject = document.createElement( 'div' );
		typeOfObject.id = 'ParametersRows';
		elem.appendChild( typeOfObject );
		typeOfObject.innerHTML = entity.geometry.type + ' id = ' + entity.id;


		let parametersArray = Object.entries( entity.geometry.parameters );

		for (let i = 0; i < parametersArray.length; i++) {

			let rowDiv = document.createElement( 'div' );
			elem.appendChild( rowDiv );
			rowDiv.className = 'ParametersRow';

			let text = document.createElement( 'p' );
			rowDiv.appendChild( text );
			text.innerHTML = parametersArray[i][0];

			let input = document.createElement( 'input' );
			input.id = parametersArray[i][0]; //'param_' + 
			input.type = 'number';

			if ( parametersArray[i][0].includes( 'Segments' )) {

				input.step = 1;

			}
			else {

				input.step = 0.1;

			}
			rowDiv.appendChild (input);
			input.value = Math.round( parametersArray[i][1] * 1000 )/1000;
			input.addEventListener( 'input', () => {

				if (input.value <= 0 ){

					input.value = 0.001;

				} 

				let ta_entities = new TA_Entities;

				ta_entities.updateSelectedObject(  input.id, +input.value, entity );

			}, false );

		}

	}

	

	updateParametersMenu( entity ) {

		if ( !entity.geometry.parameters ) {

			console.warn( "No Params" );

			return;

		}

		let parametersArray = Object.entries(entity.geometry.parameters);

		for (let i = 0; i < parametersArray.length; i++) {

			let dom = document.getElementById( parametersArray[i][0] );
			dom.value = Math.round( parametersArray[i][1] * 1000 )/1000;

		}

		
	}

	deleteParametersMenu() {

		let rows = document.getElementById( 'ParametersRows' );
		if (rows) rows.remove();

	}

}

class Toolbar extends TA_UI {

	constructor(containerName) {

		
	}

}