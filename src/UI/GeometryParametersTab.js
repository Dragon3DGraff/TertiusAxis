/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import { TA_UI } from "./TA_UI.js";
import { TA_Entities } from "../Entities/TA_Entities.js";
import { TA_State } from '../TA_State';

function fillGeometryParametersTab( entity ) {

	let ta_UI = new TA_UI();
	let ta_State = new TA_State();

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

			let input;
			let ta_entities = new TA_Entities;
			

			if ( typeof( parametersArray[i][1] ) === "boolean" ) {

				input = document.createElement( 'select' );
				input.id = parametersArray[i][0];
				
				let option = document.createElement("option");
				option.text = 'true';
				option.value = 'true';
				input.add(option) ;
				option = document.createElement("option");
				option.text = 'false';
				option.value = 'false';
				input.add(option) ;

				input.value = parametersArray[i][1];

				input.addEventListener( 'input', () => {

					let value = JSON.parse( input.value );
	
					ta_entities.updateSelectedObject( input.id, value, entity );
					ta_State.changeAppState('GeometryParameters-' + input.id, input.value);

	
				}, false );

			}
			else {

				input = document.createElement( 'input' );

				input.id = parametersArray[i][0];
				input.min = 0.001;
				input.step = 0.1;

				input.type = 'number';
				input.value = Math.round( parametersArray[i][1] * 1000 )/1000;

				input.addEventListener( 'input', () => {

					ta_entities.updateSelectedObject( input.id, +input.value, entity );
					ta_State.changeAppState('GeometryParameters-' + input.id, input.value);

	
				}, false );

			}


			if ( parametersArray[i][0].toUpperCase().includes( 'SEGMENTS' ) ) {

				input.step = 1;
				input.min = 1;

			}

			
			if ( parametersArray[i][0].toUpperCase().includes( 'DETAIL' ) ) {

				input.step = 1;
				input.min = 0;
				input.max = 7;

			}


			//check max values to close object!!!
			
			//thetaLength : 2*Math.PI
			// if ( parametersArray[i][0].includes( 'thetaLength' )) {

			// 	input.max = 2*Math.PI;

			// }




			rowDiv.appendChild ( input );


		}



}

export { fillGeometryParametersTab };