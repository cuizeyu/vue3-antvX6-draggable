import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue()],
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
      "public/": `${path.resolve(__dirname, "public")}/`,
    },
  },
  esbuild: {
    pure: ["console.log"],
    drop: ["debugger"],
  },
  build: {
    target: "es2015",
    outDir: "dist",
  },
});
