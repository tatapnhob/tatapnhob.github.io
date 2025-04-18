import './style.css'

import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="cf-wrap">
    <div id='cursor-follower'></div>
  </div>
  <p class="footer-note">(c) 2025 by Daniel T. </p>
  <main>
    <div id="logo-container">
      <div id="logo"></div>
    </div>
    <nav>
      <ul>
        <li><a href="" class="menu-link-disabled">about</a></li>
        <li><a href="#" class="menu-link-disabled">projects</a></li>
        <li><a href="#" class="menu-link-disabled">gallery</a></li>
        <li><a href="/ttphb-portfolio.pdf">portfolio</a></li>
        <li><a href="https://t.me/dantatarinov" class="highlighted">contact me</a></li>
        <li><a href="#" class="menu-link-disabled">blog</a></li>
      </ul>
    </nav>
  </main>
`
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 80, 1, 0.1, 1000 );

var offset_x: number = 0;
var offset_y: number = 0;

const renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
renderer.setSize( 800, 800 );
renderer.setAnimationLoop( animate );
document.getElementById("logo-container")?.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry( 2, 2, 2 );
// const material = new THREE.MeshStandardMaterial(0xff00000);
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

let frame: THREE.Mesh | null = null;
let frame2: THREE.Mesh | null = null;

let automatic: boolean = isMobile()
let auto_step: number = 0
const auto_offsets: Array<number> = [
   .1, -.1,
   .1,  .1,
  -.1,  .1,
  -.1, -.1
]
const steps: number = 4

const light = new THREE.PointLight( 0xffffffff, 4, 100 );
light.position.set( 2, 2, 2 );
scene.add( light );

const light1 = new THREE.PointLight( 0xffffffff, 4, 100 );
light1.position.set( -2, -2, 2 );
scene.add( light1 );

// const ambient_light = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambient_light)

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
document.onmousedown = handleMouseDown;

setInterval(advanceAutoFrameAnimation, 2000);

function handleMouseMove(e: MouseEvent) {

  //frames

    var x: number = e.pageX;
    var y: number = e.pageY;

  if (!automatic) {
  
    var parallax_intensity: number = 0.2;
  
    let container = document.getElementById("logo-container");

    if (container == null) return;

    let canvas = container.getElementsByTagName("canvas")[0];

    if (canvas == null) return;

    let origin_x = canvas.getBoundingClientRect().x + canvas.getBoundingClientRect().width / 2
    let origin_y = canvas.getBoundingClientRect().y + canvas.getBoundingClientRect().height / 2
    
    var t_x = (e.clientX - origin_x) / window.innerWidth * 2
    var t_y = - (e.clientY - origin_y) / window.innerHeight * 2
  
    offset_x = parallax_intensity * t_x;
    offset_y = parallax_intensity * t_y;

  }

  //cursor follower
  if (!isMobile()) {
    
    const cf = document.getElementById("cursor-follower");
  
    if (cf != null) {
      
      cf.style.opacity = '1';
  
      cf.style.top = (y - 300).toString() + 'px';
      cf.style.left = (x - 300).toString() + 'px';
  
    }

  }
}

function handleMouseLeave(_e: MouseEvent) {
  
  if (!automatic) {

    offset_x = 0;
    offset_y = 0;
    
  }

  if (!isMobile()) {

    const cf = document.getElementById("cursor-follower");
    if (cf && cf.style) {
    
      cf.style.opacity = '0';
  
    }

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

function advanceAutoFrameAnimation() {

  if (automatic && !document.hidden) {

    offset_x = auto_offsets[auto_step * 2];
    offset_y = auto_offsets[auto_step * 2 + 1];
  
    auto_step += 1
    auto_step = auto_step % steps

  }
}

function isMobile(): boolean {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent);
  return check;
};

const raycaster = new THREE.Raycaster();

function handleMouseDown(e: MouseEvent) {

  let container = document.getElementById("logo-container");

  if (container == null) return;

  let canvas = container.getElementsByTagName("canvas")[0];

  if (canvas == null) return;

  let origin_x = canvas.getBoundingClientRect().x + canvas.getBoundingClientRect().width / 2
  let origin_y = canvas.getBoundingClientRect().y + canvas.getBoundingClientRect().height / 2
  
  var x = (e.clientX - origin_x) / canvas.getBoundingClientRect().width * 2
  var y = - (e.clientY - origin_y) / canvas.getBoundingClientRect().height * 2

  var vector = new THREE.Vector2(x, y);

  // var vector = new THREE.Vector2(
  //   ( (e.clientX - origin_x) / window.innerWidth) * 2,
  // - ( (e.clientY - origin_y) / window.innerHeight) * 2 );

  raycaster.setFromCamera(vector, camera);
	const intersects = raycaster.intersectObjects( scene.children );

  if (intersects.length > 0) {
    intersects[0].object.rotation.y = Math.PI
  }

}