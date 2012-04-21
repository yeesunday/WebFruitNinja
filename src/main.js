if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, stats;

var camera, scene, renderer;

var mesh, group1, group2, group3, light;
var fruitObjs = [];

var mouseX = 0, mouseY = 0, INTERSECTED;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var zmesh;

init();
animate();

function init() {

  container = document.getElementById( 'container' );

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000000 );
  camera.position.z = 1000;
  scene.add( camera );

  var light = new THREE.AmbientLight(0xcccccc);
  scene.add(light);

  var directionallight = new THREE.DirectionalLight( 0xffffff , 0.3);
  directionallight.position.set( 0, 0, 1 );
  scene.add( directionallight );



  var texturePainting = THREE.ImageUtils.loadTexture( "images/background.jpg", THREE.UVMapping),
  materialPainting = new THREE.MeshBasicMaterial( { color: 0xffffff, map: texturePainting } );
  var geometry = new THREE.PlaneGeometry( 1920, 1200 );
  mesh = new THREE.Mesh( geometry, materialPainting );
  scene.add(mesh);

  // load apple

  var loader = new THREE.JSONLoader(),
  callbackApple = function( geometry ) { createScene( geometry, -300, 50, 100, 1) },
  callbackBanana = function( geometry ) { createScene( geometry, -200, 50, 100, 1 ) },
  callbackKiwi = function( geometry ) { createScene( geometry, -100, 50, 100, 1 ) },
  callbackOrange = function( geometry ) { createScene( geometry, 0, 50, 100, 1 ) },
  callbackPear = function( geometry ) { createScene( geometry, 100, 50, 100, 1 ) },
  callbackStrawberry = function( geometry ) { createScene( geometry, 200, 50, 100, 55 ) },
  callbackWatermelon = function( geometry ) { createScene( geometry, 300, 50, 100, 1 ) };

  loader.load( "models/apple/apple.js", callbackApple);
  loader.load( "models/banana/banana.js", callbackBanana);
  loader.load( "models/kiwi/kiwi.js", callbackKiwi);
  loader.load( "models/orange/orange.js", callbackOrange);
  loader.load( "models/pear/pear.js", callbackPear);
  loader.load( "models/strawberry/strawbarry.js", callbackStrawberry);
  loader.load( "models/watermelon/watermelon.js", callbackWatermelon);

  function createScene( geometry, x, y, z, b ) {
    zmesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial() );
    zmesh.position.set( x, y, z );
    zmesh.scale.set( b, b, b );
    scene.add( zmesh );
    fruitObjs.push(zmesh);
  }

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( window.innerWidth, window.innerHeight );

  container.appendChild( renderer.domElement );

  projector = new THREE.Projector();

  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  container.appendChild( stats.domElement );

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'mousedown', onDocumentMouseDown, false );

}

function onDocumentMouseDown( event ) {
  event.preventDefault();

  var mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  var mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

  var vector = new THREE.Vector3( mouseX, mouseY, 1 );
  projector.unprojectVector( vector, camera );
  console.log(vector.x, vector.y, vector.z)

  var ray = new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );

  var intersects = ray.intersectObjects(fruitObjs);

  if ( intersects.length > 0 ) {
    console.log(intersects);
  }

  /*
  // Parse all the faces
  for ( var i in intersects ) {

  intersects[ i ].face.material[ 0 ].color.setHex( Math.random() * 0xffffff | 0x80000000 );

  }
  */
}

function onDocumentMouseMove( event ) {

  mouseX = ( event.clientX - windowHalfX );
  mouseY = ( event.clientY - windowHalfY );

}

//

function animate() {

  requestAnimationFrame( animate );

  render();
  stats.update();


}

function render() {

  camera.position.x += ( mouseX - camera.position.x ) * 0.01;
  camera.position.y += ( - mouseY - camera.position.y ) * 0.01;

  var limit = 100;
  camera.position.x = Math.max(Math.min(camera.position.x, limit), -limit);
  camera.position.y = Math.max(Math.min(camera.position.y, limit), -limit);

  camera.lookAt( scene.position );

  renderer.render( scene, camera );

  if (fruitObjs[0])
    {
      for (var i = 0; i < fruitObjs.length; i++ )
      fruitObjs[i].rotation.y += 0.05;
    }

}
