import "./stars.js";
import { scene, camera, renderer, controls } from "./scene.js";
import { createPlanet, updatePlanet } from "./planet.js";
import { createGalaxy, updateGalaxy } from "./galaxy.js";
import { createPhotos, updateGallery } from "./photos.js";
import { initAudio } from "./audio.js";
import { createNebulaSky, updateNebula } from "./shaders.js";
import { createUI } from "./ui.js";

createUI();
createPlanet();
createGalaxy();
createPhotos();
initAudio();
createNebulaSky(scene);

function animate(timestamp) {
  requestAnimationFrame(animate);

  controls?.update();
  scene?.updateMatrixWorld(true);

  updatePlanet();
  updateGalaxy();
  updateNebula(timestamp);
  updateGallery(camera);

  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

requestAnimationFrame(animate);
