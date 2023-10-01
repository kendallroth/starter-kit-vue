/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  // Vue linting requires top-level 'vue-eslint-parser', but a custom parser can be specified
  //   under 'parserOptions'
  // Source: https://eslint.vuejs.org/user-guide/#how-to-use-a-custom-parser
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    project: "./tsconfig.app.json",
    sourceType: "module",
  },
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  plugins: ["import"],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    // Types should be imported inline with other imports but with 'type' specifier
    "@typescript-eslint/consistent-type-imports": ["warn", { fixStyle: "inline-type-imports" }],
    // While explicitly using 'any' is permissible, it should be avoided whenever possible (ignores type safety)
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-inferrable-types": "warn",
    // Using non-null assertion operator (!) is occasionally necessary (entities, etc)
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    // Returning an async call within try/catch requires an 'await' keyword to be able to handle errors!
    "@typescript-eslint/return-await": ["error", "in-try-catch"],
    // Prevent (and combine) duplicate import declarations
    "import/no-duplicates": "warn",
    // Sort imports into alphabetical groups (sorting import keys is handled by 'sort-imports')
    "import/order": [
      "warn",
      {
        // Custom group definitions (uses 'minimatch')
        // NOTE: TS aliases are automatically categorized as 'internal' paths by plugin!
        pathGroups: [
          { pattern: "#{components,imports}", group: "internal", position: "before" }
        ],
        // Order import groups (can group multiple together)
        groups: [
          "builtin", // Built-in Node packages
          "external", // NPM depencencies
          "internal", // Internal aliases/paths (from TS config)
          ["parent", "sibling", "index"], // Relative paths
          "unknown", // All uncategorized imports
          "type", // Specific type imports (ie 'import type {} ...'), but technically ignored with inline types
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: false,
        },
      },
    ],
    // Prevent files/modules from importing from themselves
    "import/no-self-import": "error",
    // Prevent useless import paths (ie. "./../something.ts" or "./pages/index.ts")
    "import/no-useless-path-segments": ["warn", { noUselessIndex: true }],
    // Console statements should be avoided where possible (prefer explicit logging)
    "no-console": "warn",
    // Disabled to avoid rule conflict with '@typescript-eslint/return-await'
    "no-return-await": "off",
    "prefer-const": "warn",
    // Prettier formatting suggestions will be applied automatically
    "prettier/prettier": "warn",
    // Sort multiple import keys (sorting import declarations is handled by 'import/order')
    "sort-imports": [
      "warn",
      {
        // Ignore case to avoid placing PascalCase imports before camelCase (ie. 'import {Example, awesomeExample} ...')!
        ignoreCase: true,
        // Ignore sorting import declaration (handled by 'import/order')
        ignoreDeclarationSort: true,
      },
    ],
    "vue/attributes-order": ["warn", { alphabetical: true }],
    // Does not play very well with Nuxt auto-name generation (from folder structure)
    "vue/multi-word-component-names": "off",
    "vue/no-unused-vars": ["warn"],
  },
  overrides: [
    {
      files: ["*.vue"],
      rules: {
        // Typescript does a better job of no false positives (due to auto-imports)
        "no-undef": "off",
      },
    },
  ],
  settings: {
    "import/extensions": [".js", ".ts", ".vue"],
    "import/resolver": {
      typescript: {
        // Allow 'import' rules to reference TS config (for aliases, etc)
        project: "./tsconfig.app.json",
      },
    },
  },
};
