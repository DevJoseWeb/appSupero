const helpers = require('./helpers');

/**
 * Plugins do Webpack
 */
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

/**
 * Constants do Webpack
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

/**
 * Configurações do Webpack
 *
 * Documentação: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function () {
  return {

    /**
     * 'Source map' do Karma -- karma-sourcemap-loader e karma-webpack
     *
     * Não modificar, pode ocasioar o não funcionamento das builds.
     * Documentação: https://github.com/webpack/karma-webpack#source-maps
     */
    devtool: 'inline-source-map',

    /**
     * Opções que afetam a maneira que o webpack resolve os módulos.
     *
     * Documentação: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {

      /**
       * Uma array de extensões que devem ser usadas para resolver módulos.
       *
       * Documentação: http://webpack.github.io/docs/configuration.html#resolve-extensions
       */
      extensions: ['.ts', '.js'],

      /**
       * Garante que o root é o folder /src
       */
      modules: [helpers.root('src'), 'node_modules']

    },

    /**
     * Opções que afetam os módulos normais.
     *
     * Documentação: http://webpack.github.io/docs/configuration.html#module
     *
     * Está sendo utilizado 'loader:' como uma correção temporária
     */
    module: {

      rules: [

        /**
         * Arquivo fonte para dar suporte ao loader de arquivos *.js
         *
         * Documentação: https://github.com/webpack/source-map-loader
         */
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: [
            // these packages have problems with their sourcemaps
            helpers.root('node_modules/rxjs'),
            helpers.root('node_modules/@angular')
          ]
        },

        /**
         * Typescript loader para arquivos .ts rotas assincronas do Angular via .async.ts
         *
         * Documentação: https://github.com/s-panferov/awesome-typescript-loader
         */
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'awesome-typescript-loader',
              query: {
                sourceMap: false,
                inlineSourceMap: true,
                compilerOptions: {
                  removeComments: true
                }
              }
            },
            'angular2-template-loader'
          ],
          exclude: [/\.e2e\.ts$/]
        },

        /**
         * Json loader para arquivos *.json.
         *
         * Documentação: https://github.com/webpack/json-loader
         */
        {
          test: /\.json$/,
          loader: 'json-loader',
          exclude: [helpers.root('src/index.html')]
        },

        /**
         * Raw loader para arquivos *.css
         *
         * Documentação: https://github.com/webpack/raw-loader
         */
        {
          test: /\.css$/,
          loader: ['to-string-loader', 'css-loader'],
          exclude: [helpers.root('src/index.html')]
        },

        /**
         * Raw loader para arquivos *.scss
         *
         * Documentação: https://github.com/webpack/raw-loader
         */
        {
            test: /\.scss$/,
            loader: ['raw-loader', 'sass-loader'],
            exclude: [helpers.root('src/index.html')]
        },

        /**
         * Raw loader para arquivos *.html
         *
         * Documentação: https://github.com/webpack/raw-loader
         */
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: [helpers.root('src/index.html')]
        },

        /**
         * Documentação: https://github.com/deepsweet/istanbul-instrumenter-loader
         */
        {
          enforce: 'post',
          test: /\.(js|ts)$/,
          loader: 'istanbul-instrumenter-loader',
          include: helpers.root('src'),
          exclude: [
            /\.(e2e|spec)\.ts$/,
            /node_modules/
          ]
        }

      ]
    },

    /**
     * Adiciona plugins adicionais ao compilador.
     *
     * Documentação: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [

      /**
       * Plugin: DefinePlugin
       * Descrição: Define variaveis livres.
       *
       * Documentação: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
       */
      // NOTA: adicionar propriedades novas também no arquivo custom-typings.d.ts
      new DefinePlugin({
        'ENV': JSON.stringify(ENV),
        'HMR': false,
        'process.env': {
          'ENV': JSON.stringify(ENV),
          'NODE_ENV': JSON.stringify(ENV),
          'HMR': false,
        }
      }),

      /**
       * Plugin: ContextReplacementPlugin
       *
       * Documentação: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
       * Documentação: https://github.com/angular/angular/issues/11580
       */
      new ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        helpers.root('src'), // localização do /src
        {
          // Angular async route
        }
      ),

      /**
       * Plugin LoaderOptionsPlugin (experimental)
       *
       * Documentação: https://gist.github.com/sokra/27b24881210b56bbaff7
       */
      new LoaderOptionsPlugin({
        debug: false,
        options: {
          // configurações de legado
        }
      })

    ],

    /**
     * Desabilita alertas de performance
     *
     * Documentação: https://github.com/a-tarasyuk/rr-boilerplate/blob/master/webpack/dev.config.babel.js#L41
     */
    performance: {
      hints: false
    },

    node: {
      global: true,
      process: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  };
};
