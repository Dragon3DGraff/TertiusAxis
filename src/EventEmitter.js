export default class EventEmitter {
	constructor(){
		// singleton
		if (EventEmitter.exist){
			return EventEmitter.instance;
		}
		EventEmitter.instance = this;
		EventEmitter.exist = true;
		//---

		this._events = {};
	}

	onEvent(name, listener) {
		if (!this._events[name]) {
			this._events[name] = [];
		}

		this._events[name].push(listener);
	}

	removelistener(name, listenerToRemove) {
		if (!this._events[name]) {
			throw new Error(`Can't remove a listener. Event "${name} doesn't exist`);
		}

		this._events[name] = this._events[name].filter( listener => listener != listenerToRemove)
	}

	emitEvent(name, data) {
		if (!this._events[name]) {
			// console.error(`No any listeners on event ${name}`)
			// throw new Error(`Can't emit an event. Event ${name} doesn't exist`);
		} else {
			this._events[name].forEach( callback => callback(data));
		}
		
	}
}