/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import { TA_UI } from "./TA_UI.js";

function createMainToolbar (){

	let check = document.getElementById( 'mainToolbar' );

	if ( check !== null ) {
		console.warn( 'MainToolbar may be called only once')
		return;
	}
	
	let ta_UI = new TA_UI();

	let mainToolbar = document.createElement( 'div' );
		
		mainToolbar.className = 'mainToolbar';
		mainToolbar.id = 'mainToolbar';
		document.body.appendChild( mainToolbar );

		let hideButton = document.createElement( 'div' );
		hideButton.className = 'hideButton';
		hideButton.id = 'hideButton';
		hideButton.innerHTML = '&#9668';
		mainToolbar.style.left = '0px';
		hideButton.addEventListener( 'click', (e) => {


			if (mainToolbar.style.left === '0px') {

				requestAnimationFrame(
					function moveAnim (){

						let pos = mainToolbar.style.left.replace('px','');
						pos -= 10;
						mainToolbar.style.left = pos + 'px';

						if ( mainToolbar.style.left.replace('px','') > -250 ) {

							hideButton.innerHTML = '&#9658';
							requestAnimationFrame( moveAnim );

						}

					}
				);

			}
			else {
				mainToolbar.style.left = '0px';
				hideButton.innerHTML = '&#9668';
			}

		}
		)
		mainToolbar.appendChild( hideButton );

		let infoDiv = ta_UI.createContainer( 'info', mainToolbar );
		let paragraph = ta_UI.addElement( infoDiv, 'p', '', '');
		paragraph.id = "infoParagraph"

	

	console.log( 'MainToolbar created' );

	// return mainToolbar;

}

export { createMainToolbar };