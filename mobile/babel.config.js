module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@pages': './src/pages/',
            '@assets': './assets/',
            '@components': './src/components/',
            '@styles': './src/styles/',
            '@context': './src/context/',
            '@hook': './src/hook/',
          },
        },
      ],
    ],
    env: {
      production: {
        plugins: [],
      },
    },
  };
};
