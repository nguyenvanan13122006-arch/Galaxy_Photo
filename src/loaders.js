import * as THREE from "three";

export const loadingManager = new THREE.LoadingManager();

// Lấy base URL từ Vite
const baseUrl = import.meta.env.BASE_URL || "/";

// Theo dõi trạng thái tải
loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
  console.log(`🚀 Bắt đầu tải tài nguyên: ${url}`);
};

loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
  const progressPercent =
    itemsTotal > 0 ? Math.round((itemsLoaded / itemsTotal) * 100) : 0;

  const loadText = document.getElementById("load-text");
  if (loadText) {
    loadText.innerText = `Đang nạp dữ liệu không gian... ${progressPercent}%`;
  }
};

loadingManager.onLoad = function () {
  console.log("🎉 Tất cả tài nguyên đã sẵn sàng!");

  const loadText = document.getElementById("load-text");
  const enterBtn = document.getElementById("enter-btn");

  if (loadText) {
    loadText.innerText = "Hệ thống vũ trụ đã nạp hoàn tất!";
  }

  if (enterBtn) {
    enterBtn.style.display = "block";
  }
};

loadingManager.onError = function (url) {
  console.error(`❌ Có lỗi xảy ra khi tải tệp: ${url}`);
};

export const textureLoader = new THREE.TextureLoader(loadingManager);
export const audioLoader = new THREE.AudioLoader(loadingManager);

// Chuẩn hóa đường dẫn asset cho Vite + GitHub Pages
export function fixUrl(path) {
  if (!path) return "";

  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${baseUrl}${cleanPath}`;
}
