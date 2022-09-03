module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',

    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',

    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'react-app',
    'react-app/jest',
    'airbnb',
    'airbnb-typescript',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },

  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/function-component-definition': [
      'warn',
      { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
    ],

    'import/prefer-default-export': 0,
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
    '@typescript-eslint/consistent-type-imports': 'warn',
    '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
    '@typescript-eslint/no-invalid-void-type': ['off'],
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],

    'jsx-a11y/label-has-associated-control': [
      2,
      {
        labelComponents: ['label'],
        labelAttributes: ['htmlFor'],
        controlComponents: ['input'],
      },
    ],
    'linebreak-style': ['error', 'unix'],
  },
  reportUnusedDisableDirectives: true,
  settings: {
    react: { version: 'detect' },

    'jsx-a11y': {
      components: {
        EditCityPhotoURLInput: 'input',
        EditDistrictPhotoURLInput: 'input',
      },
    },
  },
};
