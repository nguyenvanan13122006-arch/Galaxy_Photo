import "./stars.js";
import { scene, camera, renderer, controls } from "./scene.js"; 
import { createPlanet, updatePlanet } from "./planet.js";
import { createGalaxy, updateGalaxy } from "./galaxy.js";
import { createPhotos, updateGallery } from "./photos.js";
import { initAudio } from "./audio.js"; 

// 1. Import thêm các hàm từ shaders.js và ui.js
import { createNebulaSky, updateNebula } from "./shaders.js";
import { createUI } from "./ui.js";

//====================== KHỞI TẠO ======================
createPlanet();
createGalaxy();
createPhotos();
initAudio(); 

// 2. Kích hoạt giao diện UI và tạo bầu trời tinh vân custom shader
createUI();
createNebulaSky(scene);

//====================== VÒNG LẶP CHUYỂN ĐỘNG CHUYÊN NGHIỆP ======================
function animate(timestamp) { // <-- Nhận thêm biến timestamp để tính thời gian chạy thực tế
    requestAnimationFrame(animate);

    if (controls) {
        controls.update();
    }

    scene.updateMatrixWorld(true);

    updatePlanet();
    updateGalaxy();
    
    // 3. Cập nhật chuyển động cuộn cho mây tinh vân ở nền
    updateNebula(timestamp);
    
    if (typeof updateGallery === "function") {
        updateGallery(camera); 
    }

    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

// Chạy vòng lặp
requestAnimationFrame(animate);