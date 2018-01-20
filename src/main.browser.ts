/*
 * Angular bootstrapping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { decorateModuleRef } from './app/environment';
import { bootloader } from '@angularclass/hmr';

/*
 * App Module
 * Módulo de nível mais alto que contém todos os componentes
 */
import { AppModule } from './app';

/*
 * Realiza o bootstrap da aplicação como um NgModule de alto nível
 */
export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(decorateModuleRef)
    .catch((err) => console.error(err));
}

// Necessário para o HML (hot module replacement)
// trocado por "document ready" em produção.
// obs: hml não implementado neste exemplo
bootloader(main);
