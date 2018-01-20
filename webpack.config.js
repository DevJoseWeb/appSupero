/**
 * Aponta para a implementação correta da configuração do webpack
 * baseado na build selecionada pelo script do npm
 * tasklist - 19/01/2018 - SUPERO
 * 
 */

switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./config/webpack.prod')({env: 'production'});
    break;
  case 'test':
  case 'testing':
    module.exports = require('./config/webpack.test')({env: 'test'});
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./config/webpack.dev')({env: 'development'});
}
