/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import { TA_UI } from "./TA_UI.js";
import {TA_Entities} from "../Entities/TA_Entities.js";

function createManipulateToolbar ( taScene ){

	let check = document.getElementById( 'ManipulateToolbar' );

	if ( check !== null ) {
		console.warn( 'ManipulateToolbar may be called only once')
		return;
	}

	let ta_UI = new TA_UI();

	let manipulatingContainer = ta_UI.createContainer( 'ManipulateToolbar', mainToolbar );

		// Select Button
		let radioSelect = document.createElement( 'input' );
		radioSelect.type = 'radio';
		radioSelect.name = 'manupulateRadio';
		radioSelect.id = 'SelectRadio';
		radioSelect.value = 'Select';
		radioSelect.checked = true;
		radioSelect.addEventListener( 'click', switchMode );
		manipulatingContainer.appendChild( radioSelect );

		let labelSelect = document.createElement( 'label' );
		labelSelect.innerHTML = 'Select';
		labelSelect.htmlFor = radioSelect.id;
		manipulatingContainer.appendChild( labelSelect );

		// Move Button
		let radioMove = document.createElement( 'input' );
		radioMove.type = 'radio';
		radioMove.name = 'manupulateRadio';
		radioMove.id = 'MoveRadio';
		radioMove.value = 'Move';
		radioMove.addEventListener( 'click', switchMode );
		manipulatingContainer.appendChild( radioMove );

		let labelMove = document.createElement( 'label' );
		labelMove.innerHTML = 'Move';
		labelMove.htmlFor = radioMove.id;
		manipulatingContainer.appendChild( labelMove );

		// Rotate Button
		let radioRotate = document.createElement( 'input' );
		radioRotate.type = 'radio';
		radioRotate.name = 'manupulateRadio';
		radioRotate.id = 'RotateRadio';
		radioRotate.value = 'Rotate';
		radioRotate.addEventListener( 'click', switchMode );
		manipulatingContainer.appendChild( radioRotate );

		let labelRotate = document.createElement( 'label' );
		labelRotate.innerHTML = 'Rotate';
		labelRotate.htmlFor = radioRotate.id;
		manipulatingContainer.appendChild( labelRotate );

		// Scale Button
		let radioScale = document.createElement( 'input' );
		radioScale.type = 'radio';
		radioScale.name = 'manupulateRadio';
		radioScale.id = 'ScaleRadio';
		radioScale.value = 'Scale';
		radioScale.addEventListener( 'click', switchMode );
		manipulatingContainer.appendChild( radioScale );

		let labelScale = document.createElement( 'label' );
		labelScale.innerHTML = 'Scale';
		labelScale.htmlFor = radioScale.id;
		manipulatingContainer.appendChild( labelScale );

		// Drag Button
		let radioDrag = document.createElement( 'input' );
		radioDrag.type = 'radio';
		radioDrag.name = 'manupulateRadio';
		radioDrag.id = 'DragRadio';
		radioDrag.value = 'Drag';
		radioDrag.addEventListener( 'click', switchMode );
		manipulatingContainer.appendChild( radioDrag );

		let labelDrag = document.createElement( 'label' );
		labelDrag.innerHTML = 'Drag';
		labelDrag.htmlFor = radioDrag.id;
		manipulatingContainer.appendChild( labelDrag );


function switchMode( selectedRadio ) {

	let selectedButton = selectedRadio.target.id;

	switch (selectedButton) {
		case 'SelectRadio':

			taScene.mode.action = 'select';
			taScene.transformControlsMode = '';
			taScene.transformControls.detach( taScene.currentSelection.object );
			taScene.dragControls.deactivate();
			taScene.controls.enableRotate = true;
			
			break;

		case 'MoveRadio':

			taScene.transformControlsMode = 'translate';
			if( taScene.currentSelection.object ) {
				taScene.transformControls.attach( taScene.currentSelection.object );
			}
			taScene.transformControls.setMode( taScene.transformControlsMode );
			taScene.dragControls.deactivate();
			taScene.mode.action = 'select';
			taScene.controls.enableRotate = true;
		
			break;

		case 'RotateRadio':

			taScene.transformControlsMode = 'rotate';
			if( taScene.currentSelection.object ) {
				taScene.transformControls.attach( taScene.currentSelection.object );
			}
			taScene.transformControls.setMode( taScene.transformControlsMode );
			taScene.dragControls.deactivate();
			taScene.mode.action = 'select';
			taScene.controls.enableRotate = true;
		
			break;

		case 'ScaleRadio':

			if( taScene.currentSelection.object ) {
				taScene.transformControls.attach( taScene.currentSelection.object );
			}

			taScene.transformControlsMode = 'scale';
			taScene.transformControls.setMode( taScene.transformControlsMode );
			taScene.dragControls.deactivate();
			taScene.mode.action = 'select';
			taScene.controls.enableRotate = true;
		
			break;

		case 'DragRadio':

			if( taScene.currentSelection.object ) {

				ta_UI.deleteParametersMenu();
				taScene.transformControls.detach( taScene.currentSelection.object );
				let taEntities = new TA_Entities();
				taEntities.removeSelection( taScene.currentSelection );

			}

			taScene.transformControlsMode = '';
			taScene.mode.action = '';
			taScene.dragControls.activate();

			break;
	
		default:
			break;
	}

}

	console.log( 'ManipulateToolbar created' );

}

export { createManipulateToolbar };