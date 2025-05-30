import { defineConfig, PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { builtinModules } from "module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (async () => {
  const plugins: PluginOption[] = [react()];

  if (
    process.env.NODE_ENV !== "production" &&
    typeof process.env.REPL_ID !== "undefined"
  ) {
    const { cartographer } = await import("@replit/vite-plugin-cartographer");
    const plugin = cartographer();
    if (Array.isArray(plugin)) {
      plugins.push(...plugin);
    } else {
      plugins.push(plugin);
    }
  }

  return defineConfig({
    base: "/", // <-- ADD THIS LINE
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
})();
