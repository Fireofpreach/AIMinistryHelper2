import esbuild from "esbuild";
import path from "path";

async function build() {
  try {
    await esbuild.build({
      entryPoints: ["server/index.ts"],
      bundle: true,
      platform: "node",
      format: "esm",  // ESM output
      outdir: "dist",
      outExtension: { ".js": ".mjs" },
      external: [
        "@babel/preset-typescript",
        "lightningcss",
        "vite",
        "@vitejs/plugin-react"
      ],
      sourcemap: false,
      minify: false,
    });
    console.log("Server build completed successfully.");
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

build();

