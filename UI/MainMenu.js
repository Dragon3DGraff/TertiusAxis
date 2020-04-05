/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import { TA_UI } from "./TA_UI.js";

function createMainMenu (){

	let check = document.getElementById( 'mainMenu' );

	if ( check !== null ) {
		console.warn( 'MainMenu may be called only once')
		return;
	}

	let ta_UI = new TA_UI();

	let mainMenu = document.createElement( 'div' );
	mainMenu.className = 'mainMenu';
	mainMenu.id = 'mainMenu';
	document.body.appendChild( mainMenu );

	let author = ta_UI.addElement( mainMenu, 'p', 'Dragon3DGraff', '');
	author.className = 'author';

	let title = ta_UI.addElement( mainMenu, 'p', 'TertiusAxis', '');
	title.className = 'Title';


	let buttonOpenScene = ta_UI.addElement(mainMenu, 'button', 'File', '');
	buttonOpenScene.addEventListener('mouseover', (e) => {


	});

	let buttonEdit = ta_UI.addElement(mainMenu, 'button', 'Edit', '');
	buttonEdit.addEventListener('mouseover', (e) => {


	});

	let buttonHelp = ta_UI.addElement(mainMenu, 'button', 'Help', '');
	buttonHelp.addEventListener('click', (e) => {

		


	});

	console.log( 'MainMenu created' );

	return mainMenu;

}

export { createMainMenu };