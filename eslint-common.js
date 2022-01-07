module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      ecmaVersion: 7,
      modules: true,
      sourceType: 'module',
    },
  },
  plugins: ['lodash', 'jest', 'import', '@typescript-eslint', 'sort-exports'],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  settings: {
    jest: {
      version: 26,
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
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

  ignorePatterns: ['**/*.codegen.ts', 'graphql-schema.ts'],

  rules: {
    'no-undef': 2,
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'all',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: false,
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'lodash/callback-binding': 2,
    'lodash/chain-style': [2, 'as-needed'],
    'lodash/chaining': 2,
    'lodash/collection-method-value': 2,
    'lodash/collection-ordering': 2,
    'lodash/collection-return': 2,
    'lodash/consistent-compose': [2, 'flow'],
    'lodash/identity-shorthand': [2, 'always'],
    'lodash/import-scope': [2, 'member'],
    'lodash/matches-prop-shorthand': [2, 'always'],
    //'lodash/matches-shorthand': [2, 'always', 3],
    'lodash/no-commit': 2,
    'lodash/no-double-unwrap': 2,
    'lodash/no-extra-args': 2,
    'lodash/no-unbound-this': 2,
    'lodash/path-style': [2, 'string'],
    'lodash/prefer-compact': 2,
    'lodash/prefer-constant': 0,
    'lodash/prefer-filter': [2, 3],
    'lodash/prefer-find': 2,
    'lodash/prefer-flat-map': 2,
    'lodash/prefer-get': [2, 3],
    'lodash/prefer-immutable-method': 2,
    'lodash/prefer-includes': [2, { includeNative: true }],
    'lodash/prefer-invoke-map': 2,
    'lodash/prefer-is-nil': 2,
    'lodash/prefer-lodash-chain': 2,
    //'lodash/prefer-lodash-method': 2,
    'lodash/prefer-lodash-typecheck': 2,
    'lodash/prefer-map': 2,
    //'lodash/prefer-matches': [2, 3],
    'lodash/prefer-noop': 2,
    'lodash/prefer-over-quantifier': 2,
    'lodash/prefer-reject': [2, 3],
    'lodash/prefer-some': [2, { includeNative: true }],
    'lodash/prefer-startswith': 2,
    'lodash/prefer-thru': 2,
    'lodash/prefer-times': 2,
    'lodash/prefer-wrapper-method': 2,
    'lodash/preferred-alias': 2,
    'lodash/prop-shorthand': [2, 'always'],
    'lodash/unwrap': 2,
    'no-unreachable': 'warn',
    // 'sort-exports/sort-exports': ['error', { sortDir: 'asc' }],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: true,
      },
    ],

    'import/no-unresolved': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    // 'import/no-internal-modules': ['error'],
    // 'import/no-useless-path-segments': [
    //   'error',
    //   {
    //     noUselessIndex: true,
    //   },
    // ],
    'no-duplicate-imports': 'error',

    '@typescript-eslint/ban-ts-comment': 0,
    //
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
        groups: [
          'builtin',
          'external',
          'internal',
          'object',
          'parent',
          'sibling',
          'index',
        ],
        pathGroups: [
          {
            pattern: '~/**',
            group: 'object',
          },
          {
            pattern: '@9am/**',
            group: 'internal',
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
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          { selector: 'typeLike', format: ['PascalCase'] },
        ],
      },
    },

    {
      files: ['*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      plugins: ['@graphql-eslint', 'prettier'],
      extends: 'plugin:@graphql-eslint/schema-recommended',
      rules: {
        'prettier/prettier': ['error', { parser: 'graphql' }],
        '@graphql-eslint/naming-convention': [
          'error',
          {
            OperationDefinition: 'camelCase',
            allowLeadingUnderscore: true,
          },
        ],
      },
      parserOptions: {
        operations: './**/*.graphql',
        schema: './graphql-schema.graphql',
      },
    },
    // the following is required for `eslint-plugin-prettier@<=3.4.0` temporarily
    // after https://github.com/prettier/eslint-plugin-prettier/pull/415
    // been merged and released, it can be deleted safely
    {
      files: ['*.ts/*.graphql'],
      rules: {
        'prettier/prettier': 'off',
      },
    },
  ],
}
