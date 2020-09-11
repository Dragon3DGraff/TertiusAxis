/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
*/

import EventEmitter from './EventEmitter';

class State {
	constructor(){
		// singleton
		if ( State.exist ){
			return State.instance;
		}
		State.instance = this;
		State.exist = true;
		//--

		this.eventEmitter = new EventEmitter();
		this.appState = 'Initial';
		this.appMode = {
			meshEdit: false,
			action: 'select',
			entity: null
		};

		this.transformMode = {
			mode: '',
			transformControlsMode: ''
		}

		this.meshEditMode = {}

	}

	changeAppState( mode, state ) {
		this.appState = state;
		this.eventEmitter.emitEvent( mode, state )
	}

	setAppMode ( appMode ) {}

	setTransformMode ( transformMode ) {}

}

export { State }