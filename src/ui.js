export function createUI() {
  const style = document.createElement("style");
  style.textContent = `
    #loading-screen {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
      color: #ffffff;
      font-family: "Segoe UI", Roboto, Arial, sans-serif;
      text-align: center;
      background: radial-gradient(circle, #150a21 0%, #03040d 100%);
      transition: opacity 700ms ease;
    }

    .loader-title {
      margin: 0 0 10px;
      font-size: clamp(28px, 7vw, 42px);
      font-weight: 300;
      letter-spacing: 4px;
      text-transform: uppercase;
      background: linear-gradient(45deg, #ffbbfb, #d1a3ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 0 15px rgba(243, 118, 250, 0.4));
    }

    .loader-status {
      max-width: 520px;
      margin: 0 0 30px;
      color: #ffbbfb;
      font-size: 14px;
      line-height: 1.5;
      letter-spacing: 1px;
      opacity: 0.85;
    }

    .start-btn {
      display: none;
      align-items: center;
      justify-content: center;
      min-height: 48px;
      padding: 0 30px;
      border: 1px solid rgba(243, 118, 250, 0.65);
      border-radius: 999px;
      color: #ffffff;
      background: transparent;
      box-shadow: 0 0 15px rgba(243, 118, 250, 0.2);
      cursor: pointer;
      font-size: 14px;
      letter-spacing: 2px;
      text-transform: uppercase;
      transition: transform 200ms ease, box-shadow 200ms ease, background 200ms ease;
      touch-action: manipulation;
    }

    .start-btn:hover,
    .start-btn:focus-visible {
      background: linear-gradient(45deg, #f376fa, #b53cbf);
      border-color: transparent;
      box-shadow: 0 0 25px rgba(243, 118, 250, 0.6);
      transform: scale(1.04);
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
    }

    .cosmic-hud h1 {
      margin: 0;
      font-size: clamp(18px, 5vw, 26px);
      font-weight: 300;
      letter-spacing: 3px;
      text-transform: uppercase;
      background: linear-gradient(45deg, #ffbbfb, #d1a3ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .cosmic-hud p {
      margin: 5px 0 0;
      color: #d1a3ff;
      font-size: 12px;
      line-height: 1.4;
      letter-spacing: 1px;
      opacity: 0.75;
    }
  `;
  document.head.appendChild(style);

  const loadingScreen = document.createElement("div");
  loadingScreen.id = "loading-screen";
  loadingScreen.innerHTML = `
    <h2 class="loader-title">Galaxy Photo</h2>
    <p class="loader-status" id="load-text">Dang ket noi du lieu khong gian... 0%</p>
    <button class="start-btn" id="enter-btn" type="button" disabled>Bat dau</button>
  `;
  document.body.appendChild(loadingScreen);

  const hud = document.createElement("div");
  hud.className = "cosmic-hud";
  hud.innerHTML = `
    <h1>by_nguyenvanan</h1>
    <p>He thong khong gian ao on dinh</p>
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
