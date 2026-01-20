import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";

export default defineConfig(({ mode }) => ({
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 2000,
    sourcemap: false,
    minify: "esbuild",
    rollupOptions: {
      output: {
        entryFileNames: "assets/[hash].js",
        chunkFileNames: "assets/[hash].js",
        assetFileNames: "assets/[hash].[ext]",
      },
    },
  },

  plugins: [
    tsconfigPaths(),
    react(),
    mode !== "production" && tagger(),
  ].filter(Boolean),
}));
