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
	let taEntities = new TA_Entities();

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
		let DragCheck = document.createElement( 'input' );
		DragCheck.type = 'checkbox';
		DragCheck.name = 'DragCheck';
		DragCheck.id = 'DragCheck';
		DragCheck.value = 'Drag';
		DragCheck.addEventListener( 'click', switchDrag );
		manipulatingContainer.appendChild( DragCheck );

		let labelDrag = document.createElement( 'label' );
		labelDrag.innerHTML = 'Drag';
		labelDrag.htmlFor = DragCheck.id;
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
			if ( taScene.currentSelection.multiselection.children.length > 0 ){

				taScene.transformControls.attach( taScene.currentSelection.multiselection );
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
			if ( taScene.currentSelection.multiselection.children.length > 0 ){
				taScene.transformControls.attach( taScene.currentSelection.multiselection );
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
			if ( taScene.currentSelection.multiselection.children.length > 0 ){
				taScene.transformControls.attach( taScene.currentSelection.multiselection );
			}

			taScene.transformControlsMode = 'scale';
			taScene.transformControls.setMode( taScene.transformControlsMode );
			taScene.dragControls.deactivate();
			taScene.mode.action = 'select';
			taScene.controls.enableRotate = true;
		
			break;

		default:
			break;
	}

}

function switchDrag () {

	if (this.checked ) {

	if( taScene.currentSelection.object ) {

		// ta_UI.deleteParametersMenu();

			if( taScene.currentSelection.object ) {
				// taScene.transformControls.detach( taScene.currentSelection.object );
			}
			if ( taScene.currentSelection.multiselection.children.length === 0 ){
				// taScene.transformControls.detach( taScene.currentSelection.multiselection );
			}
			// taScene.transformControls.detach( taScene.currentSelection.object );
			
			taEntities.removeWireframeAndBoundingBox( taScene.currentSelection.object );

		}

		// taScene.transformControlsMode = '';
		// taScene.mode.action = '';
		taScene.dragControls.activate();
	}
	else{
		if( taScene.currentSelection.object ) {
			taEntities.selectEntity( taScene.currentSelection.object, taScene.currentSelection );
		}
		taScene.dragControls.deactivate();
	}

	
}

	console.log( 'ManipulateToolbar created' );

}

export { createManipulateToolbar };