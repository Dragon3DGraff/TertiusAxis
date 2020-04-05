/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import { TA_UI } from "./TA_UI.js";

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
		}

	);
	ta_UI.addElement(
		manipulatingContainer,
		'button',
		'Move',
		"",
		function () {
			taScene.mode.action = 'move';
		}

	);
	ta_UI.addElement(
		manipulatingContainer,
		'button',
		'Rotate',
		"",
		function () {
			taScene.mode.action = 'rotate';
		}

	);
	ta_UI.addElement(
		manipulatingContainer,
		'button',
		'Scale',
		"",
		function () {
			taScene.mode.action = 'scale';
		}

	);
	ta_UI.addElement(
		manipulatingContainer,
		'button',
		'Drag',
		"",
		function () {
			taScene.mode.action = 'drag';
		}

	);

	console.log( 'ManipulateToolbar created' );

}

export { createManipulateToolbar };