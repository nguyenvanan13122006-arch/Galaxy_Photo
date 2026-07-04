import * as THREE from "three";
import imageList from "./imageList.js";
import { scene } from "./scene.js";
// Sửa lỗi: Import textureLoader chuẩn và hàm sửa đường dẫn
import { textureLoader, fixUrl } from "./loaders.js"; 

const gallery = new THREE.Group();
scene.add(gallery);

const cards = [];

export function createPhotos() {
    const radius = 20; 

    imageList.forEach((url, i) => {
        // Sửa lỗi: Gọi textureLoader chung và bao bọc bằng fixUrl()
        const texture = textureLoader.load(fixUrl(url));
        
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
            speed: THREE.MathUtils.randFloat(0.0003, 0.0008), 
            floatOffset: Math.random() * Math.PI * 2,
            floatSpeed: THREE.MathUtils.randFloat(0.004, 0.008)
        };

        gallery.add(group);
        cards.push(group);
    });
}

const targetQuaternion = new THREE.Quaternion();

export function updateGallery(activeCamera) {
    gallery.rotation.y += 0.00005;

    if (!activeCamera) return;

    const time = Date.now();

    cards.forEach(card => {
        const d = card.userData;

        d.angle += d.speed;
        card.position.x = Math.cos(d.angle) * d.radius;
        card.position.z = Math.sin(d.angle) * d.radius;

        card.position.y = d.baseY + Math.sin(time * d.floatSpeed + d.floatOffset) * 0.25;

        targetQuaternion.copy(activeCamera.quaternion);
        
        card.quaternion.copy(targetQuaternion);
        card.rotation.y -= gallery.rotation.y;

        card.rotation.z += Math.sin(time * 0.002 + d.floatOffset) * 0.04;
    });
}