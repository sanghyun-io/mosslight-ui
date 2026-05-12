import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    copyPublicDir: false,
    lib: {
      cssFileName: "styles",
      entry: resolve(__dirname, "src/index.ts"),
      fileName: (format) => `mosslight-ui.${format === "es" ? "js" : "cjs"}`,
      formats: ["es", "cjs"],
      name: "MosslightUI",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
  },
});
