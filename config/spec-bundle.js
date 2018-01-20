/*
 * Quando testamos com webpack e ES6, temos de lidar com algumas coisas
 * extras para os tests funcionarem. Devemos complicar tests escritos em
 * ES6 também. Isso é lidado em karma.conf.js com o karma-webpack plugin.
 * Esse arquivo é a entrada para os tests com webpack. Assim como no webpack,
 * vamos criar um bundle.js para o client, quando rodarmos tests ele vai compilar
 * para o bundle e rodar...
 *
 */

Error.stackTraceLimit = Infinity;

require('core-js/es6');
require('core-js/es7/reflect');

require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/proxy'); // since zone.js 0.6.15
require('zone.js/dist/sync-test');
require('zone.js/dist/jasmine-patch'); // put here since zone.js 0.6.14
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');

// RxJS
require('rxjs/Rx');

let testing = require('@angular/core/testing');
let browser = require('@angular/platform-browser-dynamic/testing');

testing.TestBed.initTestEnvironment(
  browser.BrowserDynamicTestingModule,
  browser.platformBrowserDynamicTesting()
);

/*
 * Busca recursivamente os arquivos padrões de teste
 */
let testContext = require.context('../src', true, /\.spec\.ts/);

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

// requer e retorna todos os modulos que estiverem no padrão "/\.spec\.ts/"
let modules = requireAll(testContext);
