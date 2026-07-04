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
  setLoadingText(`Đang nạp ánh sáng và ký ức... ${progressPercent}%`);
};

loadingManager.onLoad = function () {
  console.log("All assets are ready.");
  setLoadingText("Dải ngân hà đã sẵn sàng cho bạn.");

  const enterBtn = document.getElementById("enter-btn");
  if (enterBtn) {
    enterBtn.disabled = false;
    enterBtn.style.display = "inline-flex";
  }
};

loadingManager.onError = function (url) {
  console.error("Cannot load asset:", url);
  setLoadingText("Có tệp ảnh hoặc nhạc chưa tải được. Hãy kiểm tra tên file trên GitHub.");
};

export const textureLoader = new THREE.TextureLoader(loadingManager);
export const audioLoader = new THREE.AudioLoader(loadingManager);
