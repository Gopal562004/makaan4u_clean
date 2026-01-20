import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";

export default defineConfig({
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 2000,

    // 🔐 IMPORTANT: hide original source code
    sourcemap: false,

    // Extra minification hardening
    minify: "esbuild",

    rollupOptions: {
      output: {
        // Make file names non-guessable
        entryFileNames: "assets/[hash].js",
        chunkFileNames: "assets/[hash].js",
        assetFileNames: "assets/[hash].[ext]",
      },
    },
  },

  plugins: [
    tsconfigPaths(),
    react(),
    tagger(),
  ],

  server: {
    port: 4028,
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: [
      ".amazonaws.com",
      ".builtwithrocket.new",
    ],
  },
});
