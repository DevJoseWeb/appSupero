import {enableDebugTools, disableDebugTools} from '@angular/platform-browser';
import {ApplicationRef, enableProdMode} from '@angular/core';

/**
 * Provider do ambiente
 * @type {Array}
 */
let PROVIDERS: any[] = [];

/**
 * URL para base para a API da aplicação
 * @type {string}
 */
let URL: any = "http://localhost:8080/api";

let _decorateModuleRef = <T>(value: T): T => {
  return value;
};

if ('production' === ENV) {
  enableProdMode();

  /**
   * Atualiza endPoint para ambiente de produção
   * @type {string}
   */
  URL = "http://localhost:8080/api";

  _decorateModuleRef = (modRef: any) => {
    disableDebugTools();

    return modRef;
  };

  PROVIDERS = [
    ...PROVIDERS,
  ];
} else {

  /**
   * Atualiza endPoint para ambiente de produção
   * @type {string}
   */
  URL = "http://localhost:8080/api";

  _decorateModuleRef = (modRef: any) => {
    const appRef = modRef.injector.get(ApplicationRef);
    const cmpRef = appRef.components[0];

    let _ng = (<any> window).ng;
    enableDebugTools(cmpRef);
    (<any> window).ng.probe = _ng.probe;
    (<any> window).ng.coreTokens = _ng.coreTokens;
    return modRef;
  };

  PROVIDERS = [
    ...PROVIDERS,
  ];
}

export const decorateModuleRef = _decorateModuleRef;

export const ENV_PROVIDERS = [
  ...PROVIDERS
];

/**
 * Exporta uma constante para ser usada no HttpClient que encapsula as requisições ao backend
 * @type {any}
 */
export const API_URL = URL;
