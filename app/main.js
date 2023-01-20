 import './style.css'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { DirectionalLight, Vector3 } from 'three';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();  

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30); 

// renderer.render( scene, camera )

const backgroundImage = new THREE.TextureLoader().load('Background.png');
scene.background = backgroundImage;

// const loader = new GLTFLoader();
// loader.load()


const geometry = new THREE.SphereGeometry(15, 32, 16);
const texture = new THREE.TextureLoader().load("Albedo-diffuse.jpg");
const normal = new THREE.TextureLoader().load("Normal.jpg");
const sphere = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial({ 
  map: texture,
  bumpMap: normal,
}) );

sphere.rotation.z -= 0.41;
// sphere.rotation.z += 0.41;

// sphere.rotation.z += 0.41;
// sphere.rotation.y += 0.41;
// sphere.rotation.z -= 0.41;

scene.add(sphere);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const directionalLight   = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(-45, 35, -30);
directionalLight.target = sphere;

scene.add(ambientLight, directionalLight);

const controls = new OrbitControls( camera, renderer.domElement );

function animate() {
  requestAnimationFrame( animate );





  controls.update();

  // sphere.rotation.z += 0.41;
  sphere.rotation.y += 0.01;
  // sphere.rotation.z -= 0.41;

  renderer.render( scene, camera );
}

animate();