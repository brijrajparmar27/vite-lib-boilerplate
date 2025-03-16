import react from "@vitejs/plugin-react";
import { glob } from "glob";
import { fileURLToPath } from "node:url";
import { extname, relative, resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // Enables React support
    dts({ tsconfigPath: "./tsconfig.app.json" }), // Generates .d.ts files based on TypeScript config
    libInjectCss(), // injects css in the build, Without it, CSS from your components might not be included
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"), //the starting point of the library
      name: "vite-lib-project",
      formats: ["es"],
      fileName: "vite-lib-project",
    },
    //It controls output structure
    rollupOptions: {
      external: ["react", "react/jsx-runtime"], // These dependencies won’t be bundled but will be required when using the library
      // get all files ts and tsx from project, place them under appropriate folders, avoid all gathering in one big chunk
      input: Object.fromEntries(
        glob
          .sync("src/**/*.{ts,tsx}")
          .map((file) => [
            relative("src", file.slice(0, file.length - extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),
      output: {
        assetFileNames: "assets/[name][extname]", // Controls how and where asset files (like CSS) are named in the build
        entryFileNames: "[name].js", // Controls how the entry JavaScript files are named in the build
      },
    },
  },
});
