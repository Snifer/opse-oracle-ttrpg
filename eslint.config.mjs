import js from "@eslint/js";
import tseslint from "typescript-eslint";
import obsidianPlugin from "eslint-plugin-obsidianmd";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.ts"],
    plugins: {
      obsidian: obsidianPlugin,
    },
    rules: {
      // ── Reglas del plugin oficial de Obsidian ──────────────────────────
      // Bloquea APIs internas no documentadas que pueden romperse en updates
      "obsidian/no-constructor-dep": "error",
      // Obliga a usar el adaptador de red de Obsidian en vez de fetch nativo
      "obsidian/prefer-obsidian-fetch": "warn",
      // Detecta uso de APIs marcadas como deprecated en el SDK de Obsidian
      "obsidian/no-deprecated-components": "error",
    },
  },
  {
    // Ignora archivos generados por el build
    ignores: ["main.js", "node_modules/**"],
  }
);
