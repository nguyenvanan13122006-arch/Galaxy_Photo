import * as THREE from "three";

export const loadingManager = new THREE.LoadingManager();

const baseUrl = import.meta.env.BASE_URL || "/";

export function fixUrl(path) {
  const cleanPath = String(path).replace(/^\/+/, "");

  if (/^(https?:)?\/\//i.test(cleanPath) || cleanPath.startsWith("data:")) {
    return cleanPath;
  }

  return new URL(`${baseUrl}${cleanPath}`, document.baseURI).href;
}

function setLoadingText(message) {
  const loadText = document.getElementById("load-text");
  if (loadText) {
    loadText.textContent = message;
  }
}

loadingManager.onStart = function (url) {
  console.log("Start loading:", url);
};

loadingManager.onProgress = function (_url, itemsLoaded, itemsTotal) {
  const progressPercent = Math.round((itemsLoaded / itemsTotal) * 100);
  setLoadingText(`Dang nap du lieu khong gian... ${progressPercent}%`);
};

loadingManager.onLoad = function () {
  console.log("All assets are ready.");
  setLoadingText("He thong vu tru da nap hoan tat!");

  const enterBtn = document.getElementById("enter-btn");
  if (enterBtn) {
    enterBtn.disabled = false;
    enterBtn.style.display = "inline-flex";
  }
};

loadingManager.onError = function (url) {
  console.error("Cannot load asset:", url);
  setLoadingText("Co tep anh hoac nhac khong tai duoc. Hay kiem tra ten file tren GitHub.");
};

export const textureLoader = new THREE.TextureLoader(loadingManager);
export const audioLoader = new THREE.AudioLoader(loadingManager);
