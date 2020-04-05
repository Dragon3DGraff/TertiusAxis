/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

 import { TA_UI } from "./UI/TA_UI.js";
 import { TA_Scene } from "./TA_Scene.js";

class TertiusAxis {

	constructor(){

}

start (){
	let taUI = new TA_UI();
	taUI.init();
	let taScene = new TA_Scene( taUI );

		if ( taUI.fillMainToolbar( taScene ) ) {

			console.log( 'TertiusAxis loaded');

		}

}
	
}

export {TertiusAxis};

// git add .
// git commit -m "first commit"
// git push -u origin master
