import * as THREE from "three";
import { scene } from "./scene.js";

let galaxy;

export function createGalaxy() {

    const count = 25000;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorInside = new THREE.Color("#ff66ff");
    const colorOutside = new THREE.Color("#ffffff");

    for (let i = 0; i < count; i++) {

        const i3 = i * 3;

        const radius = Math.random() * 180;

        const spin = radius * 0.28;

        const branch = (i % 6) * ((Math.PI * 2) / 6);

        const randomX = (Math.random() - 0.5) * 8;
        const randomY = (Math.random() - 0.5) * 3;
        const randomZ = (Math.random() - 0.5) * 8;

        positions[i3] =
            Math.cos(branch + spin) * radius + randomX;

        positions[i3 + 1] =
            randomY;

        positions[i3 + 2] =
            Math.sin(branch + spin) * radius + randomZ;

        const mixedColor = colorInside.clone();

        mixedColor.lerp(
            colorOutside,
            radius / 180
        );

        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;

    }

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
    );

    geometry.setAttribute(
        "color",
        new THREE.BufferAttribute(colors, 3)
    );

    const material = new THREE.PointsMaterial({

        size: 0.35,

        transparent: true,

        opacity: 0.9,

        depthWrite: false,

        vertexColors: true,

        blending: THREE.AdditiveBlending

    });

    galaxy = new THREE.Points(

        geometry,

        material

    );

    scene.add(galaxy);

}

export function updateGalaxy() {

    if (!galaxy) return;

    galaxy.rotation.y += 0.0005;

}