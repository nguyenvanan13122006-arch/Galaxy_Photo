import * as THREE from "three";

// Vertex Shader: Định vị các đỉnh của khối cầu trong không gian 3D
export const nebulaVertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

// Fragment Shader: Tạo hiệu ứng nhiễu động (Noise) sinh ra các dải mây tinh vân màu tím/hồng
export const nebulaFragmentShader = `
    uniform float uTime;
    varying vec2 vUv;

    // Hàm tạo nhiễu ngẫu nhiên (Simplex-like noise)
    float noise(vec2 p) {
        return sin(p.x * 10.0 + uTime * 0.2) * cos(p.y * 10.0 + uTime * 0.2) * 0.5 + 0.5;
    }

    void main() {
        // Tạo các lớp mây xếp chồng
        vec2 uv1 = vUv * 3.0;
        vec2 uv2 = vUv * 6.0 + vec2(uTime * 0.01, uTime * 0.01);
        
        float n1 = noise(uv1);
        float n2 = noise(uv2);
        float finalNoise = (n1 * 0.6 + n2 * 0.4);

        // Định hình màu sắc chủ đạo của tinh vân (Hồng tím & Xanh đen vũ trụ)
        vec3 colorCosmic = vec3(0.2, 0.05, 0.3) * finalNoise; 
        vec3 colorDeepSpace = vec3(0.02, 0.01, 0.05);
        
        // Trộn hai màu dựa trên giá trị nhiễu toán học
        vec3 finalColor = mix(colorDeepSpace, colorCosmic, finalNoise * 0.7);

        gl_FragColor = vec4(finalColor, 1.0);
    }
`;

let nebulaMesh;
const nebulaUniforms = {
    uTime: { value: 0 }
};

export function createNebulaSky(scene) {
    // Tạo một khối cầu cực lớn bao trọn cả vũ trụ của bạn
    const geometry = new THREE.SphereGeometry(500, 32, 32);
    
    const material = new THREE.ShaderMaterial({
        vertexShader: nebulaVertexShader,
        fragmentShader: nebulaFragmentShader,
        uniforms: nebulaUniforms,
        side: THREE.BackSide // Chỉ hiển thị mặt bên trong của khối cầu
    });

    nebulaMesh = new THREE.Mesh(geometry, material);
    scene.add(nebulaMesh);
}

export function updateNebula(time) {
    if (nebulaUniforms) {
        // Cập nhật biến thời gian để mây chuyển động cuộn sóng liên tục
        nebulaUniforms.uTime.value = time * 0.001; 
    }
}