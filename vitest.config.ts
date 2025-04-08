/// <reference types="vitest" />
import { defineConfig } from "vitest/config"

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        setupFiles: [
            "./src/tests/setup.ts",
            "./src/tests/e2e-setup.ts"
        ],
    },
});
