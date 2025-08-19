import { defineConfig } from "vite";
import * as path from "path";

// Define __dirname equivalent for ESM
const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default defineConfig(async () => {
  // Dynamically import tailwindcss plugin
  const tailwindcss = await import("@tailwindcss/vite").then(
    (m) => m.default || m
  );

  return {
    // Base public path
    base: "./",

    // Add Tailwind CSS plugin
    plugins: [tailwindcss()],

    // 🔑 Expose dev server to Docker
    server: {
      host: "0.0.0.0", // allow connections from outside container
      port: 5173,      // keep vite inside at 5173
      strictPort: true // fail if port is taken, don’t auto-switch
    },

    // Build options
    build: {
      outDir: "dist",
      emptyOutDir: true,
      chunkSizeWarningLimit: 800, // Increase chunk size warning limit
      rollupOptions: {
        input: path.resolve(__dirname, "index.html"),
        output: {
          manualChunks: {
            vendor: [
              "codemirror",
              "@xterm/xterm",
              "@xterm/addon-fit",
              "html2canvas",
            ],
          },
        },
      },
    },

    // Resolve assets from node_modules
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./"),
      },
    },
  };
});
