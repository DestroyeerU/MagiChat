module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@controllers': './src/app/controllers',
          '@middlewares': './src/app/middlewares',
          '@entity': './src/entity',
          '@schemas': './src/schemas',
          '@errors': './src/errors',
          '@mytypes': './src/types',

          '@services': './src/services',
          '@utils': './src/app/utils',
          '@config': './src/config',
          '@': './src',
        },
      },
    ],
  ],
  ignore: ['**/*/.test.ts', '**/*/.test.js', './src/types', '**/*.d.ts'],
};
