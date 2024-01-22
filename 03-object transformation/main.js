import * as THREE from 'three';

const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();


// box1
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

mesh.position.set(0.7, -0.6, 1);
mesh.rotation.set(0.25 * Math.PI, 0.25 * Math.PI, 0);
mesh.castShadow = true;
mesh.receiveShadow = true;
scene.add(mesh);

// plane
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshLambertMaterial({ color: 0xffffff })
);
plane.position.set(0, -3, 0);
plane.rotation.x = -0.5 * Math.PI;
plane.castShadow = true;
plane.receiveShadow = true;
scene.add(plane);

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
camera.position.set(0, 5, 5);
camera.lookAt(mesh.position);
scene.add(camera);

// group
const group = new THREE.Group()
group.scale.y = 2;
group.rotation.y = 0.2;
scene.add(group);

// cubes
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
cube1.position.x = -1.5;
cube1.castShadow = true;
cube1.receiveShadow = true;
group.add(cube1);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshLambertMaterial({ color: 0x00ff00 })
);
cube2.position.x = 0;
cube2.castShadow = true;
cube2.receiveShadow = true;
group.add(cube2);

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshLambertMaterial({ color: 0x0000ff })
);
cube3.position.x = 1.5;
cube3.castShadow = true;
cube3.receiveShadow = true;
group.add(cube3);

// axeshelper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);

// light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
ambientLight.position.set(0, 10, 0);
scene.add(ambientLight);

const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    group.rotation.y += 0.01;
    group.rotation.z += 0.01;
};

animate();