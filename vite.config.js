import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "./assets",
    emptyOutDir: true,
  },
  // In vite.config.js
  server: {
    port: 3000,
    strictPort: false,
  },
  base: "./",
});
