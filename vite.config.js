import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
  return {
    // Đổi base theo đúng tên repository GitHub Pages
    // Nếu repo là https://username.github.io/Galaxy_Photo/ thì giữ nguyên như dưới
    base: command === "build" ? "/Galaxy_Photo/" : "/",

    server: {
      open: true,
    },
  };
});
