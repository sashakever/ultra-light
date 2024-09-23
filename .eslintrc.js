module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/recommended',
    'plugin:import/electron',
    'plugin:import/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'eslint-config-prettier',
    'prettier',
  ],
  plugins: [
    'eslint-plugin-prettier',
    '@typescript-eslint',
    'jsx-a11y',
    'unused-imports',
  ],
  settings: {
    'import/resolver': {
      typescript: true,
      alias: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        map: [
          ['@app', './src/app'],
          ['@base', './src/base'],
          ['@widgets', './src/widgets'],
          ['@shared', './src/shared'],
          ['@features', './src/features'],
          ['@pages', './src/pages'],
        ],
      },
    },
  },
  overrides: [
    {
      files: ['src/app/api/instafeed/route.ts'],
      rules: {
        '@typescript-eslint/no-unsafe-member-access': 'off',
      },
    },
  ],
  rules: {
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state',
      ]
    }],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    '@typescript-eslint/no-unused-vars': 'error',
    'unused-imports/no-unused-imports': 'error',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'react/no-array-index-key': 'off',
    'react/button-has-type': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/naming-convention': [
      2,
      {
        selector: 'enum',
        format: ['PascalCase'],
        suffix: ['Enum'],
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
        suffix: ['Type'],
        filter: {
          regex: '(Props|ReduxStore|ReduxState|ReduxDispatch|RootState|AppDispatch)',
          match: false,
        },
      },
      {
        selector: ['variable', 'typeParameter', 'interface'],
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
      },
    ],
    'react/jsx-filename-extension': [1, {extensions: ['.ts', '.tsx']}],
    'react/jsx-props-no-spreading': [
      2,
      {
        exceptions: ['Swiper', 'Component']
      },
    ],
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    'react/no-multi-comp': ['error'],
    'react/function-component-definition': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'import/order': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};