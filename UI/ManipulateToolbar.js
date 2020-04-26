/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import { TA_UI } from "./TA_UI.js";
import {TA_Entities} from "../../Entities/TA_Entities.js";

function createManipulateToolbar ( taScene ){

	let check = document.getElementById( 'ManipulateToolbar' );

	if ( check !== null ) {
		console.warn( 'ManipulateToolbar may be called only once')
		return;
	}

	let ta_UI = new TA_UI();

	let manipulatingContainer = ta_UI.createContainer( 'ManipulateToolbar', mainToolbar );

	let buttonSelect = ta_UI.addElement(
		manipulatingContainer,
		'button',
		'Select ',
		"",
		function () {
			taScene.mode.action = 'select';
			taScene.transformControlsMode = '';
			taScene.transformControls.detach( taScene.currentSelection.object );
			taScene.dragControls.deactivate();
			taScene.controls.enableRotate = true;
		}

	);
	ta_UI.addElement(
		manipulatingContainer,
		'button',
		'Move',
		"",
		function () {
			taScene.transformControlsMode = 'translate';
			if( taScene.currentSelection.object ) {
				taScene.transformControls.attach( taScene.currentSelection.object );
			}
			taScene.transformControls.setMode( taScene.transformControlsMode );
			taScene.dragControls.deactivate();
			taScene.mode.action = 'select';
			taScene.controls.enableRotate = true;
		}

	);
	ta_UI.addElement(
		manipulatingContainer,
		'button',
		'Rotate',
		"",
		function () {
			taScene.transformControlsMode = 'rotate';
			if( taScene.currentSelection.object ) {
				taScene.transformControls.attach( taScene.currentSelection.object );
			}
			taScene.transformControls.setMode( taScene.transformControlsMode );
			taScene.dragControls.deactivate();
			taScene.mode.action = 'select';
			taScene.controls.enableRotate = true;
		}

	);
	ta_UI.addElement(
		manipulatingContainer,
		'button',
		'Scale',
		"",
		function () {
			if( taScene.currentSelection.object ) {
				taScene.transformControls.attach( taScene.currentSelection.object );
			}

			taScene.transformControlsMode = 'scale';
			taScene.transformControls.setMode( taScene.transformControlsMode );
			taScene.dragControls.deactivate();
			taScene.mode.action = 'select';
			taScene.controls.enableRotate = true;
		}

	);
	ta_UI.addElement(
		manipulatingContainer,
		'button',
		'Drag',
		"",
		function () {

			if( taScene.currentSelection.object ) {

				taScene.transformControls.detach( taScene.currentSelection.object );
				let taEntities = new TA_Entities();
				taEntities.removeSelection( taScene.currentSelection );

			}

			taScene.transformControlsMode = '';
			taScene.mode.action = '';
			taScene.dragControls.activate();
			// taScene.controls.enableRotate = false;
			// taScene.controls.transformGroup = true;
		}

	);

	console.log( 'ManipulateToolbar created' );

}

export { createManipulateToolbar };