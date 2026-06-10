import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export const viteConfig = defineConfig({
  plugins: [react()],
  build: {
    minify: false, // 👈 YEH LINE BUNDLER KO 'e' BANANE SE ROKEGI
  },
});

export default viteConfig;
