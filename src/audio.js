import * as THREE from "three";
import { camera } from "./scene.js";
import { audioLoader, fixUrl } from "./loaders.js";

let listener;
let backgroundSound;
let audioReady = false;
let startRequested = false;

function updateHud(message) {
  const subtitle = document.querySelector(".cosmic-hud p");
  if (subtitle) {
    subtitle.textContent = message;
  }
}

async function startMusic() {
  startRequested = true;

  if (!backgroundSound || !audioReady) {
    updateHud("Dang chuan bi nhac nen...");
    return;
  }

  const context = listener?.context;
  if (context?.state === "suspended") {
    await context.resume();
  }

  if (!backgroundSound.isPlaying) {
    backgroundSound.play();
    updateHud("Nhac nen dang phat...");
  }
}

export function requestAudioStart() {
  startMusic().catch((error) => {
    console.error("Cannot start background music:", error);
    updateHud("Trinh duyet dang chan nhac nen. Hay cham man hinh them mot lan.");
  });
}

export function initAudio() {
  listener = new THREE.AudioListener();
  camera.add(listener);

  backgroundSound = new THREE.Audio(listener);

  audioLoader.load(
    fixUrl("space-bgm.mp3"),
    (buffer) => {
      backgroundSound.setBuffer(buffer);
      backgroundSound.setLoop(true);
      backgroundSound.setVolume(0.4);
      audioReady = true;
      console.log("Background music loaded.");

      if (startRequested) {
        requestAudioStart();
      }
    },
    undefined,
    (error) => {
      console.error("Cannot load background music:", error);
      updateHud("Khong tai duoc nhac nen. Hay kiem tra file space-bgm.mp3.");
    }
  );

  window.addEventListener("galaxy:start", requestAudioStart);
  window.addEventListener("pointerdown", requestAudioStart, { once: true });
  window.addEventListener("touchend", requestAudioStart, { once: true });
  window.addEventListener("keydown", requestAudioStart, { once: true });
}
