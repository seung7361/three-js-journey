import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,

    get aspectRatio() {
        return this.width / this.height;
    },
};

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
    75, sizes.aspectRatio, 0.1, 1000
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

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.aspectRatio;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
});

window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

    if (!fullscreenElement) {
        if (canvas.requestFullscreen) canvas.requestFullscreen();
        else if (canvas.webkitRequestFullscreen) canvas.webkitRequestFullscreen();
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    }
});

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    controls.update();

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

tick();