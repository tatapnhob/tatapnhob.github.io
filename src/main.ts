import './style.css'

import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="cf-wrap">
    <div id='cursor-follower'></div>
  </div>
  <main>
    <div id="logo-container">
      <div id="logo"></div>
    </div>
    <nav>
      <ul>
        <li><a href="">about</a></li>
        <li><a href="#">projects</a></li>
        <li><a href="#">gallery</a></li>
        <li><a href="#">cv</a></li>
        <li><a href="#" class="highlighted">contact me</a></li>
        <li><a href="#">blog</a></li>
      </ul>
    </nav>
  </main>
`
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 80, 1, 0.1, 1000 );

var offset_x: number = 0;
var offset_y: number = 0;

const renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
renderer.setSize( 500, 500 );
renderer.setAnimationLoop( animate );
document.getElementById("logo-container")?.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry( 2, 2, 2 );
// const material = new THREE.MeshStandardMaterial(0xff00000);
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

let frame: THREE.Mesh | null = null;
let frame2: THREE.Mesh | null = null;

const light = new THREE.PointLight( 0xffffffff, 4, 100 );
light.position.set( 2, 2, 2 );
scene.add( light );

const light1 = new THREE.PointLight( 0xffffffff, 4, 100 );
light1.position.set( -2, -2, 2 );
scene.add( light1 );

const clock = new THREE.Clock();

const loader = new GLTFLoader();

loader.load( '/ttphb-frame.glb', function(gltf: any) {

  const object: THREE.Object3D = gltf.scene;
  scene.add(object);

  object.traverse((child: any) => {
    if (child instanceof THREE.Mesh) {
      frame = child;
      frame.material = new THREE.MeshStandardMaterial({color: 0xff0000});

      frame2 = frame.clone();
      frame2.scale.set(1.5, 1.5, 1.5);
      frame2.material = new THREE.MeshStandardMaterial({color: 0xff0000});
      scene.add(frame2);

    }
  })

}), undefined, function(error: any) {
  console.error(error);
}

camera.position.z = 4;

function animate() {

  let delta: number = clock.getDelta();

  if (frame != null) {
    
    frame.rotation.y = lerp(frame.rotation.y, 5 * offset_x, 5 * delta);
    frame.rotation.x = lerp(frame.rotation.x, 5 * offset_y, 5 * delta);

  }

  if (frame2 != null) {

    frame2.rotation.y = lerp(frame2.rotation.y, -4 * offset_x, 5 * delta);
    frame2.rotation.x = lerp(frame2.rotation.x, -4 * offset_y, 5 * delta);
    
  }

	renderer.render( scene, camera );

}

document.onmousemove = handleMouseMove;
document.onmouseout = handleMouseLeave;

function handleMouseMove(e: MouseEvent) {

  //frames

  var x: number = e.pageX;
  var y: number = e.pageY;

  var parallax_intensity: number = 0.2;

  var t_x = (x - window.innerWidth / 2) / window.innerWidth;
  var t_y = (y - window.innerHeight / 2) / window.innerHeight;

  offset_x = parallax_intensity * t_x;
  offset_y = parallax_intensity * t_y;

  //cursor follower

  const cf = document.getElementById("cursor-follower");

  if (cf != null) {
    
    cf.style.opacity = '1';

    cf.style.top = (y - 300).toString() + 'px';
    cf.style.left = (x - 300).toString() + 'px';

  }


}

function handleMouseLeave(_e: MouseEvent) {
  offset_x = 0;
  offset_y = 0;

  const cf = document.getElementById("cursor-follower");
  if (cf && cf.style) {
  
    cf.style.opacity = '0';

  }
}

function lerp(a: number, b: number, t: number) {
  return a * (1 - t) + b * t;
}

document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
      // Pause the animation loop when the tab is out of focus
      renderer.setAnimationLoop(null);  // Removes the loop
  } else {
      // Resume the animation loop when the tab comes back into focus
      renderer.setAnimationLoop(animate);  // Sets the loop again
  }
});