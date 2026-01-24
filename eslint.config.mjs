import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import eslintConfigPrettier from "eslint-config-prettier";
import sonarjs from "eslint-plugin-sonarjs";
import globals from "globals";

export default tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**", "functions/**"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/strongly-recommended"],
  eslintConfigPrettier,
  {
    files: ["src/**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        sourceType: "module",
      },
    },
  },
  {
    files: ["src/**/*.{js,ts,vue}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      sonarjs,
    },
    rules: {
      "vue/no-unused-vars": "error",
      "vue/no-reserved-component-names": "error",
      "vue/v-on-event-hyphenation": "off",
      "vue/attribute-hyphenation": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "no-unreachable": "error",
      "vue/multi-word-component-names": "off",
      "sonarjs/cognitive-complexity": "error",
      "sonarjs/no-duplicate-string": "error",
      "sonarjs/elseif-without-else": "error",
      "sonarjs/max-switch-cases": "error",
      "sonarjs/no-all-duplicated-branches": "error",
      "sonarjs/no-collapsible-if": "error",
      "sonarjs/no-duplicated-branches": "error",
      "sonarjs/no-element-overwrite": "error",
      "sonarjs/no-empty-collection": "error",
      "sonarjs/no-extra-arguments": "error",
      "sonarjs/no-gratuitous-expressions": "error",
      "sonarjs/no-identical-conditions": "error",
      "sonarjs/no-identical-expressions": "error",
      "sonarjs/no-identical-functions": "error",
      "sonarjs/no-ignored-return": "error",
      "sonarjs/no-inverted-boolean-check": "error",
      "sonarjs/no-nested-switch": "error",
      "sonarjs/no-nested-template-literals": "error",
      "sonarjs/no-redundant-boolean": "error",
      "sonarjs/no-redundant-jump": "error",
      "sonarjs/no-same-line-conditional": "error",
      "sonarjs/no-small-switch": "error",
      "sonarjs/no-unused-collection": "error",
      "sonarjs/no-use-of-empty-return-value": "error",
      "sonarjs/no-useless-catch": "error",
      "sonarjs/prefer-immediate-return": "error",
      "sonarjs/prefer-object-literal": "error",
      "sonarjs/prefer-single-boolean-return": "error",
      "sonarjs/prefer-while": "error",
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    },
  }
);
