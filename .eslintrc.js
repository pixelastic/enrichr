module.exports = {
  extends: ['algolia', 'algolia/jest'],
  rules: {
    'import/no-commonjs': 'off',
    'no-console': ['error', { allow: ['warn', 'error']}],
    'no-warning-comments': 'off',
  },
};

