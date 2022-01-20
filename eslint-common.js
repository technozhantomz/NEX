module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      ecmaVersion: 7,
      modules: true,
      sourceType: "module",
    },
  },
  plugins: ["import", "@typescript-eslint", "sort-exports"],
  extends: [
    "plugin:@next/next/recommended",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  settings: {
    jest: {
      version: 26,
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },

  globals: {
    log: true,
    JSX: true,
    debug: true,
    window: true,
    module: true,
  },

  ignorePatterns: ["**/*.codegen.ts"],

  rules: {
    "no-undef": 2,
    "@typescript-eslint/explicit-module-boundary-types": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "all",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: false,
        caughtErrors: "all",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "no-unreachable": "warn",
    // 'sort-exports/sort-exports': ['error', { sortDir: 'asc' }],
    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        allowSeparatedGroups: true,
      },
    ],

    "import/no-unresolved": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    // 'import/no-internal-modules': ['error'],
    // 'import/no-useless-path-segments': [
    //   'error',
    //   {
    //     noUselessIndex: true,
    //   },
    // ],
    "no-duplicate-imports": "error",

    "@typescript-eslint/ban-ts-comment": 0,
    //
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        alphabetize: { order: "asc" },
        groups: [
          "builtin",
          "external",
          "internal",
          "object",
          "parent",
          "sibling",
          "index",
        ],
        pathGroups: [
          {
            pattern: "~/**",
            group: "object",
          },
        ],
      },
    ],
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },

  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      rules: {
        "@typescript-eslint/naming-convention": [
          "error",
          { selector: "typeLike", format: ["PascalCase"] },
        ],
      },
    },
  ],
};
