import * as THREE from "three";
import imageList from "./imageList.js";
import { scene } from "./scene.js";

const loader = new THREE.TextureLoader();
const gallery = new THREE.Group();
scene.add(gallery);

const cards = [];

export function createPhotos() {
    const radius = 20; 

    imageList.forEach((url, i) => {
        const texture = loader.load(url);
        
        // Khử mờ ảnh tuyệt đối
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter; 
        texture.generateMipmaps = false;       

        //--------------------------------
        // Frame (Khung viền trắng)
        //--------------------------------
        const frame = new THREE.Mesh(
            new THREE.BoxGeometry(4.8, 6.2, 0.12), 
            new THREE.MeshPhysicalMaterial({
                color: 0xffffff,
                roughness: 0.3,
                metalness: 0.0,
                clearcoat: 1.0
            })
        );
        frame.position.z = -0.06;

        //--------------------------------
        // Photo (Tấm ảnh hiển thị)
        //--------------------------------
        const photo = new THREE.Mesh(
            new THREE.PlaneGeometry(4.4, 5.8), 
            new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                side: THREE.DoubleSide
            })
        );
        photo.position.z = 0.01; 

        //--------------------------------
        // Group Single Card
        //--------------------------------
        const group = new THREE.Group();
        group.add(frame);
        group.add(photo);

        const angle = (i / imageList.length) * Math.PI * 2;
        const baseY = THREE.MathUtils.randFloat(-2, 5); 

        group.position.set(
            Math.cos(angle) * radius,
            baseY,
            Math.sin(angle) * radius
        );

        group.userData = {
            angle: angle,
            radius: radius,
            baseY: baseY, 
            // Giảm tốc độ di chuyển để ảnh bay chậm rãi, dịu dàng hơn
            speed: THREE.MathUtils.randFloat(0.0003, 0.0008), 
            floatOffset: Math.random() * Math.PI * 2,
            floatSpeed: THREE.MathUtils.randFloat(0.004, 0.008) // Giảm tốc độ bồng bềnh
        };

        gallery.add(group);
        cards.push(group);
    });
}

// Tạo sẵn các biến tạm ngoài vòng lặp để tối ưu hiệu năng
const targetQuaternion = new THREE.Quaternion();

export function updateGallery(activeCamera) {
    // Gallery tổng thể xoay cực kỳ chậm
    gallery.rotation.y += 0.00005;

    if (!activeCamera) return;

    const time = Date.now();

    cards.forEach(card => {
        const d = card.userData;

        // 1. Cập nhật vị trí tịnh tiến chậm rãi quanh hành tinh hồng
        d.angle += d.speed;
        card.position.x = Math.cos(d.angle) * d.radius;
        card.position.z = Math.sin(d.angle) * d.radius;

        // 2. Hiệu ứng lơ lửng lên xuống nhịp nhàng, êm ái hơn bản cũ
        card.position.y = d.baseY + Math.sin(time * d.floatSpeed + d.floatOffset) * 0.25;

        // 3. HIỆU ỨNG GÓC XOAY THEO MẮT QUÁN TÍNH (Mượt mà không trễ nhịp)
        // Copy góc xoay chuẩn của camera
        targetQuaternion.copy(activeCamera.quaternion);
        
        // Khử chuyển động xoay Y của nhóm cha để ảnh không lệch
        card.quaternion.copy(targetQuaternion);
        card.rotation.y -= gallery.rotation.y;

        // 4. HIỆU ỨNG BỔ SUNG: Nghiêng lắc nhẹ (Roll) tạo sự sống động mềm mại
        // Ảnh sẽ đung đưa nhẹ sang trái/phải một góc cực nhỏ giống như đang trôi trong nước
        card.rotation.z += Math.sin(time * 0.002 + d.floatOffset) * 0.04;
    });
}