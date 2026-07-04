import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export const scene = new THREE.Scene();

scene.background = new THREE.Color(0x050414);

//================ CAMERA =================

export const camera = new THREE.PerspectiveCamera(

    60,
    window.innerWidth / window.innerHeight,
    0.1,
    5000

);

camera.position.set(0, 8, 55);

//================ RENDERER =================

export const renderer = new THREE.WebGLRenderer({

    antialias: true,
    alpha: false

});

renderer.setPixelRatio(

    Math.min(window.devicePixelRatio, 2)

);

renderer.setSize(

    window.innerWidth,
    window.innerHeight

);

renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.toneMapping = THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure = 1.35;

document.body.appendChild(renderer.domElement);

//================ CONTROLS =================

export const controls = new OrbitControls(

    camera,
    renderer.domElement

);

controls.enableDamping = true;

controls.enablePan = false;

controls.autoRotate = true;

controls.autoRotateSpeed = 0.35;

controls.minDistance = 25;

controls.maxDistance = 120;

//================ LIGHT =================

// Ánh sáng nền

const ambient = new THREE.AmbientLight(

    0xfff0fb,
    1.75

);

scene.add(ambient);

// Key light

const keyLight = new THREE.DirectionalLight(

    0xffffff,
    4

);

keyLight.position.set(

    25,
    20,
    30

);

scene.add(keyLight);

// Pink light

const pinkLight = new THREE.PointLight(

    0xff9ad8,
    210,
    120

);

pinkLight.position.set(

    -18,
    10,
    18

);

scene.add(pinkLight);

// Blue light

const blueLight = new THREE.PointLight(

    0x8af4ff,
    145,
    120

);

blueLight.position.set(

    18,
    -10,
    -25

);

scene.add(blueLight);

// Rim light

const rim = new THREE.DirectionalLight(

    0xffffff,
    2

);

rim.position.set(

    -40,
    25,
    -40

);

scene.add(rim);

//================ RESIZE =================

window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(

        window.innerWidth,
        window.innerHeight

    );

});

//================ RENDER =================

export function render() {

    controls.update();

    renderer.render(

        scene,
        camera

    );

}
