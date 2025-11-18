import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      "react": pluginReact,
      "react-hooks": reactHooks,
    },
  },
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {...globals.browser, ...globals.node}
    }
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...tseslint.configs.recommended,
  {
    settings: {react: {version: "detect"}},
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "react/prop-types": "off",  // Prop types are not needed when using TypeScript
      "react/react-in-jsx-scope": "off",  // React is always in scope when using JSX
      "react/jsx-uses-react": "off",  // React is always in scope when using JSX
    }
  },
];

