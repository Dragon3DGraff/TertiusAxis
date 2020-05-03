/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import { TA_UI } from "./TA_UI.js";
 import { Color } from "../../node_modules/three/build/three.module.js";

function fillMaterialParametersTab( entity ) {

	let ta_UI = new TA_UI();

	
	let divMaterial = document.getElementById( 'MaterialParameters');
	let elemMaterial = document.createElement( 'div' );
	elemMaterial.id = 'ParametersMaterialRows';
	divMaterial.appendChild( elemMaterial );

	//-------------------------------------

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

	];

	let rowDiv = document.createElement( 'div' );
	rowDiv.className = 'ParametersRow';

	let text = document.createElement( 'p' );
	rowDiv.appendChild( text );
	text.innerHTML = 'Type';

	let inputMaterialType = document.createElement( 'select' );
	inputMaterialType.id = 'MaterialType';
	inputMaterialType.className = 'selectMaterial';
		
	elemMaterial.appendChild( rowDiv );

	for (let n = 0; n < materialTypes.length; n++)
	{
		let option = document.createElement("option");
		option.text = materialTypes[n];
		option.value = materialTypes[n];
		inputMaterialType.add(option) ;
	}

	inputMaterialType.value = entity.material.type;
	inputMaterialType.disabled = 'true';

	rowDiv.appendChild ( inputMaterialType );

	//-------------------------------------

	rowDiv = ta_UI.addParametersRow( 'Color', 'color', entity.material.color );
	elemMaterial.appendChild( rowDiv );
	let inputMaterialColor = ta_UI.getInput(rowDiv);
	inputMaterialColor.className = 'inputColor';
	inputMaterialColor.value = '#' + entity.material.color.getHexString ();

	inputMaterialColor.addEventListener('input',
	
		function(){

			entity.material.color = new Color( this.value );

			let color = entity.material.color;
			
			updateColorComponentsInputsSlider( color );
			updateColorComponentsInputs( color );

		}

	);

	//-------------------------------------

	ta_UI.addElement( elemMaterial, 'p', 'Color components', '');

	let parametersMaterial = Object.entries( entity.material.color );

	for (let i = 0; i < parametersMaterial.length; i++) {

		let rowDiv = document.createElement( 'div' );
		elemMaterial.appendChild( rowDiv );
		rowDiv.className = 'ParametersRowRange';

		let text = document.createElement( 'p' );
		rowDiv.appendChild( text );
		switch (parametersMaterial[i][0]) {
			case 'r':
				text.innerHTML = 'Red';
				break;
			case 'g':
				text.innerHTML = 'Green';
				break;
			case 'b':
				text.innerHTML = 'Blue';
				break;
		
			default:
				break;
		}

		let inputNumber = document.createElement( 'input' );
		inputNumber.id = parametersMaterial[i][0] + '_number'; 
		inputNumber.type = 'number';
		inputNumber.value =  parametersMaterial[i][1];
		inputNumber.step = 0.01;
		inputNumber.min = 0;
		inputNumber.max = 1;
		inputNumber.addEventListener( 'input', () => {

			let nameOfParameter = parametersMaterial[i][0];

			entity.material.color[nameOfParameter] = inputNumber.value;

			let color = entity.material.color;

			updateColorInput ( color );
			updateColorComponentsInputsSlider( color );

		}, false );
		
		rowDiv.appendChild (inputNumber);

		let inputSlider = document.createElement( 'input' );
		inputSlider.id = parametersMaterial[i][0]; 
		inputSlider.type = 'range';
		inputSlider.className = 'slider';
		
		rowDiv.appendChild (inputSlider);

		inputSlider.value =  parametersMaterial[i][1];
		inputSlider.step = 0.001;
		inputSlider.min = 0;
		inputSlider.max = 1;

		inputSlider.addEventListener( 'input', () => {

			let nameOfParameter = parametersMaterial[i][0];

			entity.material.color[nameOfParameter] = inputSlider.value;

			let color = entity.material.color;

			updateColorInput ( color );
			updateColorComponentsInputs( entity.material.color );

		}, false );

	}

	function updateColorInput ( color ){

		let colorInput = document.getElementById( 'Color' );
		colorInput.value = '#' + color.getHexString ();


	}

	function updateColorComponentsInputsSlider( color ) {

		let componentRed = document.getElementById('r');
		componentRed.value = color.r;
		let componentGreen = document.getElementById('g');
		componentGreen.value = color.g;
		let componentBlue = document.getElementById('b');
		componentBlue.value = color.b;
		
	}

	function updateColorComponentsInputs( color ) {

		let componentRed = document.getElementById('r_number');
		componentRed.value = Math.round(color.r * 1000)/1000;
		let componentGreen = document.getElementById('g_number');
		componentGreen.value =Math.round(color.g * 1000)/1000;
		let componentBlue = document.getElementById('b_number');
		componentBlue.value = Math.round(color.b * 1000)/1000;
		
	}

}

export { fillMaterialParametersTab };