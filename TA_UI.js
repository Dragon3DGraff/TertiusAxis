/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */
"use strict" 

class TA_UI {

	constructor( ) {

		this.main;

	}

	setScene(  taScene ){

		this.taScene = taScene;
	
	}

	init() {

		let dom = document.createElement( 'div' );
		dom.className = 'mainToolbar';
		dom.id = 'mainToolbar';
		document.body.appendChild( dom );
		return this.main = dom;

	}
	
	addElement( container, elementName, text, func ) {

		let dom = document.createElement( elementName );
		container.appendChild( dom );
		dom.innerHTML = text;
		if (typeof( func ) === 'function') {
			dom.addEventListener( 'click', func, false );
		}
		

		return dom;
	}

	createContainer( containername ) {

		let dom = document.createElement( 'div' );
		dom.className = containername;
		dom.id = containername;
		this.main.appendChild( dom );
		return dom;

	}

	createParametersMenu( entity ) {

		

		if ( !entity.geometry.parameters) {

			console.warn( "No Params" );

			return;

		}

		this.deleteParametersMenu();

		let dom = document.getElementById( 'Parameters');
		let elem = document.createElement( 'div' );
		elem.id = 'ParametersRows';
		dom.appendChild( elem );

		let typeOfObject = document.createElement( 'div' );
		typeOfObject.id = 'ParametersRows';
		elem.appendChild( typeOfObject );
		typeOfObject.innerHTML = entity.geometry.type;// + ' id = ' + entity.id;


		let parametersArray = Object.entries( entity.geometry.parameters );

		for (let i = 0; i < parametersArray.length; i++) {

			let rowDiv = document.createElement( 'div' );
			elem.appendChild( rowDiv );
			rowDiv.className = 'ParametersRow';

			let text = document.createElement( 'p' );
			rowDiv.appendChild( text );
			text.innerHTML = parametersArray[i][0];

			let input = document.createElement( 'input' );
			input.id = parametersArray[i][0]; //'param_' + 
			input.type = 'number';
			input.step = 0.01;
			rowDiv.appendChild (input);
			input.value = Math.round( parametersArray[i][1] * 1000 )/1000;
			input.addEventListener( 'change', () => {

				// if ( entity.geometry.isGeometry ) {

					// entity.geometry = new BufferGeometry().fromGeometry( entity.geometry );

					// console.warn( 'THREE.GeometryBrowser: Converted Geometry to BufferGeometry.' );

				// }

				let geom = entity.geometry;
				console.log( entity.geometry.parameters );
				// let newGeom =  entity.geometry;

				let newGeom = new THREE.SphereGeometry( +input.value, geom.parameters.widthSegments, geom.parameters.heightSegments, geom.parameters.phiStart, geom.parameters.phiLength, geom.parameters.thetaStart, geom.parameters.thetaLength);
				// newGeom.parameters[ input.id ] = +input.value;
				entity.geometry.dispose();
				entity.geometry = newGeom;
				// console.log( entity.geometry.parameters );

				// console.log( entity.id );
				// console.log( this.taScene.scene.getObjectById( entity.id ) ); //
			}, false );

		}

	}

	updateParametersMenu( entity ) {

		if ( !entity.geometry.parameters ) {

			console.warn( "No Params" );

			return;

		}

		let parametersArray = Object.entries(entity.geometry.parameters);

		for (let i = 0; i < parametersArray.length; i++) {

			let dom = document.getElementById( parametersArray[i][0] );
			dom.value = Math.round( parametersArray[i][1] * 1000 )/1000;

		}

		
	}

	deleteParametersMenu() {

		let rows = document.getElementById( 'ParametersRows' );
		if (rows) rows.remove();

	}

}

class Toolbar extends TA_UI {

	constructor(containerName) {

		
	}

}