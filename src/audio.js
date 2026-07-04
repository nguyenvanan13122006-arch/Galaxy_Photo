import * as THREE from "three";
import { camera } from "./scene.js";
import { audioLoader, fixUrl } from "./loaders.js"; 

let backgroundSound;

export function initAudio() {
    const listener = new THREE.AudioListener();
    camera.add(listener);

    backgroundSound = new THREE.Audio(listener);

    // Sửa lỗi: Bọc fixUrl quanh file nhạc nền
    audioLoader.load(fixUrl('/space-bgm.mp3'), function(buffer) { 
        backgroundSound.setBuffer(buffer);
        backgroundSound.setLoop(true);       
        backgroundSound.setVolume(0.4);      
        console.log("🎵 Nhạc nền vũ trụ đã sẵn sàng bộ đệm!");
    }, 
    undefined, 
    function(err) {
        console.error("Lỗi không tải được file nhạc, hãy kiểm tra lại đường dẫn:", err);
    });

    const startMusic = () => {
        if (backgroundSound && !backgroundSound.isPlaying && backgroundSound.buffer) {
            backgroundSound.play();
            window.removeEventListener("click", startMusic);
            window.removeEventListener("pointerdown", startMusic);
            
            const uiSubtitle = document.querySelector(".cosmic-ui p");
            if (uiSubtitle) uiSubtitle.innerText = "Hệ thống đang phát nhạc nền... 🌌";
        }
    };

    window.addEventListener("click", startMusic);
    window.addEventListener("pointerdown", startMusic);
}