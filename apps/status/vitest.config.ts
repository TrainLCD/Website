import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
    deps: {
      inline: ["data"],
    },
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@icons": path.resolve(__dirname, "src/components/icons"),
      "@pages": path.resolve(__dirname, "src/components/pages"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
});
