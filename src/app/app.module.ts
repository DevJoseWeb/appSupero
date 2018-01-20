import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {NgModule} from "@angular/core";
import {RouterModule, PreloadAllModules} from "@angular/router";
import {ENV_PROVIDERS} from "./environment";
import {ROUTES} from "./app.routes";
import {AppComponent} from "./app.component";
import {TarefasComponent} from "./tarefas/tarefas.component";
import {TarefasService} from "./tarefas/tarefas.service";
import {HttpClient} from "./http-client";
import {DndModule} from "ng2-dnd";

/**
 * Import do CSS principal da aplicação
 */
import "../styles/styles.scss";

/**
 * Componente principal da aplicação
 */
@NgModule({
  bootstrap: [AppComponent],

  /**
   * Declaração de Componentes
   */
  declarations: [
    AppComponent,
    TarefasComponent
  ],

  /**
   * Import de modulos do Angular.
   */
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    DndModule.forRoot(),
    RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules})
  ],

  /**
   * Expõe Services e Providers na injeção de dependencias do Angular.
   */
  providers: [
    HttpClient,
    TarefasService,
    ENV_PROVIDERS
  ]
})
export class AppModule {
}
