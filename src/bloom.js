import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import * as THREE from "three";

let composer;

export function createBloom(renderer, scene, camera) {

    composer = new EffectComposer(renderer);

    const renderPass = new RenderPass(scene, camera);

    composer.addPass(renderPass);

    const bloom = new UnrealBloomPass(

        new THREE.Vector2(

            window.innerWidth,

            window.innerHeight

        ),

        1.2, // strength

        0.45, // radius

        0.75 // threshold

    );

    composer.addPass(bloom);

}

export function renderBloom() {

    composer.render();

}