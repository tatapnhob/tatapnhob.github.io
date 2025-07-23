import './main.css'

import TtphbFrame from './ttphbFrame';

// import { useState } from 'react'
import './App.css'
// import { useEffect, useRef } from 'react'
// import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { Canvas } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

function App() {

  // const containerRef = useRef<HTMLDivElement>(null);
  // const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  // const frameRef = useRef<THREE.Mesh | null>(null);
  // const frame2Ref = useRef<THREE.Mesh | null>(null);
  // const clockRef = useRef(new THREE.Clock());
  // const offsetXRef = useRef(0);
  // const offsetYRef = useRef(0);
  // const automaticRef = useRef(false);
  // const autoStepRef = useRef(0);


  // useEffect (() => {
  //   const scene = new THREE.Scene();
  //   const camera = new THREE.PerspectiveCamera(80, 1, 0.1, 1000);
  //   const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  //   renderer.setSize(800, 800);
  //   containerRef.current?.appendChild(renderer.domElement);
  //   rendererRef.current = renderer;


  //   const auto_offsets: Array<number> = [
  //   .1, -.1,
  //   .1,  .1,
  //   -.1,  .1,
  //   -.1, -.1
  //   ]

  //   const light = new THREE.PointLight(0xffffff, 4, 100);
  //   light.position.set(2, 2, 2);
  //   scene.add(light);

  //   const light2 = new THREE.PointLight(0xffffff, 4, 100);
  //   light2.position.set(-2, -2, 2);
  //   scene.add(light2);

  //   const loader = new GLTFLoader();
  //   loader.load('/ttphb-frame.glb', (gltf) => {
  //     const object: THREE.Object3D = gltf.scene;
  //     scene.add(object);

  //     object.traverse((child) => {
  //       if (child instanceof THREE.Mesh) {

  //         const frame_material = new THREE.MeshStandardMaterial({ color: 0xff0000 });

  //         frameRef.current = child;
  //         frameRef.current.material = frame_material;

  //         const frame2 = frameRef.current.clone();
  //         frame2.scale.set(1.5, 1.5, 1.5);
  //         frame2.material = frame_material;

  //         scene.add(frame2);
  //         frame2Ref.current = frame2;
  //       }
  //     });
  //   });

  //   camera.position.z = 4;

  //   const lerp = (a: number, b: number, t: number) => {
  //     return a * (1 - t) + b * t;
  //   };

  //   const isMobile = (): boolean => {
  //     return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
  //   }

  //   const animate = () => {
  //     const delta = clockRef.current.getDelta();

  //     if (frameRef.current) {
  //       frameRef.current.rotation.y = lerp(frameRef.current.rotation.y, 5 * offsetXRef.current, 5 * delta);
  //       frameRef.current.rotation.x = lerp(frameRef.current.rotation.x, 5 * offsetYRef.current, 5 * delta);
  //     }
  //     if (frame2Ref.current) {
  //       frame2Ref.current.rotation.y = lerp(frame2Ref.current.rotation.y, -4 * offsetXRef.current, 5 * delta);
  //       frame2Ref.current.rotation.x = lerp(frame2Ref.current.rotation.x, -4 * offsetYRef.current, 5 * delta);
  //     }

  //     console.log("rendered")
  //     renderer.render(scene, camera);

  //   };
    
  //   // requestAnimationFrame(animate);
    
  //   const handleMouseMove = (e: MouseEvent) => {
  //     const x = e.pageX;
  //     const y = e.pageY;
      
  //     if (!automaticRef.current) {
  //       const parallaxIntensity = 0.2;
  //       const container = containerRef.current;
        
  //       if (!container) return;
        
  //       const canvas = container.getElementsByTagName("canvas")[0];
  //       if (!canvas) return;
        
  //       const originX = canvas.getBoundingClientRect().x + canvas.getBoundingClientRect().width / 2;
  //       const originY = canvas.getBoundingClientRect().y + canvas.getBoundingClientRect().height / 2;

  //       const tX = (e.clientX - originX) / window.innerWidth * 2;
  //       const tY = -(e.clientY - originY) / window.innerHeight * 2;
        
  //       offsetXRef.current = parallaxIntensity * tX;
  //       offsetYRef.current = parallaxIntensity * tY;
  //     }
      
  //     if (!isMobile()) {
  //       const cf = document.getElementById("cursor-follower");
  //       if (cf) {
  //         cf.style.opacity = "1";
  //         cf.style.top = `${y - 300}px`;
  //         cf.style.left = `${x - 300}px`;
  //       }
  //     }
  //   };
    
  //   const handleMouseLeave  = () => {
  //     if (!automaticRef.current) {
  //       offsetXRef.current = 0;
  //       offsetYRef.current = 0;
  //     }
      
  //     if (!isMobile()) {
  //       const cf = document.getElementById("cursor-follower");
  //       if (cf) {
  //         cf.style.opacity = "0";
  //       }
  //     }
  //   }
    
  //   const handleMouseDown = (e: MouseEvent) => {

  //     const container = containerRef.current;

  //     if (!container) return;

  //     const canvas = container.getElementsByTagName("canvas")[0];
  //     if (!canvas) return;

  //     const originX = canvas.getBoundingClientRect().x + canvas.getBoundingClientRect().width / 2;
  //     const originY = canvas.getBoundingClientRect().y + canvas.getBoundingClientRect().height / 2;

  //     const x = (e.clientX - originX) / canvas.getBoundingClientRect().width * 2;
  //     const y = -(e.clientY - originY) / canvas.getBoundingClientRect().height * 2;

  //     const vector = new THREE.Vector2(x, y);
  //     const raycaster = new THREE.Raycaster();
      
  //     raycaster.setFromCamera(vector, camera);

  //     const intersections = raycaster.intersectObjects(scene.children);
  //     if (intersections.length > 0) {
  //       intersections[0].object.rotation.y = Math.PI;
  //     }

  //   }

  //   const advanceAutoFrameAnimation = () => {
  //     if (automaticRef.current && !document.hidden) {
  //       offsetXRef.current = auto_offsets[autoStepRef.current * 2];
  //       offsetYRef.current = auto_offsets[autoStepRef.current * 2 + 1];

  //       autoStepRef.current = (autoStepRef.current + 1) % 2

  //     }
  //   }

    
  //   document.onmousemove = handleMouseMove;
  //   document.onmouseout = handleMouseLeave;
  //   document.onmousedown = handleMouseDown;

  //   setInterval(advanceAutoFrameAnimation, 2000);
    
  // });
  
  const offsetRef = useRef({x: 0, y: 0});
  useEffect(() => {
    document.onmousemove = handleMouseMovement
    document.onmouseleave = handleMouseLeave
  })

  const handleMouseLeave = () => {
    offsetRef.current = {x: 0, y: 0}
  }

  const handleMouseMovement = (e: MouseEvent) => {
    let parallax_intensity: number = .2;
    
    let container = document.getElementById("logo-container");

    if (container == null) return;

    let canvas = container.getElementsByTagName("canvas")[0];

    if (canvas == null) return;

    let origin_x = canvas.getBoundingClientRect().x + canvas.getBoundingClientRect().width / 2
    let origin_y = canvas.getBoundingClientRect().y + canvas.getBoundingClientRect().height / 2
    
    var t_x = (e.clientX - origin_x) / window.innerWidth * 2
    var t_y = - (e.clientY - origin_y) / window.innerHeight * 2
  
    offsetRef.current = {
      x: parallax_intensity * t_x,
      y: parallax_intensity * t_y
    } 
  }

  return (
    <>
      <div className="cf-wrap">
        <div id='cursor-follower'></div>
      </div>
      {/* <p className="footer-note">(c) 2025 by Daniel T. </p> */}
      <main>
        <div id="logo-container">
          <div className='canvas'>
          <Canvas>
            <pointLight position={[2, 2, 2]} intensity={4} distance={100} />
            <pointLight position={[-2, -2, 2]} intensity={4} distance={100} />
            <TtphbFrame offsetRef={offsetRef} />
            <TtphbFrame scale={1.5} inverse offsetRef={offsetRef} />
          </Canvas>
          </div>
          <div id="logo"></div>
        </div>
        <nav>
          <ul>
            <li><a href="" className="menu-link-disabled">about</a></li>
            <li><a href="#" className="menu-link-disabled">projects</a></li>
            <li><a href="#" className="menu-link-disabled">gallery</a></li>
            <li><a href="/ttphb-portfolio.pdf">portfolio</a></li>
            <li><a href="https://t.me/dantatarinov" className="highlighted">contact me</a></li>
            {/* <li><a href="#" className="menu-link-disabled">blog</a></li> */}
          </ul>
        </nav>
      </main>
    </>
  )
}

export default App
