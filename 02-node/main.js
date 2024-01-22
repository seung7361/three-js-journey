import * as THREE from 'three';

// Scene
const scene = new THREE.Scene();

// box1
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
mesh.castShadow = true;
scene.add(mesh);

// Light
const light = new THREE.AmbientLight(0xffffff, 5);
light.position.set(0, 3, -5);
light.castShadow = true;
scene.add(light);

const lightHelper = new THREE.PointLightHelper(light);
scene.add(lightHelper);

// plane
const plane = new THREE.PlaneGeometry(50, 50, 50, 1);
const material2 = new THREE.MeshLambertMaterial({ color: 0x00FF00 });
const mesh2 = new THREE.Mesh(plane, material2);
mesh2.position.set(1, -2, 0);
mesh2.rotation.x = -0.5 * Math.PI;
mesh2.receiveShadow = true;
scene.add(mesh2);

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(mesh.position);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas.webgl'),
});
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);