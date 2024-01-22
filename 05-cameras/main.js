import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

// mesh
const mesh = new THREE.Mesh(
    new THREE.TorusGeometry(0.7, 0.2, 16, 100),
    new THREE.MeshBasicMaterial({
        color: 0x0000FF,
        wireframe: true,
    }),
);
scene.add(mesh);

// camera
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.set(0, 3, 3);
camera.lookAt(mesh.position);

// axeshelper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// animate
const clock = new THREE.Clock();

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // update controls
    controls.update();

    // render
    renderer.render(scene, camera);

    // call tick again on the next frame
    window.requestAnimationFrame(tick);
}

tick();