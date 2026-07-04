import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
  return {
    // Tự động thêm tiền tố /Galaxy_Photo/ khi build và giữ nguyên '/' khi chạy dev ở máy
    base: command === 'build' ? '/Galaxy_Photo/' : '/',
    server: {
      open: true
    }
  };
});