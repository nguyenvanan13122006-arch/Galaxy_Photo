import * as THREE from "three";
import { camera } from "./scene.js";
import { audioLoader, fixUrl } from "./loaders.js";

let backgroundSound = null;
let audioInitialized = false;

function startMusicOnce() {
  if (!backgroundSound || !backgroundSound.buffer || backgroundSound.isPlaying) return;

  backgroundSound.play();

  const uiSubtitle = document.querySelector(".cosmic-ui p");
  if (uiSubtitle) {
    uiSubtitle.innerText = "Hệ thống đang phát nhạc nền... 🌌";
  }

  window.removeEventListener("click", startMusicOnce);
  window.removeEventListener("pointerdown", startMusicOnce);
  window.removeEventListener("touchstart", startMusicOnce);
}

export function initAudio() {
  if (audioInitialized) return;
  audioInitialized = true;

  const listener = new THREE.AudioListener();
  camera.add(listener);

  backgroundSound = new THREE.Audio(listener);

  audioLoader.load(
    fixUrl("space-bgm.mp3"),
    (buffer) => {
      backgroundSound.setBuffer(buffer);
      backgroundSound.setLoop(true);
      backgroundSound.setVolume(0.4);

      console.log("🎵 Nhạc nền đã sẵn sàng!");

      // Trình duyệt chặn autoplay, nên cần user interaction
      window.addEventListener("click", startMusicOnce);
      window.addEventListener("pointerdown", startMusicOnce);
      window.addEventListener("touchstart", startMusicOnce);
    },
    undefined,
    (err) => {
      console.error("Lỗi không tải được file nhạc:", err);
    }
  );
}
