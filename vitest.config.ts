/// <reference types="vitest" />
import { defineConfig } from "vitest/config"

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        setupFiles: [
            "./src/tests/setup-e2e.ts"
        ],
    },
});
