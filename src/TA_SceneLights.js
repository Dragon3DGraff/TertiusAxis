/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import * as THREE from "../node_modules/three/build/three.module.js";
class TA_SceneLights {

	constructor() {
		this.ambientLight = new THREE.AmbientLight(new THREE.Color('white'), 0.5);
		// soft white light 0x404040   
		this.spotLight = new THREE.SpotLight(new THREE.Color('grey'));
		this.spotLight.position.set(-3, 0, 2);
		// let pointLightHelper = new THREE.SpotLightHelper( spotLight );
		// scene.add( pointLightHelper );    
		this.spotLight.castShadow = true;
		this.spotLight.shadow.mapSize.width = 1024;
		this.spotLight.shadow.mapSize.height = 1024;
		this.spotLight.shadow.camera.near = 500;
		this.spotLight.shadow.camera.far = 4000;
		this.spotLight.shadow.camera.fov = 30;
	}

	initAmbientlight ( scene ) {

		if ( !scene || !scene.isScene) {
			console.warn("Parameter of this function must be object of THREE.Scene()");
			return;
		}

		scene.add( this.ambientLight );

    }
    
    initSpotLight ( scene ) {

        if ( !scene || !scene.isScene) {
			console.warn("Parameter of this function must be object of THREE.Scene()");
			return;
		}

        scene.add( this.spotLight );
        
    }

    initAll ( scene ) {

        if ( !scene || !scene.isScene) {
			console.warn("Parameter of this function must be object of THREE.Scene()");
			return;
		}

        scene.add( this.spotLight );
        scene.add( this.ambientLight );

    }

    removeAll ( scene ){

        if ( !scene || !scene.isScene) {
			console.warn("Parameter of this function must be object of THREE.Scene()");
			return;
		}

        scene.remove( this.spotLight );
        scene.remove( this.ambientLight );
	}
	
}
export { TA_SceneLights };