import { defineConfig } from "vite";

export default defineConfig({
  // Đặt base là './' sẽ giúp đường dẫn tự động dùng dạng tương đối.
  // Nhờ đó, code sẽ tự chạy được bất kể tên repo GitHub của bạn là gì.
  base: './',
  server: {
    open: true
  }
});
