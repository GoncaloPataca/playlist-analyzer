import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    browser: {
      screenshotFailures: false,
      enabled: true,
      provider: "playwright",
      instances: [{ browser: "chromium" }],
    },
    setupFiles: "./src/vitest-setup.ts",
  },
});
