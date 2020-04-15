/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import { createMainMenu } from "./MainMenu.js";
import { createMainToolbar } from "./MainToolbar.js";
import { createManipulateToolbar } from "./ManipulateToolbar.js";
import { createAddToSceneToolbar } from "./AddToSceneToolbar.js";
import { createParametersToolbar } from "./ParametersToolbar.js";
import { fillGeometryParametersTab } from "./GeometryParametersTab.js";
import { fillMaterialParametersTab } from "./MaterialParametersTab.js";
import { fillGeneralParametersTab } from "./GeneralParametersTab.js";


class TA_UI {

	constructor( ) {
	}

	init() {

		createMainMenu();
		createMainToolbar();

		return true;

	}

	fillMainToolbar( taScene ){

		createManipulateToolbar( taScene );
		createAddToSceneToolbar( taScene );
		createParametersToolbar();

		return true;

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

	createContainer( containerName, parentElement ) {

		let dom = document.createElement( 'div' );
		dom.className = containerName;
		dom.id = containerName;
		parentElement.appendChild( dom );
		return dom;

	}

	createParametersMenu( entity ) {

		if ( !entity.geometry.parameters) {

			console.warn( "No Params" );

			return;

		}

		this.deleteParametersMenu();

		let tabsButtons = document.getElementById ( 'tabsButtons' );
		tabsButtons.style.display = 'flex';

		fillGeometryParametersTab( entity );
		fillMaterialParametersTab( entity );
		fillGeneralParametersTab( entity );

	}

	addParametersRow( nameOfParameter, inputType, valueOfParameter) {

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

	getInput (rowDiv){

		let input = rowDiv.getElementsByTagName( 'input');
		return input[0];
		
	}

	updateParametersMenu( entity ) {

		if ( !entity.geometry.parameters ) {

			console.warn( "No Params" );

			return;

		}

		let parametersArray = Object.entries(entity.geometry.parameters);

		for (let i = 0; i < parametersArray.length; i++) {


			let dom = document.getElementById( parametersArray[i][0] );

			if ( dom.type === 'number' ){

				dom.value = Math.round( parametersArray[i][1] * 1000 )/1000;

			}

		}

		
	}

	deleteParametersMenu() {

		let rows = document.getElementById( 'ParametersGoemetryRows' );
		if (rows) rows.remove();
		rows = document.getElementById( 'ParametersMaterialRows' );
		if (rows) rows.remove();
		rows = document.getElementById( 'ParametersGeneralRows' );
		if (rows) rows.remove();

		tabsButtons.style.display = 'none';

	}

}

export { TA_UI };

