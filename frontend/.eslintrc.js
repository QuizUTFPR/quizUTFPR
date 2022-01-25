module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
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
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
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
      extensions: ['.js', '.less', '.json'],
    },
  },
};
