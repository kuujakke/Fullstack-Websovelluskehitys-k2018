module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'jest/globals': true,
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
    ],
    'parser': 'babel-eslint',
    'parserOptions': {
        'ecmaVersion': 6,
        'sourceType': 'module',
        'ecmaFeatures': {
            'modules': true,
            'experimentalObjectRestSpread': true,
            'jsx': true,
        },
    },
    'plugins': [
        'react',
        'jest',
    ],
    'rules': {
        'indent': [
            'error',
            4,
            {'SwitchCase': 1}
        ],
        'linebreak-style': [
            'error',
            'unix',
        ],
        'quotes': [
            'error',
            'single',
        ],
        'semi': [
            'error',
            'never',
        ],
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
        'react/prop-types': 0,
    },
    'settings': {
        'react': {
            'pragma': 'React',
            'version': '16.2.0',
        },
    },
}