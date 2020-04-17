/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import { TA_UI } from "./TA_UI.js";
import * as THREE from "../build/three.module.js";
import {TA_Entities} from "../Entities/TA_Entities.js";

function createMainMenu ( ta_scene ){

	let check = document.getElementById( 'mainMenu' );

	if ( check !== null ) {
		console.warn( 'MainMenu may be called only once')
		return;
	}

	let ta_UI = new TA_UI();

	let mainMenu = document.createElement( 'div' );
	mainMenu.className = 'mainMenu';
	mainMenu.id = 'mainMenu';
	// mainMenu.style.height = '18px';
	document.body.appendChild( mainMenu );

	let author = ta_UI.addElement( mainMenu, 'p', 'Dragon3DGraff', '');
	author.className = 'author';

	let title = ta_UI.addElement( mainMenu, 'p', 'TertiusAxis', '');
	title.className = 'Title';

// menu buttons

	let buttonFile = ta_UI.addElement( mainMenu, 'button', 'File', '');

	buttonFile.addEventListener('mouseover', (e) => {

		let heightMainMenu = mainMenu.offsetHeight;
		let positionButtonFile = offsetPosition( buttonFile );

		fileMenu.style.left = positionButtonFile[0] + 'px';

		fileMenu.style.top = heightMainMenu - 1 + 'px';
		fileMenu.style.visibility = 'visible';


	});
	buttonFile.addEventListener('mouseout', (e) => {

		if ( !e.relatedTarget || e.relatedTarget.offsetParent.id !== 'fileMenu') {

			fileMenu.style.visibility = 'hidden';

		}

	});

	let buttonEdit = ta_UI.addElement( mainMenu, 'button', 'Edit', '');
	buttonEdit.addEventListener('mouseover', (e) => {

		let heightMainMenu = mainMenu.offsetHeight;

		let positionButtonFile = offsetPosition( buttonEdit );

		// fileMenu.style.left = positionButtonFile[0] + 'px';
		// fileMenu.style.top = heightMainMenu + 'px';

		// fileMenu.style.visibility = 'visible';

	});

	let buttonSettings = ta_UI.addElement( mainMenu, 'button', 'Settings', '');
	buttonSettings.addEventListener('mouseover', (e) => {


	});

	let buttonHelp = ta_UI.addElement( mainMenu, 'button', 'Help', '');
	buttonHelp.addEventListener('mouseover', (e) => {

		let heightMainMenu = mainMenu.offsetHeight;
		let positionButtonFile = offsetPosition( buttonHelp );

		helpMenu.style.left = positionButtonFile[0] + 'px';

		helpMenu.style.top = heightMainMenu + 'px';
		helpMenu.style.visibility = 'visible';


	});

	buttonHelp.addEventListener('mouseout', (e) => {

		if ( !e.relatedTarget || e.relatedTarget.offsetParent.id !== 'helpMenu') {

			helpMenu.style.visibility = 'hidden';

		}

	});

	//subMenus

	let fileMenu = ta_UI.createContainer( 'fileMenu', mainMenu);
	fileMenu.className = 'subMainMenu';	

	fileMenu.addEventListener('mouseout', function(e) {

		if ( !e.relatedTarget || e.relatedTarget.offsetParent.id !== 'fileMenu') {

			this.style.visibility = 'hidden';

		}

	});

	let saveinBrowserButton = ta_UI.addElement( fileMenu, 'label', 'Save in browser', '', saveSceneInBrowser);

	let saveToDiskButton = ta_UI.addElement( fileMenu, 'label', 'Save on disk', '', saveSceneOnDisk);

	let loadFromDiskLabel = ta_UI.addElement( fileMenu, 'label', 'Load scene from disk', '');
	let loadFromDiskButton = ta_UI.addElement( loadFromDiskLabel, 'input', '', '');
	loadFromDiskButton.type = 'file';
	loadFromDiskButton.className = 'selectFile';

	loadFromDiskLabel.addEventListener( 'change', function loadSceneFromDisk( e ){

		let file = e.srcElement.files[0];

		let reader = new FileReader();

		reader.readAsText(file);

		reader.onload = function() {
		

		let loader = new THREE.ObjectLoader();

		let loadedScene = loader.parse( JSON.parse( reader.result ) );

		let children = loadedScene.children;

		// ta_scene.scene.add( loadedScene );

		let elemToImport = [];

		children.forEach( element => {

			if ( element.userData.createdByUser ) {

				elemToImport.push( element );

				if ( element.userData.selectable ){

					ta_scene.selectableObjects.push( element );

				}

				Object.assign( ta_scene.scene.children, elemToImport );

			}


		});

		reader.onerror = function() {
			alert(reader.error);
		  };


  };

	} );

	function saveSceneInBrowser () {

		alert( 'Not implemented' );

		// console.log( 'Scene saved in browser' );

	}

	function saveSceneOnDisk () {

		let link = document.createElement('a');
		link.download = 'Scene.txt';

		let ta_entities = new TA_Entities();

		ta_entities.removeSelection(ta_scene.selectedObject);

		let blob = new Blob([JSON.stringify(ta_scene.scene.toJSON(), null, 2)], {type: 'text/plain'});

		link.href = URL.createObjectURL(blob);

		link.click();

		URL.revokeObjectURL(link.href);

			// console.log(  'Scene saved on Disk' );

	}


	//---------------

	let helpMenu = ta_UI.createContainer( 'helpMenu', mainMenu);
	helpMenu.className = 'subMainMenu';	

	helpMenu.addEventListener('mouseout', function(e) {

		if ( !e.relatedTarget || e.relatedTarget.offsetParent.id !== 'fileMenu') {

			this.style.visibility = 'hidden';

		}

	});

	let about = ta_UI.addElement( helpMenu, 'label', 'About', '', aboutOpen);

	function aboutOpen() {

		window.open( 'https://dragon3dgraff.ru/' );

	}

	//===============

	function offsetPosition( element ) {

		var offsetLeft = 0, offsetTop = 0;

		do {

			offsetLeft += element.offsetLeft;
			offsetTop += element.offsetTop;

		} while ( element = element.offsetParent );

		return [offsetLeft, offsetTop];

	}
	

	console.log( 'MainMenu created' );

	return mainMenu;

}

export { createMainMenu };