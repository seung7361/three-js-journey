import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'lil-gui';
import gsap from 'gsap';

const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
    console.log('loading started');
};
loadingManager.onLoad = () => {
    console.log('loading finished');
};
loadingManager.onProgress = () => {
    console.log('loading progressing');
};
loadingManager.onError = (e) => {
    console.log('loading error', e);
};
// texture loader
const textureLoader = new THREE.TextureLoader(loadingManager);

// diamond ore
const textureDiamondOre = textureLoader.load('/textures/diamond_ore.png');
textureDiamondOre.generateMipmaps = false;
textureDiamondOre.magFilter = THREE.NearestFilter;

// grass block
const textureGrass = [
    textureLoader.load('/textures/grass_block_top.png'),
    textureLoader.load('/textures/grass_block_side.png'),
    textureLoader.load('/textures/dirt.png'),
];
textureGrass.forEach((texture) => {
    texture.generateMipmaps = false;
    texture.magFilter = THREE.NearestFilter;
});

const coord = [[-1, -1, -1], [0, -1, -1], [1, -1, -1], [-1, -1, 0], [0, -1, 0], [1, -1, 0], [-1, -1, 1], [0, -1, 1], [1, -1, 1]];
coord.forEach((c) => {
    const grassBlock = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        [
            new THREE.MeshBasicMaterial({ map: textureGrass[1] }),
            new THREE.MeshBasicMaterial({ map: textureGrass[1] }),
            new THREE.MeshBasicMaterial({ map: textureGrass[0], color: 0x6e9d45 }),
            new THREE.MeshBasicMaterial({ map: textureGrass[2] }),
            new THREE.MeshBasicMaterial({ map: textureGrass[1] }),
            new THREE.MeshBasicMaterial({ map: textureGrass[1] }),
        ]
    );
    grassBlock.position.set(c[0], c[1], c[2]);
    scene.add(grassBlock);
});

// door
const textureDoorTop = textureLoader.load('/textures/birch_door_top.png');
const textureDoorBottom = textureLoader.load('/textures/birch_door_bottom.png');
textureDoorTop.generateMipmaps = false;
textureDoorTop.magFilter = THREE.NearestFilter;
textureDoorBottom.generateMipmaps = false;
textureDoorBottom.magFilter = THREE.NearestFilter;

const doorTop = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 0.1),
    new THREE.MeshBasicMaterial({
        map: textureDoorTop,
        transparent: true,
    })
);
const doorBottom = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 0.1),
    new THREE.MeshBasicMaterial({
        map: textureDoorBottom,
        transparent: true,
    })
);
doorTop.position.set(0, 1, -0.4);
doorBottom.position.set(0, 0, -0.4);
const door = new THREE.Group();
door.add(doorTop, doorBottom);
scene.add(door);


scene.add(new THREE.AxesHelper(2));

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
camera.position.set(0, 5, 5);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
    canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();

const tick = () => {
    requestAnimationFrame(tick);

    controls.update();
    renderer.render(scene, camera);
    const elapsedTime = clock.getElapsedTime();

    door.rotation.y = Math.sin(elapsedTime * 5) > 0.5 ? Math.PI / 2 : 0;
}

tick();