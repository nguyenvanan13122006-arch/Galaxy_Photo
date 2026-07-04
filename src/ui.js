export function createUI() {
  const style = document.createElement("style");
  style.textContent = `
    :root {
      color-scheme: dark;
      --rose: #ffd1ea;
      --blush: #ff8dcc;
      --violet: #bfa2ff;
      --aqua: #92f7ff;
      --night: #03030d;
    }

    body::before,
    body::after {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 2;
    }

    body::before {
      background:
        radial-gradient(circle at 18% 22%, rgba(255, 209, 234, 0.14) 0 1px, transparent 2px),
        radial-gradient(circle at 72% 18%, rgba(146, 247, 255, 0.16) 0 1px, transparent 2px),
        radial-gradient(circle at 82% 74%, rgba(191, 162, 255, 0.16) 0 1px, transparent 2px),
        radial-gradient(circle at 32% 78%, rgba(255, 141, 204, 0.14) 0 1px, transparent 2px);
      background-size: 180px 180px, 240px 240px, 210px 210px, 260px 260px;
      opacity: 0.65;
      animation: starDrift 18s linear infinite;
    }

    body::after {
      background:
        linear-gradient(115deg, transparent 8%, rgba(255, 141, 204, 0.08) 28%, transparent 47%),
        linear-gradient(245deg, transparent 18%, rgba(146, 247, 255, 0.07) 44%, transparent 68%),
        linear-gradient(180deg, rgba(3, 3, 13, 0) 0%, rgba(3, 3, 13, 0.38) 100%);
      mix-blend-mode: screen;
      opacity: 0.8;
    }

    @keyframes starDrift {
      from { transform: translate3d(0, 0, 0); }
      to { transform: translate3d(-40px, 28px, 0); }
    }

    @keyframes shimmer {
      0%, 100% { opacity: 0.72; transform: translateY(0); }
      50% { opacity: 1; transform: translateY(-3px); }
    }

    #loading-screen {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
      overflow: hidden;
      color: #ffffff;
      font-family: "Segoe UI", Roboto, Arial, sans-serif;
      text-align: center;
      background:
        radial-gradient(ellipse at 50% 42%, rgba(255, 141, 204, 0.2) 0%, rgba(105, 55, 153, 0.14) 34%, transparent 62%),
        linear-gradient(150deg, #02030b 0%, #10051d 42%, #050713 100%);
      transition: opacity 700ms ease;
    }

    #loading-screen::before,
    #loading-screen::after {
      content: "";
      position: absolute;
      inset: -12%;
      pointer-events: none;
    }

    #loading-screen::before {
      background:
        radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.95) 0 1px, transparent 2px),
        radial-gradient(circle at 76% 22%, rgba(255, 209, 234, 0.9) 0 1px, transparent 2px),
        radial-gradient(circle at 54% 72%, rgba(146, 247, 255, 0.85) 0 1px, transparent 2px),
        radial-gradient(circle at 88% 62%, rgba(191, 162, 255, 0.9) 0 1px, transparent 2px);
      background-size: 120px 120px, 170px 170px, 150px 150px, 210px 210px;
      opacity: 0.55;
      animation: starDrift 22s linear infinite;
    }

    #loading-screen::after {
      background:
        linear-gradient(110deg, transparent 12%, rgba(255, 209, 234, 0.15) 34%, transparent 58%),
        linear-gradient(250deg, transparent 16%, rgba(146, 247, 255, 0.11) 43%, transparent 72%);
      filter: blur(18px);
      opacity: 0.9;
    }

    .loader-content {
      position: relative;
      z-index: 1;
      display: grid;
      justify-items: center;
      width: min(720px, 92vw);
    }

    .loader-kicker {
      margin: 0 0 14px;
      color: rgba(255, 209, 234, 0.82);
      font-size: clamp(12px, 2.8vw, 14px);
      letter-spacing: 3px;
      text-transform: uppercase;
      animation: shimmer 3.6s ease-in-out infinite;
    }

    .loader-title {
      margin: 0;
      color: #ffffff;
      font-size: clamp(38px, 8vw, 76px);
      font-weight: 300;
      line-height: 0.95;
      letter-spacing: 6px;
      text-transform: uppercase;
      text-shadow:
        0 0 18px rgba(255, 141, 204, 0.45),
        0 0 42px rgba(146, 247, 255, 0.16);
    }

    .loader-title span {
      display: block;
      margin-top: 10px;
      background: linear-gradient(90deg, var(--rose), #ffffff 42%, var(--aqua));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .loader-note {
      max-width: 540px;
      margin: 18px 0 10px;
      color: rgba(255, 255, 255, 0.8);
      font-size: clamp(14px, 3.2vw, 17px);
      line-height: 1.7;
    }

    .loader-status {
      min-height: 24px;
      margin: 2px 0 34px;
      color: var(--rose);
      font-size: 14px;
      line-height: 1.5;
      letter-spacing: 1px;
      text-shadow: 0 0 16px rgba(255, 141, 204, 0.45);
    }

    .start-btn {
      display: none;
      align-items: center;
      justify-content: center;
      min-width: 170px;
      min-height: 52px;
      padding: 0 34px;
      border: 1px solid rgba(255, 209, 234, 0.72);
      border-radius: 999px;
      color: #ffffff;
      background:
        linear-gradient(90deg, rgba(255, 141, 204, 0.22), rgba(146, 247, 255, 0.14)),
        rgba(255, 255, 255, 0.03);
      box-shadow:
        0 0 24px rgba(255, 141, 204, 0.28),
        inset 0 0 18px rgba(255, 255, 255, 0.08);
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
      transition: transform 200ms ease, box-shadow 200ms ease, background 200ms ease;
      touch-action: manipulation;
      backdrop-filter: blur(10px);
    }

    .start-btn:hover,
    .start-btn:focus-visible {
      background:
        linear-gradient(90deg, rgba(255, 141, 204, 0.42), rgba(146, 247, 255, 0.28)),
        rgba(255, 255, 255, 0.06);
      border-color: rgba(255, 255, 255, 0.82);
      box-shadow:
        0 0 34px rgba(255, 141, 204, 0.5),
        0 0 54px rgba(146, 247, 255, 0.22);
      transform: translateY(-1px) scale(1.03);
      outline: none;
    }

    .start-btn:disabled {
      cursor: wait;
      opacity: 0.55;
    }

    .cosmic-hud {
      position: fixed;
      top: 22px;
      left: 22px;
      z-index: 10;
      max-width: calc(100vw - 44px);
      color: #ffffff;
      font-family: "Segoe UI", Roboto, Arial, sans-serif;
      pointer-events: none;
      text-shadow: 0 0 18px rgba(255, 141, 204, 0.35);
    }

    .cosmic-hud h1 {
      margin: 0;
      color: #ffffff;
      font-size: clamp(18px, 5vw, 27px);
      font-weight: 300;
      letter-spacing: 3px;
      text-transform: uppercase;
      background: linear-gradient(90deg, var(--rose), #ffffff 48%, var(--aqua));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .cosmic-hud p {
      margin: 6px 0 0;
      color: rgba(255, 209, 234, 0.86);
      font-size: 12px;
      line-height: 1.45;
      letter-spacing: 1px;
    }

    @media (max-width: 560px) {
      .loader-kicker {
        max-width: 340px;
        letter-spacing: 1.6px;
        line-height: 1.7;
      }

      .loader-title {
        letter-spacing: 4px;
      }

      .loader-note {
        margin-top: 16px;
      }

      .cosmic-hud {
        top: 16px;
        left: 16px;
        max-width: calc(100vw - 32px);
      }
    }
  `;
  document.head.appendChild(style);

  const loadingScreen = document.createElement("div");
  loadingScreen.id = "loading-screen";
  loadingScreen.innerHTML = `
    <div class="loader-content">
      <p class="loader-kicker">Vũ trụ nhỏ</p>
      <h2 class="loader-title">Galaxy <span>Photo</span></h2>
      <p class="loader-note">by_nguyenvanan</p>
      <p class="loader-status" id="load-text">Đang kết nối dải ngân hà... 0%</p>
      <button class="start-btn" id="enter-btn" type="button" disabled>Bắt đầu</button>
    </div>
  `;
  document.body.appendChild(loadingScreen);

  const hud = document.createElement("div");
  hud.className = "cosmic-hud";
  hud.innerHTML = `
    <h1>by_nguyenvanan</h1>
    <p>Hệ thống ký ức giữa ngân hà đã sẵn sàng</p>
  `;
  document.body.appendChild(hud);

  const enterBtn = document.getElementById("enter-btn");
  enterBtn.addEventListener("click", () => {
    window.dispatchEvent(new Event("galaxy:start"));
    loadingScreen.style.opacity = "0";

    window.setTimeout(() => {
      loadingScreen.remove();
    }, 750);
  });
}
