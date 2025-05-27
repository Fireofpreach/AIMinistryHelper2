import esbuild from "esbuild";

async function build() {
  try {
    await esbuild.build({
      entryPoints: ["server/index.ts"],
      bundle: true,
      platform: "node",
      format: "esm",
      outdir: "dist",
      external: ["@babel/preset-typescript", "lightningcss"],
      sourcemap: false, // optional: add if you want source maps
      minify: false,    // optional: add if you want minification
    });
    console.log("Server build completed successfully.");
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

build();
