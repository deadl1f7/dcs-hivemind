// @ts-check

import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig({
  files: ["**/*.ts", "**/*.mts", "**/*.js", "**/*.mjs"],
  extends: [tseslint.configs.base],
  ignores: [
    "**/node_modules/", // Standard node_modules
    "**/dist/",         // Build artifacts
    "**/.next/",        // Next.js build (if applicable)
    "**/.cache/",       // Cache folders
    "**/out/",          // Output folders
    "**/.DS_Store",     // macOS system files
    "package-lock.json",
    "pnpm-lock.yaml",
    "**/libs/*"          // Ignore all files in libs directory
  ],
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    '@typescript-eslint/no-floating-promises': ['error', { checkThenables: true }],
    "no-console": "warn"
  }
});