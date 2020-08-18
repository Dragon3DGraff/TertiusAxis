/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
*/

class State {
	constructor(){

		// singleton
		if ( State.exist ){

			return State.instance;
			
		}
		State.instance = this;
		State.exist = true;


		this.appMode = {

			meshEdit: false,
			action: 'select',
			entity: null

		};

		this.transformMode = {

			mode: '',
			transformControlsMode: ''

		}

		this.meshEditMode = {


		}

	}

	setAppMode ( appMode ) {

	}

	setTransformMode ( transformMode ) {

	}

}

export { State }