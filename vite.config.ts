import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
      "@/components": path.resolve(process.cwd(), "./src/components"),
      "@/types": path.resolve(process.cwd(), "./src/types"),
      "@/constants": path.resolve(process.cwd(), "./src/constants"),
      "@/hooks": path.resolve(process.cwd(), "./src/hooks"),
      "@/store": path.resolve(process.cwd(), "./src/store"),
      "@/assets": path.resolve(process.cwd(), "./src/assets"),
    },
  },
});
