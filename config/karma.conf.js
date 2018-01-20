module.exports = function (config) {
  let testWebpackConfig = require('./webpack.test.js')({ env: 'test' });

  let configuration = {

    // Path utilizado de base para rodar os patterns
    basePath: '',

    /*
     * Framework utilizado
     */
    frameworks: ['jasmine'],

    // lista de arquivos para ignorar
    exclude: [],

    client: {
      captureConsole: false
    },

    // lista de arquivos ou patterns para carregar no browser
    files: [
      { pattern: './config/spec-bundle.js', watched: false },
      { pattern: './src/assets/**/*', watched: false, included: false, served: true, nocache: false }
    ],

    proxies: {
      "/assets/": "/base/src/assets/"
    },

    preprocessors: { './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap'] },

    // Configuração do webpack em: ./webpack.test.js
    webpack: testWebpackConfig,

    coverageReporter: {
      type: 'in-memory'
    },

    remapCoverageReporter: {
      'text-summary': null,
      json: './coverage/coverage.json',
      html: './coverage/html'
    },

    webpackMiddleware: {
      noInfo: true,
      stats: {
        chunks: false
      }
    },

    reporters: ['mocha', 'coverage', 'remap-coverage'],
    port: 9876,
    colors: true,

    /**
     * Valores de nivel de log: config.LOG_DISABLE || config.LOG_ERROR ||
     * config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
     */
    logLevel: config.LOG_WARN,
    autoWatch: false,

    /**
     * Browsers disponíveis: https://npmjs.org/browse/keyword/karma-launcher
     */
    browsers: [
      'Chrome'
    ],

    customLaunchers: {
      ChromeTravisCi: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    singleRun: true
  };

  if (process.env.TRAVIS) {
    configuration.browsers = [
      'ChromeTravisCi'
    ];
  }

  config.set(configuration);
};
