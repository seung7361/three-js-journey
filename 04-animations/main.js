import * as THREE from 'three';
import gsap from 'gsap';

const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

// box1
const box1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
    })
);
scene.add(box1);

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 3);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas
});
renderer.setSize(window.innerWidth, window.innerHeight);

const clock = new THREE.Clock();

const tick = () => {
    requestAnimationFrame(tick);

    const elapsedTime = clock.getElapsedTime();

    box1.position.set(
        Math.cos(elapsedTime * 0.5), Math.sin(elapsedTime), Math.sin(elapsedTime * 0.5)
    );
    box1.rotation.x += 0.01;
    box1.rotation.y += 0.01;
    box1.rotation.z += 0.01;

    box1.scale.set(
        Math.sin(elapsedTime), Math.sin(elapsedTime), Math.sin(elapsedTime)
    );
    
    renderer.render(scene, camera);
};

tick();