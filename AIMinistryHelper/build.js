import esbuild from "esbuild";

esbuild.build({
  entryPoints: ["server/index.ts"],
  bundle: true,
  platform: "node",
  format: "esm",
  outdir: "dist",
  external: ["@babel/preset-typescript", "lightningcss"],
}).catch(() => process.exit(1));
