import tseslint from "typescript-eslint";
import obsidianmd from "eslint-plugin-obsidianmd";

export default tseslint.config(
  // Configuracion recomendada de Obsidian (incluye TODAS sus reglas activas)
  ...obsidianmd.configs.recommended,
  {
    // Ignora archivos generados por el build
    ignores: ["main.js", "node_modules/**"],
  },
  {
    // Habilita informacion de tipos para reglas typed de typescript-eslint
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }
);
