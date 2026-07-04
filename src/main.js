import "./stars.js";
import { scene, camera, renderer, controls } from "./scene.js";
import { createPlanet, updatePlanet } from "./planet.js";
import { createGalaxy, updateGalaxy } from "./galaxy.js";
import { createPhotos, updateGallery } from "./photos.js";
import { initAudio } from "./audio.js";
import { createNebulaSky, updateNebula } from "./shaders.js";
import { createUI } from "./ui.js";

// ====================== KHỞI TẠO ======================
createPlanet();
createGalaxy();
createPhotos();
initAudio();

createUI();
createNebulaSky(scene);

// ====================== VÒNG LẶP RENDER ======================
function animate(timestamp) {
  requestAnimationFrame(animate);

  if (controls) {
    controls.update();
  }

  if (scene) {
    scene.updateMatrixWorld(true);
  }

  updatePlanet();
  updateGalaxy();
  updateNebula(timestamp);

  if (typeof updateGallery === "function") {
    updateGallery(camera);
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

requestAnimationFrame(animate);
