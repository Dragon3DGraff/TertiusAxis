/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import { TA_UI } from "./TA_UI.js";
import { TA_Scene } from '../TA_Scene.js';
import { MeshEdit } from "../MeshEdit.js";
import { TA_Entities } from "../Entities/TA_Entities.js";
import { switchEditVertices } from "../Actions.js";

function createMeshEditToobar (){
	
	let ta_UI = new TA_UI();
	let taScene = new TA_Scene();
	

	ta_UI.elements.meshEditContainer = ta_UI.createContainer( 'meshEditContainer', mainContainer );
	ta_UI.elements.meshEditForm = ta_UI.addElement( meshEditContainer, 'form','','');
	ta_UI.elements.meshEditForm.id = 'meshEditForm';
	ta_UI.elements.meshEditForm.className = 'meshEditForm';

	ta_UI.elements.meshEditButton = ta_UI.createStayPressedButton(
		{
			parent: meshEditForm,
			text: 'Edit mesh',
			id: 'meshEdit',
			name: 'meshEdit',
			value: 'meshEdit',
			tooltip: 'Edit mesh'
		},
		switchEditMEsh
	);
	ta_UI.elements.meshEditContainer.style.display = 'none';

	// let meshEdit;

	function switchEditMEsh() {


		if ( this.checked ) {

			let ta_Entities = new TA_Entities();

			ta_UI.elements.finishButton.form.reset()
			ta_UI.elements.finishButton.style.display = 'none';
			ta_UI.elements.meshEditElementsForm.style.display = 'flex';

			taScene.mode.action = 'meshEdit';

			let selectedEditElement = document.querySelector('input[name="meshEditElements"]:checked');
			
			taScene.meshEditObject = new MeshEdit( taScene.currentSelection.object );
			
			taScene.meshEditObject.mode = selectedEditElement.id;

			// if ( taScene.transformControlsMode !== '' ) {

				// taScene.transformControls.setMode( taScene.transformControlsMode );
				// taScene.transformControls.attach( taScene.meshEditObject );

			// }

			taScene.transformControls.detach( taScene.meshEditObject.mesh );

			// meshEdit = new MeshEdit( taScene.meshEditObject );
			taScene.meshEditObject.mesh.add( ta_Entities.createWireframe( taScene.meshEditObject.mesh ) );
			taScene.meshEditObject.createMeshHelpers();

			// meshEdit.createMeshHelpers( );
			// taScene.meshEditObject = meshEdit.mesh;

		}
		else{

			// if ( taScene.transformControlsMode !== '' ) {

				// taScene.transformControls.setMode( taScene.transformControlsMode );
				// taScene.transformControls.attach( taScene.meshEditObject );

			// }
			ta_UI.elements.meshEditElementsForm.style.display = 'none';
			taScene.transformControls.detach( taScene.meshEditObject.mesh );

			taScene.meshEditObject.removeMeshHelpers( );

			taScene.meshEditObject = null;

			taScene.mode.action = 'select';
			// taScene.mode.editElements = '';
			// meshEdit.removeMeshHelpers( );
			taScene.mode.entity = null;
			// meshEdit = null;

		}

	}

	ta_UI.elements.meshEditElementsForm = ta_UI.addElement( meshEditContainer, 'form','','');
	ta_UI.elements.meshEditElementsForm.id = 'meshEditElementsForm';
	ta_UI.elements.meshEditElementsForm.className = 'meshEditElementsForm';

	ta_UI.elements.meshEditVertex = ta_UI.createSwitchButton (
		{
			parent:meshEditElementsForm,
			text: 'Vertices',
			id: 'Vertices',
			name: 'meshEditElements',
			value: 'Vertices',
			tooltip: 'Vertices',
			imgLink: ''
		},
		function(){

			taScene.meshEditObject.mode = 'Vertices';
			taScene.meshEditObject.removeMeshHelpers();
			taScene.meshEditObject.addSpheresToVertexes( taScene.meshEditObject.mesh, taScene.meshEditObject.vertices );
			taScene.transformControls.detach( taScene.transformControls.object );

			switchEditVertices();

		}

	);
	ta_UI.elements.meshEditVertex.checked = true;

	ta_UI.elements.meshEditEdges = ta_UI.createSwitchButton (
		{
			parent:meshEditElementsForm,
			text: 'Edges',
			id: 'Edges',
			name: 'meshEditElements',
			value: 'Edges',
			tooltip: 'Edges',
			imgLink: ''
		},
		function(){

			alert( 'Not implemented yet');

		}
	);
	
	
	ta_UI.elements.meshEditFaces = ta_UI.createSwitchButton (
		{
			parent:meshEditElementsForm,
			text: 'Faces',
			id: 'Faces',
			name: 'meshEditElements',
			value: 'Faces',
			tooltip: 'Faces',
			imgLink: ''
		},
		function(){

			taScene.meshEditObject.mode = 'Faces';
			taScene.meshEditObject.removeMeshHelpers();
			taScene.meshEditObject.addTriangles( taScene.meshEditObject.mesh, taScene.meshEditObject.points );
			taScene.transformControls.detach( taScene.transformControls.object );

			switchEditVertices();

		}
	);


}


export { createMeshEditToobar };