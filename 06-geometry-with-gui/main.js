import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'lil-gui';
import gsap from 'gsap';


const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

const count = 50, radius = 5;
const positions = new Float32Array(count * 3 * 3);
for (let i = 0; i < count * 3 * 3; i++) {
    positions[i] = (Math.sin(Math.random()) - 0.5) * (radius * 2);
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,

    get aspectRatio() {
        return this.width / this.height;
    },
};

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.aspectRatio;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const camera = new THREE.PerspectiveCamera(
    75, sizes.aspectRatio, 0.1, 1000
);
camera.position.set(0, 0, 10);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minAzimuthAngle = -Math.PI / 4;
controls.maxAzimuthAngle = Math.PI / 4;
controls.minPolarAngle = -Math.PI / 4;
controls.maxPolarAngle = Math.PI / 4;

const renderer = new THREE.WebGLRenderer({
    canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const gui = new dat.GUI({
    width: 400,
    closed: true,
    resizable: false,
    name: 'Debug',
});
const debugObject = {
    color: 0xff0000,
    rotation: () => {
        gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
    },
};

gui.add(debugObject, 'color').onChange(() => {
    material.color.set(debugObject.color);
});
gui.add(debugObject, 'rotation');
gui.add(mesh.position, 'x', -10, 10, 0.01);
gui.add(mesh.position, 'y', -1, 1, 0.1);
gui.add(material, 'wireframe');

const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    controls.update();
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
};
tick();