import * as THREE from "three";
import imageList from "./imageList.js";
import { scene } from "./scene.js";
import { textureLoader, fixUrl } from "./loaders.js";

const gallery = new THREE.Group();
scene.add(gallery);

const cards = [];
const targetQuaternion = new THREE.Quaternion();

function createFallbackTexture(label) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 680;

  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#24143a");
  gradient.addColorStop(1, "#040713");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(255, 187, 251, 0.8)";
  ctx.lineWidth = 8;
  ctx.strokeRect(28, 28, canvas.width - 56, canvas.height - 56);

  ctx.fillStyle = "#ffffff";
  ctx.font = "32px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Image not found", canvas.width / 2, canvas.height / 2 - 20);

  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.font = "22px sans-serif";
  ctx.fillText(label, canvas.width / 2, canvas.height / 2 + 26);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createPhotos() {
  const radius = 20;

  imageList.forEach((url, i) => {
    const textureUrl = fixUrl(url);
    const texture = textureLoader.load(
      textureUrl,
      undefined,
      undefined,
      () => {
        console.error("Photo failed to load:", textureUrl);
        photo.material.map = createFallbackTexture(url);
        photo.material.needsUpdate = true;
      }
    );
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;

    // Khung ảnh
    const frame = new THREE.Mesh(
      new THREE.BoxGeometry(4.8, 6.2, 0.12),
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.3,
        metalness: 0.0,
        clearcoat: 1.0,
      })
    );
    frame.position.z = -0.06;

    // Ảnh
    const photo = new THREE.Mesh(
      new THREE.PlaneGeometry(4.4, 5.8),
      new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
      })
    );
    photo.position.z = 0.01;

    // Nhóm card
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
      angle,
      radius,
      baseY,
      speed: THREE.MathUtils.randFloat(0.0003, 0.0008),
      floatOffset: Math.random() * Math.PI * 2,
      floatSpeed: THREE.MathUtils.randFloat(0.004, 0.008),
    };

    gallery.add(group);
    cards.push(group);
  });
}

export function updateGallery(activeCamera) {
  gallery.rotation.y += 0.00005;

  if (!activeCamera) return;

  const time = Date.now();

  cards.forEach((card) => {
    const d = card.userData;

    d.angle += d.speed;
    card.position.x = Math.cos(d.angle) * d.radius;
    card.position.z = Math.sin(d.angle) * d.radius;
    card.position.y = d.baseY + Math.sin(time * d.floatSpeed + d.floatOffset) * 0.25;

    targetQuaternion.copy(activeCamera.quaternion);
    card.quaternion.copy(targetQuaternion);

    // Giữ card quay theo gallery nhưng vẫn hướng camera
    card.rotation.y -= gallery.rotation.y;
    card.rotation.z += Math.sin(time * 0.002 + d.floatOffset) * 0.04;
  });
}
