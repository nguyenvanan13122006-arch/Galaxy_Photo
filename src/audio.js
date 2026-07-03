import * as THREE from "three";
import { camera } from "./scene.js";
// 1. Import audioLoader từ file loaders vừa viết
import { audioLoader } from "./loaders.js"; 

let backgroundSound;

export function initAudio() {
    const listener = new THREE.AudioListener();
    camera.add(listener);

    backgroundSound = new THREE.Audio(listener);

    // 2. Xóa dòng "const audioLoader = new THREE.AudioLoader();" cũ đi, chỉ dùng lệnh load luôn:
    audioLoader.load('/space-bgm.mp3', function(buffer) { 
        backgroundSound.setBuffer(buffer);
        backgroundSound.setLoop(true);       
        backgroundSound.setVolume(0.4);      
        console.log("🎵 Nhạc nền vũ trụ đã sẵn sàng bộ đệm!");
    }, 
    undefined, 
    function(err) {
        console.error("Lỗi không tải được file nhạc, hãy kiểm tra lại đường dẫn:", err);
    });

    // ... (Giữ nguyên đoạn code startMusic bên dưới của bạn) ...
    const startMusic = () => {
        if (backgroundSound && !backgroundSound.isPlaying && backgroundSound.buffer) {
            backgroundSound.play();
            window.removeEventListener("click", startMusic);
            window.removeEventListener("pointerdown", startMusic);
            
            // Cập nhật lại UI thông báo nhạc đang phát
            const uiSubtitle = document.querySelector(".cosmic-ui p");
            if (uiSubtitle) uiSubtitle.innerText = "Hệ thống đang phát nhạc nền... 🌌";
        }
    };

    window.addEventListener("click", startMusic);
    window.addEventListener("pointerdown", startMusic);
}