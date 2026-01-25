import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["lib/**/*"],
  },
  ...tseslint.configs.recommended,
  {
    rules: {
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^__", varsIgnorePattern: "^__" },
      ],
      "@typescript-eslint/no-require-imports": "off",
    },
  }
);
