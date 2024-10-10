// eslint.config.mjs
import typescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import filenames from 'eslint-plugin-filenames';
import jsDoc from 'eslint-plugin-jsdoc';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tailwindcss from 'eslint-plugin-tailwindcss';

export default [
  {
    ignores: ['eslint.config.mjs', 'node_modules/', 'src/vite-env.d.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      reactRefresh,
      react,
      '@typescript-eslint': typescript,
      'jsx-a11y': jsxA11y,
      tailwindcss,
      prettier,
      'react-hooks': reactHooks,
      filenames,
      jsdoc: jsDoc,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Accessibility rules
      'jsx-a11y/label-has-associated-control': 'off',
      'jsx-a11y/control-has-associated-label': 'off',
      'jsx-a11y/label-has-for': 'off',
      "react/prop-types": "warn",

      // React rules
      'react/prop-types': 'error',
      'react/jsx-filename-extension': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/no-unescaped-entities': 'off',

      // Import-related rules
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'import/no-anonymous-default-export': 'off',
      'import/no-cycle': 'off',

      // Other rules
      'no-nested-ternary': 'off',
      'no-console': 'error',
      'block-spacing': 'error',
      'object-curly-spacing': ['error', 'always'],
      'keyword-spacing': ['error', { before: true, after: true }],
      indent: ['error', 2, { SwitchCase: 1 }],
      'max-len': ['error', 160],

      // TypeScript-specific rules
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase'],
          filter: { regex: '_', match: false },
        },
        {
          selector: 'function',
          format: ['camelCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['PascalCase'],
          filter: { regex: 'Component$', match: true },
        },
      ],

      // Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // JSDoc rules
      'jsdoc/require-jsdoc': [
        'warn',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: true,
            FunctionExpression: true,
          },
        },
      ],

      // Prettier integration
      'prettier/prettier': 'error',
    },
    files: ['src/**/*.{ts,tsx}'],
  },
];
