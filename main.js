import "./style.css";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const loader = new GLTFLoader();

const scene = new THREE.Scene();

const contentBox = document.getElementsByClassName("content")[0];

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.setZ(30);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#canvas_1"),
});

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
    color: 0xff6347,
    // wireframe: true,
});

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 49, 0);
const pointLightHelper = new THREE.PointLightHelper(pointLight);
scene.add(pointLightHelper);
scene.add(pointLight);

const torusMesh = new THREE.Mesh(geometry, material);

// scene.add(torusMesh);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;

scene.background = new THREE.Color(0xbfe3dd);

const controls = new OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

loader.load(
    "./model.glb",
    function (gltf) {
        const model = gltf.scene;
        scene.add(model);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

loader.load(
    "./assets/Soldier.glb",
    function (gltf) {
        const model = gltf.scene;
        model.position.set(10, 10, 10);
        scene.add(model);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    torusMesh.rotation.x += 0.01;
    torusMesh.rotation.y += 0.01;
}

animate();
