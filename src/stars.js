import * as THREE from "three";
import { scene } from "./scene.js";

const geometry = new THREE.BufferGeometry();

const vertices = [];

for(let i=0;i<80000;i++){

    vertices.push(

        (Math.random()-0.5)*3000,

        (Math.random()-0.5)*3000,

        (Math.random()-0.5)*3000

    );

}

geometry.setAttribute(

    "position",

    new THREE.Float32BufferAttribute(vertices,3)

);

const material = new THREE.PointsMaterial({

    color:0xffffff,

    size:1.3,

    transparent:true,

    opacity:0.9,

    depthWrite:false

});

const stars = new THREE.Points(

    geometry,

    material

);

scene.add(stars);

function animateStars(){

    stars.rotation.y+=0.00008;

    requestAnimationFrame(animateStars);

}

animateStars();