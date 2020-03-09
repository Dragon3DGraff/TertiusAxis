
'use strict'

//import * as THREE from './build/three.module.js';
//import { OrbitControls } from '../jsm/controls/OrbitControls.js';

let testCube;
const raycaster= new THREE.Raycaster();
const objects = [];
let firstPoint;	
let lastPoint;
let Phantom;
const selectables = [];
let MODE = '_NOTHING';
let sceneJSON;
let phantomLoneLine; //глобально объявим Фантом для магнита
const movement = {
  obj: undefined,
  moving: false,
  startPoint: undefined,
  deltaX: undefined,
  deltaZ: undefined,
  clear: function(){
    this.obj = undefined,
    this.moving = false,
    this.startPoint = undefined,
    this.deltaX = undefined,
    this.deltaZ = undefined
  },
}
const divState = document.getElementById('stateDiv');
const scene = new THREE.Scene();
const sceneCamera = new SceneCamera();
const camera = sceneCamera.initCamera();
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls( camera, renderer.domElement );

scene.background = new THREE.Color( 'white' );


renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement ); 

//------------------------------------

const sceneLights = new SceneLights();
sceneLights.initAll( scene );

const sceneGrids = new SceneGrids();
sceneGrids.initAll( scene );



//Главная плоскость построения
var mainPlaneGeom = new THREE.PlaneBufferGeometry(20, 20);
var mainPlaneMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('white'), transparent: true, opacity: 0.5, side: THREE.DoubleSide});
var mainPlane = new THREE.Mesh(mainPlaneGeom, mainPlaneMaterial);
mainPlane.rotation.x = 90*Math.PI/180;
mainPlane.name = 'mainPlane'
scene.add(mainPlane);
objects.push(mainPlane);



function drawLine (x,y,z,x1,y1,z1, colorDex){
  var material = new THREE.LineBasicMaterial( { color: colorDex } );
  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3( x, y, z));
  geometry.vertices.push(new THREE.Vector3( x1, y1, z1));

  var line = new THREE.Line( geometry, material );
  scene.add( line );
  return line;
}
var testMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );



function getAngle(position ){

  var tangent = testLine.getTangent(position).normalize();

  // change tangent to 3D
  angle = - Math.atan( tangent.x / tangent.y);

  return angle;
}

function createCube (x, y, z, height, material){

  const geometry = new THREE.BoxGeometry(height, height, height);
  //  material = new THREE.MeshPhongMaterial({ color: new THREE.Color('grey') });
  material = new THREE.MeshPhongMaterial({color: new THREE.Color('grey'),  wireframe: true, transparent: true, opacity: 0.5});

  var cube = new THREE.Mesh(geometry, material);
  cube.position.x = x;
  cube.position.y = y;
  cube.position.z = z;
  scene.add(cube);

  return cube;

}

var cubeHeigt = 2;
var centerCube = createCube(0, 0 , 0, cubeHeigt);
centerCube.name = 'Параллелепипед';
centerCube.geometry.computeBoundingBox();
objects.push(centerCube);


function isObject(object) {
  if (typeof( object ) === 'object') {
    return true;
  }
  else
  {
    return false;
  }
}


function createParallelepiped (x, y, z, widthX, widthY, height, Material){

  var geometry = new THREE.BoxGeometry(widthX, widthY, height);
  var cube = new THREE.Mesh(geometry, Material);

  cube.position.x = x;
  cube.position.y = y;
  cube.position.z = z;
  scene.add(cube);

  return cube;

}

// var canv = document.getElementsByTagName("canvas");
// console.log(canv)
window.addEventListener( 'resize', onWindowResize, false );
document.addEventListener( 'click', onDocumentMouseClick, false );
document.addEventListener( 'mousemove', onDocumentMouseMove, false );
document.addEventListener( 'mousedown', onDocumentMouseDown, false );
document.addEventListener( 'mouseup', onDocumentMouseUp, false );

// rotateViewButton
const rotateViewButton = document.getElementById( 'rotateViewButton' );
rotateViewButton.addEventListener( 'click', function () {
  MODE = '_rotateView'; 
  divState.innerHTML = MODE;
  controls.enableRotate = true;
  // controls = new OrbitControls( camera, renderer.domElement );
  // console.log(controls);
  animate();
}, false );

var button = document.getElementById( 'moveButton' );
button.addEventListener( 'click', function () {
  MODE = '_MOVE'; 
  divState.innerHTML = MODE;
  animate();
}, false );
    
// saveButton
const savebutton = document.getElementById( 'saveButton' );
savebutton.addEventListener( 'click', function () {

  // 				console.log(scene);
  // let sceneJSON = JSON.stringify( scene);				
  // let sceneFromJSON = JSON.parse(sceneJSON);
  // console.log(sceneFromJSON);

  const sceneExporter = new GLTFExporter();
  sceneExporter.parse( scene, function ( gltf ) {
    sceneJSON = gltf;
    
    // storage.set(gltf);	

    

    // console.log( gltf );
    // downloadJSON( gltf );
  }  );


}, false );
// let storage = new Storage();
// storage.init(function(){	
// });

const loadButton = document.getElementById('loadButton');

loadButton.addEventListener('click', function(){
// console.log( sceneJSON );
// var loader = new GLTFParser();
// storage.get( function (data) {
// let parsed = loader.parse (JSON.stringify(data));
  // console.log(parsed);
    

  // });

},false);

var button = document.getElementById( 'createParrallelpipedButton' );
button.addEventListener( 'click', function () {
  controls.enableRotate = false;
  MODE = '_SIMPLEPARRALILLEPIPED'; 
  divState.innerHTML = MODE;
  animate();
}, false );

var button = document.getElementById( 'createRoomButton' );
button.addEventListener( 'click', function () {
  MODE = '_ROOMCREATION'; 
  divState.innerHTML = MODE;
  animate();
}, false );	

var slider = document.getElementById('myRangeCamZoom');
slider.oninput = function() {
// console.log(this.value);
  camera.position.x = this.value/100;
// splineObject.rotation.z +=  this.value/100;
// splineObjectCameraPath.rotation.z +=  this.value/100;
//   camera.position.z = this.value;
} 	

function onDocumentMouseClick(event) {
  event.preventDefault();	
  // console.log(event.target.tagName);
  // if (event.target.tagName === "CANVAS"){
  const screenPoint = new THREE.Vector2();
  screenPoint.set((event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1);
  raycaster.setFromCamera( screenPoint, camera );
  var intersects = raycaster.intersectObjects( objects );

  if ( intersects.length > 0 ) {
    
    if (MODE === '_MOVE'){
        
      if (intersects[ 0 ].object.name === 'Параллелепипед'){
        movement.moving = movement.moving?false:true;
        if (movement.moving){
          movement.obj = intersects[ 0 ].object;
          movement.deltaX = intersects[ 0 ].object.position.x -  intersects[ 0 ].point.x;
          movement.deltaZ = intersects[ 0 ].object.position.z -  intersects[ 0 ].point.z;

          //Нарисуем Фантом для магнита
          phantomLoneLine = drawLine(
            0,
            intersects[ 0 ].object.position.y,
            0,
            0,
            intersects[ 0 ].object.position.y,
            intersects[ 0 ].object.geometry.boundingBox.min.z,
            0x0000ff);
                                        
          // phantomLoneLine.geometry.vertices[1].z =  intersects[ 0 ].object.geometry.boundingBox.min.z;
          //  phantomLoneLine.geometry.vertices[1].y =   intersects[ 0 ].object.position.y;
          phantomLoneLine.position.x = intersects[ 0 ].object.position.x;
          phantomLoneLine.position.y = intersects[ 0 ].object.position.y;
          phantomLoneLine.position.z = intersects[ 0 ].object.position.z;
        }
        else{
          movement.clear();
          scene.remove(phantomLoneLine); //Удалим Фантом для магнита
        }
      }
      else{
            
      }
    }	
    



  }
  // }

}			
function onDocumentMouseDown (event){
// console.log(event.document);
  event.preventDefault();	
  if (event.target.tagName === 'CANVAS'){
    const screenPoint = new THREE.Vector2();
    screenPoint.set((event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1);
    raycaster.setFromCamera( screenPoint, camera );
    var intersects = raycaster.intersectObjects( objects );

    if ( intersects.length > 0 ) {

      if ( MODE === '_SIMPLEPARRALILLEPIPED'){


        if (intersects[ 0 ].object.name === 'mainPlane'){
          firstPoint = new THREE.Vector2();

          var intersect = intersects[ 0 ];
          firstPoint.set(intersect.point.x, intersect.point.z);
        // console.log(firstPoint)	;
        }
      }
      if (MODE === '_MOVE'){
        
        
        // if (intersects[ 0 ].object.name === "Параллелепипед"){
        // 	// intersects[ 0 ].object.position.x =  intersects[ 0 ].point.x;
        // 	// intersects[ 0 ].object.position.z =  intersects[ 0 ].point.z;
        // 	var deltaX = intersects[ 0 ].object.position.x -  intersects[ 0 ].point.x;
        // 	var deltaZ = intersects[ 0 ].object.position.z -  intersects[ 0 ].point.z;
        // 	console.log(deltaX);
        // 	console.log(deltaZ);

        // }
        // else{
            
        // }
      }	
    



    }
  }				
// render();
}
function onDocumentMouseMove( event ) {
  event.preventDefault();



  lastPoint =  new THREE.Vector2();
  var Material = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
  const screenPoint =  new THREE.Vector2();
  screenPoint.set((event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1);
  raycaster.setFromCamera( screenPoint, camera );
  var intersects = raycaster.intersectObjects( objects );

  if ( intersects.length > 0 ) {

    if (intersects[ 0 ].object.name === 'mainPlane'){
      const intersect = intersects[ 0 ];
      divState.innerHTML = intersect.point.x;

    }

    if ( MODE === '_SIMPLEPARRALILLEPIPED'){
        
      if (firstPoint){
        if (Phantom) scene.remove(Phantom);
        //------------Фантом------
        if (intersects[ 0 ].object.name === 'mainPlane'){
          if(firstPoint){
            var intersect = intersects[ 0 ];
            lastPoint.set(intersect.point.x, intersect.point.z);
                        
            Phantom = createParallelepiped (firstPoint.x + (lastPoint.x - firstPoint.x)/2,
              0.05,
              firstPoint.y + (lastPoint.y - firstPoint.y)/2,
              Math.abs(firstPoint.x - lastPoint.x),
              0.1,
              Math.abs(firstPoint.y - lastPoint.y),
              Material);
          }					
        
        }
      }
        
    }
    if (MODE === '_MOVE'){
      if (movement.moving){
        movement.obj.position.x = intersects[ 0 ].point.x+movement.deltaX;
        movement.obj.position.z = intersects[ 0 ].point.z+movement.deltaZ;

        //установим положение для Фантома для магнита
        phantomLoneLine.position.x =  intersects[ 0 ].point.x+movement.deltaX;
        phantomLoneLine.position.z=  intersects[ 0 ].point.z+movement.deltaZ;
      }
        
      if (intersects[ 0 ].object.name === 'Параллелепипед'){
        divState.innerHTML =  intersects[ 0 ].object.name;
      }
      else{
        divState.innerHTML =  '';
      }
    }	


  }


}
function onDocumentMouseUp( event ) {
  event.preventDefault();
  var material = new THREE.MeshBasicMaterial( { color: new THREE.Color('lightgrey'), transparent: true, opacity: 0.6,} );

  lastPoint =  new THREE.Vector2();

  const screenPoint =  new THREE.Vector2();
  screenPoint.set((event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1);
  raycaster.setFromCamera( screenPoint, camera );
  var intersects = raycaster.intersectObjects( objects );

  if ( intersects.length > 0 ) {

    if ( MODE === '_SIMPLEPARRALILLEPIPED'){

      if (intersects[ 0 ].object.name === 'mainPlane'){
        if(firstPoint){
          var intersect = intersects[ 0 ];
          lastPoint.set(intersect.point.x, intersect.point.z);
          let Parallelepiped;
          // console.log(  Math.abs(firstPoint.y - lastPoint.y) );
          Parallelepiped = createParallelepiped (firstPoint.x + (lastPoint.x - firstPoint.x)/2,
            0.05,
            firstPoint.y + (lastPoint.y - firstPoint.y)/2,
            Math.abs(firstPoint.x - lastPoint.x),
            0.1,
            Math.abs(firstPoint.y - lastPoint.y),
            material);

          Parallelepiped.name = 'Параллелепипед';
          Parallelepiped.geometry.computeBoundingBox();

          selectables.push(Parallelepiped);
          objects.push(Parallelepiped);

        
          
        
        
        
          // phantomLoneLine.position.x = Parallelepiped.position.x;
          //   phantomLoneLine.position.y = Parallelepiped.position.y;
          //   phantomLoneLine.position.z = Parallelepiped.position.z;	
        
          if (Phantom) scene.remove(Phantom);

        }	
        firstPoint = undefined;
        lastPoint = undefined;
      }	
    }


  }
}

function onWindowResize() {

  // var windowHalfX = window.innerWidth / 2;
  // var windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

var animate = function () {
  requestAnimationFrame( animate );
  // magnitPlane.rotation.y += 0.01;
  // centerCube.position.copy( magnitPlane.position).add(magnitPlane.geometry.faces[0].normal);
  // centerCube.applyQuaternion (magnitPlane.quaternion);

  renderer.render( scene, camera );
    
};

animate();