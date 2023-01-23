 import './style.css'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Quaternion, Vector3 } from 'three';
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

const backgroundImage = new THREE.TextureLoader().load('Background.png');
scene.background = backgroundImage;

const geometry = new THREE.SphereGeometry(15, 32, 16);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
const texture = new THREE.TextureLoader().load("Albedo-diffuse.jpg");
const normal = new THREE.TextureLoader().load("Normal.jpg");

// const sphere = new THREE.Mesh( geometry, material );

const sphere = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial({ 
  map: texture,
  bumpMap: normal,
}) );

const axisTilt = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, -0.41, 'XYZ'));
sphere.quaternion.multiplyQuaternions(axisTilt, sphere.quaternion); 
const polarAxis = new THREE.Quaternion(0, 15, 0, 0).multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0, 'XYZ'))).normalize();

let rotationSpeed = 0.001;
let truespeed = rotationSpeed;
let zoomSpeed = 1;
let panSpeed = 0.6; 
let click = false;

scene.add(sphere);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const directionalLight   = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(-45, 35, -30);
directionalLight.target = sphere;

scene.add(ambientLight, directionalLight);

const canvas = document.querySelector("#bg");
canvas.addEventListener('keydown', (event) => {
  if(event.key == 'r' || event.key == "R")
  sphere.rotation.set(0, 0, -0.41)});

canvas.addEventListener('mousedown', (event) => {
  if(event.button == 0){
    click = true;
    rotationSpeed = 0;
  }
});

canvas.addEventListener('mouseup', (event) => {
  if(event.button == 0){
    click = false;
    rotationSpeed = truespeed;

  }
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.minDistance = 16;    // TBA Max model height
controls.maxDistance = 100;
controls.rotateSpeed = panSpeed;
controls.zoomSpeed = zoomSpeed;

function animate() {
  requestAnimationFrame( animate );

  controls.update();

  let cos = Math.cos(rotationSpeed);
  let sin = Math.sin(rotationSpeed);
  let q = new THREE.Quaternion(sin * polarAxis.x, sin * polarAxis.y, sin * polarAxis.z, cos);
  q.multiplyQuaternions(sphere.quaternion, q.invert());
  sphere.quaternion.set(q.x, q.y, q.z, q.w);
  
  renderer.render( scene, camera );
}

animate();