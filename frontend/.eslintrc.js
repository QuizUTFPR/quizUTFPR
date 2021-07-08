module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'prettier', 'plugin:import/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.jsx', '.js'],
      },
    ],
    'import/prefer-default-export': 'off',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'no-param-reassign': 'off',
    'no-console': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@components', './src/components/'],
          ['@assets', './src/assets/'],
          ['@routes', './src/routes.js'],
          ['@hooks', './src/hooks/'],
          ['@context', './src/context/'],
          ['@api', './src/services/api.js'],
          ['@pages', './src/pages/'],
          ['@utils', './src/utils/'],
        ],
      },
      extensions: ['.js', '.less', '.json', '.vue'],
    },
  },
};
