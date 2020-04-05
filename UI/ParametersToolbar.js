/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import { TA_UI } from "./TA_UI.js";

function createParametersToolbar() {

	let check = document.getElementById( 'paramContainer' );

	if ( check !== null ) {
		console.warn( 'paramContainer may be called only once')
		return;
	}

	let ta_UI = new TA_UI();

	let paramContainer = ta_UI.createContainer( 'paramContainer', mainToolbar );
	paramContainer.className = 'paramContainer';
	
	let title = ta_UI.addElement( paramContainer,'p', 'Object parameters &#9650', '');
	title.className = 'sectionName';

	title.addEventListener ('click',
	function () {
		let addToSceneButtons = document.getElementById( 'paramsDiv');

		if (addToSceneButtons.style.display === 'block') {

			addToSceneButtons.style.display = 'none';
			this.innerHTML = 'Object parameters &#9660';

		}
		else {
			
			addToSceneButtons.style.display = 'block';

			this.innerHTML = 'Object parameters &#9650';

		}

	},
	false
	);

	let paramsDiv = ta_UI.addElement( paramContainer, 'div','','');
	paramsDiv.id = 'paramsDiv';
	paramsDiv.style.display = 'block';

	let tabsButtons = ta_UI.addElement( paramsDiv, 'div', '','');
	tabsButtons.className = 'tabsButtons';
	tabsButtons.id = 'tabsButtons';
	tabsButtons.style.display = 'none';

	let tabGeometry = ta_UI.addElement( tabsButtons, 'button', 'Geometry', '',
	function () {

		// this.style.backgroundColor = 'darkslategrey';

		let divGeometry = document.getElementById( 'GeometryParameters');
		divGeometry.style.display = 'block';
		tabGeometry.style.backgroundColor = 'darkslategrey';
		let divMaterial = document.getElementById( 'MaterialParameters');
		divMaterial.style.display = 'none';
		tabMaterial.style.backgroundColor = 'rgb(51, 51, 51)';
		let divGeneral = document.getElementById( 'GeneralParameters');
		divGeneral.style.display = 'none';
		tabGeneral.style.backgroundColor = 'rgb(51, 51, 51)';

	}
	)
	let tabMaterial = ta_UI.addElement( tabsButtons, 'button', 'Material', '',
	function(){

		// this.style.backgroundColor = 'darkslategrey';

		let divGeometry = document.getElementById( 'GeometryParameters');
		divGeometry.style.display = 'none';
		tabGeometry.style.backgroundColor = 'rgb(51, 51, 51)';
		let divMaterial = document.getElementById( 'MaterialParameters');
		divMaterial.style.display = 'block';
		tabMaterial.style.backgroundColor = 'darkslategrey';
		let divGeneral = document.getElementById( 'GeneralParameters');
		divGeneral.style.display = 'none';
		tabGeneral.style.backgroundColor = 'rgb(51, 51, 51)';

	}
	)
	let tabGeneral = ta_UI.addElement( tabsButtons, 'button', 'General', '',
	function(){

		let divGeometry = document.getElementById( 'GeometryParameters');
		divGeometry.style.display = 'none';
		tabGeometry.style.backgroundColor = 'rgb(51, 51, 51)';
		let divMaterial = document.getElementById( 'MaterialParameters');
		divMaterial.style.display = 'none';
		tabMaterial.style.backgroundColor = 'rgb(51, 51, 51)';
		let divGeneral = document.getElementById( 'GeneralParameters');
		divGeneral.style.display = 'block';
		tabGeneral.style.backgroundColor = 'darkslategrey';

	}
	);

	let tabs = ta_UI.addElement( paramsDiv, 'div', '', '');
	tabs.className = 'tabs';
	tabs.id = 'tabs';

	let geometryParameters = ta_UI.addElement( tabs, 'div','','');
	geometryParameters.className = 'GeometryParameters';
	geometryParameters.id = 'GeometryParameters';

	let materialParameters = ta_UI.addElement( tabs, 'div','','');
	materialParameters.className = 'MaterialParameters';
	materialParameters.id = 'MaterialParameters';

	let generalParameters = ta_UI.addElement( tabs, 'div','','');
	generalParameters.className = 'GeneralParameters';
	generalParameters.id = 'GeneralParameters';


	console.log( 'ParametersToolbar created' );

}

export { createParametersToolbar };