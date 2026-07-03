import * as THREE from "three";
import { scene } from "./scene.js";

let planet;
let atmosphere;
let ringParticles; 

// 1. Texture bề mặt dải mây màu hồng sặc sỡ của hành tinh
function createPlanetTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, '#ffbbfb');   
    grad.addColorStop(0.25, '#f376fa'); 
    grad.addColorStop(0.5, '#f99fff');  
    grad.addColorStop(0.75, '#e456ee');
    grad.addColorStop(1, '#b53cbf');   

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 1500; i++) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.06})`;
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 30 + 10, 1.5);
    }

    return new THREE.CanvasTexture(canvas);
}

// 2. Tạo texture hạt mờ viền giúp các chấm nhỏ lấp lánh như sương bụi thiên hà
function createParticleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)'); 
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)'); 

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(8, 8, 8, 0, Math.PI * 2);
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
}

export function createPlanet() {
    // ==========================================
    // QUẢ CẦU HÀNH TINH
    // ==========================================
    const geometry = new THREE.SphereGeometry(8, 128, 128);

    const material = new THREE.MeshStandardMaterial({
        map: createPlanetTexture(),
        roughness: 0.95,             
        metalness: 0.0,
        emissive: new THREE.Color('rgb(243,118,250)'), 
        emissiveIntensity: 0.25,     
    });

    planet = new THREE.Mesh(geometry, material);
    scene.add(planet);

    // ==========================================
    // KHÍ QUYỂN (FRESNEL GLOW)
    // ==========================================
    const atmosphereGeometry = new THREE.SphereGeometry(8.12, 64, 64);
    
    const atmosphereMaterial = new THREE.ShaderMaterial({
        vertexShader: `
            varying vec3 vNormal;
            void main() {
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec3(position);
            }
        `,
        fragmentShader: `
            varying vec3 vNormal;
            void main() {
                float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
                gl_FragColor = vec4(1.0, 0.75, 1.0, 1.0) * intensity * 0.65;
            }
        `,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true
    });

    atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // ==========================================
    // VÀNH ĐAI 80.000 HẠT DÀY ĐẶC - TÔNG TÍM NHẠT PASTEL
    // ==========================================
    const particleCount = 80000; 
    const innerRadius = 11.0;     
    const outerRadius = 18.5;     

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // CHỈNH SỬA: Đổi bảng màu sang tông Tím nhạt, trong trẻo và dịu mắt hơn
    const colorInner = new THREE.Color('#fbe3ff');  // Hồng tím cực nhạt ở sát hành tinh
    const colorMiddle = new THREE.Color('#d1a3ff'); // Tím Lavender nhạt mượt mà ở giữa
    const colorOuter = new THREE.Color('#8a6bb5');  // Tím khói pastel dịu nhẹ ở rìa ngoài cùng

    for (let i = 0; i < particleCount; i++) {
        const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
        const angle = Math.random() * Math.PI * 2;

        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        const y = (Math.random() - 0.5) * 0.4; 

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        const normalizedDist = (radius - innerRadius) / (outerRadius - innerRadius);
        let mixedColor = new THREE.Color();

        if (normalizedDist < 0.4) {
            mixedColor.lerpColors(colorInner, colorMiddle, normalizedDist / 0.4);
        } else {
            mixedColor.lerpColors(colorMiddle, colorOuter, (normalizedDist - 0.4) / 0.6);
        }

        colors[i * 3] = mixedColor.r;
        colors[i * 3 + 1] = mixedColor.g;
        colors[i * 3 + 2] = mixedColor.b;
    }

    const ringGeometry = new THREE.BufferGeometry();
    ringGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    ringGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const ringMaterial = new THREE.PointsMaterial({
        size: 0.16,                     
        vertexColors: true,           
        transparent: true,
        opacity: 0.95,
        map: createParticleTexture(), 
        blending: THREE.AdditiveBlending, 
        depthWrite: false             
    });

    ringParticles = new THREE.Points(ringGeometry, ringMaterial);
    scene.add(ringParticles);
}

export function updatePlanet() {
    if (!planet) return;

    planet.rotation.y += 0.001; 
    
    atmosphere.position.copy(planet.position);
    ringParticles.position.copy(planet.position);
    ringParticles.rotation.y += 0.0006;
}