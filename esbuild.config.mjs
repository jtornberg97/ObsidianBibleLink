import esbuild from "esbuild";

esbuild.build({
  entryPoints: ["main.ts"],
  bundle: true,
  outfile: "main.js",
  platform: "browser",
  format: "cjs",
}).catch(() => process.exit(1));
