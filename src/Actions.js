/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */
import { TA_Entities } from "./Entities/TA_Entities.js";
import { TA_UI } from "./UI/TA_UI.js";


export function switchOnMoveMode ( taScene ) {

taScene.transformControlsMode = 'translate';

	if( taScene.currentSelection.object ) {
		taScene.transformControls.attach( taScene.currentSelection.object );
	}
	if ( taScene.currentSelection.multiselection.children.length > 0 ){

		taScene.transformControls.attach( taScene.currentSelection.multiselection );
	}
	taScene.transformControls.setMode( taScene.transformControlsMode );
	// taScene.dragControls.deactivate();
	taScene.mode.action = 'select';
	taScene.orbitControls.enableRotate = true;

}

export function switchOnRotationMode ( taScene ) {

	taScene.transformControlsMode = 'rotate';
	if( taScene.currentSelection.object ) {
		taScene.transformControls.attach( taScene.currentSelection.object );
	}
	if ( taScene.currentSelection.multiselection.children.length > 0 ){
		taScene.transformControls.attach( taScene.currentSelection.multiselection );
	}
	taScene.transformControls.setMode( taScene.transformControlsMode );
	// taScene.dragControls.deactivate();
	taScene.mode.action = 'select';
	taScene.orbitControls.enableRotate = true;

}

export function switchOnScaleMode ( taScene ) {

	if( taScene.currentSelection.object ) {
		taScene.transformControls.attach( taScene.currentSelection.object );
	}
	if ( taScene.currentSelection.multiselection.children.length > 0 ){
		taScene.transformControls.attach( taScene.currentSelection.multiselection );
	}

	taScene.transformControlsMode = 'scale';
	taScene.transformControls.setMode( taScene.transformControlsMode );
	// taScene.dragControls.deactivate();
	taScene.mode.action = 'select';
	taScene.orbitControls.enableRotate = true;


}

export function switchOnSelectMode ( taScene ) {

	taScene.mode.action = 'select';
	taScene.transformControlsMode = '';
	taScene.transformControls.detach( taScene.currentSelection.object );
	// taScene.dragControls.deactivate();
	taScene.orbitControls.enableRotate = true;

}

export function switchDragMode ( checked, taScene ) {

	let taEntities = new TA_Entities();
	let ta_UI = new TA_UI();
	
	if ( checked ) {

		// console.log( th)

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
			taScene.mode.action = '';
			taScene.dragControls.activate();

			//bug fixing. See https://github.com/mrdoob/three.js/issues/19290
			// document.getElementById('labelRenderer').dispatchEvent( new Event( 'mousemove', { clientX: taScene.mousePosition.x, clientY: taScene.mousePosition.y } ) );

			ta_UI.elements.finishButton.form.reset()
			ta_UI.elements.finishButton.style.display = 'none';
			taScene.mode.action = 'select';
			taScene.mode.entity = null;
			
		}
		else{
			if( taScene.currentSelection.object ) {
				
				taEntities.selectEntity( taScene.currentSelection.object, taScene.currentSelection );
			}
			taScene.dragControls.deactivate();
			labelRenderer.style.cursor = 'auto'; //bug fixing. See https://github.com/mrdoob/three.js/issues/19290

		}

}

export function switchEditVertices() {
	
}