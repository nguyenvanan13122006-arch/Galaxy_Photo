export function createUI() {
    // 1. Nhúng CSS tạo phong cách Cyberpunk/Cosmic cho toàn bộ giao diện HUD và Màn hình Chờ
    const style = document.createElement("style");
    style.textContent = `
        /* --- Màn hình chờ (Loading Screen) --- */
        #loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, #150a21 0%, #03040d 100%);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1);
            font-family: 'Segoe UI', Roboto, sans-serif;
            color: #ffffff;
        }
        .loader-title {
            font-size: 38px;
            font-weight: 300;
            letter-spacing: 6px;
            text-transform: uppercase;
            background: linear-gradient(45deg, #ffbbfb, #d1a3ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 10px;
            filter: drop-shadow(0 0 15px rgba(243,118,250,0.4));
        }
        .loader-status {
            font-size: 14px;
            letter-spacing: 2px;
            color: #ffbbfb;
            opacity: 0.8;
            margin-bottom: 30px;
        }
        .start-btn {
            background: transparent;
            border: 1px solid rgba(243, 118, 250, 0.6);
            color: #ffffff;
            padding: 14px 36px;
            font-size: 14px;
            letter-spacing: 3px;
            text-transform: uppercase;
            border-radius: 30px;
            cursor: pointer;
            box-shadow: 0 0 15px rgba(243, 118, 250, 0.2);
            transition: all 0.3s ease;
            display: none; /* Chỉ hiện lên khi mọi thứ đã load xong */
        }
        .start-btn:hover {
            background: linear-gradient(45deg, #f376fa, #b53cbf);
            border-color: transparent;
            box-shadow: 0 0 25px rgba(243, 118, 250, 0.6);
            transform: scale(1.05);
        }

        /* --- Giao diện HUD góc màn hình (Sau khi vào) --- */
        .cosmic-hud {
            position: absolute;
            top: 25px;
            left: 25px;
            color: #ffffff;
            font-family: sans-serif;
            pointer-events: none;
            z-index: 10;
        }
        .cosmic-hud h1 {
            margin: 0;
            font-size: 26px;
            font-weight: 300;
            letter-spacing: 4px;
            text-transform: uppercase;
            background: linear-gradient(45deg, #ffbbfb, #d1a3ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .cosmic-hud p {
            margin: 5px 0 0 0;
            font-size: 12px;
            letter-spacing: 1px;
            opacity: 0.7;
            color: #d1a3ff;
        }
    `;
    document.head.appendChild(style);

    // 2. Tạo Màn hình Chờ HTML
    const loadingScreen = document.createElement("div");
    loadingScreen.id = "loading-screen";
    loadingScreen.innerHTML = `
        <div class="loader-title">Trải nghiệm vui vẻ!</div>
        <div class="loader-status" id="load-text">Đang kết nối luồng vũ trụ... 0%</div>
        <button class="start-btn" id="enter-btn">Khám Phá Không Gian</button>
    `;
    document.body.appendChild(loadingScreen);

    // 3. Tạo HUD ẩn góc trên (Sẽ lộ ra sau khi ẩn màn hình chào)
    const hud = document.createElement("div");
    hud.className = "cosmic-hud";
    hud.innerHTML = `
        <h1>by_nguyenvanan</h1>
        <p>Hệ thống không gian ảo ổn định • 🌌</p>
    `;
    document.body.appendChild(hud);

    // 4. Xử lý hành động bấm nút Bắt đầu để tắt màn hình chờ
    document.getElementById("enter-btn").addEventListener("click", () => {
        loadingScreen.style.opacity = "0";
        setTimeout(() => {
            loadingScreen.remove();
        }, 1000);
    });
}