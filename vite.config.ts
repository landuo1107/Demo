import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: resolve(__dirname, "build"),
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 8899,
    open: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:9999",
        ws: true,
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
