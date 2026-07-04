import * as THREE from "three";

export const loadingManager = new THREE.LoadingManager();

// Lấy base URL tự động từ Vite config
const baseUrl = import.meta.env.BASE_URL;

loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log(`🚀 Bắt đầu tải tài nguyên: ${url}`);
};

loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
    const progressPercent = Math.round((itemsLoaded / itemsTotal) * 100);
    const loadText = document.getElementById("load-text");
    if (loadText) {
        loadText.innerText = `Đang nạp dữ liệu không gian... ${progressPercent}%`;
    }
};

loadingManager.onLoad = function () {
    console.log("🎉 Tất cả tài nguyên đã sẵn sàng!");
    const loadText = document.getElementById("load-text");
    const enterBtn = document.getElementById("enter-btn");
    
    if (loadText && enterBtn) {
        loadText.innerText = "Hệ thống vũ trụ đã nạp hoàn tất!";
        enterBtn.style.display = "block";
    }
};

loadingManager.onError = function (url) {
    console.error(`❌ Có lỗi xảy ra khi tải tệp: ${url}`);
};

export const textureLoader = new THREE.TextureLoader(loadingManager);
export const audioLoader = new THREE.AudioLoader(loadingManager);

// Hàm tự động chuẩn hóa đường dẫn tài nguyên tĩnh cho môi trường Production
export function fixUrl(path) {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${baseUrl}${cleanPath}`;
}