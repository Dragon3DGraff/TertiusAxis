/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */
import './style.css';
// import favicon from './logo5_Small5.png'
import { TA_UI } from "./UI/TA_UI.js";
import { TA_Scene } from "./TA_Scene.js";
 
// let header = document.getElementsByTagName("head");
// header[0].getElementsByTagName('link')[0].href = favicon;


	let ta_UI = new TA_UI();
	let taScene = new TA_Scene( ta_UI );
	
	ta_UI.init( taScene );
	
	taScene.createScene();

		if ( ta_UI.fillMainToolbar( taScene ) ) {

			console.log( 'TertiusAxis loaded');

		}


// git add .
// git commit -m "first commit"
// git push -u origin master
