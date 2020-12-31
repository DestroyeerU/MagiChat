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
          '@mytypes': './src/types',
          '@services': './src/services',
          '@controllers': './src/app/controllers',
          '@middlewares': './src/app/middlewares',
          '@utils': './src/app/utils',
          '@config': './src/config',
          '@': './src',
        },
      },
    ],
  ],
  ignore: ['**/*/.test.ts', '**/*/.test.js', './src/types', '**/*.d.ts'],
};
