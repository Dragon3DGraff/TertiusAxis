/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */
import { TA_Entities } from "./Entities/TA_Entities.js";

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
	taScene.controls.enableRotate = true;

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
	taScene.controls.enableRotate = true;

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
	taScene.controls.enableRotate = true;


}

export function switchOnSelectMode ( taScene ) {

	taScene.mode.action = 'select';
	taScene.transformControlsMode = '';
	taScene.transformControls.detach( taScene.currentSelection.object );
	// taScene.dragControls.deactivate();
	taScene.controls.enableRotate = true;

}

export function switchOnDragMode ( checked, taScene ) {

	let taEntities = new TA_Entities();
	
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