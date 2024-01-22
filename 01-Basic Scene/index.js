const scene = new THREE.Scene();

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0x000000), 1.0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(15, 16, 13);
camera.lookAt(scene.position);

const axes = new THREE.AxesHelper(10);
scene.add(axes);

// cube
const cubeGeometry = new THREE.BoxGeometry(6, 4, 6);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.castShadow = true;
scene.add(cube);

// plane
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;

plane.rotation.x = -0.5 * Math.PI;
plane.position.y = -2;
scene.add(plane);

// pointlight
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 20, 20);
pointLight.castShadow = true;
scene.add(pointLight);

const helper = new THREE.CameraHelper(pointLight.shadow.camera);
scene.add(helper);

const render = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
};

document.body.appendChild(renderer.domElement);
render();