import * as THREE from "three";

export const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log(`🚀 Bắt đầu tải tài nguyên: ${url}`);
};

loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
    const progressPercent = Math.round((itemsLoaded / itemsTotal) * 100);
    
    // Tìm và cập nhật trạng thái text phần trăm lên màn hình chào HTML
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
        enterBtn.style.display = "block"; // Hiện nút Khám Phá khi load xong hoàn toàn
    }
};

loadingManager.onError = function (url) {
    console.error(`❌ Có lỗi xảy ra khi tải tệp: ${url}`);
};

export const textureLoader = new THREE.TextureLoader(loadingManager);
export const audioLoader = new THREE.AudioLoader(loadingManager);