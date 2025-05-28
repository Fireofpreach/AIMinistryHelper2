import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { builtinModules } from "module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createConfig() {
  const plugins = [
    react(),
  ];

  if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
    const { cartographer } = await import("@replit/vite-plugin-cartographer");
    plugins.push(cartographer());
  }

  return defineConfig({
    plugins,
    resolve: {
      alias: {
        "@": resolve(__dirname, "client/src"),
        "@shared": resolve(__dirname, "shared"),
        "@assets": resolve(__dirname, "attached_assets"),
      },
    },
    root: resolve(__dirname, "client"),
    build: {
      outDir: resolve(__dirname, "dist/public"),
      emptyOutDir: true,
      rollupOptions: {
        external: [...builtinModules, "node:events"],
        output: {
          format: "esm",
        },
      },
    },
  });
}

export default createConfig;

