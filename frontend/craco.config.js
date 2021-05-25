/* craco.config.js */

const CracoAlias = require('craco-alias');

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'options',
        baseUrl: './src',
        aliases: {
          '@components': './components/',
          '@assets': './assets/',
          '@routes': './routes.js',
          '@hooks': './hooks/',
          '@context': './context/',
          '@api': './services/api.js',
          '@pages': './pages/',
        },
      },
    },
  ],
};
