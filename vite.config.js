import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import checker from "vite-plugin-checker";

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    checker({
      typescript: true,
      overlay: false,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,ts,vue}"',
        useFlatConfig: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 8080,
  },
});
