import { fixUrl } from "./loaders.js";

let backgroundMusic;
let playRequested = false;

function updateHud(message) {
  const subtitle = document.querySelector(".cosmic-hud p");
  if (subtitle) {
    subtitle.textContent = message;
  }
}

function createAudioElement() {
  const audio = document.createElement("audio");
  audio.id = "background-music";
  audio.src = fixUrl("space-bgm.mp3");
  audio.loop = true;
  audio.preload = "auto";
  audio.volume = 0.45;
  audio.setAttribute("playsinline", "");
  audio.setAttribute("webkit-playsinline", "");
  audio.style.display = "none";

  audio.addEventListener("canplaythrough", () => {
    console.log("Background music is ready.");
  });

  audio.addEventListener("error", () => {
    console.error("Cannot load background music:", audio.currentSrc);
    updateHud("Khong tai duoc nhac nen. Hay kiem tra file space-bgm.mp3.");
  });

  document.body.appendChild(audio);
  return audio;
}

async function playMusic() {
  playRequested = true;

  if (!backgroundMusic) {
    backgroundMusic = createAudioElement();
  }

  try {
    backgroundMusic.muted = false;
    backgroundMusic.currentTime = backgroundMusic.currentTime || 0;
    await backgroundMusic.play();
    updateHud("Nhac nen dang phat...");
  } catch (error) {
    console.error("Cannot start background music:", error);
    updateHud("Hay cham man hinh them mot lan de bat nhac nen.");
  }
}

export function requestAudioStart() {
  playMusic();
}

export function initAudio() {
  backgroundMusic = createAudioElement();
  backgroundMusic.load();

  window.addEventListener("galaxy:start", requestAudioStart);

  const retryFromGesture = () => {
    if (playRequested && backgroundMusic?.paused) {
      requestAudioStart();
    }
  };

  window.addEventListener("touchend", retryFromGesture, { passive: true });
  window.addEventListener("pointerup", retryFromGesture);
  window.addEventListener("keydown", retryFromGesture);
}
