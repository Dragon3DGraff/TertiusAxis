/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import { TA_UI } from "./TA_UI.js";
import { TA_Entities } from "../TA_Entities.js";

function fillGeometryParametersTab( entity ) {

	let ta_UI = new TA_UI();

	let divGeometry = document.getElementById( 'GeometryParameters');
		let elem = document.createElement( 'div' );
		elem.id = 'ParametersGoemetryRows';
		divGeometry.appendChild( elem );

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
			rowDiv.appendChild ( input );
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

export { fillGeometryParametersTab };