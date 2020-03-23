/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */
"use strict" 

class TA_UI {

	constructor( ) {

		this.main;

	}

	setScene( taScene ){

		this.taScene = taScene;
	
	}

	init() {

		let mainToolbar = document.createElement( 'div' );
		mainToolbar.className = 'mainToolbar';
		mainToolbar.id = 'mainToolbar';
		document.body.appendChild( mainToolbar );

		let hideButton = document.createElement( 'div');
		hideButton.className = 'hideButton';
		hideButton.id = 'hideButton';
		hideButton.innerHTML = '&#9668';
		mainToolbar.style.left = '0px';
		hideButton.addEventListener( 'click', (e) => {

			// mainToolbar.style.visibility = (mainToolbar.style.visibility === 'visible')?'hidden':'visible';

			if (mainToolbar.style.left === '0px') {

				// console.log( mainToolbar.style.left.replace('px',''));

				requestAnimationFrame(
					function moveAnim (){
						let pos = mainToolbar.style.left.replace('px','');
						pos -= 10;
						mainToolbar.style.left = pos + 'px';
						if (mainToolbar.style.left.replace('px','') > -250) {
							hideButton.innerHTML = '&#9658';
							requestAnimationFrame(moveAnim);
						}

					}
				);

				// mainToolbar.style.left = '-250px';
				// hideButton.innerHTML = '>';
			}
			else {
				mainToolbar.style.left = '0px';
				hideButton.innerHTML = '&#9668';
			}

			// mainToolbar.style.left = (mainToolbar.style.left === '0px')?'-250px':'0px';

			// mainToolbar.style.width = (mainToolbar.style.width === '0px')?'250px':'0px';

		}
		)
		mainToolbar.appendChild( hideButton);



		return this.main = mainToolbar;

	}
	
	addElement( container, elementName, text, imgLink, func ) {

		let dom = document.createElement( elementName );
		container.appendChild( dom );

		dom.innerHTML = text;

		if ( imgLink !== "" ){
			let img = document.createElement( 'img' );
			img.src = imgLink;
			dom.appendChild( img );
		}
		
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

			if ( parametersArray[i][0].toUpperCase().includes( 'SEGMENTS' )) {

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

		

		let materialParams = document.createElement( 'input' );
		materialParams.id = 'ParametersRows';
		elem.appendChild( materialParams );
		materialParams.value = entity.material.type;

		// console.log( entity.material );

		let parametersMaterial = Object.entries( entity.material );

		for (let i = 0; i < parametersMaterial.length; i++) {

			let rowDiv = document.createElement( 'div' );
			elem.appendChild( rowDiv );
			rowDiv.className = 'ParametersRow';

			let text = document.createElement( 'p' );
			rowDiv.appendChild( text );
			text.innerHTML = parametersMaterial[i][0];

			let input = document.createElement( 'input' );
			input.id = parametersMaterial[i][0]; //'param_' + 
			// input.type = 'number';

			
			rowDiv.appendChild (input);

			input.value =  parametersMaterial[i][1];

			// input.value = Math.round( parametersMaterial[i][1] * 1000 )/1000;
			input.addEventListener( 'input', () => {

				if (input.value <= 0 ){

					input.value = 0.001;

				} 

				// let ta_entities = new TA_Entities;

				// ta_entities.updateSelectedObject(  input.id, +input.value, entity );

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