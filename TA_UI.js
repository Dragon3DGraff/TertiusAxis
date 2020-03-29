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
		mainToolbar.appendChild( hideButton );



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

		let divGeometry = document.getElementById( 'GeometryParameters');
		let elem = document.createElement( 'div' );
		elem.id = 'ParametersGoemetryRows';
		divGeometry.appendChild( elem );

		// let typeOfObject = document.createElement( 'div' );
		// typeOfObject.id = 'ParametersRows';
		// elem.appendChild( typeOfObject );
		// typeOfObject.innerHTML = entity.geometry.type + ' id = ' + entity.id;


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

		//MaterialParameters

		let divMaterial = document.getElementById( 'MaterialParameters');
		let elemMaterial = document.createElement( 'div' );
		elemMaterial.id = 'ParametersMaterialRows';
		divMaterial.appendChild( elemMaterial );

		let materialTypes = [

			'LineBasicMaterial',
			'LineDashedMaterial',
			'MeshBasicMaterial',
			'MeshDepthMaterial',
			'MeshNormalMaterial',
			'MeshLambertMaterial',
			'MeshMatcapMaterial',
			'MeshPhongMaterial',
			'MeshToonMaterial',
			'MeshStandardMaterial',
			'MeshPhysicalMaterial',
			'RawShaderMaterial',
			'ShaderMaterial',
			'ShadowMaterial',
			'SpriteMaterial',

		]

		let rowDiv = document.createElement( 'div' );
			
			rowDiv.className = 'ParametersRow';

			let text = document.createElement( 'p' );
			rowDiv.appendChild( text );
			text.innerHTML = 'Type';

			let input = document.createElement( 'select' );
			input.id = 'MaterialType';
			input.className = 'selectMaterial';
			
		elemMaterial.appendChild( rowDiv );

		for (let n = 0; n < materialTypes.length; n++)
		{
			let option = document.createElement("option");
			option.text = materialTypes[n];
			option.value = materialTypes[n];
			input.add(option) ;
		}

		rowDiv.appendChild (input);

		input.value = entity.material.type;

		rowDiv = addParametersRow( 'Color', 'color', entity.material.color );
		elemMaterial.appendChild( rowDiv );
		input = getInput(rowDiv);
		input.className = 'inputColor';
		input.value = '#' + entity.material.color.getHexString ();

		input.addEventListener('input',
		
			function(){

				entity.material.color = new THREE.Color( this.value );
				updateColorComponentsInputs( entity.material.color );

			}

		);

		this.addElement( elemMaterial, 'p', 'Color components', '');

		let parametersMaterial = Object.entries( entity.material.color );

		for (let i = 0; i < parametersMaterial.length; i++) {

			let rowDiv = document.createElement( 'div' );
			elemMaterial.appendChild( rowDiv );
			rowDiv.className = 'ParametersRow';

			let text = document.createElement( 'p' );
			rowDiv.appendChild( text );
			text.innerHTML = parametersMaterial[i][0];

			let input = document.createElement( 'input' );
			input.id = parametersMaterial[i][0]; 
			input.type = 'range';
			input.className = 'slider';
			
			rowDiv.appendChild (input);

			input.value =  parametersMaterial[i][1];
			input.step = 0.01;
			input.min = 0;
			input.max = 1;

			input.addEventListener( 'input', () => {

				let nameOfParameter = parametersMaterial[i][0];

				entity.material.color[nameOfParameter] = input.value;
				let colorInput = document.getElementById('Color');
				colorInput.value = '#' + entity.material.color.getHexString ();

			}, false );

		}

		function updateColorComponentsInputs( color ) {

			let componentRed = document.getElementById('r');
			componentRed.value = color.r;
			let componentGreen = document.getElementById('g');
			componentGreen.value = color.g;
			let componentBlue = document.getElementById('b');
			componentBlue.value = color.b;
			
		}

		//GeneralParameters

		let divGeneral = document.getElementById( 'GeneralParameters');
		let elemGeneral = document.createElement( 'div' );
		elemGeneral.id = 'ParametersGeneralRows';
		divGeneral.appendChild( elemGeneral );

		// this.addElement( elemGeneral, 'p', 'Name', '');
		rowDiv = addParametersRow( 'Name', 'string', entity.name );
		elemGeneral.appendChild( rowDiv );
		input = getInput(rowDiv);
		input.addEventListener( 'input', () => {

			entity.name = input.value;

		}, false );

		let inputId = addParametersRow( 'id', 'string', entity.id );
		inputId.disabled = true;

		this.addElement( elemGeneral, 'p', 'Position', '');

		let parametersGeneral = Object.entries( entity.position );

		for (let i = 0; i < parametersGeneral.length; i++) {

			let nameOfParameter = parametersGeneral[i][0];
			let valueOfParameter = Math.round( parametersGeneral[i][1] * 1000 )/1000;;

			let rowDiv = addParametersRow( nameOfParameter, 'number', valueOfParameter );
			elemGeneral.appendChild( rowDiv );
			let input = getInput(rowDiv);
			input.step = 0.1;

			input.addEventListener( 'input', () => {

				entity.position[nameOfParameter] = input.value;

			}, false );

		}

		this.addElement( elemGeneral, 'p', 'Rotation', '');

		 parametersGeneral = Object.entries( {x: entity.rotation.x, y: entity.rotation.y, z: entity.rotation.z } );

		for (let i = 0; i < parametersGeneral.length; i++) {

			let nameOfParameter = parametersGeneral[i][0];
			let valueOfParameter = Math.round( parametersGeneral[i][1] * 1000 )/1000;;

			let rowDiv = addParametersRow( nameOfParameter, 'number', valueOfParameter );
			elemGeneral.appendChild( rowDiv );
			let input = getInput(rowDiv);

			input.step = 0.1;
			input.addEventListener( 'input', () => {

				entity.rotation[nameOfParameter] = input.value;

			}, false );

		}

		this.addElement( elemGeneral, 'p', 'Scale', '');

		parametersGeneral = Object.entries( entity.scale );

		for (let i = 0; i < parametersGeneral.length; i++) {

			let nameOfParameter = parametersGeneral[i][0].replace('_','');
			let valueOfParameter = Math.round( parametersGeneral[i][1] * 1000 )/1000;;

			let rowDiv = addParametersRow( nameOfParameter, 'number', valueOfParameter );
			elemGeneral.appendChild( rowDiv );
			let input = getInput(rowDiv);

			input.step = 0.1;
			input.addEventListener( 'input', () => {

			entity.scale[nameOfParameter] = input.value;

		   }, false );

		}

		function addParametersRow( nameOfParameter, inputType, valueOfParameter) {

			let rowDiv = document.createElement( 'div' );
			
			rowDiv.className = 'ParametersRow';

			let text = document.createElement( 'p' );
			rowDiv.appendChild( text );
			text.innerHTML = nameOfParameter;

			let input = document.createElement( 'input' );
			input.id = nameOfParameter;
			input.type = inputType;

			
			rowDiv.appendChild (input);

			input.value = valueOfParameter;

			return rowDiv;
			
		}

		function getInput (rowDiv){
			let input = rowDiv.getElementsByTagName( 'input');
			return input[0];
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

		let rows = document.getElementById( 'ParametersGoemetryRows' );
		if (rows) rows.remove();
		rows = document.getElementById( 'ParametersMaterialRows' );
		if (rows) rows.remove();
		rows = document.getElementById( 'ParametersGeneralRows' );
		if (rows) rows.remove();

	}

}

class Toolbar extends TA_UI {

	constructor(containerName) {

		
	}

}