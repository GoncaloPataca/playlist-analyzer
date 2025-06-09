/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import mkcert from "vite-plugin-mkcert";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tailwindcss(), mkcert(), tsconfigPaths()],
  server: {
    host: true,
  },
  test: {
    browser: {
      screenshotFailures: false,
      enabled: true,
      provider: "playwright",
      instances: [{ browser: "chromium" }],
    },
    coverage: {
      provider: "v8",
      reporter: ["html"],
    },
    setupFiles: "./src/vitest-setup.ts",
  },
});
